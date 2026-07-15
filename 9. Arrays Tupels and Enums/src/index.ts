const TeaFlavors: string[] = ['Masala', 'Ginger', 'Lemon']
const TeaPrices: number[] = [10,20,25];

const rating: Array<number> = [4.5, 4.2, 3.5];

type Tea = {
  name: string,
  price: number
}

const menu: Tea[] = [
  {name: 'Masala' , price: 20}
]

const cities : readonly string[] = ['Delhi', 'Mumbai'];
// cities.push('Pune');

const tables : number[][] = [
  [1,2,3] , 
  [4,5,6]
]

let TeaTuple: [string, number];
TeaTuple = ['Masala', 20];
// TeaTuple = [20, 'Masala'];

// let userInfo: [string, number, boolean?];
// userInfo = ['Aditya', 2020]
// userInfo = ['Aditya', 2020, true]
// console.log(userInfo);

// let userInfo: [string,number,  boolean?];
// userInfo = ['Aditya', 62]
// userInfo.push('delhi');
// console.log(userInfo);

// let userInfo: [string,number,  boolean?];
// userInfo = ['Aditya', 62]
// userInfo[2] = true;
// console.log(userInfo);

let userInfo: [string,number,  boolean?];
userInfo = ['Aditya', 62]
userInfo[2] = true;
userInfo.push('I love Dogs!') // is a valid push.
// userInfo.push({}) // is a invalid push 
console.log(userInfo)

let location : readonly [string, number] = ['Pune', 432222] 
// location[0] = 'Delhi';

console.log(location)

const TeaItems: [name: string, price: number] = ["Masala" , 20];
// const TeaItems: [name: string, price: number] = ["Masala" , '20'];

enum cupSize {
  SMALL,
  MEDIUM,
  LARGE
}
const size = cupSize.SMALL; // here the type of size is :cupSize.SMALL;

enum status {
  PENDING = 100,
  SERVED,
  CANCELLED
}

enum TeaTypes {
  MASALA = "masala",
  GINGER = "ginger",
  LEMON = "lemon"
}
function makeTea (type: TeaTypes) {
  console.log(`Making : ${type}`);
}
makeTea(TeaTypes.MASALA); 
// makeTea('Masala');

enum RandomEnum {
  ID = 1,
  Name =  "Tea"
}

const enum Sugar {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3
}
console.log(Sugar.HIGH);
