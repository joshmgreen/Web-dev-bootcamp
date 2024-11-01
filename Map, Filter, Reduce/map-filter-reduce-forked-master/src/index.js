var numbers = [3, 56, 2, 48, 5];

//Map -Create a new array by doing something with each item in an array.
const newNumbers = numbers.map(function (x) {
  return x * 2;
});
console.log("double results", newNumbers);

//Filter - Create a new array by keeping the items that return true.
const filterArray = numbers.filter(function (num) {
  return num > 10;
});
console.log("filter results", filterArray);

//Reduce - Accumulate a value by doing something to each item in an array.
const reducedArray = numbers.reduce(function (accumulator, currentNumber) {
  return accumulator + currentNumber;
});
console.log("reduce results", reducedArray);

//Find - find the first item that matches from an array.
const findResult = numbers.find(function (num) {
  return num > 10;
});
console.log("findResult", findResult);

//FindIndex - find the index of the first item that matches.
const findIndexResult = numbers.findIndex(function (num) {
  return num > 10;
});
console.log("findIndexResults", findIndexResult);
