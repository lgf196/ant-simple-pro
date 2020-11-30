class LocalStorage<T> {
  readonly localStorages: Storage;
  constructor() {
    this.localStorages = window.localStorage;
  }
  public getItem(key: string) {
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
