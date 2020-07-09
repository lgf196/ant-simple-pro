class LocalStorage<T> {
  readonly localStorages: Storage;
  constructor() {
    this.localStorages = window.localStorage;
  }
  public getItem(key: string) {
     const getVal=this.localStorages.getItem(key)  || '{}';
    try {
      return JSON.parse(getVal);
    } catch (err) {
      return getVal || null;
    }
  }
  public setItem(key: string, val: any) {
    this.localStorages.setItem(key, JSON.stringify(val));
  }
  public removeItem(key: string) {
    this.localStorages.removeItem(key);
  }
  public clear() {
    this.localStorages.clear();
  }
  public keys() {
    return this.localStorages.keys();
  }
}
 export default new LocalStorage();