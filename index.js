const flatten = require('callbag-flatten')
const map = require('callbag-map')
const forEach = require('callbag-for-each')
const share = require('callbag-share')
const fromObservable  = require('callbag-from-obs')
const fromIterable = require('callbag-from-iter')
const fromEvent = require('callbag-from-event')
const fromPromise = require('callbag-from-promise')
const filter = require('callbag-filter')

module.exports = {
  // Create
  // TODO: Make sure everything is multicast
  fromObservable: (...args) => share(fromObservable(...args)),
  fromIterable: (...args) => share(fromIterable(...args)),
  fromEvent: (...args) => share(fromEvent(...args)),
  fromPromise: (...args) => share(fromPromise(...args)),
  // fromAsync: fromPromise,

  // Side Effects

  /**
   * # Side Effect
   */
  sideEffect: require('callbag-for-each'),

  /**
   * # this is a test
   */
  log: (res) => forEach(((...args) => console.log(...args)))(res),

  /**
   * # this is a test
   */
  map: map,

  /**
   * # this is a test
   */
  accumulate: require('callbag-scan'),

  /**
   * # this is a test
   */
  scan: () => {
    throw new Error('If you meant `scan` in the Reactive Stream sense, Please use `accumulate` instead.')
  },

  /**
   * # this is a test
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

