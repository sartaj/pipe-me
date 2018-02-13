import test from "ava";
import Observable from 'zen-observable';
import browserEnv from 'browser-env';
browserEnv();

import { fromPromise, fromObservable, fromIterable, fromEvent, sideEffect } from "../index";

const makeLazy = func => setTimeout(func, 30)

test.cb("fromPromise should multicast", t => {
  t.plan(1)

  const q = new Promise((resolve, reject) => {
    makeLazy(() => {
      resolve('passed')
    })    
  })

  const promiseReceived = fromPromise(q);

  makeLazy(() => {
    sideEffect(data => {
      t.pass(data)
      t.end()
    })(promiseReceived)
  })
})

test.cb("fromIterable should multicast", t => {
  t.plan(1)
  function* range(from, to) {
    let i = from;
    while (i <= to) {
      yield i;
      i++;
    }
  }

  const iterableReceived = fromIterable(range(40, 41));

  makeLazy(() => {
    sideEffect(data => {
      t.pass(data)
      t.end()
    })(iterableReceived)
  })
})

test.cb("fromObservable should multicast", t => {
  t.plan(1)

  const number$ = fromObservable(Observable.of(1, 2, 3));

  makeLazy(() => {
    sideEffect(data => {
      t.pass()
      t.end()
    })(number$)
  })
})

test.cb("fromEvent should multicast", t => {
  t.plan(1)

  const div = document.createElement('div')
  const number$ = fromEvent(div, 'click');

  makeLazy(() => {
    sideEffect(data => {
      t.pass()
      t.end()
    })(number$)
    div.click()
  })
})

