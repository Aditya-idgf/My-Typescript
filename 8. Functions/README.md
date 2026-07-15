this module will cover how to use functions with ts.

in ts we can make the variable passed in the functions fixed to a certain type(s).
eg.
function makeTea(type: string, cups: number) {
console.log(`Making ${cups} of ${type}`);
}
makeTea("Masala", 2);
makeTea("Masala", "2"); // will give an error

then we can also determine teh type of return value we want from the function.
eg.
function getTeaPrice(type: string): number { // here we state that the value the function should return is of 'numeber' type
return 20;
}
getTeaPrice("Masala");

in the following function:
function makeOrder(order: string) {
if(!order) return null;
return order;
}
the return currently is any because if we set it to string, it will cause error becasue its returning 2 type of variable instead of 1.

Void: this type states that no value is returned by the function.
function logChai() : void {
console.log('Tea Is Ready');
}
here if we put the string as a return : return 'Tea Is Ready' then it would have give us an error.

optional and default parameter:

// here the type is optional as not passing it will just make it serve normal tea
function orderTea(type?: string) {
console.log(type ? `Serving Tea: ${type}` : 'Serving Normal Tea');
}

// here we made the type to be Normal On default.
function orderTea(type: string = "Normal") {
console.log(`Serving Tea: ${type}`);
}

eg. of a function:
function createTea(order: {
type: string,
sugar: number,
size: 'small' | 'large'
}) : number {
return 4;
}

here we determined the order's type inside the function, and made the return type of the function a number.
