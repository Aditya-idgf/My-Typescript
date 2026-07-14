# Interfaces, Type Aliases, Intersections, Optional Properties, and `readonly`

This module covers the following TypeScript concepts:

- Type Aliases
- Interfaces
- Classes and the `implements` keyword
- Intersection Types
- Optional Properties
- `readonly` Properties

---

# Reusing Object Types with Type Aliases

Consider the following code:

```ts
function makeTea(order: { type: string; sugar: number; strong: boolean }) {
    console.log(order);
}

function serveTea(order: { type: string; sugar: number; strong: boolean }) {
    console.log(order);
}
```

Notice that the following object type is repeated in both functions:

```ts
{
    type: string;
    sugar: number;
    strong: boolean;
}
```

This object type is commonly referred to as the **type signature** or **shape** of the object. It describes exactly what properties an object must contain.

Repeating the same type in multiple places makes the code difficult to maintain.

Instead, we can create a **Type Alias**.

```ts
type TeaOrder = {
    type: string;
    sugar: number;
    strong: boolean;
};
```

Now both functions can reuse the same type.

```ts
function makeTea(order: TeaOrder) {
    console.log(order);
}

function serveTea(order: TeaOrder) {
    console.log(order);
}
```

If the structure of `TeaOrder` changes later, we only need to update it in one place.

---

# What is a Class?

A **Class** is a blueprint used to create objects.

It defines the properties (data) and methods (behavior) that every object created from the class will have.

Example:

```ts
class Tea {
    type = "Masala";

    serve() {
        console.log("Serving Tea");
    }
}
```

Creating an object:

```ts
const cup = new Tea();
```

Here,

- `Tea` is the class.
- `cup` is an object (instance) of that class.

Classes are commonly used when creating multiple objects that share the same structure and behavior.

---

# What is an Interface?

An **Interface** defines a contract that specifies what properties and methods an object or class must contain.

Unlike classes, interfaces **do not contain implementations**.

They only describe the required structure.

Example:

```ts
interface TeaRecipe {
    water: number;
    milk: number;
}
```

This interface states that any object or class implementing it must have:

- `water`
- `milk`

Both of type `number`.

---

# Using `implements`

Suppose we have the following interface.

```ts
interface TeaRecipe {
    water: number;
    milk: number;
}
```

A class can implement it.

```ts
class MasalaTea implements TeaRecipe {
    water = 100;
    milk = 50;
}
```

The `implements` keyword tells TypeScript:

> "This class promises to provide all the properties and methods defined by the interface."

If any required member is missing, TypeScript produces a compile-time error.

For example,

```ts
class MasalaTea implements TeaRecipe {
    water = 100;
}
```

Error:

```
Property 'milk' is missing.
```

---

# Why Can't Every Type Be Implemented?

Consider the following type.

```ts
type CupSize = "small" | "large";
```

Trying to implement it results in an error.

```ts
class Tea implements CupSize {

}
```

Error:

```
A class can only implement an object type or intersection of object types with statically known members.
```

Why?

Because

```ts
"small" | "large"
```

is **not an object type**.

It is simply a union of string literals.

A class can only implement object shapes that contain named properties or methods.

---

# Static Members (Object Properties)

Interfaces and classes work together because both describe object structures.

For example,

```ts
interface TeaRecipe {
    water: number;
    milk: number;
}
```

contains named properties (`water` and `milk`).

These are sometimes referred to as **statically known members**, meaning the compiler knows exactly which properties must exist.

Since the interface describes an object shape, a class can implement it.

---

# Making `CupSize` Implementable

Instead of writing:

```ts
type CupSize = "small" | "large";
```

we wrap the union inside an object.

```ts
interface CupSize {
    size: "small" | "large";
}
```

Now a class can implement it.

```ts
class Tea implements CupSize {
    size: "small" | "large" = "small";
}
```

Because `CupSize` now represents an object with a known property (`size`), it satisfies the requirements for `implements`.

---

# Why Doesn't This Work?

Consider the following type.

```ts
type Response =
    | { ok: true }
    | { ok: false };
```

Trying to implement it produces the same error.

```ts
class MyResponse implements Response {
    ok: boolean = true;
}
```

Why?

Although each individual member of the union is an object, the type itself is still a **union**.

The compiler cannot determine which object shape the class is supposed to implement.

A class must implement exactly one object structure with statically known members.

Since `Response` could be either:

```ts
{ ok: true }
```

or

```ts
{ ok: false }
```

there is no single object contract to implement.

---

# Type Alias vs Interface

Both of the following are valid.

Using a Type Alias:

```ts
type TeaRecipe = {
    water: number;
    milk: number;
};
```

Using an Interface:

```ts
interface TeaRecipe {
    water: number;
    milk: number;
}
```

For simple object types, they behave almost identically.

However:

- Interfaces are commonly used when designing object-oriented code.
- Interfaces can be implemented by classes.
- Interfaces support declaration merging.
- Type aliases can represent unions, intersections, primitive types, tuples, and many other constructs.

---

# Intersection Types

Sometimes we want a type that combines multiple object types.

This is called an **Intersection Type**.

The `&` operator is used to combine types.

Example:

```ts
type BaseTea = {
    teaLeaves: number;
};

type Extra = {
    masala: number;
};

type MasalaTea = BaseTea & Extra;
```

Now `MasalaTea` contains all properties from both types.

```ts
const cup: MasalaTea = {
    teaLeaves: 2,
    masala: 1
};
```

The resulting object must satisfy **both** type definitions.

---

# Optional Properties

A property can be made optional using the `?` operator.

Example:

```ts
type User = {
    username: string;
    bio?: string;
};
```

The `bio` property is optional.

Valid object:

```ts
const u1: User = {
    username: "Aditya"
};
```

Also valid:

```ts
const u2: User = {
    username: "Aditya",
    bio: "Hello, I'm Aditya."
};
```

Since `bio` is optional, both objects satisfy the `User` type.

---

# The `readonly` Modifier

The `readonly` modifier prevents a property from being reassigned after it has been initialized.

Example:

```ts
type Config = {
    readonly name: string;
    version: string;
};
```

Creating an object:

```ts
const myCfg: Config = {
    name: "GitHub",
    version: "1.1.0"
};
```

Trying to modify the `name` property results in an error.

```ts
myCfg.name = "YouTube";
```

Error:

```
Cannot assign to 'name' because it is a read-only property.
```

However, other mutable properties can still be updated.

```ts
myCfg.version = "1.2.0";
```

This is valid.

---

# Important Note About `readonly`

The `readonly` keyword exists **only during TypeScript's compile-time type checking**.

It does **not** make the object immutable at runtime.

When TypeScript is compiled to JavaScript, the `readonly` modifier is completely removed.

Therefore, `readonly` provides compile-time safety without adding any runtime overhead.