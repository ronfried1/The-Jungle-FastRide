export const validatePinCode = (str) => {
  const regex = /^JN-(\d{4})-(\d{4})-([A-Z]{2})$/;
  const match = str.match(regex);
  if (!match) {
    return false;
  }
  const [, firstNumbers, lastNumbers] = match;
  const firstLetter = getLetterFromNumberString(firstNumbers);
  const lastLetter = getLetterFromNumberString(lastNumbers);
  const expectedString = `JN-${firstNumbers}-${lastNumbers}-${firstLetter}${lastLetter}`;
  return str === expectedString;
};

function getLetterFromNumberString(numberString) {
  let sum = 0;
  for (let i = 0; i < numberString.length; i++) {
    const number = parseInt(numberString.charAt(i), 10);
    const multiplier = i % 2 === 0 ? 1 : 2;
    const result = number * multiplier;
    sum += result >= 10 ? Math.floor(result / 10) + (result % 10) : result;
  }
  const letterCode = (sum % 26) + 65;
  return String.fromCharCode(letterCode);
}
