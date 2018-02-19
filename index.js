const flatten = require('callbag-flatten')
const map = require('callbag-map')
const forEach = require('callbag-for-each')
const share = require('callbag-share')
const fromObservable  = require('callbag-from-obs')
const fromIterable = require('callbag-from-iter')
const fromEvent = require('callbag-from-event')
const fromPromise = require('callbag-from-promise')

/**
 *  pipe-me
 *  --------------
 */
module.exports = {

  /**
   * fromObservable
   * --------------
   * 
   * Convert from Observables in Rx.js, xstream, or anything with a `subscribe` method.
   * 
   * ```js
   *     import { Observable } from 'rxjs'
   *     import { fromObservable } from 'pipe-me/create'
   * 
   *     const observed = fromObservable(Observable.of([0, 1, 2])
   * ```
   */
  fromObservable: (...args) => share(fromObservable(...args)),

  /**
   * fromIterable
   * --------------
   * 
   * aka(ish): fromArray & fromGeneratorFunction
   * 
   * Create from Iterable things like generators and arrays
   * ```js
   *    import { Observable } from 'rxjs'
   *    import { fromIterable } from 'pipe-me/create'
   * 
   *    function* generate(i) {
   *       yield i*2;
   *    }
   *    const myArray = [0, 1, 2]
   *    const fromGenerator = fromIterable(generate(2)) // 4
   * 
   *    const fromArray = fromIterable(myArray) // 0
   *                                            // 1
   *                                            // 2
   * ```
   */
  fromIterable: (...args) => share(fromIterable(...args)),

  /**
   * fromEvent
   * --------------
   * 
   * Get data from any event listener.
   * 
   * ```js
   *     import { fromEvent } from 'pipe-me/create'
   *     const buttonClicked = fromEvent(document, 'click')
   *         |> filter(event => event.target.tagName === 'BUTTON')
   * ```
   */
  fromEvent: (...args) => share(fromEvent(...args)),

  /**
   * fromPromise
   * --------------
   * 
   * Create stream from a Promise.
   * 
   * ```js
   *     import { fromPromise } from 'pipe-me/create'
   * 
   *     const promiseResolved = fromPromise(Promise.resolve([0, 1, 2])
   * ```
   */
  fromPromise: (...args) => share(fromPromise(...args)),

  /**
   * sideEffect
   * --------------
   * 
   * Side effects are reactions to your data flow. Things like actual
   * user interface code (`<div></div>`), the browser url bar, network requests,
   * LED lights turning on, etc. Create any side effect here.
   *
   * ![Diagram for map](https://github.com/sartaj/pipe-me/blob/master/docs/assets/diagrams/sideEffect.png?raw=true)
   */
  sideEffect: require('callbag-for-each'),

  /**
   * log
   * --------------
   * 
   * Shortcut for sideEffect((data) => { console.log(data) })
   */
  log: (res) => forEach(((...args) => console.log(...args)))(res),

  /**
   * map
   * --------------
   * 
   * Whenever you want to transform/change the contents of your stream, you'll use map.
   *
   * ![Diagram for map](https://github.com/sartaj/pipe-me/blob/master/docs/assets/diagrams/map.png?raw=true)
   *
   * ***(aka transforming streams)***
   */
  map: map,

  /**
   * accumulate
   * --------------
   * 
   * aka(ish): Rx: 'scan' | Arrays: 'reduce'
   * 
   * This allows you to build up data over time.
   * ![Diagram for map](https://github.com/sartaj/pipe-me/blob/master/docs/assets/diagrams/accumulate.png?raw=true)
   */
  accumulate: require('callbag-scan'),

  /**
   * flatten
   * --------------
   * 
   * Sometimes, the contents of source may be another stream. As in, a stream within a stream.
   * 
   * ![](https://github.com/sartaj/pipe-me/blob/master/docs/assets/memes/stream-in-stream.jpg?raw=true)
   * 
   * `flatten` can make that data the main stream.
   * 
   * ## Example
   * 
   * ```javascript
   *     const fetchData = fromPromise(callAPI)
   * 
   *     // This has fetchData Stream itself, not it's contents.
   *     const dataStreamRetrieved = userClicked.map(fetchData)
   * 
   *     // This actually has the data.
   *     const dataRetrieved = flatten(dataStreamRetrieved)
   * ```
   * 
   * ## In Other Worlds
   * 
   * ### Observables
   * `|> map() |> flatten` is another way to do `flatMap`/`switchMap`.
   * 
   * ### Arrays
   * `Array.flatten` will flatten arrays within arrays.
   */
  flatten: require('callbag-flatten'),

  /**
   * take
   * --------------
   *
   * A filter to take only what you need.
   * 
   * ```javascript
   *      // Will take only first 5 clicks
   *      const userClicked = listenToClick() |> take(5)
   * ```
   */
  take: require('callbag-take'),

  /**
   * skip
   * --------------
   * 
   * Ignores the first n of the source.
   * 
   * ```javascript
   *     // Ignore first 5 clicks
   *     const userClicked = listenToClick() |> skip(5)
   * ```
   */
  skip: require('callbag-skip'),

  /**
   * filter
   * --------------
   *
   * Filter data based on truthy/falsy condition
   * 
   * ```javascript
   *    fromIterable([1,2,3,4,5])
   *       |> filter(x => x % 2);
   *       |> log // 1
   *              // 3
   *              // 5
   * ```
   */
  filter: require('callbag-filter'),

  /**
   * merge
   * --------------
   * 
   * Merges data from multiple callbag sources. Designed more for listening sources (like fromEvent)
   * 
   *     const userWantsToSubmit = merge(userClickedSubmit, userPressedEnter);
   * 
   *     userWantsToSubmit |> log // click event
   *                              // keyboard enter event
   *                              // keyboard enter event
   *                              // click event
   *                              // etc...
   */
  merge: require('callbag-merge'),
  
  /**
   * concat
   * --------------
   * 
   * Combine sources by putting one source after the previous source ends..
   * 
   * ![Diagram for concat](https://github.com/sartaj/pipe-me/blob/master/docs/assets/diagrams/concat.png?raw=true)
   */
  concat: require('callbag-concat'),

  /**
   * combine
   * ---------------
   *
   * Get the latest value from multiple streams as an array.
   * 
   * ```javascript
   *     const state = combine(uiStream, serverStream, userStream);
   *     state |> log // [uiState, serverState, userStream]
   * ```
   */ 
  combine: require('callbag-combine')
}

