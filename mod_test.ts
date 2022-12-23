import { assertEquals } from "https://deno.land/std@0.164.0/testing/asserts.ts";
import { Event } from "./mod.ts";

class Increment {
  value: number = 0;

  increment() {
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
