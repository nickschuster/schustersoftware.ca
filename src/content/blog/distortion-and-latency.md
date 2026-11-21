---
title: "Equipment latency and real distortion; JUCE Part 4"
date: 2026-11-21
description: "Measuring the latency impact of bad equipment and discussing the math, pre and post processing of real distortion effects."
inProgress: false
---

# Preamble

Today we will examine a few things we previously glossed over in a bit more detail. Hopefully this will bring a lot of the moving parts involved into clarity. There are three main things I want to dissect. Firstly, equipment. There are many places in the "equipment chain" doing many different things. Most of these cost time and therefore introduce some level of latency. Secondly, aliasing. This is something we have mentioned but what does it actually mean? Thirdly, real distortion. Today we'll dive into the math, pre and post processing required to properly distort a signal in a deterministic way.

### Equipment and Aliasing

**1. Analog**: A vibrating string disturbs a magnet in our guitar pickup. The magnet emits a tiny voltage (a few hundred milli volts) and passes them down a cable into our ADC device. The first thing that happens is artificial gain is applied to the signal so that our audio interface can accurately process the input.

**2. Anti-aliasing**: Now, all frequencies above half of of the sample rate of our ADC must be removed. For 48k, that is anything above 24k. Anything above this gets processed as a frequency that was not previously present in our input signal.

The metaphor I have seen online is that of a camera frame rate capturing something spinning really fast. E.g. a helicopter blade or a car tire. If its spinning fast enough, it appears to move backwards or stand still, i.e. the camera is capturing something that is not really happening. The same kind of thing happens with our ADC and sample rate.

This effect is called aliasing and the removal/filtering of the signal frequencies is called an "anti-aliasing filter".

**3. Sampling and quantizing.** The signal is measured and the measurement gets turned into an integer. However, most modern converters don't sample directly at 48 kHz. They use a technique called [delta-sigma conversion](https://en.wikipedia.org/wiki/Delta-sigma_modulation), which samples at a much much higher rate with very low precision, then runs those samples through another filter to convert them to accurate 48 kHz samples. This gets you a better result with cheaper analog parts. It also costs time (latency) because that filter needs to see a window of samples before it can produce an output. The process of taking a larger set and mapping it to a smaller set is called "quantization".

**4. USB.** The captured and quantized samples now have to make it to our CPU. Typically, and in our case, this is through a USB connection. USB is a technology we could write many blog posts on, for our case its only important to understand that it captures a "package" of samples, encodes them into a packet frame, and sends them to the CPU to decode. There is a buffer of packages on both side of the connection with the "to be transferred" and "to be decoded" packets. Both of these steps cost a little bit more time.

**5. OS and driver.** The operating system has many specialized pieces of software inside it that know how to interface with the specific hardware in your computer. These are called "drivers". When the audio packet is received, your OS calls the relevant audio driver to convert it to the currently understood format and passes it to any audio buffers that are currently ready and asking for input.

**6. JUCE.** JUCE exposes one such buffer. When the driver fills it up with data, it finally calls our very own `getNextAudioBlock` function.

All of these steps cost time and introduce latency of their own. Especially on cheap equipment (i.e. RealTone cable) the latency is way higher than our own code.

# Latency Measurements

Unfortunately we can't directly measure the latency introduced directly by the RockSmith cable. We can only measure the total roundtrip latency between string pluck and audio output. In theory, if we had another interface, we could compare measures under identical conditions to derive only the RealTone (tm) latency impact. I don't currently have another interface so this is not an option for us. Instead the number we get includes all stages of the audio processing loop.

The easiest way to get this number is to ask the driver in charge of the equipment. It keeps track of an internal estimate of the current latency state. JUCE exposes an easy way to query it.

```c++
void MainComponent::changeListenerCallback(juce::ChangeBroadcaster *)
{
  auto *device = deviceManager.getCurrentAudioDevice();
  if (device != nullptr)
  {
    auto sampleRate = device->getCurrentSampleRate();
    auto bufferSize = device->getCurrentBufferSizeSamples();
    auto inputLatency = device->getInputLatencyInSamples();
    auto outputLatency = device->getOutputLatencyInSamples();

    // Inline function for converting samples to milliseconds
    auto toMs = [sampleRate](int samples)
    { return (samples / sampleRate) * 1000.0; };

    auto latencyLine = device->getName() + " | Sample rate: " + juce::String(sampleRate, 0) + " | Buffer: " + juce::String(bufferSize) + " (" + juce::String(toMs(bufferSize), 2) + " ms)" + " | Reported input latency: " + juce::String(toMs(inputLatency), 2) + " ms" + " | Reported output latency: " + juce::String(toMs(outputLatency), 2) + " ms" + " | Reported round trip: " + juce::String(toMs(inputLatency + outputLatency), 2) + " ms";
    juce::Logger::writeToLog(latencyLine);
    latencyText.setText(latencyLine, juce::dontSendNotification);
  }
}
```

There are a few interesting pieces we get from this, for a windows powered driver, the latency is actually fixed at 20ms. 10ms input and 10ms output. This something the default windows audio driver enforces. Practically this means by default we can't get better than 20ms but we can get much worse. If you choose a different audio device type like ASIO4ALL or DirectSound, you should be able to play around a bit with these figures.

The second piece is us. We have a 2.6 ms budget per callback and it would be good to know how much of it we are spending. There is a small trap here related to measuring this. The act of timing something costs something and as we previously discussed, our callback thread cannot touch the UI. The accepted pattern is to keep a running average in an atomic float and have the UI thread read its current state whenever it needs to update the interface. This way neither thread has to know about the other and we avoid all waiting.

```c++
// in main_component.h
std::atomic<float> averageCallbackMs { 0.0f };
std::atomic<float> peakCallbackMs    { 0.0f };
```

```c++
// in getNextAudioBlock, wrapping only the processing:
const auto startTicks = juce::Time::getHighResolutionTicks();

// ...

const auto elapsedMs = (float) (juce::Time::highResolutionTicksToSeconds(
                                  juce::Time::getHighResolutionTicks() - startTicks) * 1000.0);

// exponential moving average
averageCallbackMs.store(averageCallbackMs.load() * 0.95f + elapsedMs * 0.05f);

// store the highest recorded value
if (elapsedMs > peakCallbackMs.load())
  peakCallbackMs.store(elapsedMs);
```

```c++
// in timerCallback()
callbackTimeText.setText(juce::String(averageCallbackMs.load(), 3) + " ms avg / "
                             + juce::String(peakCallbackMs.load(), 3) + " ms peak",
                           juce::dontSendNotification);
```

Currently we are not doing much so our function is super fast.

Average: 0.009-0.011 ms

Peak: 0.041 ms

# Distortion

### Waves and Harmonics

Before we get into the math we need one more idea. Any sound, no matter how complicated, can be described as a set of simple sine waves added together. You are probably familiar with what a sine wave [sounds like](https://www.youtube.com/watch?v=PAsMlDptjx8). On it's own, it's pretty boring.

When you play an open string on a guitar you don't get a single 110 Hz sine wave. You get 110 Hz plus 220 Hz, 330 Hz, 440 Hz and so on. All those tones layered together is what creates the final sound your ears/brain perceives. The first one is called the "fundamental" and the multiples are called "harmonics". How loud each harmonic is relative to the others is a big part of why a guitar sounds like a guitar and not, for example, a piano playing the same note.

### Clipping

Real distortion is deterministic. The same input value always produces the same output value. We take a sample, change it in some way, and get a new sample. The dirty sound comes from the shape of that change. It's called the "curve"

The simplest curve is a flat ceiling: boost the signal (multiply all inputs by a constant greater than 1), then cut off anything that goes past the ceiling. This is called "hard clipping".

```c++
float gain = 10.0f; // example number usually between 10-500
float threshold = 0.5f;

samples[i] = juce::jlimit(-threshold, threshold, samples[i] * gain);
```

We can get a smoother result by rounding off the corner of the ceiling instead. This is called "soft clipping", and the usual way to do it is with `tanh`.

```c++
float gain = 10.0f; // example number usually between 10-500

samples[i] = std::tanh(samples[i] * gain);
```

`tanh` is a function that passes small values through almost unchanged and "squashes" large ones toward 1 and -1 ([asymptotically](https://en.wikipedia.org/wiki/Asymptote)). With low gain, nothing happens resulting in a mostly clean signal. With the gain up the signal gets pushed into the flat part of the curve and the peaks start to flatten out. That flattening is what we hear as distortion.

Clean (quiet)

<audio controls preload="none" src="/audio/distortion-and-latency/clean.mp3"></audio>

Hard clipping (loud)

<audio controls preload="none" src="/audio/distortion-and-latency/hard-clip.mp3"></audio>

Soft clipping (loud)

<audio controls preload="none" src="/audio/distortion-and-latency/soft-clip.mp3"></audio>

### Where the New Frequencies Come From

Flattening the peaks changes the shape of the wave, and a different shape means a different set of sine waves. So distortion doesn't only make the existing frequencies louder or quieter it adds new frequencies at multiples of the ones already there.

If we put a pure 440 Hz sine through a hard clipper we get 440 Hz plus 1320 Hz, 2200 Hz, 3080 Hz and so on. These are odd multiples, i.e. 3x, 5x, 7x, created by the clipper changing the shape of the wave.

Why only odd multiples? `tanh` and hard clipping both treat the positive half of the wave exactly the same as the negative half (imagine a sound wave to be cut in half length wise, the top half is positive, the bottom negative). A curve like this is called "symmetric", and a symmetric curve only produces odd harmonics. We can also treat the two halves differently (e.g. clip one side harder, or shift the signal up a bit before clipping). Then we get even harmonics too: 2x, 4x and so on. These are usually described as warmer or more "[tube like](https://en.wikipedia.org/wiki/Tube_sound)".

```c++
float gain = 10.0f; // example number usually between 10-500

auto x = samples[i] * gain;
samples[i] = x >= 0.0f ? std::tanh(x) : std::tanh(x * 0.7f);
```

### Aliasing Again

Distortion keeps making harmonics further and further up: 3x, 5x, 7x ... 37x ... 451x and so on. As we covered earlier, at 48 kHz we can only represent frequencies up to 24 kHz. So what happens to a harmonic above that?

Unfortunately it doesn't just disappear. A 30 kHz harmonic comes back down as an 18 kHz tone that isn't a multiple of anything we played. This is the same effect as the helicopter blade on camera. On a big chord these aliased frequencies sound inharmonic and unpleasant.

The common fix is to temporarily work at a higher sample rate where the new harmonics have room, distort there, filter off what we can't keep, then come back down. This is called "oversampling". The process looks something like the following:

1. Upsample from 48 kHz to 192 kHz (4x). We can now represent up to 96 kHz.

2. Apply our distortion effect at 192 kHz. The new harmonics now landing where they should instead of folding back.

3. Filter off everything above 24 kHz. This is the same idea as the anti-aliasing filter in our ADC.

4. Downsample back to 48 kHz.

To be clear, this process does not get rid of aliasing completely. Distortion keeps making harmonics forever, so some of them still go past 96 kHz and fold back. However, only the ones that fold back below 24 kHz matter, since the filter removes everything else. For a 440 Hz note that is the 383rd harmonic, which is around 50 dB quieter than the note itself (remember that each harmonic is quieter than the one before it). This is why some plugins offer 8x or 16x oversampling. More oversampling pushes the problem further up and makes it quieter, but it never goes away completely.

Thankfully, JUCE all of these operations built in:

```c++
// in main_component.h
// The factor is a power of two (2^2 = 4x).
juce::dsp::Oversampling<float> oversampling {
  2,                                                        // channels
  2,                                                        // factor
  juce::dsp::Oversampling<float>::filterHalfBandPolyphaseIIR
};
```

```c++
// in prepareToPlay
// Allocating some fixed memory for our processing
oversampling.initProcessing((size_t) bufferSize);
```

```c++
// in getNextAudioBlock
// Wrap the buffer in an AudioBlock so the dsp classes can use it.
juce::dsp::AudioBlock<float> block (*bufferToFill.buffer);

// Upsample
auto oversampledBlock = oversampling.processSamplesUp(block);

// Same tanh as before now running on 4x the samples.
for (size_t ch = 0; ch < oversampledBlock.getNumChannels(); ++ch)
{
  auto *data = oversampledBlock.getChannelPointer(ch);
  for (size_t i = 0; i < oversampledBlock.getNumSamples(); ++i)
    data[i] = std::tanh(data[i] * gain);
}

// Filter and downsample back into the original buffer.
oversampling.processSamplesDown(block);
```

Notice now that our average and peak latency numbers are significantly worse. This makes sense considering we are doing significantly more work in our callback function.

Average: 0.075-0.080ms

Peak: 0.291ms

Oversampled distorion (loud)

<audio controls preload="none" src="/audio/distortion-and-latency/distortion.mp3"></audio>

### Where We Landed

[v3.0.0](https://github.com/nickschuster/juce_distortion_pedal/releases/tag/v3.0.0) is now available with real distortion. Download it, plug in a guitar and let me know what you think! You'll notice I've added a bit more UI, the two sliders control a global threshold and gain level, and the drop down lets you swap between all the distortion modes we talked about today. Everything else is just some fun stats about the running plugin.

The next post will be our last post in JUCE land for now. We'll see about packaging and publishing our amazing app as a real plugin that can be used by other people in their DAWs. This includes some more UI work, a bit of a refactor, and some packaging/publishing intricacies.

**CAUTION**: I still recommend headphones.

# Questions & Answers

### What makes our distortion plugin different from anyone else's?

A simple question, if `std::tanh(x * gain)` covers the whole effect, how is anyone selling a distortion plugin for $99?

There are a few areas we have either glossed over or not covered that create the "moat" for other plugin publishers.

**Filtering around the distortion**: What happens to the signal before and after the curve changes the sound a lot. When low and high frequencies distort together they mix and create new frequencies that are not multiples of anything we played. This is called "intermodulation distortion". There are a variety of techniques and approaches to handle this and they all have a pretty unique effect on the final sound.

**The shape of the curve**: `tanh` is one option of many. There is hard clipping, soft clipping, asymmetric curves, curves modelled on the measured response of a specific diode or tube, and curves that change shape depending on how hard you play. An expensive plugin probably does not use an out of the box function for their distortion curve but rather something completely custom. As long as you have a function that in some way keeps audio peaks inside your useful frequencies, you can create a distortion effect.

**What comes after**: A lot of what makes a recorded guitar sound like a recorded guitar comes from the speaker cabinet, the amp and the microphone in front of it, not purely the distortion. Serious amp sim plugins put a lot of work into modelling all of the nuances of that equipment. This is again typically some kind of dynamic effect depending on, for example, volume/intensity of play.

**Everything that isn't DSP**: Aliasing (as we saw above), CPU usage, a UI that makes sense, good presets, not crashing, consistent updates and maintenance are all factors that are also important and completely separate from the actual effect.
