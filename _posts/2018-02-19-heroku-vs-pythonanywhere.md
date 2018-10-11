---
layout: post
title: "Heroku vs Pythonanywhere"
date: 2018-02-19T21:30+05:30
last_modified_at: 2018-02-19
description: "Compare Heroku with Pythonanywhere for Python hosting"
keywords: heroku, pythonanywhere, python, hosting
author: nirantak
excerpt: "Compare Heroku with Pythonanywhere for Python hosting"
image: "/images/heroku-vs-pythonanywhere.jpg"
categories: services
tags: python hosting
comments: true
---

## Overview

<div style="overflow-x:auto;" markdown="1">

|---
| Feature | [Heroku](https://www.heroku.com){:target="_blank"} | [Pythonanywhere](https://www.pythonanywhere.com){:target="_blank"} |
| ---------- | ---------- | ---------- |
| Languages | [Python](https://www.python.org/){:target="_blank"}, [NodeJS](https://nodejs.org){:target="_blank"}, [Ruby](https://www.ruby-lang.org){:target="_blank"}, [Java](https://java.com){:target="_blank"}, [Go](https://golang.org/){:target="_blank"}, [PHP](http://www.php.net/){:target="_blank"}, [Scala](https://www.scala-lang.org/){:target="_blank"}, [Clojure](https://clojure.org/){:target="_blank"} | [Python](https://www.python.org/){:target="_blank"} |
| Pricing | [Free, $7-$500](https://www.heroku.com/pricing){:target="_blank"}  | [Free, $5-$500](https://www.pythonanywhere.com/pricing/){:target="_blank"}  |
| Billing | Per [Dyno](https://devcenter.heroku.com/articles/dynos){:target="_blank"} per Month | Fixed Monthly |
| Free Plan | 512MB RAM, 1 web/1 worker dyno | 512MB RAM, 100 CPU seconds|
| Database | PostgreSQL (default), MySQL MongoDB Redis (with plugins) | MySQL (default), PostgreSQL (paid) |
|---

</div>

## Detailed Comparison

### Heroku

![Heroku Logo](/images/heroku-logo.png){: width="75%" height="auto" style="display:block; margin:auto;"}

Heroku provides a PaaS architecture (Platform as a Service), with support for many programming languages. The free account offers 1 web and 1 worker dyno ([What is a Dyno?](https://devcenter.heroku.com/articles/dynos){:target="_blank"}). The apps running on free dynos sleep after 30 minutes of inactivity, and it takes about 15 seconds to wake up a sleeping app on the first request. Each account has 500 hours of free dynos per month to use for a maximum of 5 apps, but the account can be verified with a credit card to increase the limit to 1000 hours per month and 100 apps. This is more than enough to run one app for the entire month. Verification also allows custom domains to be added to apps. All Heroku subdomains have SSL Certificates for HTTPS connections, but custom domains on the free account don't. Any paid account however has support for SSL certificates with auto renewal.

Heroku creates apps directly from you version control (Git), by adding another remote link to the app. [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli){:target="_blank"} can be used to create apps, add plugins and run database queries easily.

#### Pros

* Highly Scalable
* A vast variety of [languages](https://www.heroku.com/languages){:target="_blank"}, [databases](https://devcenter.heroku.com/categories/data-management){:target="_blank"}, and [plugins](https://elements.heroku.com/){:target="_blank"} available

#### Cons

* The [Ephemeral Filesystem](https://devcenter.heroku.com/articles/dynos#ephemeral-filesystem){:target="_blank"} does not allow writing to the local filesystem, thus all changes to be made are done via the version control system
* Can be too expensive for large projects

### Pythonanywhere

![Pythonanywhere Logo](/images/pythonanywhere-logo.png){: width="75%" height="auto" style="display:block; margin:auto;"}

Pythonanywhere is like a traditional hosting platform, where you can create apps using the inbuilt file manager or by pulling from a Git repository. It has many more features like IPython notebooks (for paid accounts) and shared consoles.

The free account does not sleep like in Heroku, but I have noticed that it is a bit slower than heroku (non - sleeping apps). It has limited CPU cycles for running comands in the online console. Free accounts cannot have custom domains for apps, and all Pythonanywhere subdomains have SSL Certificates for HTTPS connections.

#### Pros

* Very easy to use
* Competitive, low prices
* Shared Consoles

#### Cons

* You have to git-pull in the Pythonanywhere console to update changes

### Conclusion

Both Heroku and Pythonanywhere have their pros and cons, and differ mainly in their architecture. Heroku has a slight learning curve and guidelines have to be followed for language specific builds, whereas Pythonanywhere is relatively simple.

For simplicity in learning and deployment, and for teachers (IPython notebooks, Shared consoles) we recommend Pythonanywhere.
For quick buiding and deployment, and for adding various plugins (NoSQL databases, Logging, Caching) we recommend Heroku.

### Links

* [Heroku Help](https://help.heroku.com/){:target="_blank"}
* [Heroku Blog](https://blog.heroku.com/){:target="_blank"}
* [Heroku Devcenter](https://devcenter.heroku.com/){:target="_blank"}
* [Python on Heroku](https://devcenter.heroku.com/categories/python){:target="_blank"}
* [Pythonanywhere Help](https://help.pythonanywhere.com/pages/){:target="_blank"}
* [Pythonanywhere Forums](https://www.pythonanywhere.com/forums/){:target="_blank"}
* [Pythonanywhere Blog](https://blog.pythonanywhere.com/){:target="_blank"}
