# Union Types and the `any` Type

This module covers two important TypeScript concepts:

- Union Types
- The `any` Type

---

# Union Types

A variable in TypeScript is not limited to a single data type. Using a **Union Type**, you can specify that a variable is allowed to store values of multiple types.

Union types are created using the **pipe (`|`) operator**.

### Example

```ts
let sub: number | string = "1 Million";
```

In this example, `sub` can store either a `number` or a `string`.

Valid assignments:

```ts
sub = "One Million";

sub = 1000000;
```

Invalid assignment:

```ts
sub = true;
```

Error:

```
Type 'boolean' is not assignable to type 'string | number'.
```

The variable can only contain one of the types specified in the union.

---

# Literal Union Types

Union types are not limited to built-in data types. They can also be used with **literal values**, allowing you to restrict a variable to a predefined set of values.

### Example

```ts
let APIStatus: "Success" | "Error" | "Pending" = "Success";
```

Here, `APIStatus` can only be one of the following values:

- `"Success"`
- `"Error"`
- `"Pending"`

Valid assignments:

```ts
APIStatus = "Error";

APIStatus = "Pending";
```

Invalid assignment:

```ts
APIStatus = "Done";
```

Error:

```
Type '"Done"' is not assignable to type '"Success" | "Error" | "Pending"'.
```

Literal union types are commonly used for:

- API response statuses
- User roles
- Application states
- Configuration values

They help prevent invalid values from being assigned accidentally.

---

# The `any` Type

If a variable is declared without a type annotation **and** without an initial value, TypeScript assigns it the type `any`.

### Example

```ts
let myOrder;
```

TypeScript infers:

```ts
let myOrder: any;
```

A variable of type `any` can store values of any type.

```ts
let myOrder;

myOrder = 100;

myOrder = "Pizza";

myOrder = true;

myOrder = {};
```

Since `any` disables TypeScript's type checking, it should generally be avoided unless absolutely necessary.

---

# Why `string` Alone Doesn't Work

Consider the following code:

```ts
let myOrder: string;

for (let order in orders) {
    if (order === "20") {
        myOrder = order;
    }
}

console.log(myOrder);
```

This produces an error because TypeScript cannot guarantee that the condition inside the loop will ever be satisfied.

If no order matches `"20"`, then `myOrder` will never receive a value.

As a result, TypeScript reports that the variable may be used before being assigned.

---

# Using `undefined`

A common solution is to explicitly allow the variable to be `undefined`.

```ts
let myOrder: string | undefined;
```

Now, before any assignment, the variable has the value `undefined`, making it safe for TypeScript to analyze.

Example:

```ts
let myOrder: string | undefined;

for (let order in orders) {
    if (order === "20") {
        myOrder = order;
    }

    myOrder = "100";
}

console.log(myOrder);
```

Since `myOrder` can legally be either a `string` or `undefined`, the compiler no longer reports an initialization error.

---

# `any` vs Union Types

| `any` | Union Types |
|-------|-------------|
| Accepts values of any type. | Restricts values to a predefined set of types. |
| Disables TypeScript's type checking. | Preserves TypeScript's type safety. |
| Should be used sparingly. | Recommended whenever multiple valid types are expected. |

### Example

Using `any`:

```ts
let value: any;

value = 10;
value = "Hello";
value = true;
```

Using a Union Type:

```ts
let value: number | string;

value = 10;
value = "Hello";

// Error
value = true;
```

Whenever possible, prefer **Union Types** over `any` because they provide flexibility while maintaining TypeScript's compile-time type checking.