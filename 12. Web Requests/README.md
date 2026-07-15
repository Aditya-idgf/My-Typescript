# Making Web Requests in TypeScript

This module covers how to make HTTP requests in TypeScript using:

- Axios
- Fetch API

We'll also learn how TypeScript helps us safely work with API responses by defining their structure using interfaces.

---

# Making Requests with Axios

First, install Axios.

```bash
npm install axios
```

Now we can make a simple GET request.

```ts
import axios from "axios";

axios
    .get("https://jsonplaceholder.typicode.com/todos/1")
    .then(response => {
        console.log(response.data);
    });
```

The `response.data` property contains the JSON returned by the server.

---

# Installing Type Definitions (`@types`)

Sometimes, after installing a JavaScript library, TypeScript may report errors because it cannot find the library's type definitions.

Many JavaScript libraries do not ship with TypeScript types.

In such cases, install the declaration files.

```bash
npm install -D @types/<package-name>
```

Example:

```bash
npm install express
npm install -D @types/express
```

The `@types` package contains **Declaration Files (`.d.ts`)**.

Declaration files contain **only type information** and **no executable JavaScript code**.

They enable features such as:

- Static type checking
- IntelliSense
- Auto-completion
- Error detection

> **Note:** Axios already includes its own TypeScript definitions, so **you do not need to install `@types/axios`**.

---

# CommonJS vs ES Modules

Earlier we used CommonJS modules.

```ts
import axios = require("axios");
```

Modern TypeScript projects generally use ES Modules.

```ts
import axios from "axios";
```

To enable ES Modules, update your `package.json`.

```json
{
    "type": "module"
}
```

This tells Node.js to interpret your project as an ES Module project.

---

# Describing API Responses

Whenever we receive data from an API, TypeScript needs to know its structure.

Suppose the API returns:

```json
{
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
}
```

We describe that structure using an interface.

```ts
interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
```

This interface acts as a contract that every received object must satisfy.

---

# `verbatimModuleSyntax` and Type Imports

Some projects enable the following compiler option.

```json
"verbatimModuleSyntax": true
```

With this option enabled, TypeScript requires all **type-only imports** to be explicitly marked.

Incorrect:

```ts
import axios, { AxiosResponse } from "axios";
```

Correct:

```ts
import axios from "axios";
import type { AxiosResponse } from "axios";
```

---

## Why?

Normally, TypeScript removes type-only imports during compilation.

For example,

```ts
import { User } from "./types";
```

would normally disappear if `User` is only used as a type.

However, with:

```json
"verbatimModuleSyntax": true
```

TypeScript preserves imports exactly as written.

If `User` only exists during compilation and not at runtime, JavaScript would try to import something that doesn't exist, causing a runtime error.

Therefore, TypeScript requires:

```ts
import type { User } from "./types";
```

Type-only imports are removed during compilation, preventing unnecessary runtime imports.

---

# Axios with TypeScript

Now let's combine Axios with our `Todo` interface.

```ts
import axios from "axios";
import type { AxiosResponse } from "axios";

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

const fetchData = async (): Promise<void> => {
    try {
        const response: AxiosResponse<Todo> =
            await axios.get(
                "https://jsonplaceholder.typicode.com/todos/1"
            );

        console.log("Todo:", response.data);

    } catch (error: unknown) {

        if (axios.isAxiosError(error)) {
            console.log("Axios Error:", error.message);

            if (error.response) {
                console.log("Status Code:", error.response.status);
            }
        }
    }
};

fetchData();
```

Notice the type:

```ts
AxiosResponse<Todo>
```

This generic tells TypeScript that:

```ts
response.data
```

should have the structure of a `Todo`.

This gives us full autocomplete and compile-time checking.

---

# Error Handling with Axios

Axios throws an exception whenever:

- The request cannot reach the server.
- The server returns an error response.
- A timeout occurs.
- Network connectivity fails.

Inside the `catch` block, the error type is initially:

```ts
unknown
```

To determine whether the error originated from Axios, we use:

```ts
axios.isAxiosError(error)
```

This is a **Type Guard**.

If it returns `true`, TypeScript automatically treats the variable as an `AxiosError`.

We can then safely access properties like:

```ts
error.message

error.response

error.response.status

error.response.data
```

Without the type guard, these properties would not be accessible because the compiler cannot guarantee that the error came from Axios.

---

# Making Requests with the Fetch API

The Fetch API follows a similar pattern.

```ts
interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

const fetchData = async (): Promise<void> => {

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos/1"
        );

        if (!response.ok) {
            throw new Error(
                `HTTP Error: ${response.status}`
            );
        }

        const data = (await response.json()) as Todo;

        console.log(data);
        console.log("Title:", data.title);
        console.log("Completed:", data.completed);

    } catch (error: unknown) {

        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("An unknown error occurred.");
        }
    }
};

fetchData();
```

Unlike Axios, the Fetch API **does not automatically throw an exception** when the server responds with an error status such as:

- 404
- 500
- 403

Instead, it successfully returns a `Response` object.

Therefore, we manually check:

```ts
if (!response.ok)
```

If the response is unsuccessful, we throw our own error.

```ts
throw new Error(
    `HTTP Error: ${response.status}`
);
```

---

# Error Handling with Fetch

Unlike Axios, Fetch throws exceptions only for **network-related failures**.

Examples include:

- No internet connection
- DNS resolution failure
- Request timeout (if implemented manually)
- Server unreachable

HTTP errors such as:

- 404
- 500
- 401

do **not** trigger the `catch` block automatically.

That is why checking:

```ts
response.ok
```

is an important step when using Fetch.

---

# Why Use a Type Assertion?

A common implementation is:

```ts
const data: Todo = await response.json();
```

A slightly clearer approach is:

```ts
const data = (await response.json()) as Todo;
```

Why?

The `response.json()` method returns:

```ts
Promise<any>
```

(or `Promise<unknown>` depending on your TypeScript configuration).

TypeScript has no knowledge of the returned object's structure.

By writing:

```ts
as Todo
```

we explicitly tell the compiler:

> "Treat this parsed JSON as a `Todo` object."

This is called a **Type Assertion**.

> **Important:** A type assertion does **not** validate the JSON at runtime. It only informs the TypeScript compiler of the expected type. If the API returns malformed data, TypeScript will not detect it during execution.

---

# Axios vs Fetch

| Axios | Fetch API |
|--------|-----------|
| External library (`npm install axios`) | Built into modern browsers and Node.js (v18+) |
| Automatically converts JSON responses | Requires calling `response.json()` |
| Automatically throws for HTTP error status codes | Does not throw for HTTP errors; `response.ok` must be checked manually |
| Provides built-in request/response interceptors | No built-in interceptors |
| Easier error handling with `AxiosError` | Manual error handling required |
| Includes built-in TypeScript definitions | Uses the browser/Node.js Fetch API types |

Both Axios and Fetch are widely used. Axios provides additional convenience features, while Fetch is lightweight and built directly into the JavaScript runtime.