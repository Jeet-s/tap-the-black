export default class Observable {
  value = null;
  observers = [];

  constructor(value = null) {
    this.emit(value);
  }

  emit(value) {
    this.value = value;
    this.observers.forEach((o) => o(this.value));
  }

  subscribe(observer) {
    this.observers.push(observer);
  }
}
