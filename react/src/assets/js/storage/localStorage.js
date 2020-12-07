class LocalStorage {
  constructor() {
    this.localStorages = window.localStorage;
  }
   getItem(key) {
    const getVal = this.localStorages.getItem(key);
    if (getVal) {
      if (typeof JSON.parse(getVal) === 'object') {
        return JSON.parse(getVal) || '{}';
      } else {
        return getVal;
      }
    } else {
      return null;
    }
  }
  setItem(key, val) {
    this.localStorages.setItem(key, JSON.stringify(val));
  }
  removeItem(key) {
    this.localStorages.removeItem(key);
  }
  clear() {
    this.localStorages.clear();
  }
  keys() {
    return this.localStorages.keys();
  }
}
export default new LocalStorage();
