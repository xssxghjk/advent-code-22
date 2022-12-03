const fs = require('fs');

const getDataFromFile = () => {
    const path = `./input.txt`;
    console.log(`Reading: ${path}`);
    return fs.readFileSync(path, 'utf8');
};

let data = getDataFromFile();
data = data.split("\r\n");
data = data.map(el => ([el.slice(0, el.length / 2), el.slice(el.length / 2)]));

const asciiAdjustment = -64;
let prioritySum = 0;

const getPriorityForLetter = (val) => {
    const charCode = Number(val.charCodeAt(0));
    if(charCode < "a".charCodeAt(0))
        return charCode - "A".charCodeAt(0) + 27;
    return charCode - "a".charCodeAt(0) + 1;
}

data.forEach(rucksack => {
    let foundSol = false;
    for (let item of rucksack[0]) {
        if (rucksack[1].indexOf(item) !== -1 && !foundSol) {
            prioritySum += getPriorityForLetter(item);
            foundSol = true;
        }
    }
})

console.log(`The priority sum is ${prioritySum}`);