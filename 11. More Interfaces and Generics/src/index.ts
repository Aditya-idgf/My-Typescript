interface Tea {
  flavour : string,
  sugar : number
  readonly shopname : string
}

const masalaTea: Tea = {
  flavour: 'Masala',
  sugar: 5,
  shopname : "MYTEA"
}

console.log(masalaTea)
// masalaTea.shopname = 'TEA&TEA';

interface DiscountCalculator {
  (price : number) : number
}

const Discount : DiscountCalculator = (p) => p*0.5;

interface TeaMachine {
  start() : void,
  stop() : void
}
const machine : TeaMachine = {
  start() {
    console.log('Start')
  },
  stop() {
    console.log('Stop')
  }
}
machine.start()
machine.stop()

interface TeaRating {
  [flavor: string] : number
}
const ratings: TeaRating = {
  masala: 4.4,
  ginger: 4.1
}

interface User {
  name: string
}
interface User { 
  age: number
}
const user : User = {
  name: 'Aditya',
  age: 25
}

interface A { a : string };
interface B { b : string };
interface C extends A, B { c : string};
const abc : C = {
  a: 'A',
  b: 'B',
  c: 'C',
}

function wrapInArray<T> (item: T) : T[] {
  return [item];
}
console.log(wrapInArray("Masala TEA")) 
console.log(wrapInArray(42)) 

function pair<A,B> (a: A, b: B) : [A, B] {
  return [a, b];
}

console.log(pair('A', 1))
console.log(pair('2', 4))

interface Box<T> {
  content: T
}
const numBox : Box<number> = {
  content : 10,
  // content : '10'
}
const stringBox: Box<string> = {
  content: 'Aditya'
}

interface APIPromise<T> {
  status: number,
  data: T
}
const res: APIPromise<{flavor: string}> = {
  status: 200,
  data: {flavor: "Masala"}
}