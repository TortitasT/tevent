// deno-lint-ignore-file
export class Event {
  listeners: Function[] = [];

  logging = false;

  name = "Event";

  constructor(name?: string) {
    if (name) {
      this.name = name;
    }
  }

  notice(...args: any[]) {
    this.listeners.forEach((listener) => {
      listener(...args);

      if (this.logging) {
        console.info(
          `%cEvent ${this.name} notice called`,
          "color: blue",
        );
      }
    });
  }

  listen(listener: Function) {
    this.listeners.push(listener);
  }
}
