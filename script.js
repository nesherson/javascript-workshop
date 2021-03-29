function rangeOfNumbers(startNum, endNum) {
  if (startNum === endNum) return [startNum];
  if (startNum > endNum) return null;
  if (startNum < endNum) {
    const arr = rangeOfNumbers(startNum + 1, endNum);
    arr.unshift(startNum);
    return arr;
  }
}

console.log(rangeOfNumbers(1, 5));
