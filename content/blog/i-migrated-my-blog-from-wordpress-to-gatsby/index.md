---
title: 'I Migrated My Blog From Wordpress to Gatsby'
date: "2021-05-09T16:12:37.121Z"
featuredImage: "./featured.jpg"
---

[Wordpress]: https://wordpress.org/
[Awaken]: https://wordpress.org/themes/awaken/
[Jamstack]: https://jamstack.org/generators/
[Gatsby]: https://www.gatsbyjs.com/
[React]: https://reactjs.org/
[LaTeX]: https://www.latex-project.org/
[GithubPages]: https://pages.github.com/

In this entry, I will explain why I decided to move the blog from WordPress to Gatsby. 
I will not describe in detail how I did it, because there are many such guidelines in the network. 
In addition, my blog does not consist of hundreds of posts (yet) so I had a significantly easier task.

# Misfired Begginings

This blog is not my first blogging approach. 
The first attempt took place during my studies (about 3 years ago), but I failed.
The main reason was that I always strived for perfectionism.

I decided to do everything myself from scratch.
I do not even remember what technological stack I chose, 
but the preparation of a template and configuration of the tools took me so much time 
that I did not even started writing posts.
Then came examinations in college and after them I have already forgotten about my unsuccessful project.
And to be honest, I did not really want to remember because I was too tired of it. 
I waited for visible effects for too long.

# Second Attempt

When I decided to create my place on the web again, I chose completely different approach.
I launched a website in the easiest way I knew: [Wordpress].
I found a template ([Awaken]) that more or less met my requirements 
and the next day after I set everything up, I was ready to start writing posts.

Everything went well as long as I did not mind adjusting the template to myself. 
Introducing changes in the code of the template did not give me any pleasure. 
I have never used PHP and I did not have the slightest desire to learn it. 
Probably it would not be useful to me anywhere else.

Using Wordpress was overwhelming. 
I didn't quite know what was happening in my application. 
It was hard to create my own functionalities and at the same time I had to worry a lot about security and backups.
Not a day goes by without someone trying to bruteforce my site or scan it for vulnerabilities.

# From scratch again!

I started thinking about creating my website from scratch again. 
This time, however, I decided to use a technology that I already knew at least partially 
and which will be useful in my professional career.
I also wanted to host my website for free (or pay for it as little as possible). 
That's why I decided to follow the path of statically generated sites.
[The list of static site generators][Jamstack] is long, 
but after playing a little bit with the most popular ones I decided to go with [Gatsby].

The main reason why I chose it was the fact that it is based on [React].
I noticed a large demand for React programmers 
(even in a company where I currently work, where we do not have many purely web projects)
and that's why I want to practice it a little.

# Final feelings

Was this a good idea? Definitely! 
Currently, the blog is not fully developed yet, 
but I already feel **a huge improvement in the speed and ease of delivering new functionalities**.
I'm only limited by my imagination ;)

Finally **extending my blog functionalities became a pleasure for me**.
I have always been a fan of generators and WYMIWYG (*What You Mean Is What You Get*) editors. 
During my studies, I preferred to write all my theses and reports in [LaTeX] instead of MS Word. 
It seems to me that the same is the case with the creation of my blog.

Another advantage is that **I don't have to pay for anything else than the domain**.
The blog is hosted on [Github Pages][GithubPages]. 
Even if one day this service stops working or is no longer free, 
there are tons of other places that allow you to host static pages for free. 
Migration is limited to uploading files and changing the IP address in the domain configuration.

Since my blog now consists of regular static files, **the performance of the site is much better**
and **I don't have to worry too much about security issues**. 
**All my posts are written in markdown**, so if I decided to use a different tool in the future, another migration would not be a problem. 
The posts are likely to be untouched.

The last important advantage for me is **no need to have a backup copy or website versioning**. 
I don't have to worry about it, because all the code needed to generate the blog is versioned on Github and on my computer.
