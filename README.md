# pipe-me

Pipeable programming for cleaner code.

## Example

```javascript
import { fromEvent, filter, map, merge, sideEffect } from 'pipe-me'

const renderUI = (coordinates) => {
  const div = document.createElement(div)
  div.innerHTML = coordinates
  document.body.appendChild(coordinates)
}

const buttonClicked = fromEvent(document, 'click')
  |> filter(event => event.target.tagName === 'BUTTON'),
  |> map(event => ({x: event.clientX, y: ev.clientY}))

buttonClicked
  |> sideEffect(renderUI)

buttonClicked
  |> sideEffect((state) => console.log(state))

```

## Ways to Import

If you are new to paradigms like this (found in systems like RxJS and IxJS), sometimes it can be hard to remember the purpose of different operators. To simplify this, you can import from 5 different categories.

```js
import { ... } from 'pipe-me'
import { map, accumulate } from 'pipe-me/transforms'
import { take, skip, filter } from 'pipe-me/filters'
import { fromObservable, fromAsync, fromIterable, fromEvent, fromPromise } from 'pipe-me/create'
import { merge, concat, combine, switchTo, flatten } from 'pipe-me/combiners'
```

## Quick Set Up Babel

```json
yarn add @babel/cli @babel/preset-env @babel/preset-plugin-proposal-pipeline --dev
```

```json
{
    "presets": ["@babel/preset-env"],
    "plugins": ["@babel/plugin-proposal-pipeline-operator "]
}
```

## Details

You don't have to use this library to unleash this awesome writing style in JS. The far majority of the magic here is possible because of André Staltz's brilliant [callbag](https://github.com/callbag/callbag) protocol. To have this kind of JS code, you just need to want to use callbags and pipeable operators.

The purpose of `pipe-me` is to provide an API design with gradual learning in mind. Currently, the API is mostly using operators found in [callbag-basics](https://github.com/staltz/callbag-basics) as a proof of concept. Over time, parts of this may diverge, as I intend to survey multiple code school students on their understanding of different names.