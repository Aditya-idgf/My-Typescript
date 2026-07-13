# TypeScript Compilation Pipeline 🚀

When you compile a TypeScript project, the compiler (`tsc`) doesn't directly convert `.ts` files into JavaScript. Instead, it passes the code through several internal stages.

```text
TypeScript Code (.ts)
        │
        ▼
     Lexer
        │
        ▼
     Parser
        │
        ▼
     Binder
        │
        ▼
     Checker
        │
        ▼
     Emitter
        │
        ▼
 JavaScript (.js) / Declaration Files (.d.ts)
```

---

# 1. Lexer (Scanner)

The **Lexer** (also called the **Scanner**) is the first stage of the TypeScript compiler.

Its job is to read the source code character by character and convert it into **tokens**.

### Example

```ts
const sum = (a: number, b: number) => a + b;
```

becomes something similar to:

```
const
sum
=
(
a
:
number
,
b
:
number
)
=>
a
+
b
;
```

Here,

- `const`
- `=>`
- `(`
- `)`
- `:`
- `number`
- `;`

are all individual **tokens**.

### Responsibilities

- Breaks source code into tokens.
- Ignores whitespace and comments.
- Detects very basic lexical errors (invalid characters, unterminated strings, etc.).
- Provides tokens for the parser.

> **Note:** Contrary to popular belief, a missing semicolon is **not usually** a lexer error. JavaScript's Automatic Semicolon Insertion (ASI) means semicolons are handled later during parsing.

---

# 2. Parser

The **Parser** receives the stream of tokens and builds an **Abstract Syntax Tree (AST)**.

An AST is a tree representation of your program that describes its structure without unnecessary syntax like spaces or comments.

### Example

```ts
const add = (a, b) => a + b;
```

can roughly become:

```
VariableDeclaration
│
├── Identifier (add)
└── ArrowFunction
    ├── Parameter (a)
    ├── Parameter (b)
    └── BinaryExpression (+)
```

### Responsibilities

- Creates the Abstract Syntax Tree (AST).
- Validates grammatical correctness.
- Reports syntax errors such as:
  - Missing brackets
  - Unexpected tokens
  - Invalid statement structure

### Helpful Tools

- **AST Explorer** – Visualize the generated AST.
- **Parser Diagnostic Tools** – Inspect parsing errors and syntax diagnostics.

---

# 3. Binder

Once the AST is created, it is passed to the **Binder**.

The Binder walks through the AST and creates **Symbol Tables**.

A **symbol** represents named entities in your program such as:

- Variables
- Functions
- Classes
- Interfaces
- Enums
- Type aliases
- Namespaces

For example,

```ts
const age = 20;
```

creates a symbol for `age`.

The Binder also connects every identifier in the program with its corresponding symbol.

### Parent Pointers

During binding, each AST node gets a reference to its parent node.

Example:

```
Function
│
├── Parameter
└── ReturnStatement
```

The `ReturnStatement` knows its parent is the `Function`.

Parent pointers make it easy for the compiler to traverse upward through the AST.

### Flow Nodes

The Binder also prepares information used for **Control Flow Analysis** by creating **Flow Nodes**.

Flow Nodes represent how execution moves through a program.

Example:

```ts
if (x > 0) {
    console.log("Positive");
} else {
    console.log("Negative");
}
```

The compiler builds a flow graph similar to:

```
Start
   │
Condition (x > 0)
  /      \
True    False
 |         |
Log      Log
  \      /
    End
```

These flow nodes help TypeScript determine:

- Whether a variable is definitely assigned.
- Whether code is unreachable.
- Type narrowing after conditions.
- Null and undefined safety.

Example:

```ts
if (user) {
    user.name;
}
```

Inside the `if` block, TypeScript knows `user` cannot be `null` or `undefined`.

---

# 4. Checker

The **Checker** is the most important stage of the TypeScript compiler.

It performs all semantic analysis and verifies that the program is type-safe.

This is where TypeScript's powerful type system is enforced.

### Responsibilities

- Type checking
- Generic validation
- Interface compatibility
- Function overload resolution
- Type inference
- Control-flow based type narrowing
- Detecting unreachable code
- Verifying assignments
- Checking inheritance rules

Most TypeScript errors originate from this stage.

Example:

```ts
let age: number = "hello";
```

Produces:

```
Type 'string' is not assignable to type 'number'.
```

### Short-Circuit Analysis

The Checker also understands JavaScript's **short-circuit evaluation**.

Examples:

```ts
user && user.name
```

If `user` is `null` or `undefined`, the second expression is never evaluated.

Similarly,

```ts
user?.name
```

The Checker knows that optional chaining safely stops evaluation if `user` is `null` or `undefined`.

Another example:

```ts
const value = input || "Default";
```

If `input` is falsy, `"Default"` is returned.

Understanding these behaviors allows TypeScript to perform more accurate type narrowing and reduce unnecessary errors.

---

# 5. Emitter

Once all checks pass, the program reaches the **Emitter**.

The Emitter converts TypeScript into plain JavaScript.

This stage **removes all TypeScript-specific syntax**, since JavaScript engines do not understand type annotations.

### Example

TypeScript:

```ts
function hello(name: string): void {
    console.log(name);
}
```

Generated JavaScript:

```js
function hello(name) {
    console.log(name);
}
```

Notice that:

- `: string` is removed.
- `: void` is removed.
- Only executable JavaScript remains.

This process is commonly referred to as **stripping types**.

### The Emitter can also generate:

- `.js` files
- `.js.map` source maps
- `.d.ts` declaration files
- Build information (`.tsbuildinfo`) for incremental compilation

---

# Final Output

After all compiler stages complete successfully, TypeScript generates one or more output files depending on the compiler configuration.

Typical outputs include:

- **`.js`** → Executable JavaScript code.
- **`.d.ts`** → Type declaration files used by other TypeScript projects.
- **`.js.map`** → Source maps for debugging.
- **`.tsbuildinfo`** → Incremental build metadata (optional).

---

# Complete Compilation Flow

```text
TypeScript (.ts)
      │
      ▼
Lexer (Scanner)
      │
      ▼
Parser
      │
      ▼
Abstract Syntax Tree (AST)
      │
      ▼
Binder
(Symbol Tables + Parent Pointers + Flow Nodes)
      │
      ▼
Checker
(Type Checking + Control Flow Analysis + Type Narrowing)
      │
      ▼
Emitter
(Removes TypeScript syntax & generates output)
      │
      ▼
JavaScript (.js)
Declaration Files (.d.ts)
Source Maps (.js.map)
```