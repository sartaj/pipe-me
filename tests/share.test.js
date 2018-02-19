import test from 'ava'
import browserEnv from 'browser-env'

import { fromEvent, sideEffect, fromIterable, fromPromise, fromObservable } from '../index' 

browserEnv()

test.cb('fromEvent share', t => {
  t.plan(1)
  const div = document.createElement('div')
  const userClicked = fromEvent(div, 'click')

  div.click()

  sideEffect(async e => {
    await e;
  })(userClicked)

  setTimeout(() => {
    sideEffect(async e => {
      await e;
      t.pass()
      t.end()
    })(userClicked)
  }, 50)


  setTimeout(() => {
    div.click()
  }, 100)
})

test.cb('fromIterable share', t => {
  t.plan(1)
  const numberArray = fromIterable([0, 1, 2])

  sideEffect(async e => {
    await e;
  })(numberArray)

  setTimeout(() => {
    sideEffect(async e => {
      if( e === 1 ) {
        t.pass()
        t.end()  
      };
    })(numberArray)
  }, 50)
})

test.cb('fromPromise share', t => {
  t.plan(1)
  const numberArray = fromPromise(Promise.resolve(2))

  sideEffect(async e => {
    await e;
  })(numberArray)

  setTimeout(() => {
    sideEffect(async e => {
      if( e === 2 ) {
        t.pass()
        t.end()  
      };
    })(numberArray)
  }, 50)
})

test.cb('fromObservable share', t => {
  const mock = {
    subscribe: (observer) => {
      let i = 0;
      let id = setInterval(() => observer.next(i++), 50);
      return function unsubscribe() {
        clearInterval(id);
      };
    }
  }
  t.plan(1)
  const numberArray = fromObservable(mock)

  sideEffect(async e => {
    await e;
  })(numberArray)

  setTimeout(() => {
    sideEffect(async e => {
      if( e === 2 ) {
        t.pass()
        t.end()  
      };
    })(numberArray)
  }, 50)
})

