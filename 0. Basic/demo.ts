// TypeScript is a strictly typed, high-level programming language developed by Microsoft. 
// As a superset of JavaScript, it introduces static typing, interfaces, and generics, 
// enabling developers to catch type-related errors at compile time instead of runtime.

// The following is an example of standard JavaScript, where type declarations are omitted:
//
// function hello(name) {
//     return "Hello " + name; // Standard string concatenation
// }
// console.log(hello('Aditya'));

// In TypeScript, we explicitly define the data types for both the parameter and the return value.
function hello(name: string): string {
    return `Hello ${name}`; // Using a template literal for clean string interpolation
}

console.log(hello('Aditya'));