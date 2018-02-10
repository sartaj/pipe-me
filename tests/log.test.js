import test from 'ava'
import { log } from '../side-effects'
import { fromPromise } from '../create'

const fetch1 = async () => true

test('log should console log', async t => {
  console.log = (...args) => {
    t.true(args[0])
  }
  const data1 = fromPromise(fetch1())
  log(data1)
})