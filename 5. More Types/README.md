# Type Assertions, `any` vs `unknown`, Error Handling, and the `never` Type

This module covers several advanced TypeScript concepts:

- Type Assertions
- Working with JSON and DOM elements
- `any` vs `unknown`
- Error handling with `try...catch`
- The `never` type

---

# Type Assertions

Sometimes TypeScript cannot determine the exact type of a value, even though **we know what its type should be**.

In such situations, we can use **Type Assertions** to explicitly tell the compiler what type to assume.

Type assertions **do not change the runtime value**. They only affect TypeScript's type checking.

---

## Example 1

```ts
let response: any = "42";
```

Since `response` is of type `any`, TypeScript has no information about what methods or properties actually exist on it.

Suppose we want the length of the string.

```ts
let numericLength: number = response.length;
```

Although this works because `response` is `any`, using `any` removes type safety and TypeScript cannot verify whether `length` is actually valid.

Instead, we can explicitly tell TypeScript that `response` should be treated as a string.

```ts
let numericLength: number = (response as string).length;
```

Here,

```ts
response as string
```

is called a **Type Assertion**.

TypeScript now treats `response` as a string, making all string properties and methods available.

---

## When are Type Assertions Useful?

Type assertions are commonly used when:

- Reading values from environment variables (`process.env`)
- Parsing JSON data
- Working with DOM elements
- Receiving data from external APIs
- Interacting with third-party libraries

These are situations where **you know more about the data than TypeScript does**.

---

# Type Assertion with `JSON.parse()`

Consider the following code.

```ts
const bookObject = JSON.parse(bookString);
```

The `JSON.parse()` function returns the type:

```ts
any
```

TypeScript has no idea what properties exist inside the parsed object.

Therefore,

```ts
bookObject.name;
```

has no compile-time type information.

If we already know the expected structure, we can define a type.

```ts
type Book = {
    name: string;
    author: string;
};
```

Then use a type assertion.

```ts
const bookObject = JSON.parse(bookString) as Book;

console.log(bookObject.name);
```

Now TypeScript treats `bookObject` as a `Book`, allowing access to all its properties with proper type checking.

> **Note:** A type assertion does **not** validate that the JSON actually matches the `Book` type. It simply tells the compiler to trust you.

---

# Type Assertion with DOM Elements

Another common use case is when working with HTML elements.

Example:

```ts
const inputElement = document.getElementById("username");
```

The return type of `getElementById()` is:

```ts
HTMLElement | null
```

Since `HTMLElement` is very general, properties like:

```ts
value
```

are not available.

We can assert the specific element type.

```ts
const inputElement =
    document.getElementById("username") as HTMLInputElement;
```

Now TypeScript knows that `inputElement` is an `<input>` element.

This makes input-specific properties available.

```ts
console.log(inputElement.value);
```

---

# `any` vs `unknown`

Both `any` and `unknown` can store values of any type.

However, they behave very differently.

---

## Using `any`

```ts
let value: any;

value = ["a", "b"];
value = 2.4;

value.toUpperCase();
```

TypeScript allows this without producing an error.

Even though `value` currently contains a number, the compiler assumes you know what you're doing.

This flexibility comes at the cost of losing type safety.

---

## Using `unknown`

```ts
let newValue: unknown;

newValue = ["a", "b"];
newValue = 2.4;
```

Trying to use string methods immediately produces an error.

```ts
newValue.toUpperCase();
```

Error:

```
Object is of type 'unknown'.
```

TypeScript requires you to verify the type first.

```ts
if (typeof newValue === "string") {
    newValue.toUpperCase();
}
```

Here,

```ts
typeof newValue === "string"
```

acts as a **Type Guard**.

Inside the `if` block, TypeScript narrows the type from `unknown` to `string`, making string methods available.

---

# Error Handling in TypeScript

Consider a normal `try...catch` block.

```ts
try {

} catch (error) {

}
```

The variable `error` has the type:

```ts
unknown
```

This is intentional because JavaScript allows **anything** to be thrown.

For example:

```ts
throw "Something went wrong";

throw 404;

throw {};

throw new Error("Invalid Input");
```

Since TypeScript doesn't know what was thrown, it treats `error` as `unknown`.

Before accessing properties like `message`, we must narrow the type.

```ts
try {

} catch (error) {
    if (error instanceof Error) {
        console.log(error.message);
    }
}
```

Here,

```ts
error instanceof Error
```

is a **Type Guard**.

Inside the `if` block, TypeScript knows that `error` belongs to the `Error` class, allowing access to properties such as:

- `message`
- `name`
- `stack`

---

# The `never` Type

The `never` type represents values that **should never exist**.

It is commonly used when:

- All possible cases have already been handled.
- A function never returns.
- A function always throws an exception.
- Performing exhaustive checks.

---

## Example

```ts
type Role = "admin" | "user";

function checkRole(myRole: Role) {
    if (myRole === "admin") {
        return "Redirecting to admin page.";
    }

    if (myRole === "user") {
        return "Redirecting to user page.";
    }

    myRole;
}
```

The type of `myRole` at the last line is:

```ts
never
```

Why?

Because the variable could only ever be:

- `"admin"`
- `"user"`

Both possibilities have already been handled.

There are no remaining values that `myRole` can possibly hold.

Therefore, TypeScript narrows its type to `never`.

---

# Why is `never` Useful?

The `never` type is especially useful for **Exhaustive Checking**.

Suppose another role is added later.

```ts
type Role = "admin" | "user" | "guest";
```

If we forget to handle `"guest"`, TypeScript can detect that the supposedly unreachable code is now reachable.

This helps catch missing cases during development instead of at runtime.

---

# `never` vs `void`

| `never` | `void` |
|---------|--------|
| Represents a value that can never exist. | Represents a function that returns nothing. |
| Used for unreachable code and exhaustive checks. | Used when a function finishes normally without returning a value. |
| Indicates that execution never successfully completes. | Indicates that execution completes but no value is returned. |

Example of `void`:

```ts
function greet(): void {
    console.log("Hello");
}
```

Example of `never`:

```ts
function throwError(message: string): never {
    throw new Error(message);
}
```

Since `throwError()` always throws an exception, it never successfully returns to its caller, making `never` the appropriate return type.