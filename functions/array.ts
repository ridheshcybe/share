import EventEmitter from "events";

export class array {
  inner: any[];
  EE: EventEmitter;
  constructor() {
    this.inner = [];
    this.EE = new EventEmitter();
  }
  push(...val) {
    this.inner.push(...val);
    this.EE.emit("update", this.inner);
  }
  remove(val: string) {
    this.inner = this.inner.filter((e) => e.ip !== val);
    this.EE.emit("update", this.inner);
  }
  onUpdate(callback: (inner: any[]) => void) {
    this.EE.on("update", callback);
  }
}

export default array;
