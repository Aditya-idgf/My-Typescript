# Interfaces and Generics in TypeScript

This module covers two important TypeScript concepts:

- Interfaces
- Generics

Interfaces define the structure (or contract) that objects, classes, and functions must follow. Generics allow us to write reusable code that works with different data types while preserving type safety.

---

# Interfaces

In most situations, interfaces are used similarly to type aliases.

Example:

```ts
interface Tea {
    flavor: string;
    sugar: number;
    readonly shopName: string;
}

const masalaTea: Tea = {
    flavor: "Masala",
    sugar: 5,
    shopName: "MYTEA"
};

console.log(masalaTea);
```

Trying to modify a readonly property:

```ts
masalaTea.shopName = "TEA & TEA";
```

produces:

```
Cannot assign to 'shopName' because it is a read-only property.
```

For object definitions, `interface` and `type` are often interchangeable.

---

# Interfaces for Functions

Interfaces are not limited to objects.

They can also describe the **structure of a function**.

Example:

```ts
interface DiscountCalculator {
    (price: number): number;
}
```

Unlike object interfaces, this interface describes a function.

It says:

- The function must accept one parameter named `price`.
- The parameter must be a `number`.
- The function must return a `number`.

Now we create a function that satisfies this interface.

```ts
const discount: DiscountCalculator = (price) => price * 0.5;
```

This is equivalent to writing:

```ts
const discount = (price: number): number => {
    return price * 0.5;
};
```

The interface ensures that every function assigned to `DiscountCalculator` has the same parameter and return types.

Example:

```ts
console.log(discount(100));
```

Output:

```
50
```

---

# Interfaces with Methods

Interfaces can also define methods that an object must implement.

Example:

```ts
interface TeaMachine {
    start(): void;
    stop(): void;
}
```

This interface requires two methods.

Now we create an object.

```ts
const machine: TeaMachine = {
    start() {
        console.log("Start");
    },

    stop() {
        console.log("Stop");
    }
};
```

Since both methods are implemented, the object satisfies the interface.

Using the object:

```ts
machine.start();

machine.stop();
```

If either method is missing, TypeScript reports an error.

---

# Index Signatures

Sometimes we don't know the names of an object's properties in advance.

For example, imagine storing tea ratings.

Instead of writing:

```ts
const ratings = {
    masala: 4.4,
    ginger: 4.1,
    lemon: 4.8
};
```

we may not know all the tea flavors beforehand.

We only know that:

- Every property name will be a string.
- Every value will be a number.

This is where an **Index Signature** is useful.

```ts
interface TeaRating {
    [flavor: string]: number;
}
```

This means:

> "This object may contain any number of properties."

As long as:

- The property name is a `string`.
- The property value is a `number`.

Now we can create objects with any property names.

```ts
const ratings: TeaRating = {
    masala: 4.4,
    ginger: 4.1,
    lemon: 4.8,
    elaichi: 4.6
};
```

All of these properties satisfy the interface.

However,

```ts
const ratings: TeaRating = {
    masala: "Excellent"
};
```

produces an error because the value must be a number.

Index signatures are commonly used for:

- Dictionaries
- Configuration objects
- API response maps
- Dynamic object properties

---

# Declaration Merging

Unlike type aliases, interfaces with the same name are automatically merged.

Example:

```ts
interface User {
    name: string;
}

interface User {
    age: number;
}
```

TypeScript combines them into:

```ts
interface User {
    name: string;
    age: number;
}
```

Therefore,

```ts
const user: User = {
    name: "Aditya",
    age: 25
};
```

is valid.

This feature is called **Declaration Merging** and is unique to interfaces.

Type aliases cannot be declared multiple times with the same name.

---

# Extending Interfaces

Interfaces can inherit from other interfaces using the `extends` keyword.

Example:

```ts
interface A {
    a: string;
}

interface B {
    b: string;
}

interface C extends A, B {
    c: string;
}
```

The interface `C` now contains all properties from `A` and `B`.

```ts
const abc: C = {
    a: "A",
    b: "B",
    c: "C"
};
```

This helps build larger interfaces from smaller reusable ones.

---

# Generics

Generics allow us to write reusable code without losing type safety.

Instead of hardcoding a specific type like:

```ts
string
```

or

```ts
number
```

we use a placeholder type.

This placeholder is commonly written as:

```ts
<T>
```

The actual type is determined automatically when the function is called.

---

# Generic Functions

Example:

```ts
function wrapInArray<T>(item: T): T[] {
    return [item];
}
```

Here,

```ts
<T>
```

is a **type parameter**.

Think of it as a placeholder that TypeScript replaces with the actual type.

Calling the function:

```ts
wrapInArray("Masala Tea");
```

TypeScript infers:

```ts
T = string
```

The function becomes:

```ts
function wrapInArray(item: string): string[]
```

Similarly,

```ts
wrapInArray(42);
```

becomes:

```ts
function wrapInArray(item: number): number[]
```

Notice that we never explicitly specify the type.

TypeScript infers it automatically.

---

# Multiple Generic Parameters

Generics are not limited to one type parameter.

Example:

```ts
function pair<A, B>(a: A, b: B): [A, B] {
    return [a, b];
}
```

Calling:

```ts
pair("A", 1);
```

TypeScript infers:

```ts
A = string

B = number
```

The return type becomes:

```ts
[string, number]
```

If we accidentally return:

```ts
return [b, a];
```

TypeScript reports an error because:

```ts
[B, A]
```

does not match the declared return type:

```ts
[A, B]
```

---

# Generic Interfaces

Interfaces can also use generics.

Example:

```ts
interface Box<T> {
    content: T;
}
```

Creating a number box:

```ts
const numBox: Box<number> = {
    content: 10
};
```

Trying to assign a string:

```ts
const numBox: Box<number> = {
    content: "10"
};
```

produces an error because `content` must be a number.

The same interface can be reused for different types.

```ts
const stringBox: Box<string> = {
    content: "Tea"
};
```

---

# Generics in API Responses

One of the most common real-world uses of generics is modeling API responses.

Example:

```ts
interface APIPromise<T> {
    status: number;
    data: T;
}
```

Suppose an API returns information about a tea.

```ts
const response: APIPromise<{
    flavor: string;
}> = {
    status: 200,

    data: {
        flavor: "Masala"
    }
};
```

Here,

```ts
T
```

becomes:

```ts
{
    flavor: string;
}
```

If another API returns user information, we simply change the generic type.

```ts
interface User {
    name: string;
    age: number;
}

const response: APIPromise<User> = {
    status: 200,

    data: {
        name: "Aditya",
        age: 20
    }
};
```

The same interface now works for an entirely different data structure.

This is one of the biggest advantages of generics—they allow a single interface to be reused for many different types while maintaining complete type safety.

---

# `interface` vs `type`

| Interface | Type Alias |
|-----------|------------|
| Primarily used to describe object structures. | Can describe objects, primitives, unions, tuples, intersections, functions, and more. |
| Supports declaration merging. | Does not support declaration merging. |
| Can be extended using `extends`. | Can be combined using intersections (`&`). |
| Commonly used for classes and APIs. | Commonly used for complex type compositions. |

For simple object definitions, both are almost interchangeable. The choice often comes down to project conventions and whether features like declaration merging are needed.