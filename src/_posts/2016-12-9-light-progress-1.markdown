---
layout: post
title: "An Electronic Earthwork"
date: 2016-12-9
categories:
  - Work-in-Progress
description: 
image: http://localhost:4000/assets/img/beacon-3-hero-large.jpg
image-sm: http://localhost:4000/assets/img/beacon-3-hero-small.jpg
excerpt: "How might we make interactive land art? This project is one answer to this question, and I am open-sourcing the process."

---

How might we make interactive land art? This project is one answer for this question, and I am open-sourcing it. This work will take a number of months to execute and I’ll be sharing updates at major milestones, with in-progress information about hardware, software, materials, process, and theory.

While I was in college in Seattle I made an interactive project using a big handheld spotlight, a pair of walkie-talkies, and an arduino. Seattle is very hilly, and on one hill I put the spotlight. Then from another hill one mile away, you could control the spotlight with your voice. At that distance, the light looked like any other streetlight – a tiny spec. But it only turned on when you were speaking into the walkie-talkie. I made a short film about setting the project up and using it, the light flashing on and off with every syllable you spoke.

I want to make another version of this project in Seattle again, but at a very large scale. Seattle is surrounded by mountains – to the east are the Cascades, and to the west are the Olympics. They’re a defining feature of the landscape – they’re the horizon, the walls of the wilderness that contains the city. I want to put a light out in these mountains, 35 miles away, that anyone can control in the city by visiting a url on their phone and speaking into it.



<div class="video-container"><iframe src="https://player.vimeo.com/video/24302805?title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>



<br>

## Background
------

<br>
Some thoughts about what the piece means to me:


* It may turn out to be an extreme digital interaction that will be worthwhile in itself. Someone using this will probably never have experienced anything like it before. Seeing a light turn on when you speak at the distance of 1 mile, or even 100 yards, is uncanny. At 35 miles it may be really strange and awe-inspiring.
* In one sense, activating the light is conceptually similar with posting something on the internet. You hit a button on your phone with your fingers, and thousands of miles away a server does some unknown task, and then pixels on someone else’s phone sends light into their eyeballs. I’m interested in playing with bringing this action-at-a-distance to the largest scale that one person can immediately experience.
* What is a city? What are the limits of a city? All these lights and other utilities that surround us and are interactive to varying degrees, what do they say to us? Are they benevolent?
* I take a lot of inspiration from the Light and Space movement, especially Robert Irwin.
    * The idea of site-specific art: a piece that leverages the features of its environment. It can only exist in that place it was designed for – if you move it, it’s changed. The context is part of the work.
    * The tactic of stripping a work down further and further because that’s one way to make art that can get at fundamental principles of experience. This piece is really just one pixel, far away.
    * A fascination with the perception of space. I’m interested in how drawing attention to this tiny light as far as the eye can see will protract or flatten someone’s sense of distance and their larger environment.



<br>

## The Tech
------

[image]

What follows is an audit over all the bases I have to cover to execute this project. 


### 1. The Light

A light visible at 35 miles needs to be extremely bright, so only a radio tower beacon will do. This will be powered by a solar generator consisting of a solar panel, a battery, and a BMS (Battery Management System) that handles the charging and output. There are newer LED beacons that use less power. Radio tower obstruction lights are normally omnidirectional (the unidirectional ones are typically strobes, which won’t work for this), but I actually want focused light. Additionally, the light may not still be bright enough to be as visible as I want at 35 miles. I may need a parabolic reflector and/or a fresnel lens, and it may have to be custom designed and fabricated.

### 2. The Brains

The light will be turned on and off using a solid state relay controlled by a cellular-radio enabled IOT board. I’ve selected the [Particle Electron]( https://store.particle.io/collections/electron) because it’s more plug and play than using other things e.g. the Raspberry Pi for this application. It’ll provide some resiliency, for example if it crashes or if the power dies temporarily, afterwards it’ll come on and connect to the internet and the server again automatically. This would take work to configure with a R-pi. It’s also probably lower power. It has a pretty active community and core libraries for a TCP client, which I will use.

### 3. The Signal

Cell data. Woah boy, it’s weird. There are a lot of things we take for granted when we’re on wifi that we can’t with cellular data. You can see the cracks. 

Particle actually offers cellular data as a service with an API, but I’ll be using too much data at the rate I’m sending to be able to take advantage of it.

Some napkin math about how much data I’ll need:
I’ll need send a number describing the loudness of someone’s voice from the client to the server at around 25 times per second to achieve a time-resolution similar to video. Maybe as little as 10 times per second will be acceptable, but I won’t know until I prototype. I think my transmission unit might be around 128 bytes, but not sure on that either.

128 bytes x 25/sec x 60 sec x 60 min x 16 hours max = 184 megabytes per day, maybe 5-6 gb per month maximum.

There are two major cellular radio systems: CDMA and GSM. The Particle Electron only works with GSM providers. I’m in the USA, Verizon and Sprint are out because they’re CDMA, and AT&T and T-Mobile are the major GSM options. Rates for IoT device tiers from these carriers can be hard to understand and not that great of a deal I’ve found. At this point I’m going with a different carrier called [Ting]( https://ting.com/), which is made for IoT, and is a little more pay-as-you-go which is especially great for development.

A couple of other hurdles with cellular: latency and estimating signal strength. Latency will be explored in a hardware prototype soon. For signal strength, there’s a handy tool called [OpenSignal](https://opensignal.com/) that crowd sources signal strength readings across the map, and the cell providers have maps of their own you can download too. I’ll get a big cell antenna to boost the signal, as a just-in-case measure.

### 4. The Front End

Anyone in the Seattle are should be able to go to a url on a smartphone and begin controlling the light with their voice. The best way to send this type of streaming data is with websockets. I won’t send audio itself, because it’s bad for privacy and I don’t really need that high of resolution anyway. I’ll be essentially doing a lowpass filter in the browser, and sending a number representing the volume at a rate of 10 to 25 times per second, most likely. I’d like to keep the interface very minimal.

### 5. The Back End

This is going to be a real-time app that revolves around streaming data from many clients simultaneously. There are several websocket libraries that have better performance than socket.io, but actually for the number of users that will be using the app at once (maybe 100 max?) performance is not that important, and socket.io seems like the best choice for ease of development.

There will need to be some logic for mixing all incoming signals. I’ll write more on this later, but for now think of it as summing all incoming signals up to a certain limit, with some additional dynamic behavior when there are more than 5-10 simultaneous users. Then, the backend will pass the final output down to the Particle board via TCP.

At least in the beginning I’ll need to set up a system for logging and a dashboard to see the data and perform some administration actions. There are 3 reasons for this: for prototyping and iterative design in early stages; for documentation of how people used it after the project is over; and maybe even for managing bad actors while the piece is in play.

<br>

## Land Use, Logistics, Design
------

<br>
There are some non-technical challenges to executing this piece too.

Selecting a site. Since I don’t live in Seattle anymore, I’ve used google maps to stake out a lot of the land surrounding the city. When I was visiting in October, I went on a hike in one potential location, and confirmed that it's possible to see radio tower lights from more than 35 miles away.

I also need permission. To the east, the land covering the nearby Cascades is managed by a corporation. To the west, it’s managed by the National Forest Service. Using NFS land is highly regulated and there’s a protracted process to gain access, so it would be much easier to just send the corporation a letter. Anyway, NFS actually requires that you pursue non-public options for your use first. To ask for permission, I might think about some creative options like a video pitch or even something more out there. The work of [Christo and Jeanne-Claude](http://christojeanneclaude.net/) art required a lot of securing agreements with public agencies and private property owners, and the process of getting permission even became part of the work. It’s a different story when you are an early career unknown artist, though.

Either way, I may be required to get a Professional Engineer to look over my light’s specs and make sure it’s not a fire hazard. Even if it’s not legally required, I might do it anyway because it will make me and probably my hosts feel better. PE’s are often engaged for public art projects. I need to find one though, and I’m not sure the best way to go about that. Been following some word of mouth leads with other artists.

Also, I need to check that this light will be legal by FAA standards. It’s hard to understand if it is just by reading their regulations, because my use-case is so atypical – flashing white medium intensity at night. Usually it’s flashing red at night, or flashing white high intensity during the day. This may be allowed by I may have to make accommodations, for example I may have to put on the top of a ridge instead of on the side, or even put it on a radio tower, or even change the color to red.

Setup is going to require flying from NYC to Seattle, probably doing some fabrication there, and then getting a team of people to help install. I may have to secure some space to do staging/testing. I’ll have to rent a truck and maybe get permits to access land. Then, I’ll also want to take footage of setting the project up to use in documentation/ video version of the work, and take footage of people using it while I’m there. So I’ll need to rent video equipment and do some storyboarding to plan what my final project ideal would be.

Publicity. I’m inspired by the [All Rise]( http://www.allriseseattle.org/robertmontgomery/) project and the confusion it caused. People didn’t really know what to make of it at first, and there was some question about who was behind it, what their motives are, or even was it art. I also would like this piece to slowly catch on. The social dimension of this piece is really important to me. I may flyer in places that have line of sight to break out of my social bubble without using press that I myself commission. Flyers will have to be designed carefully because of the type of messaging/framing they give the piece. 

The front end design will have to be carefully considered too. It’ll be really minimal, and dark so it doesn’t ruin people’s night vision.

And there’s another problem that’s a crossover between tech and non-tech. Mitigating abuse. There might be bad actors, it’ll be possible to troll the game and make it unusable for other people. I’ll need to set up some quick and dirty defenses against people gaming it, as well as using it from other locations outside of Seattle, but I don’t think I’ll ever be able to totally protect it. Also what I have in mind will be really time intensive – like might take just as much time as writing the rest of the app, so I may have to work on it once the thing is already launched, hoping it won’t go viral and attract “hackers” right away.



Alright, that was a long summary. In upcoming posts I’ll examine some of the individual components more in-depth!

