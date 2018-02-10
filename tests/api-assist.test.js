import test from 'ava'
import { scan } from '../index'

const fetch1 = async () => true

test('misnamed api methods should fail gracefully', async t => {
  t.throws(scan)
})