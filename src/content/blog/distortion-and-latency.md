---
title: "Equipment latency and real distortion; JUCE Part 4"
date: 2026-10-24
description: "Measuring the latency impact of bad equipment and discussing the math, pre and post processing of real distortion effects."
inProgress: true
---

- anti aliasing 

- up sampling and down sampling

- harmonics

- distrotion in math

- math of waves

- latency introduced by rocksmith cable and other steps in the process

- some fund visuals in our stand alone app

- plugging in the guitar and hearing a result (include audio in blog post)

# Preamble

- how an adc works and what causes latency before hitting our function

- explaining aliasing and anti aliasing

- usb drivers

- adc computational steps

# Latency Measurements

- quick experiment to see the total lag between rocksmith cable input and speaker output without any function processing

- some timers in JUCE (e.g. average function call time displayed in the UI + measured constant)

# Distortion

- math behind it

- harmonics 

- why up sampling and how the frequencies work

- final result in code

- next time we'll focus on some UI stuff and turning into a useable plugin

# Questions and Answers

### What makes our distrotion plugin different from anyone elses?

All the other elements that go into plugin in design and distrotion design specifically


