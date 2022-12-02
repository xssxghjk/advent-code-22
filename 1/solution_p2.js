const fs = require("fs");
const getDataFromFile = () => {
  const path = `./input.txt`;
  console.log(`Reading: ${path}`);
  return fs.readFileSync(path, 'utf8');
};

const data = getDataFromFile();
let elfInventories = data.split("\r\n\r\n");
elfInventories = elfInventories.map(elfInventory => elfInventory.split("\r\n"));
elfInventories = elfInventories.map(elfInventory => {
  let weight = 0;
  elfInventory.forEach(element => weight += Number(element));
  return weight;
})
const top3 = elfInventories.sort((a, b) => b-a).splice(0,3);
let combinedCalories = 0;
top3.forEach(c => combinedCalories+=c);
console.log("The top 3 elf inventories are " + combinedCalories + " calories!");
