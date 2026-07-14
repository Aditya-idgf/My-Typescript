# Objects in TypeScript

Objects are one of the most commonly used data structures in TypeScript. TypeScript automatically infers the types of object properties, but it also allows us to explicitly define an object's structure using object types or type aliases.

This module covers:

- Object Type Inference
- Explicit Object Types
- Type Aliases for Objects
- Structural Typing vs Duck Typing
- Nested Object Types
- Utility Types
  - `Partial`
  - `Required`
  - `Pick`
  - `Omit`

---

# Object Type Inference

Consider the following object.

```ts
const tea = {
    name: "Masala Tea",
    price: 20,
    isHot: true
};
```

TypeScript automatically infers its type as:

```ts
const tea: {
    name: string;
    price: number;
    isHot: boolean;
}
```

This process is called **Type Inference**.

The compiler determines the type of each property based on the assigned values.

---

# Explicit Object Types

Instead of allowing TypeScript to infer the type, we can define it ourselves.

Example:

```ts
let tea: {
    name: string;
    price: number;
    isHot: boolean;
};

tea = {
    name: "Masala Tea",
    price: 20,
    isHot: true
};
```

### Understanding this Code

The variable is declared first.

```ts
let tea: {
    name: string;
    price: number;
    isHot: boolean;
};
```

Here, we are telling TypeScript that **whenever `tea` receives a value, it must be an object containing exactly these properties**:

- `name` → `string`
- `price` → `number`
- `isHot` → `boolean`

The object is assigned later.

```ts
tea = {
    name: "Masala Tea",
    price: 20,
    isHot: true
};
```

Since the assigned object matches the declared structure, TypeScript accepts it.

If any required property is missing or has the wrong type, the compiler reports an error.

Example:

```ts
tea = {
    name: "Masala Tea",
    price: 20
};
```

Error:

```
Property 'isHot' is missing.
```

---

# Using Type Aliases

Writing large object types repeatedly is not ideal.

Instead, we create a reusable type.

```ts
type Tea = {
    name: string;
    price: number;
    ingredients: string[];
};
```

Now we can use the type anywhere.

```ts
const masalaTea: Tea = {
    name: "Masala Tea",
    price: 20,
    ingredients: [
        "Tea Leaves",
        "Tea Masala"
    ]
};
```

This improves readability and makes the code easier to maintain.

---

# Structural Typing vs Duck Typing

TypeScript follows **Structural Typing**.

This means compatibility depends on an object's **structure**, not on its name.

Consider the following example.

```ts
type Cup = {
    size: string;
};

let smallCup: Cup = {
    size: "200ml"
};

let bigCup = {
    size: "500ml",
    material: "Steel"
};

smallCup = bigCup;
```

This assignment is completely valid.

Why?

Because `bigCup` contains at least the required property:

```ts
size
```

Even though it has an additional property (`material`), it still satisfies the structure required by `Cup`.

TypeScript only checks whether the required properties exist.

Extra properties are allowed when assigning one variable to another.

---

## Excess Property Checking

Now consider this example.

```ts
let bigCup: Cup = {
    size: "500ml",
    material: "Steel"
};
```

This produces an error.

```
Object literal may only specify known properties, and 'material' does not exist in type 'Cup'.
```

Why?

Because object literals undergo **Excess Property Checking**.

When directly assigning an object literal to a typed variable, TypeScript verifies that no unknown properties are present.

However, when assigning one variable to another, only structural compatibility is checked.

---

# Structural Typing vs Duck Typing

These two concepts are closely related but are not exactly the same.

### Duck Typing

Duck Typing comes from the phrase:

> "If it walks like a duck and quacks like a duck, then it's probably a duck."

In Duck Typing, an object's behavior determines whether it can be used.

This is commonly associated with dynamic languages like JavaScript and Python.

---

### Structural Typing

Structural Typing is TypeScript's compile-time implementation of a similar idea.

Instead of checking an object's name or inheritance, TypeScript checks whether its **structure** matches the required type.

Example:

```ts
type Cup = {
    size: string;
};

let bigCup = {
    size: "500ml",
    material: "Steel"
};

let smallCup: Cup = bigCup;
```

The assignment succeeds because `bigCup` has all the required properties of `Cup`.

---

# Reusing Types

Types can also be nested inside other types.

Example:

```ts
type Item = {
    name: string;
    quantity: number;
};

type Address = {
    street: string;
    pin: number;
};

type Order = {
    id: string;
    items: Item[];
    address: Address;
};
```

Notice that

```ts
items
```

is an **array of `Item` objects**.

Each element inside the array must satisfy the `Item` type.

Similarly,

```ts
address
```

must satisfy the `Address` type.

This allows us to build complex object structures using smaller reusable types.

---

# `Partial<T>`

`Partial<T>` makes **every property optional**.

Example:

```ts
type Tea = {
    name: string;
    price: number;
    isHot: boolean;
};
```

Using `Partial`:

```ts
const updateTea = (update: Partial<Tea>) => {
    console.log(update);
};
```

Now all of the following are valid.

```ts
updateTea({
    name: "Masala Tea"
});

updateTea({
    price: 10
});

updateTea({
    isHot: true
});

updateTea({});
```

Internally,

```ts
Partial<Tea>
```

becomes:

```ts
{
    name?: string;
    price?: number;
    isHot?: boolean;
}
```

### A Small Limitation

Because every property becomes optional,

```ts
updateTea({});
```

is also valid.

Sometimes this is undesirable because an empty update may not make sense.

---

# `Required<T>`

`Required<T>` does the exact opposite of `Partial<T>`.

It makes every property mandatory.

Example:

```ts
type TeaOrder = {
    name?: string;
    quantity?: number;
};
```

Using `Required`:

```ts
const placeOrder = (
    order: Required<TeaOrder>
) => {
    console.log(order);
};
```

Now this is invalid.

```ts
placeOrder({
    name: "Masala Tea"
});
```

Error:

```
Property 'quantity' is missing.
```

Both properties must now be present.

```ts
placeOrder({
    name: "Masala Tea",
    quantity: 20
});
```

---

# `Pick<T, Keys>`

`Pick` creates a new type by selecting specific properties from another type.

Example:

```ts
type Tea = {
    name: string;
    price: number;
    isHot: boolean;
};
```

Creating a smaller type:

```ts
type BasicTeaInfo =
    Pick<Tea, "name" | "price">;
```

Equivalent to:

```ts
type BasicTeaInfo = {
    name: string;
    price: number;
};
```

Example:

```ts
const teaInfo: BasicTeaInfo = {
    name: "Masala Tea",
    price: 20
};
```

Only the selected properties exist in the new type.

---

# `Omit<T, Keys>`

`Omit` creates a new type by removing selected properties.

Example:

```ts
type Tea = {
    name: string;
    price: number;
    isHot: boolean;
};
```

Removing `price`:

```ts
type BasicTeaInfo =
    Omit<Tea, "price">;
```

Equivalent to:

```ts
type BasicTeaInfo = {
    name: string;
    isHot: boolean;
};
```

Example:

```ts
const teaInfo: BasicTeaInfo = {
    name: "Masala Tea",
    isHot: true
};
```

Only the omitted properties are removed.

The remaining properties stay exactly the same.

---

# Summary of Utility Types

| Utility Type | Purpose |
|--------------|---------|
| `Partial<T>` | Makes all properties optional. |
| `Required<T>` | Makes all properties mandatory. |
| `Pick<T, K>` | Creates a new type containing only the selected properties. |
| `Omit<T, K>` | Creates a new type by removing the selected properties. |

These utility types are built into TypeScript and are widely used to create new types from existing ones without rewriting object definitions.