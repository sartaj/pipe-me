import test from 'ava'
import path from 'path'

const API_SPEC = {
  'index': [
    'fromObservable',
    'fromIterable',
    // 'fromAsync',
    'fromEvent',
    'fromPromise',
    'share',
    'sideEffect',
    'log',
    'map',
    'accumulate',
    'scan',
    'flatten',
    'take',
    'skip',
    'filter',
    'merge',
    'concat',
    'combine'
  ],
  'create': [
    'fromObservable',
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
    'log',
    'share'
  ],
  'transforms': [
    'map',
    'accumulate'
  ],
  'combiners': [
    'merge',
    'concat',
    'combine',
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
