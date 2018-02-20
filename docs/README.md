# pipe-me

[![npm](https://img.shields.io/npm/v/pipe-me.svg)]()
[![Build Status](https://travis-ci.org/sartaj/pipe-me.svg?branch=master)](https://travis-ci.org/sartaj/pipe-me)
[![GitHub issues](https://img.shields.io/github/issues/sartaj/pipe-me.svg)](https://github.com/sartaj/pipe-me/issues)
[![codecov](https://codecov.io/gh/sartaj/pipe-me/branch/master/graph/badge.svg)](https://codecov.io/gh/sartaj/pipe-me)
![Dependencies](https://img.shields.io/david/sartaj/pipe-me.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/sartaj/pipe-me/badge.svg)](https://snyk.io/test/github/sartaj/pipe-me)

`pipe-me` is a clean & functional way to describe interactions with code.

```javascript
import { fromEvent, filter, map, merge, sideEffect } from 'pipe-me'

import { getRandomFruit, getCurrentDateTime } from './utils'
import { renderDOM } from './dom'

const buttonClicked = fromEvent(document, 'click')
  |> filter(event => event.target.tagName === 'BUTTON')
  |> map(() => ({ date: getCurrentDateTime(), fruit: getRandomFruit() }))

buttonClicked
  |> sideEffect(renderDOM)

buttonClicked
  |> sideEffect(state => console.log(state))
```

[See Live Demo](http://sartaj.me/pipe-me/examples/convert-fruit/)


## Features

* **UNIX FTW**: Describe your entire app with streams and pipes. And by mixing with [flow](https://flow.org/) for type annotations, You can create beautiful streams of functions based on beautiful data structures.
* **No Framework Lock In** — Under the hood, `pipe-me` merely uses the [pipeline operator](https://github.com/tc39/proposal-pipeline-operator) and [callbags](https://github.com/callbag/callbag). To move off of `pipe-me`, or to extend it, you can use anything in the [callbag universe](https://github.com/callbag/callbag/wiki).
* **Simplified Function Names**: This is designed to be a starter kit for callbags, with a focus on naming functions in a way that tries to keep analogies and concepts unified and designed for modeling complex interactions in apps.
* **Graphical Code Annotations**: Graphic code annotations make understanding different functions a lot easier.  <br> <img src="http://sartaj.me/pipe-me/assets/readme/flatten.gif" /> <br> <img src="http://sartaj.me/pipe-me/assets/readme/concat.png" />

### Callbag Features

By using [callbags](https://github.com/callbag/callbag) under the hood, we get all the benefits of callbags.

* **Support Reactive & Interactive Programming:** Callbags as a spec supports promises/async, iterators/generators, events, & observables to provide a hybrid of reactive and interactive programming.
* **Chain Everything**: Working just like Rx.js, `var`/`let`/`const` can be used to create chains of callbags that describe your app clearly. If you are new to JavaScript, this library may sound complicated, but bear with it. Do you know how to use spreadsheets? Well then, you already understand the basics concepts behind this library.
* **Fast:** Approximately [as fast as](https://github.com/staltz/callbag-basics/tree/master/perf) xstream and RxJS.
* **Modular**: Everything is a utility function based on the callbag spec, so no core library is needed.

## Main Concepts

If you are new to paradigms like this (found in systems like RxJS and IxJS), sometimes it can be hard to remember the purpose of different operators. To simplify this, you can import from 5 different categories.

* **Create**: Create callbags from a number of sources, including Promises, Generators, etc.
* **Side Effects**: Only way to have data affect external world, including UI. Only two methods are `sideEffect`, and `log`.
* **Transforms**: Change the content of your data.
* **Filters**: Filter out data based on different criteria. Includes different timer operators, like time based ones like `throttle`.
* **Combiners**: Combine 2 or more callbags into with different techniques.

## Installation

### Try Out

Clone this repo. Run `yarn` or `npm install`. Then `yarn example`. Then click the button in the example and watch the DOM and console both print at the same time with such little effort.

### Install

#### Yarn/npm

```bash
yarn add pipe-me
```

```bash
npm install pipe-me --save
```

#### Babel

To use the [pipeline operator](https://github.com/tc39/proposal-pipeline-operator), you'll need to add the [pipeline-operator plugin](https://github.com/babel/babel/tree/master/packages/babel-plugin-proposal-pipeline-operator) to your babel config. We would also recommend installing [babel-flow](http://flow.org) for clean data structures.

##### Fresh Install

For setting up from scratch, the following should be adequate.

```json
yarn add @babel/cli @babel/preset-env @babel/preset-plugin-proposal-pipeline babel-preset-flow  --dev
```

```json
{
    "presets": ["@babel/preset-env", "flow"],
    "plugins": ["@babel/plugin-proposal-pipeline-operator"]
}
```

###### CLI

```bash
yarn run babel src/ -- -d lib/
```

## Goals

### Designed For

* Beginners who may have just fairly new to programming, but have completed either an online intensive or code school.
* Anyone, including experts, who want to code with [UNIX Principles](http://www.faqs.org/docs/artu/ch01s06.html) in mind.

### Purpose

The purpose of `pipe-me` is to provide an API design with gradual learning in mind. Currently, the API is mostly using operators found in [callbag-basics](https://github.com/staltz/callbag-basics) as a proof of concept. Over time, parts of this may diverge, as I intend to survey multiple code school students on their understanding of different names.

### Is This Standard JavaScript?

While `pipe-me` makes opinions on naming conventions of operators, under the hood is just a mash of two proposal specs, the [pipeline operator](https://github.com/tc39/proposal-pipeline-operator), and [callbags](https://github.com/callbag/callbag). 

In terms of the the [pipeline operator](https://github.com/tc39/proposal-pipeline-operator), it is currently a TC39 proposal, similar to object spread. So technically it is subject to change. However, based on [the issues in the proposal](https://github.com/tc39/proposal-pipeline-operator/issues), most concerns are around how to handle the `await` syntax and multiple parameters. These issues are a mute point in `pipe-me`, because by using the `callbag` spec, all of our non combining operators are single parameter, and `async/await` is handled by the `fromIterable` and `fromAsync` operator.

In terms of the actual operators themselves, the far majority of the magic here is possible because of André Staltz's brilliant [callbag](https://github.com/callbag/callbag) spec. Because callbags are functional compositions, and because pipeline operators are just function compositions under the hood, any callbag can be used with pipeline operators.

This actually means you can use this library with any other callbag library to unleash this awesome writing style in JS.

-----

# Create

Create multi-casted callbags from multiple sources.

```js
import { fromEvent, fromPromise, fromObservable, fromIterable } from 'pipe-me'
import { fromEvent, fromPromise, fromObservable, fromIterable } from 'pipe-me/create'
```

## fromObservable

Convert from Observables in Rx.js, xstream, or anything with a `subscribe` method.

```js
import { Observable } from 'rxjs'
import { fromObservable } from 'pipe-me/create'

const observed = fromObservable(Observable.of([0, 1, 2])
```

## fromIterable

aka(ish): fromArray & fromGeneratorFunction

Create from Iterable things like generators and arrays
```js
import { Observable } from 'rxjs'
import { fromIterable } from 'pipe-me/create'

function* generate(i) {
    yield i*2;
}
const myArray = [0, 1, 2]
const fromGenerator = fromIterable(generate(2)) // 4

const fromArray = fromIterable(myArray) // 0
                                        // 1
                                        // 2
```

## fromEvent

Get data from any event listener.

```js
import { fromEvent } from 'pipe-me/create'
const buttonClicked = fromEvent(document, 'click')
    |> filter(event => event.target.tagName === 'BUTTON')
```

## fromPromise

Create stream from a Promise.

```js
import { fromPromise } from 'pipe-me/create'
const promiseResolved = fromPromise(Promise.resolve([0, 1, 2])
```

-----

# Side Effects

Side effects are the only place you can make a change.

```js
import { sideEffect, log } from 'pipe-me'
import { sideEffect, log } from 'pipe-me/side-effects'
```


## sideEffect

Side effects are reactions to your data flow. Things like actual
user interface code (`<div></div>`), the browser url bar, network requests,
LED lights turning on, etc. Create any side effect here.

![Diagram for map](https://github.com/sartaj/pipe-me/blob/master/docs/assets/diagrams/sideEffect.png?raw=true)

## log

Shortcut for sideEffect((data) => { console.log(data) })

-----

# Transforms

Change the contents of a stream.

```js
import { map, accumulate } from 'pipe-me'
import { map, accumulate } from 'pipe-me/transforms'
```

## map

Whenever you want to transform/change the contents of your stream, you'll use map.

![Diagram for map](https://github.com/sartaj/pipe-me/blob/master/docs/assets/diagrams/map.png?raw=true)

***(aka transforming streams)***

## accumulate

aka(ish): Rx: 'scan' | Arrays: 'reduce'

This allows you to build up data over time.

![Diagram for map](https://github.com/sartaj/pipe-me/blob/master/docs/assets/diagrams/accumulate.png?raw=true)

## flatten

Sometimes, the contents of source may be another stream. As in, a stream within a stream.

![](https://github.com/sartaj/pipe-me/blob/master/docs/assets/memes/stream-in-stream.jpg?raw=true)

`flatten` can make that data the main stream.

### Example

```javascript
const fetchData = fromPromise(callAPI)

// This has fetchData Stream itself, not it's contents.
const dataStreamRetrieved = userClicked.map(fetchData)

// This actually has the data.
const dataRetrieved = flatten(dataStreamRetrieved)
```

### In Other Worlds

#### Observables

`|> map() |> flatten` is another way to do `flatMap`/`switchMap`.

#### Arrays

`Array.flatten` will flatten arrays within arrays.

-----

# Filters

Filter stream emitting based on conditionals.

```js
import { take, skip, filter } from 'pipe-me'
import { take, skip, filter } from 'pipe-me/filters'
```

## take

A filter to take only what you need.

```javascript
// Will take only first 5 clicks
const userClicked = listenToClick() |> take(5)
```

## skip

Ignores the first n of the source.

```javascript
// Ignore first 5 clicks
const userClicked = listenToClick() |> skip(5)
```

## filter

Filter data based on truthy/falsy condition

```javascript
fromIterable([1,2,3,4,5])
    |> filter(x => x % 2);
    |> log // 1
           // 3
           // 5
```

-----

# Combiners

Combine multiple streams into new streams.

```js
import { merge, concat, combine, flatten } from 'pipe-me'
import { merge, concat, combine, flatten } from 'pipe-me/combiners'
```

## merge

Merges data from multiple callbag sources. Designed more for listening sources (like fromEvent)

```js
const userWantsToSubmit = merge(userClickedSubmit, userPressedEnter);

userWantsToSubmit |> log // click event
                         // keyboard enter event
                         // keyboard enter event
                         // click event
                         // etc...
```

## concat

Combine sources by putting one source after the previous source ends..

![Diagram for concat](https://github.com/sartaj/pipe-me/blob/master/docs/assets/diagrams/concat.png?raw=true)

## combine

Get the latest value from multiple streams as an array.

```javascript
const state = combine(uiStream, serverStream, userStream);
state |> log // [uiState, serverState, userStream]
```
