class SessionStorage<T> {
  readonly sessionStorage: Storage;
  constructor() {
    this.sessionStorage = window.sessionStorage;
  }
  public getItem(key: string) {
    const getVal = this.sessionStorage.getItem(key) || '{}';
    try {
      return JSON.parse(getVal);
    } catch (err) {
      return getVal || null;
    }
  }
  public setItem(key: string, val: any) {
    this.sessionStorage.setItem(key, JSON.stringify(val));
  }
  public removeItem(key: string) {
    this.sessionStorage.removeItem(key);
  }
  public clear() {
    this.sessionStorage.clear();
  }
}

export default new SessionStorage();
