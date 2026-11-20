---
title: "Equipment latency and real distortion; JUCE Part 4"
date: 2026-10-24
description: "Measuring the latency impact of bad equipment and discussing the math, pre and post processing of real distortion effects."
inProgress: true
---

# Preamble

Today we will examine a few things we previsouly glossed over in a bit more detail. Hopefully this will bring a lot of the moving parts involved into clarity. There are three main things I want to disect. Firstly, equipment. There are many places in the "equipment chain" doing many different things. Most of these cost time and therfore introduce some level of latency. Secondly, aliasing. This is something we have metnioned but what does it actually mean? Thirdly, real distortion. Today we'll dive into the math, pre and post processing required to properlly distort a signal in a deterministic way.

### Equiment and Aliasing

**1. Analog**: A vibrating string disturbs a magnet in our guitar pickup. The magnet emits a tiny volatge (a few hundred milli volts) and passes them down a cable into our ADC device. The first thing that happens is artifical gain is applied to the signal so that our audio interface can accurately process the input.

**2. Anti-aliasing**: Now, all frequencies above half of of the sample rate of our ADC must be removed. For 48k, that is anything above 24k. Anything above this gets processed as a frequency that was not previously present in our input signal.

The metaphor I have seen online is that of a camera frame rate capturing something spinning really fast. E.g. a helicopter blade or a car tire. If its spinning fast enough, it appears to move backwards or stand still, i.e. the camera is capturing something that is not really happening. The same kind of thing happens with our ADC and sample rate.

This effect is called aliasing and the removal/filtering of the signal frequencies is called an "anti-aliasing filter".

**3. Sampling and quantizing.** The signal is measured and the measurement gets turned into an integer. However, most modern converters don't sample directly at 48 kHz. They use a technique called [delta-sigma conversion](https://en.wikipedia.org/wiki/Delta-sigma_modulation), which samples at a much much higher rate with very low precision, then runs those samples through another filter to convert them to accurate 48 kHz samples. This gets you a better result with cheaper analog parts. It also costs time (latency) because that filter needs to see a window of samples before it can produce an output. The process of taking a larger set and mapping it to a samller set is called "quantization".

**4. USB.** The captured and quantized samples now have to make it to our CPU. Typically, and in our case, this is through a USB connection. USB is a technology we could write many blog posts on, for our case its only important to understand that it captures a "package" of samples, encodes them into a packet frame, and sends them to the CPU to decode. There is a buffer of packages on both side of the connection with the "to be transfered" and "to be decoded" packets. Both of these steps cost a little bit more time.

**5. OS and driver.** The operating system has many specialized pieces of software inside it that know how to interface with the specific hardward in your computer. These are called "drivers". When the audio packet is recieved, your OS calls the relevant audio driver to convert it to the currently understood format and passes it to any audio buffers that are currently ready and asking for input.

**6. JUCE.** JUCE exposes one such buffer. When the driver fills it up with data, it finally calls our very own `getNextAudioBlock` function.

All of these steps cost time and introduce latency of their own. Especially on cheap equipment (i.e. RealTone cable) the latency is way higher than our own code.

# Latency Measurements

Unfortunately we can't directly measure the latency introduced directly by the RockSmith cable. We can only measure the total roundtrip latency between string pluck and audio output. In theory, if we had another interface, we can compare measures under identical conditions to dervice only the Realtone (tm) latency impact. I don't currently have another interface so this is not an option for us. Instead the number we get includes all stages of the audio processing loop.

The easiest way to get this number is to ask the driver in charge of the equipment. It keeps track of an internal estimate of the current latency state. JUCE exposes an easy way to query it.

[code block 1]

For our case, our driver says the following:
[FILL]

The second piece is us. We have a 2.6 ms budget per callback and it would be good to know how much of it we are spending. There is a small trap here related to measuring this. The act of timing something costs something and as we previously discussed, our callback thread cannot touch the UI. The accepted pattern is to keep a running average in an atomic float and have the UI thread read its current state whenever it needs to update the interface. This way neither thread has to know about the other and we avoid all waiting.

[code block 2]

[FILL: average and peak, and what fraction of the 2.6 ms budget that is] 

# Distortion

### Waves and Harmonics

Before we get into the math we need one more idea. Any sound, no matter how complicated, can be described as a set of simple sine waves added together. You are probably familiar with what a sine wave [sounds like](https://www.youtube.com/watch?v=PAsMlDptjx8). One it's own, it's pretty boring.

When you play an open string on a guitar you don't get a single 110 Hz sine wave. You get 110 Hz plus 220 Hz, 330 Hz, 440 Hz and so on. All those tones layered together is what creates the final sound your ears/brain percieves. The first one is called the **fundamental** and the multiples are called **harmonics**. How loud each harmonic is relative to the others is a big part of why a guitar sounds like a guitar and not, for example, a piano playing the same note.

### Clipping

Real distortion is deterministic. The same input value always produces the same output value. We take a sample, change it in some way, and get a new sample. The dirty sound comes from the shape of that change. It's called the "curve"

The simplest curve is a flat ceiling: boost the signal (mutliply all inputs by a constant greater than 1), then cut off anything that goes past the ceiling. This is called **hard clipping**.

[code block 3]

We can get a smoother result by rounding off the corner of the ceiling instead. This is called **soft clipping**, and the usual way to do it is with`tanh`.

[code block 4]

`tanh` is a function that passes small values through almost unchanged and squashes large ones toward 1 and -1, without ever actually reaching them. With the gain down it barely does anything, which is why a soft clipper at low gain sounds mostly clean. With the gain up the signal gets pushed into the flat part of the curve and the peaks flatten out. That flattening is what we hear as distortion.

[FILL: audio clips. A clean DI recording, then the same recording at low gain, then high gain. Three `<audio>` tags.]

### Where the New Frequencies Come From

Flattening the peaks changes the shape of the wave, and a different shape means a different set of sine waves. So distortion doesn't only make the existing frequencies louder or quieter. It adds new frequencies at multiples of the ones already there.

If we put a pure 440 Hz sine through a hard clipper we get 440 Hz plus 1320 Hz, 2200 Hz, 3080 Hz and so on, getting quieter as they go up. These are the odd multiples, i.e. 3x, 5x, 7x and up. None of these were in the input. The clipper created them by changing the shape of the wave.

Why only odd multiples? `tanh` and hard clipping both treat the positive half of the wave exactly the same as the negative half. A curve like this is called **symmetric**, and a symmetric curve only produces odd harmonics. We can also treat the two halves differently (e.g. clip one side harder, or shift the signal up a bit before clipping). Then we get even harmonics too: 2x, 4x and so on. These are usually described as warmer or more "[tube like](https://en.wikipedia.org/wiki/Tube_sound)".

[code block 5]

### Aliasing Again

There is a catch here. Distortion keeps making harmonics further and further up: 3x, 5x, 7x, 9x. As we covered earlier, at 48 kHz we can only represent frequencies up to 24 kHz. So what happens to a harmonic above that?

Unfortunately it doesn't just disappear. A 30 kHz harmonic comes back down as an 18 kHz tone that isn't a multiple of anything we played. This is the same effect as the helicopter blade on camera, except this time we are the ones causing it. On a big chord these aliased frequencies sound inharmonic and unpleasant, and the more gain we add the worse they get.

The common fix is to temporarily work at a higher sample rate where the new harmonics have room, distort there, filter off what we can't keep, then come back down. This is called **oversampling**.

2. **Upsample** from 48 kHz to 192 kHz (4x). We can now represent up to 96 kHz.
3. **Distort** at 192 kHz. The new harmonics land where they should instead of folding back.
4. **Filter** off everything above 24 kHz. This is the same idea as the anti-aliasing filter in our ADC, except this one is ours and it runs in software.
5. **Downsample** back to 48 kHz. Nothing is left above the limit, so nothing aliases.

Thankfully, JUCE all of these operations built in:

c++

```c++
// in main_component.h// The factor is a power of two, so 2 here means 2^2 = 4x.juce::dsp::Oversampling<float> oversampling {  2,                                                      // channels  2,                                                      // factor: 2^2 = 4x  juce::dsp::Oversampling<float>::filterHalfBandPolyphaseIIR};
```

c++

```c++
// in prepareToPlay// Allocate up front, never in the audio callback.oversampling.initProcessing((size_t) samplesPerBlockExpected);
```

c++

```c++
// in getNextAudioBlock// Wrap the buffer in an AudioBlock so the dsp classes can use it.juce::dsp::AudioBlock<float> block (*bufferToFill.buffer);// Upsample. This hands back a block 4x as long.auto oversampledBlock = oversampling.processSamplesUp(block);// Same tanh as before, just running on 4x the samples.for (size_t ch = 0; ch < oversampledBlock.getNumChannels(); ++ch){  auto *data = oversampledBlock.getChannelPointer(ch);  for (size_t i = 0; i < oversampledBlock.getNumSamples(); ++i)    data[i] = std::tanh(data[i] * gain);}// Filter and downsample back into the original buffer.oversampling.processSamplesDown(block);
```

Of course this isn't free. Our 2.6 ms budget per callback stays the same, but we are now distorting four times as many samples inside it and running the filters on top of that. The filters also add latency of their own. JUCE exposes an easy way to query it:

c++

```c++
auto extraLatency = oversampling.getLatencyInSamples();
```

So we spent the first half of this post measuring latency and blaming the RealTone cable, and the first real piece of DSP we added made it worse. Go figure.

[FILL: audio clips, or a scope screenshot, comparing distortion with and without oversampling at high gain]

[FILL: what your callback time did after adding 4x oversampling]

### Where We Landed

v3.0.0 is now available with real distortion. Download it, plug in a guitar and let me know what you think! You'll notice I've added a bit more UI, the central knob controls the gain, everything else are just some fun stats about the running plugin.

The next post will be our last post in JUCE land for now. We'll see about packaging and publishing our amazing app as a real plugin that can be used by other people in their DAWs.

**CAUTION**: I still recommend headphones.

# Questions & Answers

### What makes our distortion plugin different from anyone else's?

I kept coming back to this one while writing the code. If `std::tanh(x * gain)` is the whole effect, how is anyone selling a distortion plugin for $99?

As far as I can tell, the curve is maybe 5% of a real distortion plugin. The rest falls into a few areas:

**1. Filtering around the distortion**: What happens to the signal before and after the curve changes the sound a lot. When low and high frequencies distort together they mix and create new frequencies that are not multiples of anything we played, which sounds muddy. This is called **intermodulation distortion**. Rolling off the bass before clipping avoids most of it. Boosting the mids before the curve and cutting them after gives a completely different sound from the same curve. Apparently most real pedals are a set of filters with a clipper in the middle.

**2. The shape of the curve**: `tanh` is one option of many. There is hard clipping, soft clipping, asymmetric curves, curves modelled on the measured response of a specific diode or tube, and curves that change shape depending on how hard you play. This is where the expensive plugins spend a lot of their effort.

**3. Dynamic response**: A real amp does not treat every note the same. When you play hard its power supply can't keep up and the voltage drops, which compresses the sound. This is called **sag**. It also responds differently to a hard pick attack than a soft one. Applying one fixed curve to every sample, which is what we have been doing, is called **static waveshaping**, and it does none of this. I believe this is a big part of why cheap distortion sounds lifeless.

**4. What comes after**: A lot of what makes a recorded guitar sound like a recorded guitar comes from the speaker cabinet and the microphone in front of it, not the distortion. Serious amp sim plugins put a lot of work into modelling that stage.

**5. Everything that isn't DSP**: Aliasing (as we saw above), CPU usage, a UI that makes sense, good presets, not crashing in Pro Tools, and a developer who is still around in three years to fix it when a macOS update breaks something.

So far we have built the 5%, and it was the easy part. That is a little discouraging, but it also means there is plenty left to learn in future posts.
