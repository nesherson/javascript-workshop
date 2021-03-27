// make a function that takes in a single parameter
// and returns a new promise. using setTimeout,
// after 500 milliseconds, the promise will either
// resolove or reject. if the input is a string,
// the promise resolves with that same string
// uppercased. if the input is anything but a string
// it rejects with that same input
//
// call the function delayedUpperCase

// code goes here
const delayedUpperCase = (input) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof input === 'string') {
        resolve(input.toUpperCase());
      } else {
        reject(input);
      }
    }, 500);
  });
};

delayedUpperCase('123')
  .then(
    (handleSuccess = (resolvedValue) => {
      console.log('Success: ', resolvedValue);
    })
  )
  .catch(
    (handleFailure = (resolvedValue) => {
      console.log('Failure: ', resolvedValue);
    })
  );
