/** Exercise 01 - Coins **/

function calculateChange(amount) {

    if (amount < 0) {
    return "Error: the number cannot be negative";
    }
  if (amount > 100) {
    return "Error: the number is too large";
  }

  let cents = Math.round(amount * 100);

  let dollars = Math.floor(cents / 100);
  cents %= 100;

  let quarters = Math.floor(cents / 25);
  cents %= 25;

  let dimes = Math.floor(cents / 10);
  cents %= 10;

  let nickels = Math.floor(cents / 5);
  cents %= 5;

  let pennies = cents;

  const result = [];

if (dollars > 0) {
  result.push(`${dollars} dollar${dollars === 1 ? "" : "s"}`);
}

if (quarters > 0) {
  result.push(`${quarters} quarter${quarters === 1 ? "" : "s"}`);
}

if (dimes > 0) {
  result.push(`${dimes} dime${dimes === 1 ? "" : "s"}`);
}

if (nickels > 0) {
  result.push(`${nickels} nickel${nickels === 1 ? "" : "s"}`);
}

if (pennies > 0) {
  result.push(`${pennies} penn${pennies === 1 ? "y" : "ies"}`);
}

return result.join(", ");
}

// Sample test cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies

console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny

console.log(calculateChange(150.11));
// $150.11 ==> Error: the number is too large

// Additional test cases
console.log(calculateChange(1.00));
console.log(calculateChange(0.99));
console.log(calculateChange(100.00));
console.log(calculateChange(0.01));
console.log(calculateChange(0));
console.log(calculateChange(-1));