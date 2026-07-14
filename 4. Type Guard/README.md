# Type Narrowing and Type Guards

This module covers two important concepts in TypeScript:

- **Type Narrowing**
- **Type Guards**

These concepts work together to make TypeScript's type system more intelligent and safer.

---

# The `unknown` Type

Earlier, we learned about the `any` type, which allows a variable to store values of any type.

```ts
let value: any;

value = 10;
value = "Hello";
value = true;
```

While `any` provides flexibility, it completely disables TypeScript's type checking.

A safer alternative is the **`unknown`** type.

```ts
let value: unknown;
```

Like `any`, an `unknown` variable can store values of any type.

```ts
value = 10;
value = "Hello";
value = true;
```

However, unlike `any`, you **cannot directly use the value** until you've verified its type.

Example:

```ts
let value: unknown = "Hello";

console.log(value.length); // Error
```

TypeScript doesn't know whether `value` is actually a string.

You must first narrow its type.

```ts
if (typeof value === "string") {
    console.log(value.length);
}
```

Because of this extra safety, `unknown` is generally preferred over `any`.

---

# Type Narrowing

Type Narrowing is the process of reducing a variable's type from a broader type to a more specific one.

For example, consider a variable whose type is:

```ts
string | number
```

Before TypeScript can allow string-specific methods like:

```ts
toUpperCase()
```

it must first determine that the variable is actually a string.

This process is called **Type Narrowing**.

---

# Type Guards

A **Type Guard** is a runtime check that allows TypeScript to narrow a variable's type.

Type guards tell the compiler:

> "Inside this block, you can safely treat the variable as this specific type."

Example:

```ts
function getTea(kind: string | number) {
    if (typeof kind === "string") {
        return `Making ${kind} Tea!`;
    }

    return `Tea Order: ${kind}`;
}
```

Here,

```ts
typeof kind === "string"
```

is the **Type Guard**.

Inside the `if` block, TypeScript knows that `kind` is a string.

This means all string methods become available.

```ts
if (typeof kind === "string") {
    console.log(kind.toUpperCase());
}
```

Outside the `if` block, `kind` is still treated as `string | number`.

---

# Truthiness Checks

TypeScript can also narrow types using **truthiness checks**.

Example:

```ts
function customTea(msg?: string) {
    if (msg) {
        return `Serving Tea with ${msg}`;
    }

    return "Serving Normal Tea";
}
```

Here,

```ts
if (msg)
```

acts as a type guard.

If the condition is true, TypeScript knows that `msg` is no longer `undefined`.

Inside the `if` block, `msg` behaves as a normal string.

---

# Exhaustive Checks

Sometimes a variable can have multiple predefined values.

Example:

```ts
function orderTea(size: "small" | "medium" | "large" | number) {
    if (size === "small") {
        return "Serving small tea.";
    }

    if (size === "medium" || size === "large") {
        return "Serving extra tea.";
    }

    return `Serving ${size} Tea.`;
}
```

Here, every possible type is handled separately.

This is called an **Exhaustive Check**, where every expected case is considered before reaching the default behavior.

---

# Using `instanceof` as a Type Guard

Type guards can also distinguish between classes.

Example:

```ts
class SmallTea {
    serve() {
        return "Serving Small Tea.";
    }
}

class BigTea {
    serve() {
        return "Serving Big Tea.";
    }
}

function serveTea(tea: SmallTea | BigTea) {
    if (tea instanceof SmallTea) {
        return tea.serve();
    }

    if (tea instanceof BigTea) {
        return tea.serve();
    }
}
```

Here,

```ts
tea instanceof SmallTea
```

narrows the type to `SmallTea`.

Similarly,

```ts
tea instanceof BigTea
```

narrows the type to `BigTea`.

The `instanceof` operator is commonly used when working with classes.

---

# Custom Type Guards

We can also create our own type guards for custom types.

Example:

```ts
type TeaOrder = {
    type: string;
    sugar: number;
};
```

Suppose we receive data from an API.

We don't know whether the received object actually matches the `TeaOrder` type.

We can write a custom type guard.

```ts
function isTeaOrder(obj: unknown): obj is TeaOrder {
    return (
        typeof obj === "object" &&
        obj !== null &&
        typeof obj.type === "string" &&
        typeof obj.sugar === "number"
    );
}
```

---

## Why is the parameter `unknown`?

The function can receive **any value**.

For example:

```ts
isTeaOrder(10);

isTeaOrder("Tea");

isTeaOrder({});

isTeaOrder({
    type: "Masala",
    sugar: 2
});
```

Since we don't know what the caller will pass, the safest parameter type is `unknown`.

Unlike `any`, `unknown` forces us to validate the value before accessing its properties.

---

## What does `obj is TeaOrder` mean?

This syntax is called a **Type Predicate**.

```ts
obj is TeaOrder
```

It tells TypeScript:

> If this function returns `true`, then `obj` should be treated as a `TeaOrder`.

Notice that the function still returns a boolean.

The difference is that TypeScript now understands the type after the check succeeds.

Example:

```ts
function serveOrder(item: TeaOrder | string) {
    if (isTeaOrder(item)) {
        return `Serving ${item.type} tea with ${item.sugar} sugar`;
    }

    return `Serving Tea: ${item}`;
}
```

Inside the `if` block,

```ts
item
```

is automatically narrowed from

```ts
TeaOrder | string
```

to

```ts
TeaOrder
```

allowing us to access its properties safely.

---

# Discriminated Unions

Consider the following types:

```ts
type MasalaTea = {
    type: "Masala";
    spiceLevel: number;
};

type GingerTea = {
    type: "Ginger";
    aroma: number;
};

type LemonTea = {
    type: "Lemon";
    amount: number;
};
```

Notice that each object contains a common property called:

```ts
type
```

However, its value is fixed.

For example:

```ts
type: "Masala"
```

can only belong to `MasalaTea`.

Likewise,

```ts
type: "Ginger"
```

can only belong to `GingerTea`.

This special property is called the **Discriminator**.

---

Now we create another type.

```ts
type Tea = {
    teaType: MasalaTea | GingerTea | LemonTea;
    quantity: number;
};
```

An example object would be:

```ts
const order = {
    teaType: {
        type: "Masala",
        spiceLevel: 5
    },
    quantity: 2
};
```

or

```ts
const order = {
    teaType: {
        type: "Lemon",
        amount: 3
    },
    quantity: 1
};
```

Notice that `teaType` can store different object shapes.

---

Now consider the following function.

```ts
function makeTea(order: Tea) {
    switch (order.teaType.type) {
        case "Masala":
            return "Serving Masala Tea.";

        case "Ginger":
            return "Serving Ginger Tea.";

        case "Lemon":
            return "Serving Lemon Tea.";
    }
}
```

When the compiler sees:

```ts
order.teaType.type === "Masala"
```

it immediately knows that

```ts
order.teaType
```

must be of type:

```ts
MasalaTea
```

Inside that case, properties like:

```ts
order.teaType.spiceLevel
```

become available.

Similarly,

```ts
case "Ginger"
```

narrows the type to `GingerTea`.

and

```ts
case "Lemon"
```

narrows the type to `LemonTea`.

This automatic narrowing based on a common literal property is called a **Discriminated Union**.

---

# Using the `in` Operator

Another built-in type guard is the `in` operator.

Example:

```ts
function brew(order: MasalaTea | GingerTea) {
    if ("spiceLevel" in order) {
        return "Serving Masala Tea";
    }

    if ("aroma" in order) {
        return "Serving Ginger Tea";
    }
}
```

The `in` operator checks whether a property exists inside an object.

Since only `MasalaTea` contains the property:

```ts
spiceLevel
```

TypeScript automatically narrows the type to `MasalaTea`.

Similarly,

```ts
"aroma" in order
```

narrows the type to `GingerTea`.

---

# Another Example of a Custom Type Guard

```ts
function isStringArray(arr: unknown): arr is string[] {
    return (
        Array.isArray(arr) &&
        arr.every(item => typeof item === "string")
    );
}
```

Here,

```ts
arr: unknown
```

means the function can receive any value.

The return type

```ts
arr is string[]
```

is a type predicate.

If the function returns `true`, TypeScript automatically treats `arr` as a `string[]`.

Example:

```ts
const data: unknown = ["Tea", "Coffee"];

if (isStringArray(data)) {
    data.push("Milk");
    console.log(data.join(", "));
}
```

Without the type predicate, `data` would still have the type `unknown`, and array methods like `push()` and `join()` would produce compile-time errors.