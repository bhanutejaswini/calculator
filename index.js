const containerEle = document.querySelector(".container");
const numberEles = document.querySelectorAll(".number");
const operatorEles = document.querySelectorAll(".operator");
const equalityEle = document.querySelector(".equality");
const clearEle = document.querySelector(".delete");
const allClearEle = document.querySelector(".all-clear");
const displayEle = document.querySelector(".display");

let num1 = null,
  op = null,
  num2 = null;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(num1, num2, op) {
  let res = null;

  switch (op) {
    case "+":
      res = add(num1, num2);
      break;
    case "-":
      res = subtract(num1, num2);
      break;
    case "*":
      res = multiply(num1, num2);
      break;
    case "/":
      res = divide(num1, num2);
      break;
  }

  return res;
}

function handleOperations(e) {
  if (e.target.classList.contains("number")) {
    displayEle.value += e.target.textContent;
  } else if (e.target.classList.contains("operator")) {
    let displayVal = displayEle.value;
    if (!num1) {
      num1 = Number(displayVal);
      op = e.target.textContent;
      displayEle.value += e.target.textContent;
    } else {
      let ind = displayVal.indexOf(op);
      num2 = Number(displayVal.slice(ind + 1));
      let res = operate(num1, num2, op);
      num1 = res;
      num2 = null;
      op = e.target.textContent;
      displayEle.value = res + op;
    }
  } else if (e.target.classList.contains("equality")) {
    let displayVal = displayEle.value;
    let ind = displayVal.indexOf(op);
    num2 = Number(displayVal.slice(ind + 1));
    let res = operate(num1, num2, op);
    num1 = res;
    num2 = null;
    displayEle.value = res;
  }
}

function deleteLast() {
  let exp = displayEle.value;
  displayEle.value = exp.slice(0, exp.length - 1);
}

function allClear() {
  displayEle.value = "";
}

containerEle.addEventListener("click", (e) => handleOperations(e));

clearEle.addEventListener("click", deleteLast);

allClearEle.addEventListener("click", allClear);
