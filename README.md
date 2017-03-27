# Why Components?
It's likely that you've heard the term *components* thrown around, especially if
following current JavaScript trends. But what exactly is a component and why
should we be interested?

Before diving into components, I first want to introduce *abstractions*.

## What is an abstraction?
An abstraction is a technique or method used to help simplify a problem. You
create an abstraction when you extract a certain aspect of a problem to be
solved in a way that doesn't (necessarily) need to be known by someone working
on the rest of the problem. 

SIDE NOTE: If the you solve that subproblem in a way that *shouldn't* be known
by others, you've successfully created an [abstraction
barrier](http://www.ccs.neu.edu/course/cs5500f14/Notes/Testing1/abstractionBarrierAlt.html).
See also [black box mindset](https://en.wikipedia.org/wiki/Black-box_testing).

## When to use abstractions?
*Whereever it makes sense.*

**What?**

Remember, the goal of an abstraction is to simplify the larger problem. Nearly
anything *can* be abstracted away, but it doesn't always make sense to do so.

Here is a simple example. Imagine you have the following api calls in your app:

```javascript
// get list of users
export const getUsers = () =>
  fetch('http://www.example.com/users')
    .then(res => res.json());

// register user
export const registerUser = user =>
  fetch('http://www.example.com/users', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(user),
  });

// get comments
export const getComments = () =>
  fetch('http://www.example.com/comments')
    .then(res => res.json());
```

But now your company registered as an organization and is changing their domain
to `example.org`. Uh oh, now we have to go and change every single instance of
`example.com` to `example.org`. Easy, right? We can just search for `'com'` and
replace it with `'org'`! But if we do so, the last endpoint will get changed to
`http://www.example.org/orgments`, probably the wrong endpoint if looking for
comments.

This sudden change in company vision would've been easily accomodated if we had
only abstracted the domain away, as in this example:

```javascript
const API_URL = 'http://www.example.com';

// get list of users
export const getUsers = () =>
  fetch(`${API_URL}/users`)
    .then(res => res.json());

// register user
export const registerUser = user =>
  fetch(`${API_URL}/users`)
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(user),
  });

// get comments
export const getComments = () =>
  fetch(`${API_URL}/comments`)
    .then(res => res.json());
```

Then, just changing the url at the top would've sufficed. No need to parse
through the whole file looking for undesired search-and-replace changes.
Although a simple search-and-replace would've been fine for this particular
case, imagine if the url were used in thousands of lines throughout hundreds
of files.

## Where can we use abstractions?
We just saw an extremely simple example of abstraction. And whether you know it
or not, your life is filled with abstractions. If viewing this on a computer,
you're using an abstraction right now! Operating systems are written so that a
user can operate any computer, regardless of differences in hardware. An OS is
an example of an abstraction of the hardware.

## Why Components?
So, let's get back to the title of this seminar. What is a component and why
should we care?

Well, a component is an abstraction of a user interface element.
Until fairly recently, abstracting pieces of a website or mobile application
wasn't too common. But with libraries like
[React](https://facebook.github.io/react/), this is now the prevailing
technique.

Why use components? Because this allows us to abstract out commonly used
elements and later modify them without affecting the rest of the application
(too much).

## Let's see some in action
Head over to the [chat subdirectory](/chat) to write some of our own
components in a chat mobile app using
[React Native](https://facebook.github.io/react-native/) and
[Expo](https://expo.io/)!
