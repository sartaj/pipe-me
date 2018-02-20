import { fromEvent, filter, map, merge, sideEffect } from '../../../index.js'

const fruitArray = [
  "tomatoes",
  "cucumbers",
  "eggplants",
  "squash",
  "olives",
  "peppers",
  "pumpkins",
  "peas",
  "avocados",
  "corn"
];

const getRandomFruit = () => fruitArray[Math.floor(Math.random()*fruitArray.length)];

const getCurrentDateTime = () => new Date(Date.now()).toLocaleString()

const renderDOM = (state) => {
  const div = document.createElement('div')
  div.innerHTML = `<p>Sorry, even at ${state.date}, ${state.fruit} are/is still a fruit.</p>`
  document.body.appendChild(div)
}

const buttonClicked = fromEvent(document, 'click')
  |> filter(event => event.target.tagName === 'BUTTON')
  |> map(() => ({ date: getCurrentDateTime(), fruit: getRandomFruit() }))

buttonClicked
  |> sideEffect(renderDOM)

buttonClicked
  |> sideEffect(state => console.log(state))

