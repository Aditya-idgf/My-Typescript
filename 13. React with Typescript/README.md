# TypeScript with React

This module covers how TypeScript is used with React to build type-safe applications.

If you've previously used React with JavaScript, you'll notice that almost everything remains the same. The biggest difference is that TypeScript requires us to define the structure of data before using it. This allows the compiler to catch many mistakes before the application even runs.

---


# Components and Props

Suppose we create a component called `TeaCard`.

```tsx
interface TeaProps {
    name: string;
    price: number;
    isSpecial?: boolean;
}

function TeaCard({
    name,
    price,
    isSpecial = false
}: TeaProps) {

    return (
        <div>
            <h2>
                {name}
                {isSpecial && <span>⭐</span>}
            </h2>

            <p>{price}</p>
        </div>
    );
}

export default TeaCard;
```

---

## Why do we need an interface?

Whenever a React component receives props,

```tsx
<TeaCard
    name="Masala"
    price={20}
    isSpecial
/>
```

React internally creates an object similar to

```ts
{
    name: "Masala",
    price: 20,
    isSpecial: true
}
```

TypeScript has no idea what properties this object should contain.

Therefore, we define a structure.

```ts
interface TeaProps {
    name: string;
    price: number;
    isSpecial?: boolean;
}
```

This tells TypeScript:

- `name` must be a string.
- `price` must be a number.
- `isSpecial` is optional.

---

## Understanding the Function Parameter

```tsx
function TeaCard({
    name,
    price,
    isSpecial = false
}: TeaProps)
```

This is simply object destructuring.

It is equivalent to

```tsx
function TeaCard(props: TeaProps) {

    const name = props.name;
    const price = props.price;
    const isSpecial = props.isSpecial ?? false;

}
```

---

## Exporting Components

```tsx
export default TeaCard;
```

This exports the component as the default export of the file.

It can then be imported as

```tsx
import TeaCard from "./TeaCard";
```

> **Note:** Components do **not** need to use a default export. Named exports are equally valid and are commonly used in modern React projects.

---

# Typing React State

React's `useState` Hook is a generic function.

```tsx
import { useState } from "react";

function Counter() {

    const [count, setCount] =
        useState<number>(0);

    return (
        <div>

            <p>
                Cups Ordered : {count}
            </p>

            <button
                onClick={() => {
                    setCount(c => c + 1);
                }}
            >
                ORDER ONE MORE!
            </button>

        </div>
    );
}

export default Counter;
```

Here,

```tsx
useState<number>(0)
```

means

> "The state managed by this hook will always be a number."

Therefore,

```ts
count
```

is inferred as

```ts
number
```

and

```ts
setCount()
```

can only receive numbers.

---

# Organizing Types

Instead of creating interfaces inside every component, it is common practice to store reusable types in a separate file.

Example:

```ts
export interface TEA {
    id: number;
    name: string;
    price: number;
}
```

Importing the interface:

```tsx
import type { TEA } from "./types";
```

Notice the keyword

```ts
type
```

This tells TypeScript that we are importing **only type information**.

Since interfaces do not exist after compilation, no JavaScript code is generated for this import.

---

# Creating a Tea List Component

```tsx
import type { TEA } from "../types";
import TeaCard from "./TeaCard";

interface TeaListProps {
    items: TEA[];
}

function TeaList({
    items
}: TeaListProps) {

    return (

        <div>

            {
                items.map(tea => (

                    <TeaCard
                        key={tea.id}
                        name={tea.name}
                        price={tea.price}
                        isSpecial={tea.price > 30}
                    />

                ))
            }

        </div>

    );
}

export default TeaList;
```

---

## Understanding `TeaList`

The interface

```ts
interface TeaListProps {
    items: TEA[];
}
```

means the component expects **an array of TEA objects**.

Suppose

```ts
items
```

contains

```ts
[
    {
        id: 1,
        name: "Masala",
        price: 25
    },

    {
        id: 2,
        name: "Ginger",
        price: 50
    }
]
```

Calling

```ts
items.map(...)
```

loops through every object.

Each object becomes

```ts
tea
```

and React creates one `TeaCard` for each item.

---

# Using TeaList

```tsx
import TeaList from "./components/TeaList";
import type { TEA } from "./types";

const menu: TEA[] = [

    {
        id: 1,
        name: "Masala",
        price: 25
    },

    {
        id: 2,
        name: "Ginger",
        price: 50
    },

    {
        id: 3,
        name: "Lemon",
        price: 35
    }

];

function App() {

    return (
        <TeaList items={menu} />
    );

}

export default App;
```

Since

```ts
menu
```

is already typed as

```ts
TEA[]
```

it perfectly satisfies

```ts
items: TEA[]
```

inside `TeaList`.

---

# Forms in React

```tsx
import React, { useState } from "react";

interface OrderFormProps {

    submitFunction(
        order: {
            name: string;
            cups: number;
        }
    ): void;

}

function OrderForm({
    submitFunction
}: OrderFormProps) {

    const [name, setName] =
        useState("Masala");

    const [cups, setCup] =
        useState(1);

    function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {

        e.preventDefault();

        submitFunction({
            name,
            cups
        });

    }

    return (

        <form onSubmit={handleSubmit}>

            <label>
                Tea Name
            </label>

            <input
                value={name}
                onChange={(
                    e: React.ChangeEvent<HTMLInputElement>
                ) => {

                    setName(
                        e.target.value
                    );

                }}
            />

            <label>
                Cups
            </label>

            <input
                type="number"
                value={cups}
                onChange={(
                    e: React.ChangeEvent<HTMLInputElement>
                ) => {

                    setCup(
                        Number(
                            e.target.value
                        ) || 1
                    );

                }}
            />

            <button type="submit">
                Submit
            </button>

        </form>

    );
}

export default OrderForm;
```

---

## Understanding the Flow

The component maintains two pieces of state.

```ts
name
```

stores the tea name.

```ts
cups
```

stores the number of cups.

Whenever the user types,

```ts
setName()
```

or

```ts
setCup()
```

updates the state.

---

When the form is submitted,

```tsx
<form onSubmit={handleSubmit}>
```

calls

```ts
handleSubmit()
```

Notice that this `onSubmit` belongs to the **HTML form**, not the parent component.

Inside

```ts
handleSubmit()
```

we write

```ts
e.preventDefault();
```

to stop the browser from refreshing the page.

Finally,

```ts
submitFunction({
    name,
    cups
});
```

sends the form data back to the parent component.

---

# Parent Component

```tsx
import OrderForm from "./components/OrderForm";

function App() {

    return (

        <OrderForm

            submitFunction={(order) => {

                console.log(
                    "Placed:",
                    order.name,
                    order.cups
                );

            }}

        />

    );

}

export default App;
```

Here the parent passes a callback function.

When the child executes

```ts
submitFunction({
    name,
    cups
});
```

the parent's callback runs.

Suppose the user enters

```text
Name : Masala

Cups : 3
```

The child executes

```ts
submitFunction({
    name: "Masala",
    cups: 3
});
```

which causes the parent to print

```text
Placed:
Masala
3
```

This is the standard way children send data to their parents in React.

---

# PropsWithChildren

Normally, if we want a component to receive nested JSX, we would manually define a property called

```ts
children
```

For example,

```tsx
<Card>

    <p>Hello</p>

</Card>
```

Everything between the opening and closing tags becomes

```ts
children
```

Instead of writing

```ts
children: ReactNode
```

ourselves,

React provides a helper type called

```ts
PropsWithChildren
```

which automatically adds the `children` property.

Example:

```tsx
import type {
    PropsWithChildren,
    ReactNode
} from "react";

interface CardProps
    extends PropsWithChildren {

    title: string;

    footer: ReactNode;

}

function Card({
    title,
    children,
    footer
}: CardProps) {

    return (

        <div>

            <h2>{title}</h2>

            <div>
                {children}
            </div>

            {
                footer &&
                <footer>
                    {footer}
                </footer>
            }

        </div>

    );

}

export default Card;
```

---

## Understanding `PropsWithChildren`

Without it,

you would have written

```ts
interface CardProps {

    title: string;

    footer: ReactNode;

    children: ReactNode;

}
```

`PropsWithChildren` simply saves us from writing

```ts
children: ReactNode
```

every time.

---

## What is `ReactNode`?

`ReactNode` represents **anything React is capable of rendering.**

Examples include

- JSX
- Strings
- Numbers
- Fragments
- Arrays of JSX
- `null`
- `undefined`

Therefore,

```tsx
footer: ReactNode
```

allows us to pass

```tsx
<button>
    Order Now!
</button>
```

or

```tsx
<p>Footer</p>
```

or even

```tsx
<>
    <button />
    <button />
</>
```

---

## Using the Component

```tsx
<Card

    title="TEAANDTEA"

    footer={
        <button>
            Order Now!
        </button>
    }

>

    <p>
        Welcome to our tea shop!
    </p>

</Card>
```

React internally passes

```ts
{
    title: "TEAANDTEA",

    footer: <button />,

    children: (
        <p>
            Welcome to our tea shop!
        </p>
    )
}
```

The component then renders

```tsx
<h2>{title}</h2>

{children}

<footer>
    {footer}
</footer>
```

---

# Custom Hooks

A custom Hook is simply a reusable function whose name starts with

```ts
use
```

It allows us to reuse stateful logic across multiple components.

Suppose we frequently fetch data from APIs.

Instead of rewriting the fetching logic in every component, we create a custom Hook.

```tsx
import {
    useEffect,
    useState
} from "react";

interface FetchState<T> {

    data: T | null;

    loading: boolean;

    error: string | null;

}

export function useFetch<T>(
    url: string
): FetchState<T> {

    const [state, setState] =
        useState<FetchState<T>>({

            data: null,

            loading: true,

            error: null

        });

    useEffect(() => {

        async function fetchData() {

            try {

                const response =
                    await fetch(url);

                if (!response.ok) {
                    throw new Error(
                        `HTTP Error: ${response.status}`
                    );
                }

                const data =
                    (await response.json()) as T;

                setState({

                    data,

                    loading: false,

                    error: null

                });

            }

            catch (error) {

                if (error instanceof Error) {

                    setState({

                        data: null,

                        loading: false,

                        error: error.message

                    });

                }

            }

        }

        fetchData();

    }, [url]);

    return state;

}
```

---

# Understanding the Hook

The generic

```ts
<T>
```

means the Hook can fetch **any type of data**.

The state is

```ts
{
    data,
    loading,
    error
}
```

Initially,

```ts
{
    data: null,

    loading: true,

    error: null
}
```

When the request completes successfully,

```ts
loading
```

becomes

```ts
false
```

and

```ts
data
```

contains the fetched object.

If an error occurs,

```ts
error
```

stores the error message.

---

# Using the Hook

Suppose an API returns

```ts
interface Todo {

    id: number;

    title: string;

    completed: boolean;

}
```

The Hook is used as

```tsx
const {
    data,
    loading,
    error
} =
useFetch<Todo>(
    "https://jsonplaceholder.typicode.com/todos/1"
);
```

Now,

```ts
data
```

is automatically inferred as

```ts
Todo | null
```

without writing any additional code.

This is one of the biggest advantages of combining **React Hooks** with **TypeScript Generics**.