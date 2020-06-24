const localStorages =window.localStorage;
export default {
    getItem(key:string) {
      try {
        return JSON.parse(localStorages.getItem(key) || '{}');
      } catch (err) {
        return null;
      }
    },
    setItem (key:string, val:any) {
        localStorages.setItem(key, JSON.stringify(val));
    },
    removeItem (key:string) {
        localStorages.removeItem(key);
    },
    clear () {
        localStorages.clear();
    },
    keys () {
      return localStorages.keys();
    }
  };
  