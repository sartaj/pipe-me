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
 *  # `pipe-me`
*/
module.exports = {
  // Create
  /**
    # fromObservable
  */
  fromObservable: (...args) => share(fromObservable(...args)),

  /**
    # fromObservable
  */
  fromIterable: (...args) => share(fromIterable(...args)),

  /**
    # fromObservable
  */
  fromEvent: (...args) => share(fromEvent(...args)),

  /**
    # fromPromise
  */
  fromPromise: (...args) => share(fromPromise(...args)),

  /**
    # `sideEffect`
    Side effects are reactions to your data flow. Things like actual
    user interface code (`<div></div>`), the browser url bar, network requests,
    LED lights turning on, etc. Create any side effect here.
    
    ![Diagram for map](https://github.com/sartaj/pipe-me/blob/feature/inline-docs/docs/assets/diagrams/sideEffect.png?raw=true)
   */
  sideEffect: require('callbag-for-each'),

  /**
    # `log`
    Shortcut for sideEffect((data) => { console.log(data) })
   */
  log: (res) => forEach(((...args) => console.log(...args)))(res),

  /**
    # `map`
    ### ***(aka transforming streams)***
   
    Whenever you want to transform/change the contents of your stream, you'll use map.
    
    ![Diagram for map](https://github.com/sartaj/pipe-me/blob/feature/inline-docs/docs/assets/diagrams/map.png?raw=true)
    
   */
  map: map,

  /**
    # `accumulate`
    aka(ish): Rx: 'scan' | Arrays: 'reduce'
   
    This allows you to build up data over time.
    ![Diagram for map](https://github.com/sartaj/pipe-me/blob/feature/inline-docs/docs/assets/diagrams/map.png?raw=true)
   */
  accumulate: require('callbag-scan'),

  /**
    # `flatten`
    
    ![](https://raw.githubusercontent.com/sartaj/pipe-me/feature/inline-docs/docs/assets/memes/stream-in-stream.jpg)
    
    Sometimes, the contents of your callbag stream may be another stream.
    
    ```js
     const fetchData = fromPromise(callAPI)
   
     // This has fetchData Stream itself, not it's contents.
     const dataStreamRetrieved = userClicked.map(fetchData)
    ```
   
    `flatten` can make that data the main stream.
    
    ```
     // This actually has the data.
     const dataRetrieved = flatten(dataStreamRetrieved)
    ```
    
    ## AKA
   
    ### Observables
    `|> map() |> flatten` is another way to do 'switchTo' in this library, also known as `flatMap` and `switchMap`.
    
    ### Arrays
    `Array.flatten` will flatten arrays within arrays.
  */
  flatten: require('callbag-flatten'),

  /**
    # `flatten`
    
    ![](https://raw.githubusercontent.com/sartaj/pipe-me/feature/inline-docs/docs/assets/memes/stream-in-stream.jpg)
    
    Sometimes, the contents of your callbag stream may be another stream.
    
    ```js
     const fetchData = fromPromise(callAPI)
   
     // This has fetchData Stream itself, not it's contents.
     const dataStreamRetrieved = userClicked.map(fetchData)
    ```
   
    `flatten` can make that data the main stream.
    
    ```
     // This actually has the data.
     const dataRetrieved = flatten(dataStreamRetrieved)
    ```
    
    ## AKA
   
    ### Observables
    `|> map() |> flatten` is another way to do 'switchTo' in this library, also known as `flatMap` and `switchMap`.
    
    ### Arrays
    `Array.flatten` will flatten arrays within arrays.
   */
  take: require('callbag-take'),

  /**
    # skip
   */
  skip: require('callbag-skip'),

  /**
    # filter
   */
  filter,

  // /**
  //   # switchTo
  //  */
  // switchTo: res => map(() => res)(flatten),

  /**
    # merge
   */
  merge: require('callbag-merge'),

  /**
    # concat
   */
  concat: require('callbag-concat'),

  /**
    # combine
   */
  combine: require('callbag-combine')
}

