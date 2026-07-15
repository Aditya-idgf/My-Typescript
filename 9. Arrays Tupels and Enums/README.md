# Arrays, Tuples, and Enums in TypeScript

This module covers three important TypeScript features:

- Arrays
- Tuples
- Enums

---

# Arrays

Arrays are used to store multiple values of the **same type**.

TypeScript ensures that every element inside the array matches the declared type.

Example:

```ts
const teaFlavors: string[] = [
    "Masala",
    "Ginger",
    "Lemon"
];

const teaPrices: number[] = [
    10,
    20,
    25
];
```

Trying to insert a value of another type results in a compile-time error.

```ts
teaFlavors.push(100);
```

Error:

```
Argument of type 'number' is not assignable to parameter of type 'string'.
```

---

# Using `Array<T>`

Arrays can also be declared using TypeScript's generic `Array` type.

Example:

```ts
const ratings: Array<number> = [
    4.5,
    4.2,
    3.5
];
```

This is completely equivalent to:

```ts
const ratings: number[] = [
    4.5,
    4.2,
    3.5
];
```

Both declarations represent an array of numbers.

---

# Arrays of Custom Types

Arrays can also store objects.

First, define a custom type.

```ts
type Tea = {
    name: string;
    price: number;
};
```

Now create an array of that type.

```ts
const menu: Tea[] = [
    {
        name: "Masala",
        price: 20
    },
    {
        name: "Ginger",
        price: 25
    }
];
```

Every object inside the array must satisfy the `Tea` type.

---

# Readonly Arrays

Sometimes we want an array that cannot be modified after creation.

This is achieved using `readonly`.

```ts
const cities: readonly string[] = [
    "Delhi",
    "Mumbai"
];
```

Trying to modify it results in an error.

```ts
cities.push("Pune");
```

Error:

```
Property 'push' does not exist on type 'readonly string[]'.
```

Similarly,

```ts
cities[0] = "Pune";
```

also produces an error.

Readonly arrays are useful when data should remain unchanged after initialization.

---

# Multidimensional Arrays

Arrays can contain other arrays.

Example:

```ts
const tables: number[][] = [
    [1, 2, 3],
    [4, 5, 6]
];
```

Here,

- The outer array contains arrays.
- Every inner array contains numbers.

The type

```ts
number[][]
```

means:

> "An array whose elements are arrays of numbers."

---

# Tuples

A tuple is a special kind of array where:

- The number of elements is fixed (unless optional or rest elements are used).
- Each position has its own type.

Example:

```ts
let teaTuple: [string, number];

teaTuple = ["Masala", 20];
```

Here,

- Index `0` must always be a `string`.
- Index `1` must always be a `number`.

Changing the order is not allowed.

```ts
teaTuple = [20, "Masala"];
```

Error:

```
Type 'number' is not assignable to type 'string'.
```

Unlike normal arrays, **both the order and the type of each element matter**.

---

# Optional Tuple Elements

Tuple elements can be made optional using `?`.

Example:

```ts
let userInfo: [string, number, boolean?];
```

Valid assignments:

```ts
userInfo = ["Aditya", 2020];
```

```ts
userInfo = ["Aditya", 2020, true];
```

The first two elements are required.

The third element is optional.

However, this is invalid.

```ts
userInfo = ["Aditya"];
```

because the required `number` element is missing.

---

# Why Does `push()` Work on Tuples?

Consider the following code.

```ts
let userInfo: [string, number, boolean?];

userInfo = ["Aditya", 2020];

userInfo.push("Delhi");

console.log(userInfo);
```

Many beginners expect this to produce an error.

Surprisingly, it doesn't.

## Why?

At runtime, **JavaScript has no concept of tuples**.

After compilation, the tuple simply becomes a normal JavaScript array.

```js
[
    "Aditya",
    2020
]
```

Since JavaScript arrays support methods like:

- `push()`
- `pop()`
- `shift()`
- `unshift()`

the tuple also inherits these methods.

When you call

```ts
userInfo.push("Delhi");
```

TypeScript only checks one thing:

> "Is the value being pushed one of the tuple's allowed element types?"

Our tuple is

```ts
[string, number, boolean?]
```

The possible element types are:

- `string`
- `number`
- `boolean`

Since `"Delhi"` is a string, the compiler allows it.

The runtime array becomes:

```ts
[
    "Aditya",
    2020,
    "Delhi"
]
```

Even though this no longer matches the intended tuple structure.

This is a limitation of tuples because they are implemented on top of JavaScript arrays.

---

# The Recommended Approach

If your goal is to provide the optional third element, avoid using `push()`.

Instead, assign it by its index.

```ts
userInfo[2] = true;
```

This preserves the intended tuple structure.

Avoid:

```ts
userInfo.push(true);
```

Although it works, it treats the tuple like a normal array and can make the code harder to understand.

---

# Pushing Additional Elements

Another interesting behavior is that `push()` only accepts values whose types already exist inside the tuple.

Example:

```ts
let userInfo: [string, number, boolean?];

userInfo = ["Aditya", 62];

userInfo[2] = true;
```

These are valid.

```ts
userInfo.push("I love Dogs!");

userInfo.push(500);

userInfo.push(false);
```

because:

- `string`
- `number`
- `boolean`

are all valid tuple element types.

However,

```ts
userInfo.push({});
```

produces an error.

```
Argument of type '{}' is not assignable to parameter of type
'string | number | boolean'.
```

So while tuples allow extra elements to be pushed, **those elements must still belong to one of the declared element types**.

---

# Readonly Tuples

Just like arrays, tuples can also be made readonly.

Example:

```ts
let location: readonly [string, number] = [
    "Pune",
    432222
];
```

Trying to modify the tuple results in an error.

```ts
location[0] = "Delhi";
```

Error:

```
Cannot assign to '0' because it is a read-only property.
```

Readonly tuples guarantee that neither the values nor the structure can be modified after creation.

---

# Named Tuple Elements

Tuple elements can be given names to improve readability.

Example:

```ts
const teaItem: [
    name: string,
    price: number
] = [
    "Masala",
    20
];
```

These names exist purely for documentation and editor hints.

They do **not** create object properties.

The tuple is still accessed by index.

```ts
console.log(teaItem[0]);

console.log(teaItem[1]);
```

---

# Enums

Enums allow us to define a fixed set of named constants.

They are commonly used whenever a variable should only have a limited number of valid values.

Example:

```ts
enum CupSize {
    SMALL,
    MEDIUM,
    LARGE
}
```

Using the enum:

```ts
const size = CupSize.SMALL;
```

The type of `size` is:

```ts
CupSize
```

Only members of `CupSize` can be assigned to it.

---

# How Enums Compile

Enums are not simply replaced with numbers.

TypeScript actually generates a JavaScript object.

Example:

```ts
enum CupSize {
    SMALL,
    MEDIUM,
    LARGE
}
```

Compiles approximately to:

```js
var CupSize;

(function (CupSize) {
    CupSize[CupSize["SMALL"] = 0] = "SMALL";
    CupSize[CupSize["MEDIUM"] = 1] = "MEDIUM";
    CupSize[CupSize["LARGE"] = 2] = "LARGE";
})(CupSize || (CupSize = {}));
```

This generated object provides **two-way mapping**.

```ts
console.log(CupSize.SMALL);
```

Output:

```
0
```

```ts
console.log(CupSize[0]);
```

Output:

```
SMALL
```

This feature is called **Reverse Mapping**, and it is available only for numeric enums.

---

# Auto Incrementing Enums

Numeric enums automatically assign values if none are provided.

Example:

```ts
enum Status {
    PENDING = 100,
    SERVED,
    CANCELLED
}
```

The compiler automatically assigns:

```ts
Status.PENDING     // 100

Status.SERVED      // 101

Status.CANCELLED   // 102
```

Every following member receives the previous value plus one.

---

# String Enums

Enums can also store strings.

Example:

```ts
enum TeaType {
    MASALA = "masala",
    GINGER = "ginger",
    LEMON = "lemon"
}
```

Unlike numeric enums, string enums do **not** support auto-incrementing.

Each member must be explicitly initialized.

---

# Using Enums

```ts
enum TeaType {
    MASALA = "masala",
    GINGER = "ginger",
    LEMON = "lemon"
}

function makeTea(type: TeaType) {
    console.log(`Making ${type} Tea`);
}

makeTea(TeaType.MASALA);
```

This is valid.

However,

```ts
makeTea("masala");
```

produces an error because the function expects a value of type `TeaType`, not a plain string.

Enums therefore help restrict the possible choices that can be passed to a function.

---

# Heterogeneous Enums

Enums can contain values of different types.

Example:

```ts
enum RandomEnum {
    ID = 1,
    NAME = "Tea"
}
```

Although valid, this is rarely recommended.

In practice, an enum should contain values of a single type for consistency and readability.

---

# Const Enums

A `const enum` behaves differently from a normal enum.

Example:

```ts
const enum Sugar {
    LOW = 1,
    MEDIUM,
    HIGH
}

console.log(Sugar.HIGH);
```

Instead of generating an enum object, the compiler directly replaces the value.

Compiled JavaScript:

```js
console.log(3);
```

No enum object exists at runtime.

This makes `const enum` faster and produces smaller JavaScript output.

---

# `enum` vs `const enum`

| `enum` | `const enum` |
|--------|--------------|
| Generates a JavaScript object. | Completely removed during compilation. |
| Supports reverse mapping (numeric enums). | No reverse mapping. |
| Can be inspected at runtime using `Object.keys()` or similar APIs. | Does not exist at runtime. |
| Slightly larger generated JavaScript. | Smaller and more efficient generated JavaScript. |

### Rule of Thumb

- Use **`enum`** when you need the enum object at runtime (iteration, reverse mapping, `Object.keys()`, etc.).
- Use **`const enum`** when you only need named constants and want the most efficient compiled JavaScript.