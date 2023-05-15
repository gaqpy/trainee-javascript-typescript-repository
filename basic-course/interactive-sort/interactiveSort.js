#!/usr/bin/env node
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

let words = [];
let digits = [];

function transformInput(input) {

  words = [];
  digits = [];
  const inputArr = input.trim().split(/\s+/);

  inputArr.forEach(item => {
    if (isNaN(item)) {
      words.push(item);
    }
    else {
      digits.push(parseInt(item));
    }
  });
  return { words, digits };
}

function restart() {
  rl.question(
    "Input 10 digits or words with spaces between each of them: ",
    function (userInput) {
      rl.question(
        "What do you want to do: \n1. Sort words by name (from A-Z)" +
        "\n2. Sort numbers from smallest to biggest" +
        "\n3. Sort numbers from biggest to smallest" +
        "\n4. Sort words by quantity of letters" +
        "\n5. Show only unique words" +
        "\n6. Show only unique elements (words and digits)" +
        "\n Type exit to and all operations" +
        "\n\n Select from 1 to 6 and press Enter: ", (selection) => {
          switch (selection) {
            case 'exit':
              process.exit(0);
              break;
            case 'Exit':
              process.exit(0);
              break;
            case '1':
              transformInput(userInput);
              words.sort();
              console.log(words);
              break;
            case '2':
              transformInput(userInput);
              digits.sort((a, b) => a - b);
              console.log(digits);
              break;
            case '3':
              transformInput(userInput);
              digits.sort((a, b) => b - a);
              console.log(digits);
              break;
            case '4':
              transformInput(userInput);
              words.sort((a, b) => a.length - b.length);
              console.log(words);
              break;
            case '5':
              transformInput(userInput);
              let uniqueArr = words.filter(function (item, pos) {
                return words.indexOf(item) === pos;
              });
              console.log(uniqueArr);
              break;
            case '6':
              transformInput(userInput);
              const wordsAndDigits = words.concat(digits);
              let uniqueArrAll = wordsAndDigits.filter(function (item, pos) {
                return wordsAndDigits.indexOf(item) === pos;
              });
              console.log(uniqueArrAll);
              break;
            default:
              console.log("Invalid selection, please try again. ");
              break;
          }
          restart();
        }
      );
    }
  );
}

restart();