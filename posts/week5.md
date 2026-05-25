## Table of Contents:
<div style="text-align: center;">
<div style="display: inline-block; text-align: left;">

[In sickness and in Blogging](#sick--too-much-time-blogging)

[Thinking ahead: Design Decisions](#minor-decisions-made)

[SQLite and Unit Data](#setting-up-a-sqlite-table--obtaining-the-data)

[Setting up Searching](#the-dreaded-search-bar)

[What I learned](#a-major-lesson-pivoting)

[Current Demo](#how-it-looks)

[Next steps](#whats-for-next-week)

[Final thoughts](#final-thoughts)

</div>
</div>

# Week 5

## In sickness and in Blogging

A lot of the time I could have spent during week 5 was put twords getting the blog setup. My entire weekend plus Monday was writing.  When I was finally ready to start coding again, the universe promptly knocked me down for an entire week by some wierd flu I picked up somewhere. Therefore, I lost the entirety of week 5 and the weekend to misellanious stuff.

However, I learned a valuble lesson: next time I want to do a project like this with a blog, I should start the blog first so there is less writing and setup overhead. Either way, I am very happy with how this turned out in the end and from now on all I need to do is write a markdown file, proofread, and publish to the github. Additioanlly, if I want to do something like this in the future but with a different theme, I can re-use the code and simply change up the CSS files. 

## Thinking ahead: More Design Decisions

During my sickness on week five, though I couldn't code, I had some time to think about design decisions that had been haunting the main page.

As stated, the main goal of this application was to serve a robust, clean, and easy to understand UI and UX to a Warhammer user. So, while I am developing the MVP, knowing some features are going to be omitted, it is still coded it in a way that allows breathing room and easy refactoring for less headaches later. That being said, it is hard to fit so much on a tiny screen.

Recalling one of the wireframe images from <a href="post.html?slug=week-1-kickoff" class="post-nav-link" target="_blank" rel="noopener noreferrer">week 1&2</a>, you can see there was a prototype idea thrown in of a bottom nav bar, but wasn't present on the other page:
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

Initially, I didn't know what to do with the bottom nav bar, so I scrapped the idea and moved forwards on week 6 with the basic layout. However, while referencing the figma document, I realized I had forgotten to wireframe where the "round" and "unit specifc" counters would be. Not to mention there is no room on the current layout for those counters, so the idea came back.

Now, a new problem arose: I had already settled on the no bottom nav bar idea and gotten used to it's layout. So I still had to figure out a way to plan ahead and leave room for the counters.

Both solutions to the problem have their pros and cons. The simpliest solution is to have the bottom navigation bar, with one button leading to "data" and the other leading to "game specifics". However, this could end up cramping the space of the screen further down the line and would need to be tested. The other solution is to have a hamburger menu icon on the side to click on that opens up and contains any data the doesnt need to be immediately shown. However, having menu's upon menus doesnt fit the theme of "everything at a glance".

Finally, the issue with both of these solutions is they feel very static. Imagining myself playing the game and having to tap doesn't feel as modern as it should be, and  starts to resemble the tabulated view that is already present within the official Warhammer app, which defeats my purpose.

Then, in my research for an alternitive, I came across the "bottom drawer" widget. It is something that I can easily add later and is both unobtrusive, flexible, and still allows for data that doesn't need to always be there still be in a place with easy acsess and feels nice to get to.

Here is a look into one of the videos I found that explains this concept nicely. Though it is over 6years old, the concepts I found still apply to modern flutter today. Including the "gesture" class that he created, which I might implement as a polish feature for other sections of my code application (such as swiping left or right to easily change unit/phase views).
[video:https://www.youtube.com/watch?v=BgxkKlYzep8 caption:"Bottom Drawer video reference"]


Although the MVP build for June 16th won't include the bottom drawer widget, I'm glad I found a solution to my design problem. I'm planning this feature for the post-MVP build, but I think it's important to work through these details early on and part of this blog is sharing my thinking process.

## Week 6

## Re-learning what was learned

Part of learning is enforcing and applying what you have already learned. With me being out of comission for an entire week, this lesson was relearned all too well as I hopped back into my code. A lot of what I had learned during weeks 1 through 4 felt rusty and hard to recall. I was very thankful for the seperate notes and rigorous commening I made in my code. It took me some time to get re-oriented in my post-sickly sutpor but after a time I got back into the groove.

## So what was done?

All that being said, I was able to accomplish some of the first part of the game page with very little resistance from the code. As you will see in the demo, I was able to fully wireframe out the basic layout and connect up the database to the page. 

### Changing the database and A Realization :
While hooking up the databse I ended up creating some drift specfic functions. These were placed within the ``table.drift`` file and allow me to create something akin to a "view" within basic sql code, but it fucntions more like a method and ends up creating methods and classes that query the database.

Initally, these were functioning as basic SQL queries, but the more that I looked at them the more I realized it would be extremely ineffiant to be constantly querying the database, since it could eventually lead to lagging with constant unit to phase view switching. Looking into more how the queries worked, i came up with the idea to make an aggragate class that is "created" by the user. Basically, once the user has finalized thier selections and lands on the main page, a new temporary class called ActiveSpearhead is created. 



As an aside, I believe the reason that drift worked out so well for me on this project is because it automatically handles most of the MVVM arcchetecture. Whereas All I have to do is simply create a specific query within the tables.drift file and the rest is handled by the API.

### TODO PUT SOME SQL CODE HERE


## Testing reveals a design issue:
 While navigating the page I found myself wanting to tap each listed unit to display the full ontents related to that unit. Meaning, this was an overlooked design feature that I will have to implement for the MVP. So, I ended up chaning the interals of which widget the list was populated with so that the "on-tap" feature.  Right now, The cards themselves aren't tappable yet, but I plan on implementing the "on-Tap" next week along with the carosel.


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


# What I hope to accomplish next week:

# Final Thoughts

There are still some subtle UI elements that I want to change to be more in-line with what I had originally wireframed up, but I have to push ahead and continuously remind myself to focus on functionality and not looks.

Additionally, after the toils and struggles of the first couple of weeks it feels very wierd and suspicious that development went as smoothly as it did during week 6. If I hadn't gotten sick, Probably the week 6 post would be filled with my excitement for the favorites page being done. Alas, external factors did prevent me so now at the end of week 6, I am a bit behind schedule but confidant I can catch up.

Here’s to next week! Feel free to ask any questions or post comments below, and I’ll get to answering when I can.

*This devlog is updated weekly. Follow along on* *[GitHub](https://github.com)*. *Hope to see you soon!*