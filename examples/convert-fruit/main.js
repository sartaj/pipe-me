import { fromEvent, filter, map, merge, sideEffect } from '../../index.js'
import { flatten } from '../../transforms'

import { getRandomFruit, getCurrentDateTime } from './utils' 
import { renderDOM } from './dom'

const buttonClicked = fromEvent(document, 'click')
  |> filter(event => event.target.tagName === 'BUTTON')
  |> map(() => ({ date: getCurrentDateTime(), fruit: getRandomFruit() }))

buttonClicked
  |> sideEffect(renderDOM)

buttonClicked
  |> sideEffect(state => console.log(state))

