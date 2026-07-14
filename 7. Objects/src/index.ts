// const tea = {
//     name : 'Masala Tea',
//     price: 20,
//     isHot: true
// }

// let tea : {
//     name: string
//     price: number,
//     isHot: boolean
// }

// tea = {
    //     name : 'Masala Tea',
    //     price: 20,
    //     isHot: true
    // }
    
// type Tea = {
//     name: string
//     price: number,
//     ingredients: string[]
// }

// const MasalaTea : Tea = {
//     name: 'Masala Tea',
//     price: 20,
//     ingredients: ['tea leaves', 'tea masala']
// }

type Cup = {size : string};
let smallCup : Cup = {
    size: '200ml'
}
let bigCup = {
    size: '500ml',
    material: 'steel'
}
smallCup = bigCup;

type Item = {name : string, quantity: number}
type Address = {street : string, pin: number}

type order = {
    id : string,
    items : Item[],
    address : Address
}

// type Tea = {
//     name: string,
//     price: number,
//     isHot: boolean
// }
// const updateTea = (update: Partial<Tea>) => {
    //     console.log('Updating Tea with : ', update)
    // }
    // updateTea({name: 'Masala Tea'})
// updateTea({price: 10})
// updateTea({isHot: true})
// updateTea({});

type TeaOrder = {
    name?: string,
    quantity?: number,
}
const placeOrder = (order: Required<TeaOrder>) => {
    console.log(order);
}
// placeOrder({name: 'Masala Tea'})
placeOrder({name: 'Masala Tea', quantity: 20})

// type Tea = {
//     name: string,
//     price: number,
//     isHot: boolean
// }
// type BasicTeaInfo = Pick<Tea, "name" | "price">
// const teaInfo: BasicTeaInfo = {
//     name: "Masala Tea",
//     price: 20
// }

type Tea = {
    name: string,
    price: number,
    isHot: boolean
}
type BasicTeaInfo = Omit<Tea, "price">
const teaInfo: BasicTeaInfo = {
    name: "Masala Tea", 
    isHot: true
}