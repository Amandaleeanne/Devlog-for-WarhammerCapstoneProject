## Table of Contents:
<div style="text-align: center;">
<div style="display: inline-block; text-align: left;">

[Learning Flutter](#learning-dart-and-flutter)

[SQLite and Unit Data](#setting-up-a-sqlite-table--obtaining-the-data)

[Setting up Searching](#the-dreaded-search-bar)

[A Big Lesson](#a-major-lesson-pivoting)

[Progress continues, Week 4](#smoother-developement)

[Current Demo](#how-it-looks)

[Next steps](#whats-for-next-week)

[Final thoughts](#final-thoughts)

</div>
</div>

---


## Learning Dart and Flutter:

After the finalization of what language I was going to use, I dove straight into the <a href="https://docs.flutter.dev/" target="_blank" rel="noopener noreferrer">docs</a> and found a couple of YouTube tutorials that I would like to highlight here.

The first one I encountered was a fantastic introduction as he gave both examples and walked through most of the widgets that I needed to get started:

[video:https://www.youtube.com/watch?v=HQ_ytw58tC4 caption:"Starting Flutter video:"]

Even though this was made over two years ago, it still helped kickstart the project as I followed along with what he was doing. 

The second video was more recent and one I use a lot as a quick reference, aside from the docs. The way he presents each widget within Flutter takes only a few minutes and gives me quick reminders, allowing me to make snappy decisions while working on an application:

[video:https://www.youtube.com/watch?v=3kaGC_DrUnw&t=2203s caption:"Flutter Quick reference video"]


Finally, as I said before, I used Gemini as a learning rubber duck. Questions such as "I am trying to do [X], what Flutter widgets are available to me to do so?" were asked. Gemini would give me a response, and then I would research the docs to decide on the best one to use. Eventually, this led to a feedback loop in which I developed a good understanding of how Flutter worked.

<u>Once I understood Flutter concepts a bit more</u>, I moved on to writing a few "hello world" Dart-specific programs. Basic calculators, CLI printing to do things on the screen, and looking into specific 'dart quirks,' such as its aggressive null safety.

Dart is extremely object-oriented. However, it does not seem to have too many of the annoying hiccups that I have encountered with Java, and most of the design decisions within the languauge feel very intentional. The best way I can describe dart is a combination of OOP, Java, and Python concepts with a dash of Javascript added in. Mainly, It feels like a scripting languauge that is wrapped around in OOP concepts. Which is quite nice to work with, because it doesnt rely too heavily on OOP concepts that you can't do some basic scripting or functional programming. 

Combining all of this together, it was time to start working on the project for real.



## Setting up a SQLite table & Obtaining the Data:

### Index of this section:

<div style="text-align: center;">
<div style="display: inline-block; text-align: left;">

[Table relationships](#the-layout-of-the-database-table-relationships) 

[Why it was done this way](#why-it-was-done-this-way)

[Why: Abilities](#abilities-table) • [Why: Warscrolls](#warscrolls) • [Why: Spearheads](#warscrolls)

[Getting the Data](#getting-the-data)

</div>
</div>

### The layout of the database (Table relationships)
Taking a break from learning, I went to something I was more familiar with: setting up and seeding a database. 


I knew I didn't need all of the data within a warscroll, because my app was only focusing on a specific portion of unit data and stats. Since I am still fairly new to Warhammer, I met with my Warhammer and programming friend to discuss how the database could best be laid out. 

We all eventually landed on this iteration of the database:

<figure>

![ER-Diagram Version 1](assets/images/er-diagram-spearhead.webp)

<figcaption>First iteration of the Warhammer database as an ER diagram</figcaption>

</figure>

### Why it was done this way:

*Note: This section will be a bit warhammer vocabulary heavy, but I will try to make it as acsessible as possible so bear with me.*

#### Warscrolls

Warscrolls are the information on a specific unit, where a unit is a collection of one or more figurines that you can move around the playing table. The Warscrolls SQLite table is the most robust table besides the weapons, as it contains everything that would need to be displayed in order to play that unit of your army. In addition to that, warscrolls needed to be connected with the other tables, with a lot of <a href="https://en.wikipedia.org/wiki/One-to-many_(data_model)" target="_blank" rel="noopener noreferrer">Many-to-One (M:1)</a> relationships. We narrowed this table down significantly to only include the necessary data specific to each unit. Then extract any other relationships that appear globally or would make the table too large into separate tables.

Please note that, for the article, I will use the terms Warscrolls and Unit(s) interchangeably.

#### Abilities table
Within a Warscroll or army, there are Abilities. These abilities can be passive, triggered, or connected to a certain round within a turn. Some abilities apply to the entire army; these are called Battle traits. Other abilities are chosen at the beginning of battle: Regiment and Enhancement traits. If you have ever played video games, think of them as buffs for your army that you choose. Finally, each Unit, or Warscroll, may or may not have an ability attached to it. 

To make Ability queries easier, all Abilities are generically within the Abilities table. In order to distinguish what type of Ability it is, a field was added to easily query for Regiment, Enhancement, or plain unit abilities. Then, a joint table called warscroll_abilities is used for units with specific abilities. Finally, the spearhead_abilities table enables something like inheritance without duplicating data. This table handles the Battle traits for each unit, as each unit could technically use any battle trait at any time. In this way, I could have a one-size-fits-all card within the UI, while still being able to run specialty queries for abilities and attach the user-selected abilities to a dynamically updated joint table. 

#### Keying for Spearheads

Within Warhammer, there are specific Factions. These factions then can have multiple armies attached to them, and each army may or may not have a spearhead army (or regiment) associated with it. Usually, an army has one or two spearheads associated with its name. 

Since searching by factions would complicate both the app and the database, it was decided to omit that table. This left us with the army's name, then the spearhead names. The army table is there purely for ease of searching, whereas the spearheads table allows warscroll and ability data to connect together.

<u>I expect that as the project moves along</u>, the database structure will need to be <a href=" https://en.wikipedia.org/wiki/Code_refactoring" target="_blank" rel="noopener noreferrer">refactored</a>, but iterations will happen after I get the army screen setup + UX flow nailed down. For now, it was time to seed the database.

### Getting the data:
 <u>Setting up the database with data</u> proved to be a bit of a challenge. Official GW warscroll data isn't publicly available in a clean format, so I had to figure out a way to efficiently import the hundreds of unit data records into the database. It was either spend time combing through the PDFs one by one and manually entering the data, or find a way to automate the process. Both options would take a huge chunk of time. Luckily, my programmer friend came through. While I was setting up and learning Flutter, they reviewed the official PDF documentation and built a Python parser. The script reads the data from the PDF, cleans it, and stores the data we need in a JSON document, which is then reparsed into the SQLite database. Though the script is not fully complete yet, as each army might not entirely fit the generic template, we were able to seed one army and, hopefully, by the end of the project, many more can be populated through magical Python automation.



## The Dreaded Search Bar:

Now that the problem of getting the data in was solved, it was time to hook up the database and get the searchbar I had drawn to the screen functional. Easy right? Wrong. What I thought was a simple package lookup turned into yet another nightmare of confusingly scrolling through docs.  The local database API I had chosen, Sqflite, which allows Flutter and SQLite to interact properly, was causing problems and not working as intended. Everything always seemed hooked up, but the way SQLite handled the database was not intuitive at all.

So I went back to the drawing board to see if there was another API or if I needed to re-think my data layer to be cloud-based. After some searching, I luckily found a package called Drift. Once I switched and followed the steps, I was able to get the search bar working in about an hour and a half, elatedly screaming "IT WOOORKS". After which, the development of the rest of the UI flow went smoothly as I learned the Drift API.

Overall, this excursion cost about 15hours of my project time, with it being completed during my free time on the weekends.

## A Major Lesson: Pivoting

One of my favorite sitcoms is called <a href="https://en.wikipedia.org/wiki/Friends" target="_blank" rel="noopener noreferrer">Friends</a>. If you were born around the 1960s to the early 2000s, you will most likely be familiar with this show. From Friends, there is a specific scene where the character Ross is getting help from his friends Rachel and Chandler to get a couch up some very narrow New York apartment stairs. This clip has Ross saying "PIVOT" as they attempt to shimmy it up the stairs.

[video:https://www.youtube.com/shorts/TrQadHVITAI caption:PIVOT!]

Throughout this entire project, I have felt like the sofa, and my code yelling at me "PIVOT!" with every which turn I go. First with The Uno Platform, and now switching from SQflite to Drift. 

Having the lesson of being extremely flexible with your code and knowing exactly when it is time to step back, look at what you are doing, and decide whether or not to pursue or pivot is a skill I will keep in mind and hone more so going forward.

## Smoother development

After all was said and done with the database hookup, the rest of the development has been going much more smoothly. I was able to get the rest of the onboarding flow done and looking nice enough to present. 

I also spent some time refactoring. Updating my old code from the new knowledge I gained of Flutter, extracted some widgets as classes to import, added global imports across all files, and many other programming nice-to-haves for clean, readable code.

---

## How it looks:

Here is this week's video walkthrough of the project! This video was initially taken to show only my teacher, but it serves as a good walkthrough starting point. 

[video:https://youtube.com/shorts/KOYS9K_ra8I?feature=share caption:“Week 4 progress demo”]


<div style="text-align: center;">
<div style="display: inline-block; text-align: left;">

Feel free to leave any comments!

</div>
</div>

---

## What's for next week? 

I hope to finally have the basic flow of the UI almost done by next week. The final game page should at least be interactable at the basic level, with unit stats populating and the Phase view working.

With the addition of the overhead it took to write the blog, I am a bit behind on my initial plans of completing the MVP based on the Figma design document, save for the favorites page. However, with the current smooth development pace and less blog overhead, I should have a complete MVP by the week after next if no more hiccups arise.

## Final thoughts

With this article done, we are all caught up in development. Going forward, articles may be a bit shorter as there will be a lot less to cover, and I hope to report on *weekly* progress instead of combining two weeks into one article.

Additionally, if anyone is interested, this blog was made as a response to what my teacher for midterms week wanted. I had already been thinking of making a blog, or some sort of report, for the project anyway, and so this blog was born. 

Finally, I cannot stress how much I have enjoyed working within the Dart + Flutter ecosystem. It feels like a backend programmer's way to generate some UI, and has given me a much more gentle insight as to how UI's in general are made. I hope that after this project I can use that knowledge and re-tackle the Uno Platform or PyQT/Tkinter 

I hope you have enjoyed reading up on the development so far, and here’s to next week! Feel free to ask any questions below, and I’ll get to answering when I can.

---

*[Checkout the amazing SQlite database and ER diagram viewer I found!](https://fasttools.dev/en/sql-playground)*

*This devlog is updated weekly. Follow along on* *[GitHub](https://github.com)*. *Hope to see you soon!*