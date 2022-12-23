import { assertEquals } from "https://deno.land/std@0.164.0/testing/asserts.ts";
import { Event, Listener } from "./mod.ts";

class Increment {
  value: number = 0;

  increment() {
    this.value++;
  }
}

class IncrementWithListener implements Listener {
  value: number = 0;

  update() {
    this.value++;
  }
}

Deno.test("Standard functional test", () => {
  const incrementEvent = new Event();

  const test = new Increment();

  incrementEvent.listen(test.increment.bind(test));

  incrementEvent.notice();

  assertEquals(test.value, 1);
});

Deno.test("Multiple entities can listen", () => {
  const incrementEvent = new Event();

  const test = new Increment();
  const test2 = new Increment();

  incrementEvent.listen(test.increment.bind(test));
  incrementEvent.listen(test2.increment.bind(test2));

  incrementEvent.notice();

  assertEquals(test.value, 1);
  assertEquals(test2.value, 1);
});

Deno.test("Notice called in between", () => {
  const incrementEvent = new Event();

  const test = new Increment();
  const test2 = new Increment();

  incrementEvent.listen(test.increment.bind(test));
  incrementEvent.notice();
  incrementEvent.listen(test2.increment.bind(test2));

  assertEquals(test.value, 1);
  assertEquals(test2.value, 0);

  incrementEvent.notice();

  assertEquals(test.value, 2);
  assertEquals(test2.value, 1);
});

Deno.test("Logging works", () => {
  const incrementEvent = new Event("Increment");
  incrementEvent.logging = true;

  const test = new Increment();

  incrementEvent.listen(test.increment.bind(test));

  incrementEvent.notice();

  //TODO: TEST LOGGING
});

Deno.test("Works with anonymous function", () => {
  const testEvent = new Event();

  let called = false;

  testEvent.listen(() => {
    called = true;
  });

  assertEquals(called, false);

  testEvent.notice();

  assertEquals(called, true);
});

Deno.test("Works with listener object", () => {
  const testEvent = new Event();

  const test = new IncrementWithListener();

  testEvent.listen(test);

  assertEquals(test.value, 0);

  testEvent.notice();

  assertEquals(test.value, 1);
});

Deno.test("Works with arguments", () => {
  const testEvent = new Event();

  const test = {
    value: 0,

    increment(value: number, value2: number) {
      this.value += value + value2;
    },
  };

  testEvent.listen(test.increment.bind(test));

  assertEquals(test.value, 0);

  testEvent.notice(2, 3);

  assertEquals(test.value, 5);
});
