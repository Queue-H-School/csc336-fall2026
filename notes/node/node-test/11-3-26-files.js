import fs from "fs";

let testFile = fs.readFileSync("./data/test-data.json", "utf8");
let testData = JSON.parse(testFile);

let girlNames = testData.girls;
let girlRandom = Math.floor(Math.random() * girlNames.length);
let boyNames = testData.boys;
let boyRandom = Math.floor(Math.random() * boyNames.length);


console.log(girlNames[girlRandom] + "\n" + boyNames[boyRandom]);
