---
title: "Sample rates, buffers and first audio; JUCE Part 3"
date: 2026-10-06
description: "Sample rates, buffer sizes, latency, and getting our first audio through a JUCE app."
---

# Preamble

How does a computer know what time it is? Matter of fact, how does any piece of technology? Take your microwave for example, I am assuming for this case that it's not connected to the internet (god help us all). Have you ever noticed that after some amount of time (weeks, months) it runs slightly ahead or behind? And that this difference to "real" time only increases?

The reason is due to how time is measured. The exact mechanism is complicated enough for its own blog post, but essentially there exists a special chip, a "clock" or "time" chip. It works by running an electrical signal through a special piece of material, typically a "quartz crystal oscillator" (there are cheaper options as well). Quartz is piezoelectric: squeeze it and it produces a voltage, apply a voltage and it vibrates. Put it in the right circuit and it vibrates at a frequency directly determined by its physical shape and the angle it was cut at, the same way a particular length and thickness of guitar string rings at a particular pitch. The chip itself has a special circuit that can turn this known frequency into exactly a 1 second pulse by way of dividing down the frequency of the vibration. The industry standard is 32,768 Hz, which is 2^15. That means the circuit can divide down 15 times and get exactly a 1 second pulse.

However these crystals are never truly perfect. They are manufactured with a tolerance (typically ±20ppm which works out to 10 minutes a year). Imperfections, heat and aging all ever so slightly change the vibration count. Meaning when you divide down instead of exactly one pulse every second, you might get one pulse every 1.000001 seconds. You can see how over enough time, this inaccuracy adds up.

Any device connected to the internet corrects for this by checking its internal measurement against a set of master "time" servers. Any device that is offline cannot do this and so will eventually desync from "real" time. How do time servers authoritatively know what time it is? Read about it [here](https://learn.microsoft.com/en-us/windows-server/networking/windows-time-service/how-the-windows-time-service-works).

Why is any of this relevant? Because your audio interface has one of these crystals in it too. It samples 48,000 times per "crystal chip" second. Your speakers might have a different one. When these disagree about how long a second is our software (in this case JUCE) has to compensate in some way. Otherwise our audio playback will have unpleasant artifacts (e.g. clicking, dead spots). Today we are talking about sample rates, buffers, and what to do with them.

# Reading and Writing Music Bits

As we previously said, ADC/DAC are the technology bits responsible for turning analog signals digital and vice versa. They do this in part by taking a slice of the current state of the sound and then converting it to a number (or again, vice versa). The amount of times they do this per second is called the "sample rate". For example 48 kHz, that is 48,000 slices per second. Both your input and output device have a sample rate.

Now let's take it back to our project. We want to take in a signal, apply some distortion, and play it back. In theory that means we take the slices the ADC creates, do some mathematical transformation on the numbers, and give the finished numbers to the DAC. In practice there are a few complications we need to be aware of.

We mentioned the idea of a "buffer" in post number one. Basically, we can't process all 48k slices at once, we process them in chunks. For example we might do 128 slices at a time. My first instinct was that a bigger buffer means more work for the computer. That's not really correct. The difference is really the type of work that must be done. At the end of the day you must always process all 48k samples every second.

**Fewer function calls**: less per-call overhead, and more slack to absorb OS/JUCE scheduling (something is responsible for calling our function, it does not make any guarantees about the exact call time).

**More function calls**: lower latency, but tighter deadline and of course more risk of missing said deadline.

Some processing is simple. Volume control for example is trivially easy: take every sample and multiply it by a constant, an operation measured in nanoseconds (multiplying two floats takes around 5 cycles, which at 3 GHz is about 1.5 ns). More complicated operations take more time. Delay requires you to store previous buffers and continuously use them to calculate the current sample.

If we take our sample rate (48,000 per second) and divide by our buffer size (128) we get how many times our function will be called per second: 375, giving us a 2.6 ms budget per call. In computing, that is an eon. However, that budget also has to cover OS scheduling, resource pressure, and in a DAW, every other plugin currently modifying the sound.

As we mentioned, the other thing to keep in mind is that larger buffers introduce latency: the time between strumming our guitar and hearing the distorted audio. Almost everyone notices a delay of more than 20 ms. Some people can feel it as low as 5 ms. The general rule of thumb for plugins is no more than 10 ms, which at 48 kHz implies a maximum buffer of around 480 samples. As we just learned this is quite optimisticgiven all the other things vying for compute resources. We also need to build in some overhead for all the concurrent operations that are happening during our audio processing. In practice that means our real goal is somewhere between 3-5 ms per function call MAX.

Taking a step back I need to be clear: as plugin developers we don't control the buffer size, the DAW does. The app as it is right now is standalone and I've included the audio picker, so the user picks the device, channel, sample rate and buffer size. In a real plugin however the goal is to optimize and build our code in a way that it works for all such combinations. This is generally a large tripping hazard when developing JUCE/audio software.

### Code

Now given all of that background let's look at some actual code. I've also published this at [v2.0.0](https://github.com/nickschuster/juce_distortion_pedal/releases/tag/v2.0.0) on GitHub with all the comments included. I've included all the files here for completeness' sake if you are following along. In the future I will be focusing on only the most relevant snippets. The full code will of course always be available on GitHub.

### main.cpp

```c++
#include <juce_gui_basics/juce_gui_basics.h>
#include <juce_audio_devices/juce_audio_devices.h>
#include "main_component.h"

// This is all template code we don't need to change for now.
// It essentially handles the application lifecycle and creates
// a window to hold our main component.
class MyApplication : public juce::JUCEApplication
{
public:
  const juce::String getApplicationName() override { return JUCE_APPLICATION_NAME_STRING; }
  const juce::String getApplicationVersion() override { return JUCE_APPLICATION_VERSION_STRING; }
  bool moreThanOneInstanceAllowed() override { return true; }

  void initialise(const juce::String &) override
  {
    mainWindow = std::make_unique<MainWindow>(getApplicationName());
  }

  void shutdown() override { mainWindow = nullptr; }
  void systemRequestedQuit() override { quit(); }

private:
  class MainWindow : public juce::DocumentWindow
  {
  public:
    explicit MainWindow(const juce::String &name)
        : DocumentWindow(name,
                         juce::Desktop::getInstance().getDefaultLookAndFeel().findColour(juce::ResizableWindow::backgroundColourId),
                         DocumentWindow::allButtons)
    {
      setUsingNativeTitleBar(true);
      setContentOwned(new MainComponent(), true);
      setResizable(true, true);
      centreWithSize(getWidth(), getHeight());
      setVisible(true);
    }

    void closeButtonPressed() override
    {
      JUCEApplication::getInstance()->systemRequestedQuit();
    }

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(MainWindow)
  };

  std::unique_ptr<MainWindow> mainWindow;
};

START_JUCE_APPLICATION(MyApplication)
```

### main_component.h

```c++
// This is our header file, not really the meat of our application. Skip to main_component.cpp for
// the implementations.

// #pragma is a special instruction to the compiler, in this case telling it to only include this
// header file once per .cpp file, even if it gets included multiple times along the way (e.g.
// through other headers). The reason to only include it once is to avoid defining the same class
// twice in one file, which would cause a compile error.
#pragma once

// #include is roughly the "import" statement in C++ (it literally pastes the header's contents in
// here).
#include <juce_gui_extra/juce_gui_extra.h>
#include <juce_gui_basics/juce_gui_basics.h>
#include <juce_audio_devices/juce_audio_devices.h>
#include <juce_audio_utils/juce_audio_utils.h>

// Class representing the main content component of the application. It inherits from
// juce::AudioAppComponent, juce::Timer and juce::ChangeListener so we can draw stuff to the screen,
// handle audio, use a "timer" callback to do stuff at a regular interval, and get notified when the
// audio device setup changes.
class MainComponent : public juce::AudioAppComponent,
                      private juce::Timer,
                      private juce::ChangeListener
{
public:
    MainComponent();
    ~MainComponent() override;

    // JUCE requires these overrides for AudioAppComponent. They are no-ops for a minimal starter
    // app, but they're required to make the class concrete and compile successfully.
    void prepareToPlay(int bufferSize, double sampleRate) override;
    void getNextAudioBlock(const juce::AudioSourceChannelInfo &bufferToFill) override;
    void releaseResources() override;

    // The paint and resized methods inherited from juce::Component, overridden here to draw and lay
    // out our content.
    void paint(juce::Graphics &) override;
    void resized() override;

    // A function exposed by the juce::Timer class, which is called at a regular interval, in this
    // case every 100ms.
    void timerCallback() override;

    // This method is part of the change-listener callback system used by JUCE. It allows us to
    // respond when the audio device setup changes (device, sample rate, buffer size, etc).
    void changeListenerCallback(juce::ChangeBroadcaster *) override;

private:
    // A component to allow the user to select and configure the audio device.
    juce::AudioDeviceSelectorComponent audioSetupComp;

    // A label to display the CPU usage.
    juce::Label cpuUsageText;

    // JUCE macro to add a memory leak detector to this class and to prevent copy construction and
    // assignment.
    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(MainComponent)
};
```

### main_component.cpp

```c++
// This file contains the implementation of our MainComponent class. The entry point for the program
// and the window that holds our main component both live in main.cpp, so here we implement our
// MainComponent class, including the paint and resized methods to draw and lay out our content.
// This is a common C++ pattern: define a class in a header file, then implement it in a .cpp file.
// Although it's not explicitly required, it is common practice to separate the definition and
// implementation of classes in C++.
#include "main_component.h"

// Constructor, in this case setting the window size at creation, starting our timer to call the
// timerCallback() function every 100ms, and setting up the audio device manager to allow the user
// to select and configure the audio device.
MainComponent::MainComponent() : audioSetupComp(deviceManager,
                                                0,     // Minimum input channels
                                                256,   // Maximum input channels
                                                0,     // Minimum output channels
                                                256,   // Maximum output channels
                                                false, // Show MIDI input options
                                                false, // Show MIDI output device selector
                                                false, // Treat channels as stereo pairs
                                                false) // Hide advanced options behind a button (false = show them directly)
{
  setAudioChannels(2, 2);
  deviceManager.addChangeListener(this);
  addAndMakeVisible(audioSetupComp);
  addAndMakeVisible(cpuUsageText);
  setSize(500, 300);
  startTimer(100);
}

// Destructor.
MainComponent::~MainComponent()
{
  deviceManager.removeChangeListener(this);
  shutdownAudio();
}

// The paint method, in this case setting the background color. The look and feel is a JUCE class
// that handles the default colors and styles for the application based on the OS and theme, so we
// can use it to get the default background color for a resizable window. Note that we're just
// borrowing the "resizable window" color here; the actual window is created in main.cpp.
void MainComponent::paint(juce::Graphics &g)
{
  g.fillAll(getLookAndFeel().findColour(juce::ResizableWindow::backgroundColourId));
}

// The resized method: what happens to our content when the user resizes the window? We recalculate
// the positions and sizes of our child components. For now, only the CPU label gets positioned; the
// audio device selector doesn't get any bounds yet.
void MainComponent::resized()
{
  // Total area of our component (the window minus the title bar).
  auto rect = getLocalBounds();

  // Give it 10 pixels of padding on every side.
  rect.reduce(10, 10);

  // Remove a 20-pixel strip from the top of the area.
  auto cpuTopLine(rect.removeFromTop(20));
  auto deviceSelectorTopLine(rect.removeFromTop(40));

  // Set the label's bounds to that top strip (it starts at 10,10 because of the padding above).
  cpuUsageText.setBounds(cpuTopLine);
  audioSetupComp.setBounds(deviceSelectorTopLine);
}

// Timer function, called every 100ms (set by startTimer in the constructor).
void MainComponent::timerCallback()
{
  auto cpu = deviceManager.getCpuUsage() * 100;
  cpuUsageText.setText(juce::String(cpu, 6) + " %", juce::dontSendNotification);
}

// This callback is triggered when the audio device setup changes (device, sample rate, buffer size,
// etc). For now we log the new sample rate and buffer size.
void MainComponent::changeListenerCallback(juce::ChangeBroadcaster *)
{
  auto *device = deviceManager.getCurrentAudioDevice();
  if (device != nullptr)
  {
    auto sampleRate = device->getCurrentSampleRate();
    auto bufferSize = device->getCurrentBufferSizeSamples();
    juce::Logger::writeToLog("Sample Rate: " + juce::String(sampleRate) + ", Buffer Size: " + juce::String(bufferSize));
  }
}

// The three functions below are the true "audio" functions called by JUCE to do things to our
// audio. We setup a device selector in the constructor which will handle the input and output
// selection for our program. Now we can choose to take some input and pass it to the output.

// This is the start function. Whenever anything about our current audio setup changes (device
// selection, sample rate, buffer size, etc.) JUCE will call this function first. We can use it to
// setup any state we need to process audio e.g. a dedicated array for delay from previous buffers
// (called a "delay line"). In this case we are not going to setup anything.
void MainComponent::prepareToPlay(int bufferSize, double sampleRate)
{
  juce::Logger::writeToLog("prepareToPlay called");
}

// This is the main audio function. As we mentioned, this is the function that will be called
// repeatedly to process audio. It will be called with a buffer of audio data to process and then
// replace with the processed audio data.
void MainComponent::getNextAudioBlock(const juce::AudioSourceChannelInfo &bufferToFill)
{
  // Now we can play around a bit with our audio signal.
  auto *buffer = bufferToFill.buffer;

  // For each channel (e.g. stereo has 2 channels, left and right)
  auto numChannels = buffer->getNumChannels();
  for (int ch = 0; ch < numChannels; ++ch)
  {
    // get the samples in that channel
    auto *samples = buffer->getWritePointer(ch, bufferToFill.startSample);

    // loop through them and
    for (int i = 0; i < bufferToFill.numSamples; ++i)
    {
      // process each sample (example: apply a random gain between 0.5 and 1.0 to each sample for a simple distortion effect).
      samples[i] *= juce::Random::getSystemRandom().nextFloat() * 0.5f + 0.5f;
    }
  }
}

// The reverse of prepareToPlay, this function is called when the audio device is stopped or
// changed. We can use it to free up any resources we allocated in prepareToPlay.
void MainComponent::releaseResources()
{
  juce::Logger::writeToLog("releaseResources called");
}
```

And voila! We have our first distortion-esque effect (of course not the real sound we are after, as we metnioned in post one, real distortion is not random it's deterministic. This is a garbled, noisy imitation). Download [v2.0.0](https://github.com/nickschuster/juce_distortion_pedal/releases/tag/v2.0.0) and try this out for yourself. You can use any input and output device (try your mic).

**CAUTION**: I recommend headphones as you will run into feedback otherwise.

# Questions and Answers

### Why 48k, or any other number of samples per second?

The constraint comes from the Nyquist-Shannon sampling theorem: to reconstruct a wave accurately you need to sample at more than twice its highest frequency (why? it's a bit of a mathy subject, read about it [here](https://www.allaboutcircuits.com/technical-articles/nyquist-shannon-theorem-understanding-sampled-systems/)). Human hearing tops out somewhere around 20 kHz, so you need at least 40,000 samples per second to capture everything we can hear. The headroom above 40 kHz exists because of the filter. Before an ADC samples anything, it has to strip out frequencies above half the sample rate, otherwise they cause issues (more on that below). The filter is not a hard cut, it fades out the signals (to zero) up until the headroom amount. So you leave a gap between the highest frequency you want to keep (20 kHz) and the point where you need everything gone (24 kHz at a 48 kHz sample rate).

Why 44.1k and 48k specifically? 44.1 kHz is a historical artifact. Early digital audio was stored on video tape, and 44,100 happened to fit the line and frame structure of both NTSC and PAL (ancient analog video standards). 48 kHz came from professional video and film, where it divides evenly into common frame rates (e.g. 24). Neither is better and converting between them is highly annoying to this day because it isn't a clean ratio.

Higher rates like 96 kHz and 192 kHz give more room to work in. Distortion for example generates new frequencies on top of the original, some of them above the limit of what your sample rate can represent. Those frequencies get misinterpreted and come back as a different, lower frequency that was never in the original sound.

The common fix is to temporarily work at a higher rate: upsample 48k to 96k, apply the distortion there where there's room for the new frequencies, filter off the parts you don't want, then come back down to 48k. We'll be dealing with this in our next post.

### What about multithreading?

This is tricky and probably not intuitive for most people coming from a web background. Our audio callback runs on a dedicated thread with a hard deadline, 2.6 ms in our example. There can be no eventual finish or awaits for asynchronous operations.

In practice that means the audio callback is sacred space. No memory allocation, no logging, no I/O, certainly no network calls and no waiting for any other thread.

This is why `prepareToPlay` exists. Here we can do anything we need to ensure none of the forbidden operations appear in our hot path.

There is also a question of how the UI (and other threads) can interact with an ongoing audio signal. E.g. turning a knob in the UI to adjust the distortion effect. We must use atomics (special C++ concept which guarantees thread safety for simple variables) and built in JUCE wrappers for higher order communication. We'll go more in depth on these in future posts.

### Open Questions

- We hinted at "overhead" in our software. One of these is of course the processing introduced by our ADC. As mentioned right now I'm using a Rocksmith cable which is probably terrible. Next time we'll try to measure a bit just how terrible and what it means for our buffer size and function execution time limits.

- We also noted that our current effect is not real distortion. What does real distortion look like in math + code?
