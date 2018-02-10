import test from 'ava'
import path from 'path'

const API_SPEC = {
  'index': [
    'fromObservable',
    'fromIterable',
    // 'fromAsync',
    'fromEvent',
    'fromPromise',
    'sideEffect',
    'log',
    'map',
    'accumulate',
    'scan',
    'flatten',
    'take',
    'skip',
    'filter',
    // 'switchTo',
    'merge',
    'concat',
    'combine'
  ],
  'create': [
    'fromObservable',
    // 'fromAsync',
    'fromIterable',
    'fromEvent',
    'fromPromise'
  ],
  'filters': [
    'take', 
    'skip',
    'filter'
  ],
  'side-effects': [
    'sideEffect',
    'log'
  ],
  'transforms': [
    'map',
    'accumulate'
  ],
  'combiners': [
    'merge',
    'concat',
    'combine',
    // 'switchTo',
    'flatten'
  ]
}

test('Verify API', t => {
  Object.keys(API_SPEC)
    .map(apiName => {
      const apiPath = require.resolve(path.join('../', `${apiName}.js`))
      const api = require(apiPath)
      const spec = API_SPEC[apiName]

      Object.keys(api).forEach(operator => {
        t.truthy(spec.indexOf(operator) > -1)
      })
    })
})
