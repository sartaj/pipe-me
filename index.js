const flatten = require('callbag-flatten')
const map = require('callbag-map')
const forEach = require('callbag-for-each')
const share = require('callbag-share')
const fromObservable  = require('callbag-from-obs')
const fromIterable = require('callbag-from-iter')
const fromAsync = require('callbag-from-iter')
const fromEvent = require('callbag-from-event')
const fromPromise = require('callbag-from-promise')

module.exports = {
  fromObservable: (res) => share(fromObservable(res)),
  fromIterable: (res) => share(fromIterable(res)),
  fromAsync: (res) => share(fromAsync(res)),
  fromEvent: (res) => share(fromEvent(res)),
  fromPromise: (res) => share(fromPromise(res)),

  sideEffect: require('callbag-for-each'),
  log: (res) => forEach(((...args) => console.log(...args)))(res)

  map: map,
  accumulate: require('callbag-scan'),
  scan: () => throw new Error('If you meant `scan` in the Reactive Stream sense, Please use `accumulate` instead.')
  flatten: require('callbag-flatten'),
  
  take: require('callbag-take'),
  skip: require('callbag-skip'),
  filter: require('callbag-filter'),

  // switchMap: (newCallbag) => map(newCallbag)
  merge: require('callbag-merge'),
  concat: require('callbag-concat'),
  combine: require('callbag-combine'),

}