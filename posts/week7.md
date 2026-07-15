## Table of Contents:
<div style="text-align: center;">
<div style="display: inline-block; text-align: left;">

[Oh no](#oh-no)

[Passive Carosel](#the-big-feature-passive-carosel)

[Sneaky bug](#a-sneaky-bug)

[Week 6 addendum](#continuation-of-week-6-saving-favorites)

[Current Demo](#how-it-looks)

[Looking ahead](#looking-ahead-post-mortem-of-graduation)

[Final thoughts](#final-thoughts)

</div>
</div>

# Oh no
One fine day of June 1rst I opened up my canvas annoucements page only to find that in my happy world of deveopment and planning for nine weeks, the deadline had snuck up on me. It was in fact, not the 22nd that was the due date, but instead the 8th! A seven, and not nine, week timeline.

You can imagine the emotional whirlwind that went on as I started to prioritize what needed to get done and what didn't, not to mention the list of bugs that still were present. So this week ended up being a bit hectic.

# The Big Feature: Passive carosel
One thing that I really did not enjoy from the original AOS app was the lack of being able to easily check what passive bilities you had. Some passives activate every turn, so unless you are extremely on top of the game or have studied exact stratagies for that army it is hard to play an army to its full potential. 

Again, the point of this application is to relieve some of that mental load in order for the user to focus more on the stratagy of the game and less on the little details. So, the Passive carosel idea was born to facilitate easy reminders of abilities that always exist within an army.

In order to set it up I did hae to refactor some code again to change the way queries are made to the database, but after that was done it was mostly setup.... untill I realized that what I thought should be working wasn't actually grabbing passive abilities that the user selected on the enhancements/regiments page..why?

## A Sneaky bug
The sneakest bug that a programmer can encounter are bugs that on the surface seem to be working as intended, but are actually serving the wrong data. If you will look at past examples of the application, you will notice that there are only two enchancements that are present. This is incorrect! As the sylvaneth spearhead has many many more, not to mention the passives were missing. However, as I am still very much new to the game, I did not catch this until I was working on the passive abilities carosel display.

When I was testing the carosel to see if it would display anything at all, and edting how the cards would look, I wasn't focused on passive abilities since that was a simple code change. However, once I got that working I switched to it only accepting passives and found a flaw: there were no passives within the sylvaneth test army. However, checking with the AOS app I knew this was incorrect as very clearly there were passives there.

What I found out was the query I was using for the enhancements was actually pulling the regiment abilities that should ALWAYS exist within the army. Instead, I should have been pulling the actual enhancements that contained the passive abilities. It was a simple fix, but one I probably would not have caught unless I was playing the game or made the carosel. I realized that part of the reason this happened was the lack of clear naming and definition within the variubles in the database. Immediately once the change was implemented, I made sure the clearly define the confusion for myself or anyone that wanted to work on this project after me.


# Continuation of week 6: Saving Favorites
Another thing that I realized, is that my fantastic idea of using a class to store the ``ActiveSpearhead`` data isn't actually persistant data. So yes, I can populate a class of active spearheads from a list, however once the user closes the application the cache of all of that data evaporates. The entire reason databases exist is for the idea of persistant data, so I will still need a seperate user database for peristant caching. I have chosen to keep that section of week 6 in there, as once again I want to be as trasparent as possible with my thinking during this project.

I passed around the idea of still using a class, but I think in the long run simply querying, making a model, and writing the data directly into the schema will work just fine.


# How it looks

In lieu of getting the post out, I opted to not record and upload a video this time. this is mainly because I have switched my main Laptop to linux and forgot to upload my passwords, so I have loast acsess to the account. When I get tofeeshare up and going I will post a local link here.

# Looking ahead: Post-Mortem of Graduation

This is a project I started because I was tasked with making anything showable for my final capstone project class and I am passionate about making something that I want to use. Projects that I feel have a use and are unique in thier own niche of the internet. Life, however, does not like me having projects and likes filling my time with things like...my career and....a job...oh no. So looking ahead, I really want to complete this project past it's current demo state. Most of the time spent working on this project was about 10-15hours a week. Imagining what I could do with 20-25hours I can fully see this project finishing within a month or two.

That being said, I find it to be in a really good demo state at the moment. Poking around the app you can clearly see the vision, work with the one spearhead that exists, and I am proud of what I accomplished in these last seven weeks. Itmay not be the definition of an MVP, but it is something I am very proud of.

Perhaps life may catch up to me, and I might not pick it up again, but that is okay.

# Final Thoughts

If i do decide to, this project for completion will start happening around september, as I have aquired two part time jobs, equalling a full time job and many many networking events that take up my weekend. So, expect to see me again then if I resume development. In the meantime I encourage anyone to take a look at the repo and my work, feel free to ask questions, or give feedback!


Here’s to next time! Feel free to ask any questions or post comments below, and I’ll get to answering when I can.

*This devlog is "weekly" updated as the project updates. Follow along on* *[GitHub](https://github.com)*. *Hope to see you soon!*