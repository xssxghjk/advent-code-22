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
const readiestElfInventory = elfInventories.sort((a, b) => b-a)[0];
console.log("The biggest elf inventory is " + readiestElfInventory + " calories!");
