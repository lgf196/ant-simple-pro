class SessionStorage {
  constructor() {
    this.sessionStorage = window.sessionStorage;
  }
   getItem(key) {
    const getVal = this.sessionStorage.getItem(key) || '{}';
    try {
      return JSON.parse(getVal);
    } catch (err) {
      return getVal || null;
    }
  }
  setItem(key, val) {
    this.sessionStorage.setItem(key, JSON.stringify(val));
  }
  removeItem(key) {
    this.sessionStorage.removeItem(key);
  }
  clear() {
    this.sessionStorage.clear();
  }
}

export default new SessionStorage();
