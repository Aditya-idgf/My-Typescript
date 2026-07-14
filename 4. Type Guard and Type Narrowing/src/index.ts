function getTea(kind: string | number) {
    if(typeof kind === 'string') {
        return `Making ${kind} Tea !`;
    }
    return `Chai order : ${kind}`;
}

function customeTea(msg?: string) {
    if(msg) {
        return `Serving Tea with ${msg}`;
    }
    return `Serving Normal Tea`;    
}

function orderTea(size: 'small' | 'medium' | 'large' | number) {
    if(size === "small"){
        return `Serving small tea.`;
    }
    if(size === "medium" || size === "large"){
        return `Serving extra tea.`;
    }
    return `Serving ${size} Tea.`
}

class SmallTea {
    serve() {
        return `Serving Small Tea.`;
    }
}

class BigTea {
    serve() {
        return `Serving Big Tea.`;
    }
}

function serve(tea: SmallTea | BigTea) {
    if(tea instanceof SmallTea) {
        return tea.serve();
    }
    if(tea instanceof BigTea) {
        return tea.serve();
    }
}

// this is our customn type
type teaOrder = {
    type: string, 
    sugar: number
}

function isTeaOrder(obj: any) : obj is teaOrder {
    return (
        typeof obj === 'object' && 
        obj !== null &&
        typeof obj.type === 'string' &&
        typeof obj.sugar === 'number'
    )
}

function serveOrder(tea: teaOrder | string) {
    if(isTeaOrder(tea)) {
        return `serving ${tea.type} tea with ${tea.sugar} sugar`;
    }
    return `serving tea : ${tea}`
}

type MasalaTea = {type: 'Masala', spiceLevel: number};
type GingerTea = {type: 'Ginger', aroma: number};
type LemonTea = {type: 'Lemon', amount: number};

type Tea = {teaType: MasalaTea | GingerTea | LemonTea , quantity : number};

function makeTea(order: Tea) {
    switch (order.teaType.type) {
        case "Masala":
            return `Serving Masala Tea.`;
            break;
        case "Ginger":
            return `Serving Ginger Tea.`;
            break;
        case "Lemon":
            return `Serving Lemon Tea.`;
            break;
        default:
            break;
    }
}

function Brew(order: MasalaTea | GingerTea) {
    if('spiceLevel' in order) {
        return `Serving Masala Tea`;
    }
    if('aroma' in order) {
        return `Serving Ginger Tea`;
    }
}

// function isStringArray(arr: unknown) : arr is string[] {
    
// }