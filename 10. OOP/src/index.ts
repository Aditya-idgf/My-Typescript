// class Tea {
//   flavor : string;
//   price: number;

//   constructor(flavor: string, price: number) {
//     this.flavor = flavor;
//     this.price = price;
//     console.log(this);
//   }
// }
// const masalaTea = new Tea("Ginger", 20);
// masalaTea.flavor = 'Masala'
// masalaTea.price = 10;
// console.log(masalaTea);

class Tea {
  public flavor : string  = "Masala";
  private secreteIngredients : string= "Cardamom";
  reveal() {
    return this.secreteIngredients;
  }
}
let obj = new Tea();
console.log(obj.flavor);
// console.log(obj.secreteIngredients);
console.log(obj.reveal());

class Shop {
  protected shopName : string = "MYTEA";
}
class Branch extends Shop {
  displayName(): void {
    console.log(this.shopName);  
  }
}
const myBranch = new Branch;
myBranch.displayName();

class Wallet {
  #balance = 1000;
  getBalance () {
    console.log(this.#balance);
  }
}
const w = new Wallet;
w.getBalance();

class Cup {
  readonly capacity: number;
  constructor (capacity: number) {
    this.capacity = capacity;
  }
}
const c = new Cup(250);
// c.capacity = 500;
console.log(c.capacity);

class ModernTea {
  private _sugar = 2
  get sugar(){
    return this._sugar;
  }
  set sugar(val: number) {
    if(val > 5) throw new Error('Too Sweet !');
    this._sugar = val;
  }
}
const mT = new ModernTea();
console.log(mT.sugar);
mT.sugar = 4;
console.log(mT.sugar);

class newTea {
  static shopName =  "TEATOTEA";
  constructor (public flavour : string) {
    this.flavour = flavour;
  }
}
console.log(newTea.shopName);

abstract class Drink {
  abstract make(): void;
}

class myTea extends Drink {
  make(): void {
    console.log('MY tea is ready !');
  }
}

class Heater {
  On(){}
  Off(){}
}
class TeaMaker {
  constructor (private heater :Heater) {
    this.heater.On 
    this.heater.Off
  }
}