let response: any = "42";

// let numericLength: number = response.
let numericLength: number = (response as string).length;

type Book = {
  name: "string";
};

let bookString = '{"name":"my mind"}';

// let bookObject = JSON.parse(bookString)
let bookObject = JSON.parse(bookString) as Book;
console.log(bookObject.name);

const inputElement = document.getElementById("username") as HTMLInputElement;

let value: any;
value = ['a','b'];
value = 2.4;
value.toUpperCase();

let newValue:unknown;
newValue = ['a','b'];
newValue = 2.4;
// newValue.toUpperCase();
if(typeof newValue === 'string') {
    newValue.toUpperCase();
}

try {
    
} catch (error) {
    if(error instanceof Error){
        console.log(error.message);
    }
}

type role = 'admin' | 'user';

function checkRole(myRole: role) {
    if(myRole == 'admin'){
        return `redirecting to admin page`;
    }
    if(myRole == 'user'){
        return `redirecting to admin page`;
    }
    myRole;
}