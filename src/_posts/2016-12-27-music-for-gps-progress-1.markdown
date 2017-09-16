---
layout: post
title: "Music for GPS"
date: 2017-01-04
categories:
  - Work-in-Progress
description: 
image: "http://josh-peterson.com/assets/img/music-for-gps-hero-large.jpg"
image-sm: "http://josh-peterson.com/assets/img/music-for-gps-hero-small.jpg"
excerpt: "Location-based generative music promises a different kind of augmented reality."
mast-back: "#e50200"
mast-date: "#e50200"
mast-title: "#e50200"
mast-categories: "#e50200"
body-color: "#1c1e13"

---

  

<img style="max-width: 400px; margin: 0 auto" src="/assets/img/music-for-gps-joanne-screenshot.png" alt="Joanne McNeil Tweet">

<!-- 
<p class="normal-size">I’m working on a site. The URL is http://consumemusic.online. When you go to it, you’ll read something like this:</p> -->


In college I made a lot of work about place. I was fascinated by how our surroundings seep into our identities. The city is a costume, one that we all share. And you perform a different role in the city than in in the woods.

I wanted to make people look at their environments with a similar perspective to the one I had, noticing how they make you feel and the narrative they broadcast. It was a very John Cage perspective, actually, in that involved looking at the world in a raw sort of way...observing its aesthetic qualities the way you would if they were a work of art. There's also a sense of wonder that I thought was important.

Today, I'm not sure that trying to engender this perspective is a good end for art to strive for in and of itself. Maybe it will happen along the way, but I think art should be about creating experiences, and the focus should be on the experience you're leading someone through. I am, however, still interested in some of the tactics - discovering features in the physical world that can become compositional hooks for works that then use them as scaffolding.

<br>

## I'm doing some experiments in location-based generative music.
<br>

Location-based generative music has the potential to be a something really different. There’s a bit of a gap between what I’m envisioning and where we are at, but someone someday is going to make a piece of location-based generative music that's profound. I want to set the scene for that.

*Location-based:* meaning as you walk around, you hear what the artist wanted you to hear in that place. Utilizes the GPS on your smartphone.

*Generative:* Not every note is laid down by hand by the artist, rather a set of rules is made for a given area. Music is then digitally synthesized on the spot (pun intended).

What if you composed music for each city block within a neighborhood? A listener would be able to traverse the neighborhood how they wished, and to experience the piece they'd have to explore the relationship between the actual place and the music. Your environment becomes an instrument, walking becomes a performance, and a piece becomes something discovered.

Imagine you’re walking down a busy city block. In your ears, you hear a steady cacophony in counterpoint to the sounds of the cars and people passing at random. You turn off onto a quiet side street, and the music follows suit. It’s a quiet gentle thing, but there’s a small hint at some anticipation. It builds. You turn the corner again, and are struck with a view of the water. You don’t just see it, you hear it.


<br>

## Not just location, but user movement
<br>

It’s not just location though, it’s also your current activity - walking, standing still, running, riding in a car. Smartphones have accelerometer and gyroscope sensors, and iOS + Android also have higher-level API’s you can query and it will tell you what the current activity is. These are informed by black box algorithms that probably use machine learning and a bunch of other slick tricks that take a lot of the work out of working with raw sensor data.

If we know whether someone is standing still or walking, or even how fast they’re walking, we can use this information to let people perform music, too. Like say someone is standing still, and the music is in interlude. They start walking, slowly, and the music begins to crawl back up. When they get up to a brisk walk we’re really cooking again.

Another example: you’re sitting on the subway. The train slows to a stop, and the music subdues. The train starts, the music picks back up again. Next stop - the ding of the doors echoes in reverb added to your ears. When you stand, and get off the train, the piece moves to a new section. You walk up the stairs and the sonic space opens up from your cramped subterranean thing as you reach the surface.

With this I’m shooting for an uncanny digitally-mediated interaction, similar to [another project of mine](https://josh-peterson.com/blog/light-progress-1/). I guess I like projects where I identify an idea for an interaction where A) I’ve never experienced something quite like it and B) I bet that actually doing it feels different than I imagine. There you have something worth *doing*, not just thinking about.

With Music for GPS, might might be like you’re *playing* music by walking around. I’m a musician, and there’s something amazing about how playing an instrument lets you, as you start to feel an emotion tied to the music, take an action with your body that heightens that feeling. Then on the other hand, there’s something amazing about exploring the visual world by walking through it. I just think it might be worthwhile to combine the two. When playing music, you’re moving in order to hear. When walking, you’re moving in order to see. But what if you were walking to hear as well as see? Would that be exciting? Would that be new?

[There are examples of art forms where the dancers actually control the musicians (see [Bomba](https://en.wikipedia.org/wiki/Bomba_(Puerto_Rico))). But does it scale? 😜 Actually...is it private? That users will be able to do this on their own allows for  a different relationship with it.]

Places have aesthetic qualities that can be really evocative, just like music. Let’s put the two together. We see this in film - with music complimenting characters’ actions and/or the setting. This is rooted in other performance media, which is why I have the opera orchestra pit as the image up top. In one respect, this project is like making a film soundtrack for real life, in real time. But also, it’s kind of like a video game in that you get to move through space exploring virtual objects, which in this case is music. It’s similar to both film and video games, but different. It’s augmented reality, but not graphical. Audio will perhaps be a major component of a wave of AR games that will surely come.

<br>

## A small prototype demo
<br>

Over the summer I made a browser-based prototype. When you open the page, your precise location is recorded. Then, as you walk, your distance from that initial spot is fed into a synth, controlling a number of parameters.

You can try the demo yourself (requires being on a phone, probably outdoors), or watch the video below.

<h3><a href="https://josh-peterson.com/musicforgps/distance" target="_blank">Demo page</a></h3>

<div class="video-container"><iframe src="https://player.vimeo.com/video/174049474?title=0&byline=0&portrait=0&color=e50200" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>

<br>

<br>

## Digital sound synthesis
<br>

I need to call out one thing - the sounds you hear for this work will be synthesized. I'm not just triggering audio clips based on inhabiting a location. The latter has been done before, and it hasn’t really taken off, and there’s a good reason.

That this will use synthesis is actually one of the key differences from prior art that will make this great. It’s about molding the music to user actions in a way that is seamless, dynamic, and ultimately more immersive. The biggest reason may be more control over timing - for example, having a phrase finish right as you reach the end of a block. The speed of your gait could set the tempo. Or, the closer you are to an object, the timbre or the way a sound is articulated could change (this is not possible with just triggering static clips).

<br>

## Platform-building as instrument design
<br>

What I want to make is not just one piece of music, but a platform that many composers can use to make location-based music. Most of the the technology needed to make something really amazing already exists, but someone needs to trailblaze and assemble the pieces. There will be some holes to fill, but we won’t know what those are until someone tries. Ultimately, though, I see this as similar to creating a new instrument - there are thousands of different musical and artistic statements that could come from giving composers a set of hooks into location.

Some examples of hooks, the API of location:
<br>GPS coordinates
<br>"Human-readable location" AKA are you on the sidewalk? In a park?
<br>City Data
<br>Movement
<br>Behavior (e.g. this person just walked down this block, but then when they turn around and retrace their steps)
<br>Weather conditions
<br>Time (of day, of the week, of the year)

<br>1. What are the qualities of a location that are useful to composers?
<br>2. Can I abstract them and make so musicians can write for them?
<br>3. Are there certain types of musical gestures or synthesis techniques that lend themselves to being controlled with this data?

Furthermore, can we make this so that music doesn’t have to be composed for each location individually, but using location data, we render out music for large areas? Or for the whole world? This takes exploration to an extreme.

<br>

## First steps:
<br>

This section is about implementation details for the first stage of this project.

A series of prototypes in:
<br>Synthesized music,
<br>Using gps & movement sensor data,
<br>On iOS,
<br>Using audiokit.

The first stage in this project is going to be a series of formative experiments / prototypes / proof of concepts into different ways to link music to location and device activity. It’s going to be a native iOS app using the AudioKit framework.

*Why prototype first:* Because if the eventual goal is a great work of new media art (compelling music with novel interaction paradigm scaled to a large audience), this is the first step. Discover what can be done. Get others excited about it. I’m more interested in the mechanics than the musical statement right now (there can be many musical statements made with this “instrument”), so prototypes will be about probing different interaction scenarios and laying down the foundational tech to move into more music-focused exploration.

*Why iOS:*
Maybe it’d be better to explain why *not* web-based instead of native, and why not Android (or cross platform). I made an initial experiment (link) in the browser and explored several js music synthesis libraries. The libraries just don’t have the features you want to be able to make good instruments / music right off the bat. FM can only get you so far. Give me granular, give me other techniques. Give me utilities for organizing compositions. Also, the web audio API, unlike webGL for example, still has a long way to go and doen’t feel stable yet. I talked to experienced people who said differences between browsers were painful and damning - things would just sound different. Real time audio benefits from having high performance and so the web may just not be a great platform (although stay tuned for Web assembly in a few years).

Why not Android? iOS is a better platform for audio, and despite Android’s growing user base, iOS still probably holds the majority for my early adopter art/tech audience. Why not cross platform? I looked into some cross platform frameworks, and although libpd seemed somewhat feasible, it still sounded tricky. I’d love to do cross platform - iphone only is frankly a little elitist and I wish in general art apps could be cross platform when possible. But if my goal is to proof of concept for now, maybe it’d be better to choose the platform I can go the fastest and the farthest with, rather than trying to straddle two platforms out of the gate. It seems like it’d be better to come back later and port the best parts to Android, if there ends up being a need.

*Why Audiokit:*
Out of all the libraries I looked at, it had the most features for making *music*. Juce looked very legit, but more focused on DSP. I just want to be able to do some experiments without spending a ton of time doing really foundational things right now. I have a feeling some of the tooling will need to be improved for my specific use-case, but Audiokit looks rigorous and people seem to like it.

<br>

## Intersections
<br>

This work will intersect with a few other disciplines. It will benefit from advances in, but also could itself advance efforts in these areas:
<br>- Computer music tech / tooling, esp on mobile.
<br>- Geospatial data libraries and tools
<br>- Procedural art  - see the No Man’s Sky debacle. There are a lot of open questions. Challenges include making it regularly interesting and good, cause it's often boring or bad.
<br>- Artificial Intelligence / Machine Learning / Creative AI with regards to music creation. See Google’s Project Magenta. Basically, advances in this will make it easier to make music "in the vein of x". Meaning less rules you have to write from scratch.
<br>- Augmented Reality hardware / games / tooling

<br>

## Problems:
<br>

Composing music within a location based workflow needs to be ironed out. For example, I want to be able to draw polygons on a map and be able to access those in an environement adjacent to my coding IDE so I can iterate quickly.

What if I don’t always want to draw everything by hand? People have done [amazing work recently that may be helpful](https://peteris.rocks/blog/openstreetmap-city-blocks-as-geojson-polygons/), but I need to first try and figure out what I want, and then make it.

Geo data / city may be a fruitful source material to allow for procedurally generating music that has a relationship to a given place. But how?

Most musicians, even those working with computer music, constrain themselves to traditional rhythm and harmony. That's a mistake that would be like if jimi hendrix got a hold of an electric guitar and decided to only play classical guitar songs with no distortion. There's a lot of musical potential and new sounds that computers allow for. This app will not make that mistake. On the other hand, I’ve experienced an academic hierarchy that says that only if you abandon melody/harmony can you make real art. It’s hostile to audiences, amounts to an erasure of culture and is bad bad bad. Toxic. I think a hybrid approach is best. Noise music, sound art, whatever you want to call it - it’s going to incorporate some of that. It’s going to have melody sometimes too. It’s going to be music. But you won’t be able to dance or hum to all of it :)

GPS kinda sucks. First - goes without saying maybe that it’s only really an outdoors thing. Even outdoors, I’ll have to account for bad data, sudden huge jumps / corrections. Basically clean the data up a lot, and I  fully expect it to be limiting compositionally. Tall buildings like those in Manhattan make getting a signal hard at times, too.

Computer music is haaarrrd. Need to know your tools really really well, takes a long time + big learning curve. Not sure if Audiokit has all the features I’ll want to really make great music, might need to contribute / port things over from SuperCollider or other languages. Not sure if making cross platform mobile language is ultimately feasible, because I don't know how much you can abstract away.

Opportunity: Apple headphones will get sensors that tell you orientation, theoretically/eventually. Holy shit. You'll be able to place sound in space, and when you turn your head, the sound will stay there. Then you’ll have true augmented audio reality. What do we call this? Audi-R? Augio? AAR? I’m just excited to have sound sources that people can walk past, and it’ll be perceived as if the audio was eminating from that actual spot.

<br>
**Header image credit: Flickr user [ydylg](https://flic.kr/p/b6QGHB) under [Creative Commons license](https://creativecommons.org/licenses/by-nc-nd/2.0/
).**
<br>

---


<br>

## Let’s go exploring.


<br>


