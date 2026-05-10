## Table of Contents:
<div style="text-align: center;">
<div style="display: inline-block; text-align: left;">

[Learning Flutter](#learning-flutter)

[SQLite and Unit Data](#setting-up-a-sqlite-table--obtaining-the-data)

[Setting up Searching](#the-dreaded-search-bar)

[A Big Lesson](#a-major-lesson-pivoting)

[Progess continues, Week 4](#smoother-developement)

[Current Demo](#how-it-looks)

[Final thoughts](#final-thoughts)

</div>
</div>

---


## Learning Dart + Flutter:

After the finalization of what language I was going to use, I dove straight into the <a href="https://docs.flutter.dev/" target="_blank" rel="noopener noreferrer">docs</a> and found a couple of Youtube tutorials that I would like to highlight here.

The first one I encountered was a fantastic introduction as he gave both examples and walked through most of the widgets that I needed to get started:

[video:https://www.youtube.com/watch?v=HQ_ytw58tC4 caption:"Starting Flutter video:"]

Even though this was made over two years ago, it still helped kickstart the project as I followed along with what he was doing. 

The second video was more recent, and one I use as a quick reference a lot, other than the docs. The way he presents each widget within flutter take only a few minutes, and gave me quick reminders allowing me to make snappy decisions while working on an application:

[video:https://www.youtube.com/watch?v=3kaGC_DrUnw&t=2203s caption:"Flutter Quick reference video"]


Finally, as I had said before I used Gemini as a learning rubber duck. Questions such as "I am trying to do [X], what flutter widgets are avilible to me to do so?" were asked. Gemini would give me a response, and then I would go and research in the docs to decide on the best one to use. Eventually this lead into a feedback loop where I ended up having a good idea of how flutter worked.

<u>Once I understood flutter concepts a bit more</u>, I moved onto writing a few "hello world" dart-specific programs. Basic calculators, CLI printing to do things on the screen, and looking into specific 'dart quirks' such as its aggressive null safety.

Dart is extremely object-oriented. However, it does not seem to have too many of the annoying hiccups that I have encountered with Java, and most of the design decisions within the langauge feel very intentional. The best way I can describe dart is a combination of OOP, Java, and Python concepts with a dash of javascript added in. Mainly, It feels like a scripting langauge that is wrapped around in OOP concepts. Which is quite nice to work with, because it doesnt rely too heavily on OOP concepts that you can't do some basic scripting or functional programming. 

Combining all of this together it was time to start working on the project for real.



## Setting up a SQLite table & Obtaining the Data:

Taking a pause on learning, I went to something I was more fammiliar with: Getting a database setup and seeded. 



### STUB
"The only question now is getting the data for the data layer. Official warscroll data from GW isn't publicly available in a clean format, so I had to figure out a way to get the hundreds of unit data into the database efficiantly...."

"How did I get seed data? (Talk about Zombie as "a friend" and his python code contributions)"

## The Dreaded Search Bar:

"Talk about working in sqlflite, how I ended up breaking some of my challenge rules and then scrapping it all once I discovered I was going the wrong direction. Don't worry, I got back on track."

## A Major lesson: Pivoting
[insert friends joke here]
"Using Drift instead of SQFlite, development suddenly got a lot smoother. I screened IT WOOOORKS. Talk about the "


## Smoother developement

"Talk about descisions and the final UI flow and refactoring desicsions within code."

---

## How it looks:

Here is this week's video walkthrough of the project! Please leave any comments on how you think things should improve, I am more than happy to take critisism.

[video:assets/videos/week1-wireframe.mp4 caption:“Week 1 wireframe walkthrough — home screen navigation flow”]

---

# Final thoughts

With this article done, we are all caught up in development. Going forward, articles may be a bit shorter as there will be a lot less to cover, and I hope to report on *weekly* progress instead of combining two weeks into one article.

Additionally, if anyone is interested: this blog was made as a response to what my teacher for midterms week wanted. I had already been thinking of making a blog, or some sort of report, for the project anyways and so this blog was born. I hope you have enjoyed reading up on the development so far, and here’s to next week! Feel free to ask any questions below, and I’ll get to answering when I can.

Finally, I cannot stress how much I have enjoyed working within the Dart + Flutter ecosystem. It feels like a backend programmer's way to generate some UI, and has given me a much more gentle insight as to how UI's in general are made. I hope that after this project I can use that knowlege and re-tackle The Uno Platform or PyQT/Tkinter 

---

*This devlog is updated weekly. Follow along on* *[GitHub](https://github.com)*. *Hope to see you soon!*