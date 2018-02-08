# pipe-me

Pipeable programming for cleaner code.

## Example

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

## Ways To Import

If you are new to paradigms like this (found in systems like RxJS and IxJS), sometimes it can be hard to remember the purpose of different operators. To simplify this, you can import from 5 different categories.

```js
import { ... } from 'pipe-me'
import { map, accumulate } from 'pipe-me/transforms'
import { take, skip, filter } from 'pipe-me/filters'
import { fromObservable, fromAsync, fromIterable, fromEvent, fromPromise } from 'pipe-me/create'
import { merge, concat, combine, switchTo, flatten } from 'pipe-me/combiners'
import { sideEffect } from 'pipe-me/side-effects'
```

## Setup

To use the [pipeline operator](https://github.com/tc39/proposal-pipeline-operator), you'll need to set up babel with the [pipeline-operator plugin](https://github.com/babel/babel/tree/master/packages/babel-plugin-proposal-pipeline-operator).

```json
yarn add @babel/cli @babel/preset-env @babel/preset-plugin-proposal-pipeline --dev
```

```json
{
    "presets": ["@babel/preset-env"],
    "plugins": ["@babel/plugin-proposal-pipeline-operator "]
}
```

## Purpose

The purpose of `pipe-me` is to provide an API design with gradual learning in mind. Currently, the API is mostly using operators found in [callbag-basics](https://github.com/staltz/callbag-basics) as a proof of concept. Over time, parts of this may diverge, as I intend to survey multiple code school students on their understanding of different names.

## Is This Standard JavaScript?

While `pipe-me` makes opinions on naming conventions of operators, under the hood is just a mash of two proposal specs, the [pipeline operator](https://github.com/tc39/proposal-pipeline-operator), and [callbags](https://github.com/callbag/callbag). 

In terms of the the [pipeline operator](https://github.com/tc39/proposal-pipeline-operator), it is currently a TC39 proposal, similar to object spread. So technically it is subject to change. However, based on [the issues in the proposal](https://github.com/tc39/proposal-pipeline-operator/issues), most concerns are around how to handle the `await` syntax and multiple parameters. These issues are a mute point in `pipe-me`, because by using the `callbag` spec, all of our non combining operators are single parameter, and `async/await` is handled by the `fromIterable` and `fromAsync` operator.

In terms of the actual operators themselves, the far majority of the magic here is possible because of André Staltz's brilliant [callbag](https://github.com/callbag/callbag) spec. Because callbags are functional compositions, and because pipeline operators are just function compositions under the hood, any callbag can be used with pipeline operators.

This actually means you can use this library with any other callbag library to unleash this awesome writing style in JS.

## See For Yourself

Clone this repo. Run `yarn` or `npm install`. Then `yarn example`. Then click the button in the example and watch the DOM and console both print at the same time with such little effort.
