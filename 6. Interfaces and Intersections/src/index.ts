// function makeTea(order: {type: string, sugar: number, strong: boolean}){
//     console.log(order);
//     console.log(typeof order);
// }

// function serveTea(order: {type: string, sugar: number, strong: boolean}){
//     console.log(order)
// }

type teaOrder = {
    type: string , sugar: number, strong: boolean
}

function makeTea(order: teaOrder){
    console.log(order); 
    console.log(typeof order);
}

function serveTea(order: teaOrder){
    console.log(order)
}

// type TeaRecepie = {
//     water: number,
//     milk: number,
// }

// class MasalaTea implements TeaRecepie {
//     water = 100;
//     milk = 50;
// }

// type cupSize = "small" | "large";
// class TEA implements cupSize{
// }

interface TeaRecepie  {
    water: number,
    milk: number,
}

interface cupSize {
    size: "small" | "large";
}
class TEA implements cupSize{
    size: "small" | "large" = "small";
}


// type response = {ok: true} | {ok: false} ;
// class myRes implements response {
//     ok: boolean = true;
// }

type baseTea = {
    teaLeaves: number
}
type extra = {masala: number}
type MasalaTea = baseTea & extra;
const cup : MasalaTea = {
    teaLeaves: 2,
    masala : 1
}

type user = {
    username: string,
    bio?: string
}
const u1 : user = {
    username: "Aditya"
}
const u2 : user = {
    username: "Aditya",
    bio: 'Hello im Aditya'
}

type Config = {
    readonly name : string,
    version: string
}
const myCfg : Config = {
    name: "Github",
    version: "1.1.0"
}
// myCfg.name = "Youtube";