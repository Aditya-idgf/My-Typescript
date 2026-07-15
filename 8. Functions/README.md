# Functions in TypeScript

Functions are one of the core building blocks of TypeScript. TypeScript allows us to specify:

- The type of function parameters.
- The type of the value returned by the function.
- Optional parameters.
- Default parameter values.
- Special return types such as `void`.

This helps catch errors during compilation before the code is executed.

---

# Parameter Types

TypeScript allows us to specify the type of every parameter passed to a function.

Example:

```ts
function makeTea(type: string, cups: number) {
    console.log(`Making ${cups} cups of ${type} Tea`);
}

makeTea("Masala", 2);
```

Here,

- `type` must always be a `string`.
- `cups` must always be a `number`.

Calling the function correctly:

```ts
makeTea("Masala", 2);
```

Calling it with an incorrect type:

```ts
makeTea("Masala", "2");
```

Error:

```
Argument of type 'string' is not assignable to parameter of type 'number'.
```

TypeScript prevents the function from being called with invalid argument types.

---

# Return Types

Just as we can specify parameter types, we can also specify the type of value that a function should return.

Example:

```ts
function getTeaPrice(type: string): number {
    return 20;
}
```

The syntax

```ts
: number
```

means the function must always return a value of type `number`.

Calling the function:

```ts
getTeaPrice("Masala");
```

If the function returns anything other than a number, TypeScript reports an error.

Example:

```ts
function getTeaPrice(type: string): number {
    return "20";
}
```

Error:

```
Type 'string' is not assignable to type 'number'.
```

---

# Functions with Multiple Return Types

Consider the following function.

```ts
function makeOrder(order: string) {
    if (!order) {
        return null;
    }

    return order;
}
```

This function can return two different values:

- `string`
- `null`

TypeScript automatically infers the return type as:

```ts
string | null
```

It is **not** inferred as `any`.

If we explicitly write:

```ts
function makeOrder(order: string): string {
    if (!order) {
        return null;
    }

    return order;
}
```

TypeScript reports an error because `null` is not assignable to `string`.

The correct annotation is:

```ts
function makeOrder(order: string): string | null {
    if (!order) {
        return null;
    }

    return order;
}
```

This accurately describes every possible return value.

---

# The `void` Return Type

Some functions perform an action but do not return any value.

Such functions use the `void` return type.

Example:

```ts
function logTea(): void {
    console.log("Tea is Ready");
}
```

Since the function returns nothing, its return type is `void`.

Trying to return a value results in an error.

```ts
function logTea(): void {
    return "Tea is Ready";
}
```

Error:

```
Type 'string' is not assignable to type 'void'.
```

The `void` type indicates that the function's purpose is to perform an action rather than produce a value.

---

# Optional Parameters

Sometimes a parameter is not always required.

An optional parameter is created using the `?` operator.

Example:

```ts
function orderTea(type?: string) {
    console.log(
        type
            ? `Serving Tea: ${type}`
            : "Serving Normal Tea"
    );
}
```

Valid function calls:

```ts
orderTea();

orderTea("Masala");
```

If no argument is passed, `type` becomes `undefined`.

---

# Default Parameters

Instead of leaving a parameter as `undefined`, we can provide a default value.

Example:

```ts
function orderTea(type: string = "Normal") {
    console.log(`Serving Tea: ${type}`);
}
```

Calling the function without an argument:

```ts
orderTea();
```

Output:

```
Serving Tea: Normal
```

Calling it with a value:

```ts
orderTea("Masala");
```

Output:

```
Serving Tea: Masala
```

A default parameter automatically provides a value whenever no argument is supplied.

---

# Combining Parameter Types and Return Types

A function can specify both parameter types and its return type.

Example:

```ts
function createTea(
    order: {
        type: string;
        sugar: number;
        size: "small" | "large";
    }
): number {
    return 4;
}
```

Here,

The parameter `order` must be an object containing:

- `type` → `string`
- `sugar` → `number`
- `size` → `"small"` or `"large"`

The function must return a `number`.

Example call:

```ts
createTea({
    type: "Masala",
    sugar: 2,
    size: "large"
});
```

This satisfies both the parameter type and the return type.

---

# Using a Type Alias for Function Parameters

Instead of writing object types directly inside a function, we can create a reusable type.

```ts
type TeaOrder = {
    type: string;
    sugar: number;
    size: "small" | "large";
};
```

Now the function becomes cleaner.

```ts
function createTea(order: TeaOrder): number {
    return 4;
}
```

This approach improves readability and avoids repeating object type definitions throughout the code.

---

# Summary

| Feature | Purpose |
|---------|---------|
| Parameter Types | Restrict the types of arguments passed to a function. |
| Return Types | Specify the type of value a function must return. |
| `void` | Indicates that a function does not return a value. |
| Optional Parameters (`?`) | Allow parameters to be omitted when calling a function. |
| Default Parameters | Provide a default value when no argument is supplied. |
| Type Aliases | Reuse complex parameter types across multiple functions. |