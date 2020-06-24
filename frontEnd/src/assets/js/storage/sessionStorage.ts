const sessionStorage = window.sessionStorage;
export default {
  getItem (key:string) {
    try {
      return JSON.parse(sessionStorage.getItem(key) || '{}');
    } catch (err) {
      return null;
    }
  },
  setItem (key:string, val:any) {
    sessionStorage.setItem(key, JSON.stringify(val));
  },
  removeItem (key:string) {
    sessionStorage.removeItem(key);
  },
  clear () {
    sessionStorage.clear();
  }
}
