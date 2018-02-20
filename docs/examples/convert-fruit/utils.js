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
  
export const getRandomFruit = () => fruitArray[Math.floor(Math.random()*fruitArray.length)];

export const getCurrentDateTime = () => new Date(Date.now()).toLocaleString()