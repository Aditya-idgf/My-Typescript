function makeTea(type: string, cups: number) {
  console.log(`Making ${cups} of ${type}`);
}

makeTea("Masala", 2);

function getTeaPrice(type: string): number {
  return 20;
}
getTeaPrice("Masala");

function makeOrder(order: string) {
  if (!order) return null;
  return order;
}

function logChai(): void {
  console.log("Tea Is Ready");
}

// function orderTea(type?: string) {
//     console.log(type ? `Serving Tea: ${type}` : 'Serving Normal Tea');
// }

// function orderTea(type: string = "Normal") {
//     console.log(`Serving Tea: ${type}`);
// }

function createTea(order: {
  type: string;
  sugar: number;
  size: "small" | "large";
}): number {
  return 4;
}
