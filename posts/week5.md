## Table of Contents:
<div style="text-align: center;">
<div style="display: inline-block; text-align: left;">

[Week 5: In sickness and in Blogging](#sick--too-much-time-blogging)

[Week 5: Design Decisions](#thinking-ahead-more-design-decisions)

[Week 6: Re-Learning What Was Learned](#re-learning-what-was-learned)

[Week 6: Database design](#adding-to-the-database-and-a-realization-)

[Current Demo](#how-it-looks)

[Next steps](#whats-for-next-week)

[Final thoughts](#final-thoughts)

</div>
</div>

# Week 5

## In Sickness and in Blogging

A lot of the time I could have spent in week 5 was put towards setting up the blog. My entire weekend, plus Monday, was spent writing.  When I was finally ready to start coding again, the universe promptly knocked me down for an entire week by some weird flu I picked up somewhere. Therefore, I lost the entirety of week 5 and the weekend to miscellaneous stuff.

However, I learned a valuable lesson: next time I want to do a project like this with a blog, I should start the blog first, so there is less writing and setup overhead. Either way, I am very happy with how this turned out in the end, and from now on, all I need to do is write a Markdown file, proofread, and publish to GitHub. Additionally, if I want to do something like this in the future but with a different theme, I can reuse the code and simply change the CSS files. 

## Thinking Ahead: More Design Decisions

During my week five sickness, though I couldn't code, I had some time to think about the design decisions that had been haunting the main page.

As stated, the main goal of this application was to serve a robust, clean, and easy-to-understand UI and UX to a Warhammer user. So, while I am developing the MVP, knowing some features will be omitted, I still code it in a way that allows breathing room and easy refactoring to avoid headaches later. That being said, it is hard to fit so much on a tiny screen.

Recalling one of the wireframe images from <a href="post.html?slug=week-1-kickoff" class="post-nav-link" target="_blank" rel="noopener noreferrer">week 1&2</a>, you can see there was a prototype idea thrown in of a bottom nav bar, but it wasn't present on the other page:
<div class="figure-grid figure-grid-2">
  <figure>
    <img
      src="assets/images/wireframe/shared-phase-view.webp"
      alt=" Favorites page"
    />
    <figcaption>Phase View - Bottom nav Bar</figcaption>
  </figure>

  <figure>
    <img
      src="assets/images/wireframe/shared-game-page.webp"
      alt="Homepage wireframe"
    />
    <figcaption>Unit View - No bottom nav bar</figcaption>
  </figure>

</div>

Initially, I didn't know what to do with the bottom nav bar, so I scrapped the idea and moved forward on week 6 with the basic layout. However, while referencing the Figma document, I realized I had forgotten to wireframe where the "round" and "unit specific" counters would be. Not to mention, there is no room on the current layout for those counters, so the idea came back.

Now, a new problem arose: I had already settled on the no-bottom-nav-bar idea and gotten used to its layout. So I still had to figure out a way to plan ahead and leave room for the counters.

Both solutions to the problem have their pros and cons. The simplest solution is to have the bottom navigation bar, with one button leading to "data" and the other leading to "game specifics". However, this could end up cramping the screen's space further down the line and would need to be tested. The other solution is to have a hamburger menu icon on the side that opens and contains any data that doesn't need to be shown immediately. However, having menus upon menus doesn't fit the theme of "everything at a glance".

Finally, the issue with both of these solutions is that they feel very static. Imagining myself playing the game and having to tap doesn't feel as modern as it should, and it starts to resemble the tabbed view already present in the official Warhammer app, which defeats my purpose.

Then, in my research for an alternative, I came across the "bottom drawer" widget. It is something I can easily add later, is both unobtrusive and flexible, and still allows data that doesn't always need to be there to be in a place with easy access and feels nice to get to.

Here is a look at one of the videos I found that explains this concept nicely. Though it is over 6 years old, the concepts I found still apply to modern Flutter today. Including the "gesture" class he created, which I might implement as a polish feature in other sections of my code application (such as swiping left or right to easily switch between unit/phase views).
[video:https://www.youtube.com/watch?v=BgxkKlYzep8 caption:"Bottom Drawer video reference"]


Although the MVP build for June 16th won't include the bottom drawer widget, I'm glad I found a solution to my design problem. I'm planning this feature for the post-MVP build, but I think it's important to work through these details early on, and part of this blog is sharing my thinking process.

## Week 6

## Re-Learning What Was Learned

Part of learning is enforcing and applying what you have already learned. With me being out of commission for an entire week, this lesson was relearned all too well as I hopped back into my code. A lot of what I had learned during weeks 1 through 4 felt rusty and hard to recall. I was very thankful for the separate notes and the rigorous commenting I added to my code. It took me some time to get re-oriented in my post-sickly stupor, but after a time, I got back into the groove.

## So what was done?

All that being said, I was able to accomplish some of the first part of the game page with very little resistance from the code. As you will see in the demo, I was able to fully wireframe out the basic layout and connect up the database to the page. 

### Adding to the Database and A Realization :
While hooking up the database, I ended up creating some drift-specific functions. These were placed in the ``tables.drift`` file and allow me to create something akin to a "view" in basic SQL code, but they function more like methods and end up creating methods and classes that Drift uses to query the database.

Initially, these were functioning as basic SQL queries, but the more I worked with them, the more I realized it would be extremely inefficient to constantly query the database, since it could eventually lead to lagging from constant unit-to-phase view switching. 

Looking into more of how the queries worked, I came up with the idea to make an aggregate <a href="https://en.wikipedia.org/wiki/Class_(programming)" target="_blank" rel="noopener noreferrer">class</a> that is "created" by the user. Basically, once the user has finalized their selections and lands on the main page, a few steps happen:
  1. A new empty class called ActiveSpearhead is created locally
  2. The database is queried once with the user's selections
  3. The data returned from the database is placed into the ActiveSpearhead class

 From there, the code calls the local instance of ActiveSpearhead to populate the screen, avoiding multiple database queries that would be slower in the long run. This way, I can also create methods in ActiveSpearhead for specific data calculations if needed.

Naturally, this led me to realize that with this class framework, I would no longer need a secondary SQLite database containing user data. Instead, I can make the "Favorite configuration" button grab the created class and adds it to a list of ActiveSpearhead classes. Then, the favorites page populates entries from the existing list. The same can also be said for the "Recent configurations" feature: simple, clean, and no extra hookups needed. 

## Testing reveals a design issue:
 While navigating the page,, I found myself wanting to tap each listed unit to display the full contents for that unit. Meaning, this was an overlooked design feature that I will have to implement for the MVP. So, I ended up changing the internals of which widget the list was populated with so that the "on-tap" feature.  Right now, the cards themselves aren't tappable yet, but I plan on implementing the "on-Tap" next week, along with the carousel.


## How it looks:

<div style="text-align: center;">
<div style="display: inline-block; text-align: left;">

Here are this week's video walkthroughs of the project! 

</div>
</div>

<div style="display: flex; gap: 16px; align-items: flex-start;">
<div style="flex: 1;">
<p style="font-family: monospace; font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; color: #ccbfa6; margin-bottom: 8px;">▶ What was done on Monday of that week and what the UI prototype looked like before finalization </p>
<div style="position: relative; padding-top: 177.78%; border: 1px solid #2a2a2e;">
<iframe style="position: absolute; inset: 0; width: 100%; height: 100%; border: none;" src="https://www.youtube.com/embed/jToV3B8-qFg" allowfullscreen></iframe>
</div>
</div>
<div style="flex: 1;">
<p style="font-family: monospace; font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; color: #ccbfa6; margin-bottom: 8px;">▶ Covers the final quick look at the end of the week, with some subtle changes shown in UI and animations</p>
<div style="position: relative; padding-top: 177.78%; border: 1px solid #2a2a2e;">
<iframe style="position: absolute; inset: 0; width: 100%; height: 100%; border: none;" src="https://www.youtube.com/embed/Pz8J6uKun-o" allowfullscreen></iframe>
</div>
</div>
</div>



<div style="text-align: center;">
<div style="display: inline-block; text-align: left;">

Feel free to leave any comments!

</div>
</div>


# What's for next week? 

Next week should be fairly simple with the wireframe laid out. Next week, I have to create the unit cards to use universally and hook them up to the ActiveSpearhead class. Then, make the carousel using the passive abilities, and populate the phase view page. Finally, as a stretch goal, I want to try to implement the full unit view if you tap a unit on the Unit view page. Though that might require extra designing and may be a week 7 thing. 

# Final Thoughts

There are still some subtle UI elements that I want to change to be more in line with what I had originally wireframed up, but I have to push ahead and continuously remind myself to focus on functionality and not looks.

Additionally, after the toils and struggles of the first couple of weeks, it feels very weird and suspicious that development went as smoothly as it did during week 6. If I hadn't gotten sick, probably the week 6 post would be filled with my excitement for the favorites page being done. Alas, external factors did prevent me, so now, at the end of week 6, I am a bit behind schedule but confident I can catch up.

Here’s to next week! Feel free to ask any questions or post comments below, and I’ll get to answering when I can.

*This devlog is updated weekly. Follow along on* *[GitHub](https://github.com)*. *Hope to see you soon!*