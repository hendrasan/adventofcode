function mapLettersToNumbers(letter) {
  // Get the ASCII code of the letter
  const code = letter.charCodeAt(0);

  // Check if the letter is lowercase
  if (code >= 97 && code <= 122) {
    // Return the mapped number for a lowercase letter
    // 97 is the ASCII code for 'a', so we subtract 97 from the code to get
    // the number that we want to map to (1 to 26)
    return code - 97 + 1;
  }

  // Check if the letter is uppercase
  if (code >= 65 && code <= 90) {
    // Return the mapped number for an uppercase letter
    // 65 is the ASCII code for 'A', so we subtract 65 from the code to get
    // the number that we want to map to (27 to 52)
    return code - 65 + 27;
  }

  // Return 0 if the input is not a letter
  return 0;
}

module.exports = {
  mapLettersToNumbers,
};
