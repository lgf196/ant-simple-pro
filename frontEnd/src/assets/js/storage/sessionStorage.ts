class SessionStorage<T> {
  readonly sessionStorage: Storage;
  constructor() {
    this.sessionStorage = window.sessionStorage;
  }
 public getItem (key:string) {
    try {
      return JSON.parse(this.sessionStorage.getItem(key) || '{}');
    } catch (err) {
      return null;
    }
  }
  public setItem (key:string, val:any) {
    this.sessionStorage.setItem(key, JSON.stringify(val));
  }
  public removeItem (key:string) {
    this.sessionStorage.removeItem(key);
  }
  public clear () {
    this.sessionStorage.clear();
  }
}

export default new SessionStorage();