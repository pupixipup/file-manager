
// const inputString = 'This is "a string" with spaces';
// const resultArray = splitStringIgnoreQuotes(inputString);


export function customSplit(inputString) {
  // Regular expression with negative lookahead to exclude spaces within quotes
  const regex = /\s(?=(?:(?:[^"]*"){2})*[^"]*$)/;

  // Split the string using the regular expression
  const resultArray = inputString.split(regex);

  // Remove quotes from the elements in the resulting array
  const finalArray = resultArray.map(element => element.replace(/"/g, ''));

  return finalArray;
}

// Example usage
const inputString = 'This is a "sample string" with spaces "inside quotes"';
const result = customSplit(inputString);

console.log(result);
