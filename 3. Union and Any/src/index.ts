let sub: number | string = '1 Million'

let APIStatus : 'Success' | 'Error' | 'Pending' = 'Success';
// APIStatus = 'Done' will give error as its not one of the defined ones.

const orders = ['10', '20', '30', '40'];

// let myOrder;
// let myOrder: string;
let myOrder: string | undefined;

for(let order in orders){
    if(order === '20'){
        myOrder = order;
    }
    myOrder = '100';
}

console.log(myOrder);
