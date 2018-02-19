const flatten = require('callbag-flatten')
const map = require('callbag-map')
const forEach = require('callbag-for-each')
const share = require('callbag-share')
const fromObservable  = require('callbag-from-obs')
const fromIterable = require('callbag-from-iter')
const fromEvent = require('callbag-from-event')
const fromPromise = require('callbag-from-promise')
const filter = require('callbag-filter')

/**
 *  # THIS IS MY MODULE
*/
module.exports = {
  // Create
  fromObservable: (...args) => share(fromObservable(...args)),
  fromIterable: (...args) => share(fromIterable(...args)),
  fromEvent: (...args) => share(fromEvent(...args)),
  fromPromise: (...args) => share(fromPromise(...args)),
  // fromAsync: fromPromise,

  // Side Effects

  /**
   * # `sideEffect`
   * Side effects are reactions to your data flow. Things like actual
   * user interface code (`<div></div>`), the browser url bar, network requests,
   * LED lights turning on, etc. Create any side effect here.
   * 
   * ![Diagram for map](https://github.com/sartaj/pipe-me/blob/feature/inline-docs/docs/assets/diagrams/sideEffect.png?raw=true)
   *
   */
  sideEffect: require('callbag-for-each'),

  /**
   * # `log`
   * Shortcut for sideEffect((data) => { console.log(data) })
   */
  log: (res) => forEach(((...args) => console.log(...args)))(res),

  /**
   * # `map`
   * ### ***(aka transforming streams)***
   *
   * Whenever you want to transform/change the contents of your stream, you'll use map.
   * 
   * ![Diagram for map](https://github.com/sartaj/pipe-me/blob/feature/inline-docs/docs/assets/diagrams/map.png?raw=true)
   * 
   */
  map: map,

  /**
   * # `accumulate`
   * aka(ish): Rx: 'scan' | Arrays: 'reduce'
   *
   * This allows you to build up data over time.
   * ![Diagram for map](https://github.com/sartaj/pipe-me/blob/feature/inline-docs/docs/assets/diagrams/map.png?raw=true)
   */
  accumulate: require('callbag-scan'),

  /**
   * # `flatten`
   * 
   * ![](https://raw.githubusercontent.com/sartaj/pipe-me/feature/inline-docs/docs/assets/memes/stream-within-a-stream.jpg)
   * 
   * Sometimes, the contents of your callbag stream may be another stream.
   * 
   * ```js
   *  const fetchData = fromPromise(callAPI)
   *
   *  // This has fetchData Stream itself, not it's contents.
   *  const dataStreamRetrieved = userClicked.map(fetchData)
   * ```
   *
   * `flatten` can make that data the main stream.
   * 
   * ```
   *  // This actually has the data.
   *  const dataRetrieved = flatten(dataStreamRetrieved)
   * ```
   * 
   * `|> map() |> flatten` is another way to do 'switchTo' in this library, also known as `flatMap` and `switchMap`.
   * 
   */
  flatten: require('callbag-flatten'),

  /**
   * # this is a test
   */
  take: require('callbag-take'),

  /**
   * # this is a test
   */
  skip: require('callbag-skip'),

  /**
   * # this is a test
   */
  filter,

  /**
   * # this is a test
   */
  // switchTo: res => map(() => res),

  /**
   * # this is a test
   */
  merge: require('callbag-merge'),

  /**
   * # this is a test
   */
  concat: require('callbag-concat'),

  /**
   * # this is a test
   */
  combine: require('callbag-combine')
}

