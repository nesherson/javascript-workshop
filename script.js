function reverseString(str) {
  let newStr = str.split('').map((letter, i, arr) => {
    return arr[arr.length - i - 1];
  });

  return newStr.join('');
}

console.log(reverseString('hello'));
