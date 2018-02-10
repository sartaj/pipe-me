import test from 'ava'
import { log } from '../lib/side-effects'
import { fromPromise } from '../lib/create'
import getStdIn from 'get-stdin'

const fetch1 = async () => true

test('log should console log', async t => {
  console.log = (...args) => {
    t.true(args[0])
  }
  const data1 = fromPromise(fetch1())
  log(data1)
})