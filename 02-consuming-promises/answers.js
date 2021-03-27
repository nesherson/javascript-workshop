/**
 *
 * EXERCISE 1
 *
 * @param {Promise} promise
 * @param {thunk} action
 *
 */
function waitForPromise(promise, action) {
  /* IMPLEMENT ME */
  promise.then(
    (handleSuccess = (resolvedValue) => {
      action(resolvedValue);
    })
  );
}
/**
 *
 * EXERCISE 2
 *
 * @param {Promise} promise
 * @param {consumer} consumer
 * @param {handler} handler
 */
function consumePromise(promise, consumer, handler) {
  /* IMPLEMENT ME! */
  promise
    .then(
      (handleSuccess = (resolvedValue) => {
        consumer(resolvedValue);
      })
    )
    .catch((resolvedValue) => {
      handler(resolvedValue);
    });
}

/**
 * @callback thunk
 * @returns {void}
 */
module.exports = {
  waitForPromise,
  consumePromise,
};
