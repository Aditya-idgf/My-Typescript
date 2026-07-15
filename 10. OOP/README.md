# Object-Oriented Programming (OOP) in TypeScript

TypeScript fully supports Object-Oriented Programming (OOP) and builds upon JavaScript's class system by adding features such as:

- Static type checking
- Access modifiers
- Readonly properties
- Parameter properties
- Abstract classes
- Better support for encapsulation

Since TypeScript compiles to JavaScript, all OOP concepts available in JavaScript are also available in TypeScript.

---

# Classes

A **class** is a blueprint for creating objects.

It defines the properties (data) and methods (behavior) that every object created from it will have.

Example:

```ts
class Tea {
    flavor: string;
    price: number;
}
```

This produces the following error:

```
Property 'flavor' has no initializer and is not definitely assigned in the constructor.
```

---

# Why Does This Error Occur?

When `strictPropertyInitialization` is enabled (the default in strict mode), TypeScript requires every class property to be initialized.

This prevents accidentally creating objects with undefined values.

For example:

```ts
class Tea {
    flavor: string;
    price: number;

    constructor(flavor: string, price: number) {
        this.flavor = flavor;
        this.price = price;

        console.log(this);
    }
}
```

Creating an object:

```ts
const masalaTea = new Tea("Ginger", 20);
```

Output:

```
Tea {
    flavor: "Ginger",
    price: 20
}
```

Notice that `this` refers to the object currently being created.

The constructor initializes the object's properties before it can be used.

---

# Modifying Object Properties

Once an object has been created, its properties can be modified (unless marked as `readonly`).

```ts
masalaTea.flavor = "Masala";
masalaTea.price = 10;

console.log(masalaTea);
```

Output:

```
Tea {
    flavor: "Masala",
    price: 10
}
```

---

# Access Modifiers

Access modifiers control where a property or method can be accessed.

TypeScript provides three access modifiers:

- `public`
- `private`
- `protected`

---

## Public

`public` is the default access modifier.

Public members can be accessed from anywhere.

```ts
class Tea {
    public flavor = "Masala";
}

const tea = new Tea();

console.log(tea.flavor);
```

---

## Private

Private members can only be accessed inside the class where they are declared.

```ts
class Tea {
    public flavor = "Masala";

    private secretIngredient = "Cardamom";

    reveal() {
        return this.secretIngredient;
    }
}
```

Creating an object:

```ts
const tea = new Tea();

console.log(tea.flavor);

console.log(tea.reveal());
```

Trying to access the private property directly:

```ts
console.log(tea.secretIngredient);
```

produces:

```
Property 'secretIngredient' is private and only accessible within class 'Tea'.
```

Private properties help hide implementation details from users of the class.

---

# Protected

`protected` is similar to `private`, but inherited classes are allowed to access protected members.

Example:

```ts
class Shop {
    protected shopName = "MYTEA";
}
```

Derived class:

```ts
class Branch extends Shop {
    displayName() {
        console.log(this.shopName);
    }
}
```

Creating an object:

```ts
const myBranch = new Branch();

myBranch.displayName();
```

This works because `Branch` inherits from `Shop`.

However,

```ts
console.log(myBranch.shopName);
```

produces an error because protected members are inaccessible outside the class hierarchy.

---

# JavaScript Private Fields (`#`)

Modern JavaScript also supports true private fields using the `#` syntax.

Example:

```ts
class Wallet {
    #balance = 1000;

    getBalance() {
        return this.#balance;
    }
}

const wallet = new Wallet();

console.log(wallet.getBalance());
```

Unlike TypeScript's `private`, the `#` syntax is enforced by JavaScript itself at runtime.

Trying to access

```ts
wallet.#balance;
```

results in a syntax error.

---

# Readonly Properties

A property marked as `readonly` can only be assigned once.

Example:

```ts
class Cup {
    readonly capacity: number;

    constructor(capacity: number) {
        this.capacity = capacity;
    }
}
```

Creating an object:

```ts
const cup = new Cup(250);
```

Trying to modify it:

```ts
cup.capacity = 500;
```

produces:

```
Cannot assign to 'capacity' because it is a read-only property.
```

Readonly properties are useful for values that should never change after object creation.

---

# Getters and Setters

Getters and setters provide controlled access to private properties.

Example:

```ts
class ModernTea {
    private _sugar = 2;

    get sugar() {
        return this._sugar;
    }

    set sugar(value: number) {
        if (value > 5) {
            throw new Error("Too Sweet!");
        }

        this._sugar = value;
    }
}
```

Using the class:

```ts
const tea = new ModernTea();

console.log(tea.sugar);

tea.sugar = 4;

console.log(tea.sugar);
```

Notice that getters and setters behave like normal properties.

You do **not** write:

```ts
tea.getSugar();
```

Instead, you simply write:

```ts
tea.sugar
```

The getter and setter are invoked automatically.

---

# Static Members

Static members belong to the class itself rather than individual objects.

Example:

```ts
class NewTea {
    static shopName = "TEATOTEA";

    constructor(public flavor: string) {}
}
```

Accessing the static property:

```ts
console.log(NewTea.shopName);
```

Notice that no object is created.

Static members exist once per class, regardless of how many objects are created.

Every instance shares the same static member.

---

# Parameter Properties

Consider the constructor:

```ts
constructor(public flavor: string) {}
```

This syntax is called a **Parameter Property**.

It is shorthand for:

```ts
class NewTea {
    public flavor: string;

    constructor(flavor: string) {
        this.flavor = flavor;
    }
}
```

TypeScript automatically:

- Declares the property.
- Assigns the constructor argument to it.

This feature is unique to TypeScript.

> **Note:** Node.js's built-in TypeScript support (strip-only mode) does not understand parameter properties. To use them, compile your project using `tsc` and run the generated JavaScript.

```bash
npx tsc

node dist/index.js
```

---

# Abstract Classes

An abstract class is a class that **cannot be instantiated directly**.

Its purpose is to act as a base class for other classes.

Example:

```ts
abstract class Drink {
    abstract make(): void;
}
```

Trying to create an object:

```ts
const drink = new Drink();
```

produces an error.

Instead, another class extends it.

```ts
class MyTea extends Drink {
    make(): void {
        console.log("My Tea is Ready!");
    }
}
```

Creating an object:

```ts
const tea = new MyTea();

tea.make();
```

Every concrete class extending an abstract class must implement all abstract methods.

---

# Composition

Composition is another way of reusing code.

Instead of inheriting another class, one class contains an object of another class.

Example:

```ts
class Heater {
    on() {
        console.log("Heater On");
    }

    off() {
        console.log("Heater Off");
    }
}
```

Using composition:

```ts
class TeaMaker {
    constructor(private heater: Heater) {}

    makeTea() {
        this.heater.on();

        console.log("Making Tea...");

        this.heater.off();
    }
}
```

Creating the objects:

```ts
const heater = new Heater();

const teaMaker = new TeaMaker(heater);

teaMaker.makeTea();
```

Here,

`TeaMaker` **has a** `Heater`.

This is composition.

Unlike inheritance ("is-a" relationship), composition represents a **has-a relationship**.

---

# Inheritance vs Composition

| Inheritance | Composition |
|------------|-------------|
| Represents an **is-a** relationship. | Represents a **has-a** relationship. |
| Achieved using `extends`. | Achieved by storing another object as a property. |
| Child class inherits the parent's behavior. | One class delegates work to another object. |
| Creates tighter coupling between classes. | Creates looser coupling and is generally more flexible. |

Example:

```text
Inheritance

Car
 ▲
 │
ElectricCar

ElectricCar is a Car.
```

```text
Composition

TeaMaker
    │
    ▼
 Heater

TeaMaker has a Heater.
```

Composition is often preferred because it promotes better modularity, flexibility, and code reuse without tightly coupling classes together.