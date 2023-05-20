import fs from "fs";

const pathToData = "instagram giveaway/data/";
const benchmark = true;

function readFiles(pathToData) {
  const fileContent = [];
  fs.readdirSync(pathToData).forEach((filename) => {
    fileContent.push(fs.readFileSync(pathToData + filename, "utf-8").split("\n"));
  });
  return fileContent;
}

function uniqueValues() {
  if (benchmark) console.time("uniqueValues");
  let unique = new Set(readFiles(pathToData).reduce((a, b) => a.concat(b), []));
  if (benchmark) console.timeEnd("uniqueValues");
  return unique;
}

function existInNArrays(arrays, n) {
  const set = new Map();
  for (let i = 0; i < arrays.length; i++) {
    const setArray = new Set(arrays[i]);
    for (const elem of setArray) {
      const count = set.get(elem) || 0;
      set.set(elem, count + 1);
    }
  }
  return arrays[0].filter((e) => {
    return set.get(e) >= n;
  });
}

function existsInAllFiles() {
  if (benchmark) console.time("existsInAllFiles");
  let res = existInNArrays(readFiles(pathToData), 20);
  if (benchmark) console.timeEnd("existsInAllFiles");
  return res;
}

function existInAtLeastTen() {
  if (benchmark) console.time("existInAtLeastTen");
  let res = existInNArrays(readFiles(pathToData), 10);
  if (benchmark) console.timeEnd("existInAtLeastTen");
  return res;
}

console.log("Unique values: ", uniqueValues().size);
console.log("Exist in all files: ", existsInAllFiles().length);
console.log("Exist in at least 10 files: ", existInAtLeastTen().length);
