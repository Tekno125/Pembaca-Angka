let numberString = "12389019";
  let temp = numberString;
  let arrayNumber = [];
  for (let i = numberString.length; i > 0; i -= 3) {
    arrayNumber.push(temp.slice(-3));
    temp = temp.slice(0, -3);
  }
  console.log(arrayNumber);