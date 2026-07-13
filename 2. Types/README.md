# Type Inference and Type Annotation

This module covers two fundamental concepts in TypeScript:

- Type Inference
- Type Annotation

Since TypeScript is a superset of JavaScript, it understands all the built-in JavaScript data types, including:

- `number`
- `string`
- `boolean`
- `null`
- `undefined`
- `object`
- `array`
- `bigint`
- `symbol`

---

# Type Inference

**Type Inference** is the process where TypeScript automatically determines the type of a variable based on the value assigned to it.

### Example

```ts
let name = "Aditya";
```

TypeScript automatically infers that the type of `name` is:

```ts
let name: string = "Aditya";
```

Even though we didn't explicitly specify the type, the compiler knows that `name` is a `string`.

### Valid Assignment

Since `name` is of type `string`, assigning another string is allowed.

```ts
let name = "Aditya";

name = "Sam";
```

This is valid because both values are strings.

### Invalid Assignment

```ts
let name = "Aditya";

name = 9009;
```

Error:

```
Type 'number' is not assignable to type 'string'.
```

Once a type has been inferred, the variable can only store values of that type.

---

# Type Annotation

**Type Annotation** is when the developer explicitly specifies the type of a variable instead of allowing TypeScript to infer it.

### Example

```ts
let age: number = 69;
```

Here, we explicitly tell TypeScript that `age` must always be a `number`.

### Valid Assignment

```ts
let age: number = 69;

age = 25;
```

This is valid because both values are numbers.

### Invalid Assignment

```ts
let age: number = 69;

age = "Aditya";
```

Error:

```
Type 'string' is not assignable to type 'number'.
```

Since `age` has been explicitly annotated as a `number`, it cannot hold values of any other type.

---

# Type Inference vs Type Annotation

| Type Inference | Type Annotation |
|---------------|-----------------|
| TypeScript automatically determines the variable's type. | The developer explicitly specifies the variable's type. |
| Requires less code. | Makes the intended type explicit. |
| Useful when the assigned value clearly indicates the type. | Useful when you want to enforce a specific type or improve readability. |

### Example

Using **Type Inference**:

```ts
let city = "Pune";
```

Using **Type Annotation**:

```ts
let city: string = "Pune";
```

Both variables have the same type (`string`). The only difference is that, in the second example, the type is explicitly declared by the developer.