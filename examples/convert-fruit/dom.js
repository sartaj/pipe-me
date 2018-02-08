export const renderDOM = (state) => {
  const div = document.createElement(div)
  div.innerHTML = `<p>Sorry, even at ${state.date}, ${state.fruit} are/is still a fruit.</p>`
  document.body.appendChild(div)
}
  