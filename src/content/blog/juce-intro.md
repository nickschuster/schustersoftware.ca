---
title: "Webdev learns audio programming; JUCE Part 1"
date: 2026-08-20
description: "Project background and getting started with the Framework."
---

# Preamble

I recently picked up my guitar again after a long hiatus and have been greatly enjoying the screeching distortion of my Peavey Envoy 110 (tm) when cranking the gain and boost knobs. I had an itch to try and record some of the noodling I was doing but I am only armed with a Rocksmith USB cable. This presents a challenge and got my brain turning.

I haven't written a line of C++ code in quite some time and I want to build/re-build that skill. JS/TS, in a variety of framework flavours, have been driving my career. I have also been living in the web world for similarly long. With this project I want to approach a new territory of software, audio manipulation and lower level languages. We are going to start with JUCE which to an outsider seems to be the most popular framework for plugin development. I will be documenting my learning journey in hopes other web devs find this useful. While JUCE will be the primary driver, I will also cover C++ fundamentals for people who are familiar with software but not with C++. I will be attempting to post __at least__ every week or two to start, subscribe to get notified.

# Plan

Project number one - Distortion Pedal

A simple idea. Take a clean audio signal and garble it in a way that adds oomph to the sound (no idea how else to explain it). The goal is to replicate the effect I get when I plug my guitar into my amp and crank the gain. That actually makes me think, what is the relationship between distortion and gain? What actually is distortion? What is gain?

I'm going to do my best to approach this with learning as the goal so the writing will be pretty close to my actual train of thought. That being said, I will be compiling all questions I come up with (and hopefully the answers) at the end of every blog post for the stuff I get wrong. That should help build the context required for the audio concepts we will be exploring.

I have no background in audio and my knowledge of the field can be broken down as follows:

- sound is a wave, I believe some kind of low pressure/high pressure change in the air
- that wave can be represented by an electrical signal (no idea how that works)
- a speaker can translate that electrical signal back into "air waves", if you've ever seen a big speaker up close you'll understand what I'm getting at. The speaker moves at a certain speed and "pushes" air in a certain way.

What we are going to do is intercept the electrical wave and make some changes to it using software.

I believe there is also a distinction between a software representation of the wave and the physical electrical representation (analog vs digital?). We are focusing here purely on the digital.

Next post will be about getting started with JUCE and some C++ concepts.

# Questions & Answers
### What is an audio signal? What is the difference between digital and analog?
The simplest idea: it's a measure of change over time. Either pressure (in the air) or voltage (in a wire). A single frequency does not sound very interesting (ever heard a pure sine wave?). A real sound is hundreds or thousands of these frequencies combined into one. There are several characteristics we care about when talking about these.
- Amplitude: basically "loudness", expressed in dB
- Frequency: basically "pitch", measured in Hz
- Waveform: basically "timbre"
- Phase: harder to summarize, important for adding two signals together
- Envelope: "feel" of the sound, amplitude over time, made up of
  - Attack: time it takes to go from silence to peak loudness
  - Decay: how long it takes to fall from the peak to the "steady" sound level
  - Sustain: loudness of that "steady" level
  - Release: how long it takes to get back to silence

As we said, skipping over some complexity we don't need yet, analog is the sound as a direct voltage representation; and digital is the sound encoded into numbers a computer can understand (important distinction, technically this is also driven by voltage, but its about what the voltage represents: encoded numbers in bits, or a frequency). Specialized hardware can translate between the two (ADC for "in", DAC for "out").

### What is distortion and how does it work? What is gain?
Distortion is not "garbling". It is not random. It is a deterministic (predictable) change to the signal. The "oomph" quality is apparently a combination of dynamic compression (meaning, signal peaks are flattened and others are boosted) and increased sustain (a sound "lasts longer"). That change of the wave creates new "harmonics" in the sound. I don't really get it yet but we'll get into more once we are further along. Other factors as well depending on the type of distortion. 

Gain is basically multiplying the amplitude with a linear factor. The distortion effect created by this is kinda complicated it turns out. I have linked an article for <a href="https://electronics.howstuffworks.com/amplifier.htm">further reading</a>.

### How is sound recorded, transformed and played back?
The general concept is a transducer: something that converts energy from one form to another while keeping the shape of the variation intact. A microphone diaphragm gets pushed around by air pressure, and that movement changes a voltage measurement. A piece of hardware called an ADC can translate that into a software representation we can manipulate.

An ADC at a high level takes in the signal and spits out a stream of numbers that we can work with. Our software needs to read in a small chunk of this stream, make a change to it, and then send it to another piece of hardware called a DAC to translate it back into a signal a speaker can understand. Typically before it reaches the speaker it also needs to go through an amplifier to boost the relevant voltage.

### Open questions for next time:
- The software needs to read in a chunk at a time, which means buffers, which means **latency**. Smaller buffer = smaller latency, but smaller buffer also = more CPU pressure. This probably requires some tuning.
- Where does JUCE sit in this chain, and how much of the ADC/DAC side does it handle for me?
- My interface is a Rocksmith USB cable based on what we just learned, the cable has to have a built in ADC. It probably sucks...

