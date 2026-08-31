---
title: "C++, JUCE and setup fundamentals; JUCE Part 2"
date: 2026-08-29
description: "Skipping the Projucer: setting up a JUCE project with CMake and Ninja on Windows"
---

# Preamble

C++ is widely considered to be a "hard" language. There are many reasons for this. The most common reason I've heard is that it's hard because it's more "low level". What does that actually mean?

Everything in software is about abstractions. Anytime you do anything in a modern language, you are working through decades of layers of simplifications, interfaces, APIs etc. which make it possible to write statements like `print("Hello World!")` and not care about:

- The memory allocation of your string
- The current standard output location
- Largely, the version of the language you are using
- The OS that's running your software
- The hardware that's running your OS

C and C++ remove some of these abstractions so that you again do have to care about these things. Today we are dealing with something related to this. How to actually work on, build, and then run a C++ project.

# Project Init

JUCE ships with a project management tool called the Projucer. In theory this tool makes it easier to spin up projects, decide which JUCE components to include in your project, the build targets, and the target IDE you want to work in. Unfortunately the README is quite limited and the UI is a bit dated. The Projucer also only comes with Visual Studio as an IDE option for windows. Typically this is not my favorite tool (a bit bloated, slow, not enjoyable dev experience; recognizing that it has incredible tooling for power users) but a sacrifice I was willing to make. However, immediately upon launching a blank project I am bombarded with reference errors for my JUCE package. All paths look correct, all code is template code. Some hours later I decided this was not the path for me...

Instead, we are going to embrace the spirit of C++ and remove abstractions. CMake and a direct JUCE submodule got me going in less than 10 minutes (courtesy of this project: <a href="https://forum.juce.com/t/jumake-setup-juce-projects-with-cmake/62306">JuMake</a>). Some template code, a couple tooling installs, and we have launched a stand alone JUCE application that accepts user input! After some more research, it turns out this is the industry standard. Go figure.

The basic path is as follows:

- Download <a href="https://cmake.org/download/">CMake</a>, our build system generator
- Download a build executor, we are using <a href="https://github.com/ninja-build/ninja">Ninja</a>
- Download the C++ tooling: Visual Studio Setup > Desktop development with C++
- Create a new folder and git repo, find the release for this blog post <a href="https://github.com/nickschuster/juce_distortion_pedal/releases/tag/v1.0.0">here</a>
- Create a `CMakeLists.txt`, a source directory, and your templated C++ files (in our case: main.cpp, main_component.cpp, main_component.h)
- Add JUCE as a Git submodule
- Compile, build and run your project!
  - With CMake and Ninja this looks like:
    - In a "Developer PowerShell for VS" run `cmake -B build -G Ninja -DCMAKE_BUILD_TYPE=Debug && cmake --build build`
      - Note that "debug" builds are slow, for audio testing, it appears release builds are recommended
    - Navigate to your build folder and run the executable

Now, for an IDE we can use whatever we want. Ideally we want support for C++ syntax highlighting and some creature comforts like reference checking and debug utilities. This can be easily achieved in Visual Studio Code using the official C++ extension.

Currently our app does not do much. We are using JUCE to render a window (a standalone GUI), a button and some text. In the next post we will go over some of the JUCE code and how to actually input and output audio with our application.

I will be publishing a new version of the repo for each blog post. Check out the template at v1.0.0 <a href="https://github.com/nickschuster/juce_distortion_pedal/releases/tag/v1.0.0">here!</a>

# Questions & Answers

The questions from last time remain open. In our next post we will dive deeper into some of the JUCE and ADC internals. For now I have included some background material on the C++ build process.

### What is CMake? What is Ninja?

CMake is the replacement and aggregator for "project build management". An analogy might be a build bundler, like "webpack" in a JS/TS project. Typically it does not do the actual install of packages but it does deal with your project config (name, author, description etc.), where to find the src files and submodules, what is the underlying compiler that will be used, and more. Before CMake there were various different options for this depending on your source system. The Projucer for windows, for example, creates a .vcxproj file.

Ninja is the actual project "runner". CMake spits out a consumable configuration state that Ninja can read and then execute the project against. This includes things like change detection management. Note that Ninja is not an industry standard, just a modern and popular tool. The industry standard for this is called "make".

We are skipping over the most important step, compilation. Taking a C++ file and turning it into machine readable code is a complex operation and out of scope for now. That being said, the real build path looks something like the following:

- CMake - create build files

- Ninja - read build files, run the identified compiler against the decided execution state

- Then the C++ job, further reading <a href="https://mayowaobisesan.medium.com/how-the-c-compiler-works-d671350c97ef">here</a>

  - Preprocessor - we'll get into it a bit later

  - Compiler (MSVC in our case) - turn the .cpp files into machine readable files

  - Linker - produce the executable

### Why the sub module? What is the NPM of the C++ world?

Why indeed. Managing project dependencies is a well known problem to web devs. Myriad tools have been created with the goal of solving it, there is no true consensus on who does it best but NPM and YARN have come ahead as the leading industry standards for everything JS/TS. 

For now we are ok with only JUCE as a dependency and I can therefore justify the manual install method and manual version management required by including it as a submodule. However, it is likely that sometime soon we will need some more dependencies. What will we do then? Interestingly, there is no official C++ package manager (as defined by the C++ committee) instead there are a couple tools that have gained popular adoption. The two most popular are "Conan" and "vcpkg". We will explore their use in later chapters.