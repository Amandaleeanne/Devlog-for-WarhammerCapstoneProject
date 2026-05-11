

## Table of Contents:
<div style="text-align: center;">
<div style="display: inline-block; text-align: left;">

[In the beginning...](#in-the-beginning)

[Identifying the shortcomings](#identifying-the-shortcomings)

[The Design Direction](#the-design-direction)

[Limitations and challenges](#the-limitations)

[Tech Stack Decisions - Journey through week 2](#tech-stack-decision---the-journey-through-week-2)

[Figma Wireframing](#figma-walkthrough)

[Final thoughts](#final-thoughts)

</div>
</div>

---

# In the beginning…

The official Warhammer AOS Spearhead companion app works, technically. But you end up spending time fumbling through the menus, or specific abilities for new spearheads you are trying and end up buried underneath tab after tab. When you actually start playing, you end up forgetting over half of what you picked and there is a lot to track.

I will admit, the initial idea to make this a new companion application wasn’t mine. I was perfectly content complaining about the app and simply playing this funny miniature game.  
However, when I found myself asking around for real-world project ideas, my friend, from whom I was mooching their minis off of, suggested the idea to me after being unwillingly- yet willingly – dragged into a different group project while I was still left solo.

Ruminating on the idea, it was much better than anything else I had initially come up with; as it lent itself to a new area of development I hadn’t touched yet: mobile.  
I would be learning while doing, one of the joys of programming, while still completing my class.  
However, as I am primarily a desktop user, I also wanted it to work on desktop…and so the cross-platform journey began.

## Identifying the Shortcomings

The core problems I identified after using the official app across multiple sessions were:

- **Too many taps to get to unit stats** — you shouldn’t need 4 taps to see a warscroll mid-game
- **Too easy to forget persistent abilities** - the amount of times I have slapped my forehead because I forgot to advance the Nurgle stinky dice, unforgivable
- **No persistent round tracker** — you have to constantly remember where you are in the battle, probably by using one of the many tiny dice you own
- **You simply cannot search** — For as many units as there are, you would think searching is intuitive, *it is not*

These feel like necessary features that don't exist easily in a single unified view anywhere. I get that mobile development UI/UX requires minimalism, but the way it was done within the official app can certainly be improved.



## The Design Direction

To figure out how I could have a better application, I started by applying a concept known as “<a href="https://en.wikipedia.org/wiki/User_story" target="_blank" rel="noopener noreferrer">user stories</a>” and I ended up with about two and a half pages of end-user wants.

Eventually, I narrowed it down to the core principle:

> Fewer Menus; More game at-a-glance

Everything should be accessible with minimal interactions from the home screen. Once you get to the game view, everything else is easily at your fingertips and quick to see with minimal tapping, tabbing, and swiping, with so many more ways to remind you of the little details.



## The Limitations:

Starting the project off, there were a few challenges and limitations I decided on:

- **Solo Team** - By the time I was ready to ask someone to team up on the idea, people were already in groups or not interested. Therefore, I was doing this all on my own.
- **Time Frame** - I had 11 weeks to ship out a Minimum Viable Product. Technically, the application never had to be finished, but I wanted *something* to show after class was done.
- **No Webapps** - I wanted something that compiled Natively. Additionally, I did not want to use the React tech stack, since my work with React in my previous classes has been less than fun.
- **No AI** - Over the years, I have noticed my “slipping” of reliance of AI to just do that “one easy fix” on my code. I still have my fundamentals, but I have lost the full picture of why I started programming in the first place:  The fun of puzzles and research. So, I challenged myself this time: Something new, from scratch, no AI code, and only using AI as a rubber duck. I also limited myself to one AI, Gemini, because I can very easily send it the prompt of “do not give me any code, and try to lead me down the right path through tutoring questions,” and it is extremely persistent with that concept.
- **Have fun** - This seems like a silly challenge, but over the years, I have forgotten what it is like to code for myself because of the “Get the grade” mindset. I wanted to make sure this project reignited that fire for programming.

With those things in mind, it was time to decide the tech stack.



## Tech Stack Decision - The Journey through Week 2

This part threw me for a loop.

Previously, I had messed about in Python with Tkinter and PyQT, but found them confusing to manage, coming from a backend standpoint. Additionally, those weren't necessarily cross-platform as far as I was aware. Therefore, I wanted something that could easily be designed with a visual designer and be cross-platform. Eventually, my research led me to the Uno Platform and its Hot Designer feature.

Hot Designer is a visual designer that worked in code and autogenerated the XAML, so one only had to worry about the backend. As someone who has primarily worked in backend, this was perfect. The issue being I had never encountered <a href="https://en.wikipedia.org/wiki/C_Sharp_(programming_language)" target="_blank" rel="noopener noreferrer">C#</a>,  <a href="https://learn.microsoft.com/en-us/dotnet/desktop/wpf/xaml/" target="_blank" rel="noopener noreferrer">XAML</a>, <a href="https://dotnet.microsoft.com/en-us/learn/dotnet/what-is-dotnet" target="_blank" rel="noopener noreferrer">.NET development</a>, or <a href="https://learn.microsoft.com/en-us/dotnet/architecture/maui/mvvm" target="_blank" rel="noopener noreferrer">MVVM</a> concepts, so there was a lot to learn, but I was ready. So, for the first couple weeks, I got started on learning all the new tools + the Uno platform.

<u>Long story short</u>: It was confusing. I felt like I was back in my Associate degree, trying to make sense of the Physics 1 lecture that I didn’t have the calculus background knowledge for.

My naivety of “I can learn anything!” in consideration to my time limit really set me back. I did give Uno Platform a good, solid try. There was lots of documentation reading, following tutorials, browsing YouTube, trying to get help, all to no avail. In a few weeks, all I had done was draw a single image on the screen and then proceed to get lost once again in talking back and forth to the air. I am sure for someone more familiar with .NET or UI development, Uno platform is an amazing toolkit. However, it simply was not for me as a beginner with a time limit, and I needed to find a mentor or pivot to another option.

So, I looked for an answer to my problem, and it came to me in the form of a person suggesting a different platform: Flutter. Exhausted and close to switching to a different project entirely, I took a look. Flutter seemed way too simple compared to the complexity I was facing with .NET dev. However, when I explored it, in just my exploration alone, I was able to get a simple project up and working within an hour, and I fell in love. The documentation I could understand; the community was large with thousands of helpful videos; and finally, after weeks of trying to get a button to draw on the screen in a specific spot, I saw a working application. Not to mention, I could easily grasp what the code was doing even if it was in a language I was unfamiliar with. I understood immediately, and Flutter was now my go-to UI toolkit of choice.

<u>Choosing the backend was much simpler</u>. I was pretty confident in my decision to use a relational database. Warhammer’s warscrolls and armies are a perfect representation of what a database can do. Plus, with the limitation of only using the spearheads, something like SQLite that is localized, easy to work with, and not having to mess with too many API calls was perfect.

<u>So finally, after weeks of decisions, this was the decided stack</u>:

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Layer | Choice | Reason |
| Framework & Styling | Flutter | Component reuse, cross-platform, easy pickup and go UI dev |
| Data | SQLite | Relational, local, easy to work with |


A tech stack that was very simple allowed me to learn, and still compiled natively cross-platform.



## The Fun part: Figma!

While going through the Uno Platform DOCs and .NET nightmare, as a break, I would hop onto Figma Designer and sketch out what the app could look like.

I discovered Figma many years ago in my first HTML class during my Associate degree. Though I do not consider myself an expert, I play around with it enough to very comfortably enjoy how it allows me to visualize what I want things to look like. I ended up finishing the prototype at the end of week one.

### Figma walkthrough

Since the Figma file was mostly for myself to look at and see the general idea, there are a few artifacts here and there of the default examples, such as the calendar, clip, and three dots menu on the Final product homepage. Later, I might edit this to use a gear-and-settings icon, but I decided to focus more on the MVP for the duration of my class.


Here’s a quick walkthrough of the initial wireframe final product prototype:

<div class="figure-grid figure-grid-3">
  <figure>
    <img
      src="assets/images/wireframe/FP-homepage.svg"
      alt="Homepage wireframe"
    />
    <figcaption>Final product homepage</figcaption>
  </figure>

  <figure>
    <img
      src="assets/images/wireframe/FP-search.svg"
      alt="Search Armies"
    />
    <figcaption>Final product Pick Army Enhancement</figcaption>
  </figure>

  <figure>
    <img
      src="assets/images/wireframe/FP-Pick2.svg"
      alt=" Pick Regement Ability wireframe"
    />
    <figcaption>Final product Pick Regement Ability</figcaption>
  </figure>
</div>

<div class="figure-grid figure-grid-3">
  <figure>
    <img
      src="assets/images/wireframe/shared-game-page.webp"
      alt="Homepage wireframe"
    />
    <figcaption>Final product Game page</figcaption>
  </figure>

  <figure>
    <img
      src="assets/images/wireframe/shared-phase-view.webp"
      alt=" Favorites page"
    />
    <figcaption>Final product Phase View</figcaption>
  </figure>

  <figure>
    <img
      src="assets/images/wireframe/ability-card.webp"
      alt=" Favorites page"
    />
    <figcaption>Ability card</figcaption>
  </figure>
</div>

I tried to make everything pretty easy to understand at a glance, but if anyone is curious, the explanation of the flow is below.

### the Homepage

I wanted a way to add favorite "Configurations", which is simply the combination of spearhead + army enhancement pick + regiment enhancement pick :

<div class="figure-grid figure-grid-2">
  <figure>
    <img
      src="assets/images/wireframe/FP-homepage.svg"
      alt="Homepage wireframe"
    />
    <figcaption>Final product homepage</figcaption>
  </figure>

  <figure>
    <img
      src="assets/images/wireframe/FP-Favorites.svg"
      alt=" Favorites page"
    />
    <figcaption>Final product Pick Regement Ability</figcaption>
  </figure>
</div>


Then, of course, the new game button, which I should probably make a bit bigger. One thing to note is I am toying with the idea of a "versus" mode, meaning you can input and look at your opponents' stats. However, that will come much, much later.

Finally, for people who tend to forget to "favorite" or are still testing out configurations, "recent configurations are shown of up to four, but up to ten are saved at once. 

### Searching:

Searching should be simple and straightforward. I changed this to recent games because of the "VS" mode idea, in essence, it is simply Recent configurations again in single player mode.

The search bar will intuitively search for both armies and specific spearhead names. *More information on what "Regement abilities" and Armies are is within week 3&4 # setting up the database.*

### Picking abilities:
These pages are simple on pourpose, and the final product will display cards much like the last image above. Tapping a card selects it and takes you to an identical screen to pick the next ability. Finally, tapping it again will take you to the main game page.

### Main Game Page:

This is the meat of the application and where most users will live for the life of the application. It contains all data you would need to play the game, such as the stats of units, the passive abilities, and regiment abilities at the top, and finally, a phase view for just looking at per-phase abilities.

Tapping any unit or ability data will take the user to the specific unit the card is attached to for a more detailed view. 

Finally, all abilities will have an icon next to them for an easy glance at which ability is attached to what.

I suspect this page will change the most as I field test the application in my own games, but for now, I am happy with how it turned out.



### Other notes
Since the "Pick regement Ability" and "Pick army enhancement" screens are the same, I only showed one here. You can check out the full flow in the Figma embed below.

### The MVP:
The picking abilities pages and the Game page remain the same in the MVP. However, the main homepage only contains a button for the new game; there is no VS mode, no favorites or recent configurations, as well as my idea of having counters for the round/unit HP/etc. won't be available. 

Below is the full Figma file I ended up with for anyone wanting to scroll around directly:

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://embed.figma.com/design/0Zx6TNzs9a7Xh618tkcSMC/Warhammer?node-id=2112-1374&embed-host=share" allowfullscreen></iframe>


## Final thoughts

The first two weeks of deciding on and finalizing the tech stack were hard. There were so many ups and downs that it is hard to keep track. However, I am very happy with what I ended up with, and development has been going very smoothly since then…or as smoothly as programming can go.

Additionally, it is worth noting that this post was written four weeks after the project had started, so it’s layout and content are a bit different and longer than later posts. There is also probably a lot more I could cover on the ups and downs, but this is already longer than it should be.

Here’s to next week! Feel free to ask any questions below, and I’ll get to answering when I can.

---

*This devlog is updated weekly. Follow along on* *[GitHub](https://github.com)*. *Hope to see you soon!*