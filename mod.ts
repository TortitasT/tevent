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

  /**
   * Call all listeners
   * @param args The arguments to pass to the listeners
   */
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

  /**
   * Listen to an event
   * @param callable The function to listen
   * @param listener The listener to listen
   * @throws Error if no argument is provided
   */
  listen(callable: Function): void;
  listen(listener: Listener): void;
  listen(any: any): void {
    if (any.update) { // listener
      this.listeners.push(any.update.bind(any));
      return;
    }

    if (any) { // callable
      this.listeners.push(any);
      return;
    }

    throw new Error("No listener provided");
  }

  /**
   * Unlisten from an event
   * @param callable The function to unlisten
   * @param listener The listener to unlisten
   * @throws Error if no argument is provided
   */
  unlisten(callable: Function): void;
  unlisten(listener: Listener): void;
  unlisten(any: any): void {
    if (any.update) { // listener
      const index = this.listeners.findIndex((listener) => {
        return listener.toString() === any.update.bind(any).toString();
      });

      if (index > -1) {
        this.listeners.splice(index, 1);
      }
      return;
    }

    if (any) { // callable
      const index = this.listeners.findIndex((listener) => {
        return listener.toString() === any.toString();
      });

      if (index > -1) {
        this.listeners.splice(index, 1);
      }

      return;
    }

    throw new Error("No listener provided");
  }
}
