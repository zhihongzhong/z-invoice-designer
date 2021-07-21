import Vue from 'vue';
import Storage from 'vue-ls';

const storageOptions = {
  namespace: 'z_',
  name: 'ls',
  storage: 'local'
}
// console.error(Storage);
// Storage.prototype.removeStrategies = function() {
//   console.error("hello world");
// }.bind(Storage);

Vue.use(Storage, storageOptions);

export function removeCacheByPrefix(prefix) {
  const internalPrefix = storageOptions.namespace + prefix;
  const regExp = new RegExp("^" + internalPrefix);
  for(let i = 0; i < localStorage.length; i++ ) {
    const key = localStorage.key(i);
    if (regExp.test(key)) {
      localStorage.removeItem(key);
    }
  }
}

