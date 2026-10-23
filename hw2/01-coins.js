/** Exercise 01 - Coins **/

function calculateChange(amount) {
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

  return `${dollars} dollars, ${quarters} quarters, ${dimes} dimes, ${nickels} nickels, ${pennies} pennies`;
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