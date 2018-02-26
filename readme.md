# pipe-me

[![npm](https://img.shields.io/npm/v/pipe-me.svg)](https://npmjs.org/pipe-me)
[![Build Status](https://travis-ci.org/sartaj/pipe-me.svg?branch=master)](https://travis-ci.org/sartaj/pipe-me)
[![GitHub issues](https://img.shields.io/github/issues/sartaj/pipe-me.svg)](https://github.com/sartaj/pipe-me/issues)
[![codecov](https://codecov.io/gh/sartaj/pipe-me/branch/master/graph/badge.svg)](https://codecov.io/gh/sartaj/pipe-me)
[![Dependencies](https://img.shields.io/david/sartaj/pipe-me.svg)](https://david-dm.org/sartaj/pipe-me)
[![Known Vulnerabilities](https://snyk.io/test/github/sartaj/pipe-me/badge.svg)](https://snyk.io/test/github/sartaj/pipe-me)

`pipe-me` is a clean & functional way to describe interactions in JavaScript.

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

* **UNIX(ish) FTW**: Describe your entire app as functions over time with streams and pipes.
* **More Design Pattern than Framework** — Under the hood, `pipe-me` merely uses the [pipeline operator](https://github.com/tc39/proposal-pipeline-operator) and [callbags](https://github.com/callbag/callbag). To move off of `pipe-me`, or to extend it, you can use anything in the [callbag universe](https://github.com/callbag/callbag/wiki).
* **Simplified Language Design**: This is designed to be a starter kit for callbags, with a focus on naming functions in a way that tries to keep analogies and concepts unified and designed for modeling complex interactions in apps.
* **Elm in JS**: By mixing with [flow](https://flow.org/) for type annotations, JavaScript is given all the major syntax features [elm](https://elm-lang.org), allowing you to create beautiful streams of functions based on beautiful data structures.
* **Streams For Interactive Apps**: All of `pipe-me` creators [multicast](https://blog.angularindepth.com/rxjs-understanding-the-publish-and-share-operators-16ea2f446635), aka [share](https://github.com/staltz/callbag-share), by default. This works well for modeling [dataflow](https://staltz.com/why-we-need-callbags.html#interoperability) between interactions.
* **Graphical Code Annotations**: Graphic code annotations make understanding different functions a lot easier.  <br> <img src="http://sartaj.me/pipe-me/assets/readme/flatten.gif" /> <br> <img src="http://sartaj.me/pipe-me/assets/readme/concat.png" />

### Callbag Features

By using [callbags](https://github.com/callbag/callbag) under the hood, we get all the benefits of callbags.

* **Support Reactive & Interactive Programming:** Callbags as a spec supports promises/async, iterators/generators, events, & observables to provide a hybrid of reactive and interactive programming.
* **Chain Everything**: Working just like Rx.js, `var`/`let`/`const` can be used to create chains of callbags that describe your app clearly. If you are new to JavaScript, this library may sound complicated, but bear with it. Do you know how to use spreadsheets? Well then, you already understand the basics concepts behind this library.
* **Fast:** Approximately [as fast as](https://github.com/staltz/callbag-basics/tree/master/perf) xstream and RxJS.
* **Modular**: Everything is a utility function based on the callbag spec, so no core library is needed.

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

## Main Concepts

If you are new to paradigms like this (found in systems like RxJS and IxJS), sometimes it can be hard to remember the purpose of different operators. To simplify this, you can import from 5 different categories.

* **Create**: Create callbags from a number of sources, including Promises, Generators, etc.
* **Side Effects**: Only way to have data affect external world, including UI. Only two methods are `sideEffect`, and `log`.
* **Transforms**: Change the content of your data.
* **Filters**: Filter out data based on different criteria. Includes different timer operators, like time based ones like `throttle`.
* **Combiners**: Combine 2 or more callbags into with different techniques.

## Language Design

`pipe-me` is designed with the hope of having a gradual learning curve for beginner js developers with little background in computer science or functional programming, while maximizing use of proper [callbags](https://github.com/callbags/callbags) and [UNIX-like Principles](http://www.faqs.org/docs/artu/ch01s06.html) for professional app development.

### Current Problem

The world of Observables, FRP, and related systems have a huge learning curve for many beginner coders.

Part of this may be due to the size of operations and complex amount of analogies used within the world.

* Water utilities (streams, pipes, backpressure, pool, sources, sinks)
* Radio systems (subscribe, publish, observable, signals)
* Grammar (subject, predicate)
* Paper (foldp, fold)
* Sensory (observable, observe)
* Computer hardware related (drivers, ports)
* Math + Lambda Calculus (map, flatten)
* And sheer mind games (wtf is a flatmap)

### `pipe-me` API Goals

* Simple language for basic English speakers and bare bones computer science / js knowledge, focusing on stream and first class event variables.
* Commit to internally consistent analogy.
* Maximize pipe syntax to mimic UNIX pipes.
* Allow for gradual learning of inner workings of callbag spec.

### Is This Standard JavaScript?

While `pipe-me` makes opinions on naming conventions of operators, under the hood is just a mash of two proposal specs, the [pipeline operator](https://github.com/tc39/proposal-pipeline-operator), and [callbags](https://github.com/callbag/callbag). 

In terms of the the [pipeline operator](https://github.com/tc39/proposal-pipeline-operator), it is currently a TC39 proposal, similar to object spread. So technically it is subject to change. However, based on [the issues in the proposal](https://github.com/tc39/proposal-pipeline-operator/issues), most concerns are around how to handle the `await` syntax and multiple parameters. These issues are a mute point in `pipe-me`, because by using the `callbag` spec, all of our non combining operators are single parameter, and `async/await` is handled by the `fromIterable` and `fromAsync` operator.

In terms of the actual operators themselves, the far majority of the magic here is possible because of André Staltz's brilliant [callbag](https://github.com/callbag/callbag) spec. Because callbags are functional compositions, and because pipeline operators are just function compositions under the hood, any callbag can be used with pipeline operators.

This actually means you can use this library with any other callbag library to unleash this awesome writing style in JS.

### Inspirations

* rxjs
* cycle.js
* kefir.js
* xstream
* elm
* cycle-react
* react.js

## [API Docs](http://sartaj.me/pipe-me)
