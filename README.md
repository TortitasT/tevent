# tevent

Tortitas Event is a simple Observer pattern implementation for Deno.

## Usage

You can use it in two ways, either by implementing the Listener interface or by passing a function to the listen method.

### Implementing the Listener interface
```ts
import { Event, Listener } from "https://deno.land/x/tevent/mod.ts";

const event = new Event();

class Sample implements Listener {
  public update(data: any): void {
    console.log(data);
  }
}

const sample = new Sample();

event.listen(sample);

event.notify("Hello World!"); // This will be printed

event.unlisten(sample);

event.notify("Hello World!"); // This will not be printed
```

### Passing a function to the listen method
Note: If you pass a function to the listen method, you must pass the same function to the unlisten method.
```ts
import { Event } from "https://deno.land/x/tevent/mod.ts";

const event = new Event();

event.listen((data: any) => {
  console.log(data);
});

event.notify("Hello World!"); // This will be printed

event.unlisten((data: any) => {
  console.log(data);
});

event.notify("Hello World!"); // This will not be printed
```

#### Note: If you use a function from an object you must use .bind() to pass the correct context to the function.
```ts
import { Event } from "https://deno.land/x/tevent/mod.ts";

const event = new Event();

class Sample {
  public print(data: any): void {
    console.log(data);
  }
}

const sample = new Sample();

event.listen(sample.print.bind(sample));

event.notify("Hello World!"); // This will be printed

event.unlisten(sample.print.bind(sample));

event.notify("Hello World!"); // This will not be printed
```