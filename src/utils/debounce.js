export default (fn, timer = 800) => {
    let timeout;
    return function () {
      const self = this;
      const args = arguments;

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        timeout = null;
        fn.apply(self, args);
      }, timer)
    }
}
