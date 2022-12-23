// deno-lint-ignore-file
export interface Listener {
  update(...args: any[]): void;
}

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

  listen(callable: Function): void;
  listen(listener: Listener): void;
  listen(any: any): void {
    if (any.update) {
      this.listeners.push(any.update.bind(any));
      return;
    }

    if (any) {
      this.listeners.push(any);
      return;
    }

    throw new Error("No listener function provided");
  }
}
