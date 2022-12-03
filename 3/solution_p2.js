const fs = require('fs');

const getDataFromFile = () => {
    const path = `./input.txt`;
    console.log(`Reading: ${path}`);
    return fs.readFileSync(path, 'utf8');
};

let data = getDataFromFile();
data = data.split("\r\n");


const getPriorityForLetter = (val) => {
    const charCode = Number(val.charCodeAt(0));
    if(charCode < "a".charCodeAt(0))
        return charCode - "A".charCodeAt(0) + 27;
    return charCode - "a".charCodeAt(0) + 1;
}
let currentRucksacks = [];
let prioritySum = 0;
data.forEach(rucksack => {
    currentRucksacks.push(rucksack);
    if(currentRucksacks.length === 3) {
        loop1:
        for (let rs1El of currentRucksacks[0]) {
            for (let rs2El of currentRucksacks[1]) {
                for (let rs3El of currentRucksacks[2]) {
                    if (rs1El === rs2El && rs2El === rs3El) {
                        prioritySum += getPriorityForLetter(rs1El);
                        break loop1;
                    }
                }
            }
        }
        currentRucksacks = [];
    }
})

console.log(`The priority sum is ${prioritySum}`);