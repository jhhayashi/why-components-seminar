# Example Chat App
This project was initialized using
[Create React Native App](https://github.com/react-community/create-react-native-app).
If you want to follow along, go ahead and install and initialize your own app,
or explore this repo for the finished code.

## Running This Project
Install dependencies with `npm install` (or `yarn` if you're into that), and run
the packager with `npm start` (or `yarn start`). Open it in the
[Expo app](https://expo.io) on your phone to view it.

## Writing The App

### Installing blank template
Follow the instructions at [Create React Native
App](https://github.com/react-community/create-react-native-app) to get a new
project started. This repo was also created using the CRNA template.

### Writing a login screen
In order to have a functioning chat app, we need users to be associated with a
username. In order to keep this simple, we're going to bypass any auth system
and consider a user "logged in" if they have entered a username. We won't
validate the username in any way either.

Go ahead and open up `App.js` and add the following lines directly below the
line that says `export default class App extends React.Component {`:

```javascript
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      chats: [],
    };
  }
```

The `state` object is basically a key-value database that lives with a particular
component through it's lifecycle. `App.js` is the main page for our app, so the
lines we added initialized this object with an empty username and chat array.

But nothing in our app changed, since we never access this `state` object
anywhere. So let's add some code that shows a different screen if the user isn't
logged in.

Add the following lines just below the line that says `render() {`:

```javascript
    if (!this.state.username) return (
      <View style={styles.container}>
        <Text>You are not logged in.</Text>
      </View>
    );
```

Now if you refresh your app, you should be directed to a page that tells you
you aren't logged in. The `render()` function is what a component runs in order
to generate a UI element from each component. Since we modified the `render()`
function of our main component, it's showing the view that we specified (since
`this.state.username` will always be empty string).

Before we allow the user to actually register a username, let's clean up our
code a little bit. Even though our `render()` function isn't particularly messy,
we can restructure a few things to make our intent even more clear:

```javascript
  _renderLogin() {
    return (
      <View style={styles.container}>
        <Text>You are not logged in.</Text>
      </View>
    );
  }

  render() {
    if (!this.state.username) return this._renderLogin();
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        ...
    );
  }
```

We just created our first small abstraction! And our intent is very clear: if
there is no username in our state, render the login page.

Let's take this a step further and create a separate component for the login
screen. First we need to modify our file structure in order to keep organized.
Create a new folder called `screens` and a file within that folder called
`Login.js`. Then populate that file with the code from
[my Login screen](./screens/Login.js).

We wrote our login screen, but nothing happened! In order for our new component
to show, we need to integrate it into our `App.js` code. At the top of your
`App.js`, add this line: `import Login from './screens/Login';`. It's important
that you capitalize the `Login`, since React won't work if it's lowercase.

Now we can use the `Login` component in our app! Go ahead and modify our
`_renderLogin()` function to be this:

```javascript
  _renderLogin() {
    return (
      <Login />
    );
  }
```

Woo, we just finished our first component! Unfortunately, it doesn't quite work
as expected. This is because we have a line in `./screens/Login.js` that reads:
`onSubmitEditing={() => this.props.register(this.state.username)}`, but
`this.props.register` doesn't exist.

In order to fix this, we can define this property in `App.js` like this:

```javascript
  _renderLogin() {
    return (
      <Login register={ username => this.setState({ username }) } />
    );
  }
```

Now we pass a function down to the `Login` component that updates the `username`
property in the `state`. If this looks like gibberish to you, these articles on
[ES6 Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions),
[Object notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer),
and [`setState()`](https://facebook.github.io/react/docs/react-component.html#setstate)
may be useful.

Congrats, you've finished our simple login flow!

### Writing the chat screen
Now let's create the meat of our app, the chat screen. Rather than writing it in
`App.js`, put it in our `/screens` directory as `Chat.js`. Go ahead and copy my
code from [`Chat-Starter.js`](./screens/Chat-Starter.js) into your
`screens/Chat.js` file. There are a lot of new concepts in this file, so try to
read through it. You may find these articles on
[template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals),
[`Array.prototype.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
[`Function.prototype.bind()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind), and
[TextInput](https://facebook.github.io/react-native/docs/textinput.html)
helpful. Feel free to post an issue if you don't understand anything, or would
do something different yourself :smiley:

You may have noticed that this screen also expects a few `props`, namely
`username`, `chats`, `sendMessage`, and `logout`. It's time to add our chat
screen into `App.js`, making sure to pass it these expected values.

First, import the component by adding `import Chat from './screens/Chat';`, then
modify the `render()` function in `App.js` so that it looks like this:

```javascript
  render() {
    if (!this.state.username) return this._renderLogin();
    else return this._renderChat();
  }
```

Look at how nice and succinct our `render()` function is! Now we need to write
the `_renderChat()` function:

```javascript
  _renderChat() {
    return (
      <Chat
        username={this.state.username}
        chats={this.state.chats}
        sendMessage={this._sendMessage.bind(this)}
        logout={() => this.setState({ username: '' })}
      />
    );
  }
```

Lastly, we need to write the `_sendMessage()` function. For now, we'll just
push a value to the array in `state` (using the
[spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)):

```javascript
  _sendMessage(message) {
    this.setState({
      chats: [
        ...this.state.chats,
        {
          id: this.state.chats.length,
          username: this.state.username,
          text: message,
        },
      ]
    });
  }
```

Now everything should work!

### Quick recap
Alright, let's do a quick overview of everything our app does so far.

- The `state` object in `App.js` is initialized with a blank username and empty
chats
- The user is redirected to our `<Login/>` screen as long as the username is
empty
- The `<Login/>` screen is passed a function (via its props) called `register`,
which updates the `App.js` state to its argument
- Once a user is "logged in" (has a username), they are redirected to the
`<Chat/>` screen
- The `<Chat/>` screen has as `sendMessage` function that updates the `App.js`
state, pushing a new object to the `chats` array
- The `<Chat/>` screen is also passed a prop called `logout`, which is a function
that logs out the user by updating the `App.js` state with an empty username

Everything functions, but the design could use some work...

### Creating a Message component
So far, we've created a couple of components (`Login` and `Chat`) that function
as full screens. But let's also create a `Message` component that will be used
within our `Chat` component.

*Whoa!*

Turns out components are *composable*, meaning they can be nested or used in
arbitrary combinations.

Create a new directory called `components` in this directory. The `screens`
directory contains the components that form full pages, whereas `components`
will contain smaller components that can be used to build the pages.

Within `/components`, create a file called `Message.js`, with the following
code:

```javascript
import React from 'react';
import { Text, } from 'react-native';

export default (props) => (
  <Text>{`${props.username}: ${props.text}`}</Text>
);
```

*How is that a component if it doesn't use `React.Component` as a base?*

Well, all React components are just functions that return elements. By using
`React.Component` as a base, you get lots of cool functionality (like `state`,
and [more](https://facebook.github.io/react/docs/react-component.html)). But any
function that return an element is a valid component. Components (like
`Message`) that return purely based on their props are often referred to as
*stateless functional components*, *pure components*, *presentational
components*, or *dumb components*.

We can add our `Message` component into our `Chat` screen by adding
`import Message from '../components/Message';` to our `screens/Chat.js` file,
then changing:

```javascript
        <ScrollView style={styles.chats}>
          {this.props.chats.map(x => <Text key={x.id}>{x.text}</Text>)}
        </ScrollView>
```

to

```javascript
        <ScrollView style={styles.chats}>
          {this.props.chats.map(x => <Message key={x.id} {...x} />)}
        </ScrollView>
```

Now each message is rendered as a separate `<Message/>` component! Feel free to
style your own `Message` component, or use [mine](./components/Message.js).

### Hooking up to a backend
Now our app is done, but each user can only post messages to their own local
`state`. Let's hook our app up to a backend so people can post messages to a
server that can be accessed by other people!

I already wrote a basic server for this project, and you can [check out the
code](../server) if interested. If you POST a valid object to any endpoint, it
will add it to the chat database. If you GET any endpoint, it will return an
array of chats. Follow the instructions in the backend's README to start the
backend server (it runs on port 8080 by default, but feel free too change the
port in [server.js](../server/server.js)).

In order to get our app to communicate with our backend, we'll need to use some
HTTP calls with
[`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).
We could add these functions to `App.js`, but it would be better to abstract
them out into a separate `api` folder. So go ahead and create this directory as
well as a file called `api.js`. Use [my implementation](./api/api.js), or feel
free to write your own. If you choose to use mine, you'll also need a [Config
file](./constants/Config.js) at `/constants/Config.js`.

Import our api calls into `App.js` with `import { getChats, postChat, } from
'./api/api';`, then we can use them to communicate between our app and the
backend. Modify our `_sendMessage()` function to look like this:

```javascript
  _sendMessage(message) {
    postChat({
      username: this.state.username,
      text: message,
    });
  }
```

Since we had previously abstracted out a function to send messages, swapping for
a new implementation was easy! This allows us to add new messages to the server,
but we need a way to get the messages as well. The standard way would be to use
[sockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API), but
we're going to use a technique called long polling (requesting every *n*
seconds) since it's easier to see the effects.

We can declare our poll interval at the top of `App.js` with a line that reads
`const POLL_INTERVAL = 500;`. I used an interval of a half-second, but feel free
to use any value you want.

Then in `App.js`, create a new function called `componentWillMount()` defined as:

```javascript
  componentWillMount() {
    this.interval = setInterval(() => {
      getChats().then(chats => this.setState({ chats }))
    }, POLL_INTERVAL)
  }
```

[`componentWillMount()`](https://facebook.github.io/react/docs/react-component.html#componentwillmount)
is a special function that is called automatically by React when a component
first mounts. We set an interval that calls our `getChats()` function every
`POLL_INTERVAL` seconds. We store this interval as part of the component, so we
can clear the interval in `componentWillUnmount()` once the component unmounts:

```javascript
  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }
```

And now we're finished! Congrats on writing your first full app!

## Wrapping Up
To wrap up, here's what our app does:

- The `state` object in `App.js` is initialized with a blank username and empty
chats
- The user is redirected to our `<Login/>` screen as long as the username is
empty
- The `<Login/>` screen is passed a function (via its props) called `register`,
which updates the `App.js` state to its argument
- Once a user is "logged in" (has a username), they are redirected to the
`<Chat/>` screen
- The `<Chat/>` screen has as `sendMessage` function that updates the `App.js`
state, pushing a new object to the `chats` array
- The `<Chat/>` screen is also passed a prop called `logout`, which is a function
that logs out the user by updating the `App.js` state with an empty username
- We fetch a new `chats` array every `POLL_INTERVAL` milliseconds
- Every time the `chats` array in `<Chat/>` is updated, we `map()` through the
values and create a `<Message/>` for each message
- When the user sends a message, we use our `postMessage()` API call to send it
to the backend

Hopefully this seminar/repo has helped you understand abstractions and why we
component libraries like React are so popular.

Feel free to send a PR if you think something in this lesson can be improved!
