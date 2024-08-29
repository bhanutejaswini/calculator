const containerEle = document.querySelector(".container");
const numberEles = document.querySelectorAll(".number");
const operatorEles = document.querySelectorAll(".operator");
const equalityEle = document.querySelector(".equality");
const clearEle = document.querySelector(".delete");
const allClearEle = document.querySelector(".all-clear");
const displayEle = document.querySelector(".display");

let num1 = null,
  op = null,
  num2 = null,
  error = false;

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
  if (b === 0) {
    error = true;
    return "Division by zero is not valid!";
  }

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
  if (error) {
    displayEle.value = "";
    error = false;
  }

  let displayVal = displayEle.value;

  if (e.target.classList.contains("number")) {
    if (displayVal === "0" || error) displayEle.value = "";

    if (e.target.textContent === ".") {
      if (op) {
        let ind = displayVal.indexOf(op);
        if (displayVal.slice(ind + 1).includes(".")) return;
      } else {
        if (displayVal.includes(".")) return;
      }
    }

    displayEle.value += e.target.textContent;
  } else if (e.target.classList.contains("operator")) {
    if (!num1 || !op) {
      num1 = Number(displayVal);
      op = e.target.textContent;

      displayEle.value += e.target.textContent;
    } else if (op) {
      num2 = Number(displayVal.split(op)[1]);
      let res = operate(num1, num2, op);

      if (error) {
        num1 = null;
        num2 = null;
        op = null;
      } else {
        num1 = res;
        num2 = null;
      }

      displayEle.value = res;

      op = e.target.textContent;
      displayEle.value += op;
    }
  } else if (e.target.classList.contains("equality")) {
    if (num1 !== null && op !== null) {
      num2 = Number(displayVal.split(op)[1]);
      let res = operate(num1, num2, op);
      displayEle.value = res;
      num1 = res;
      num2 = null;
      op = null;
    }
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
