import test from 'ava'
import { scan } from '../lib/index'

const fetch1 = async () => true

test('misnamed api methods should fail gracefully', async t => {
  t.throws(scan)
})