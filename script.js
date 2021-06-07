const screen = document.getElementById("calc-screen");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal-sign");
const del = document.querySelector(".del")
const clear = document.querySelector(".all-clear")
const decimal = document.querySelector(".decimal")
let currentOperator = null;
let firstValue = "";
let secondValue = "";
let resetScreen = false;


numbers.forEach(number => {
    number.addEventListener("click", () => {
        addNumber(number.textContent)
    });
});

operators.forEach((operator) =>
  operator.addEventListener("click", () => setOperation(operator.textContent))
);

equal.addEventListener("click", evaluateEqual);
del.addEventListener("click", delOne);
clear.addEventListener("click", allClear);
decimal.addEventListener("click", addDecimal);


function addNumber(number){
    if(screen.textContent === "0" || resetScreen) clearScreen();
    screen.textContent += number;
}

function clearScreen(){
    screen.textContent = "";
    resetScreen = false;
};

function delOne(){
    screen.textContent = screen.textContent.toString().slice(0, -1);
}

function addDecimal() {
    if (resetScreen) clearScreen();
    if (screen.textContent === "") screen.textContent = "0";
    if (screen.textContent.includes(".")) return;
    screen.textContent += ".";
  }

function allClear(){
    screen.textContent = "0";
    firstValue = "";
    secondValue = "";
    currentOperator = null;
    resetScreen = false;
}

function setOperation(operator){
    if (currentOperator !== null) evaluateEqual();
    firstValue = screen.textContent;
    currentOperator = operator;
    resetScreen = true;
}

function evaluateEqual() {
    if (currentOperator === null || resetScreen) return;
    if (currentOperator === "/" && screen.textContent === "0") {
        alert("You cannot divide by 0.");
        clearAll();
        return;
    }
    secondValue = screen.textContent;
    screen.textContent = roundResult(operate(currentOperator, firstValue, secondValue));
    currentOperator = null;
};

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
  }

function add(a, b) {
    return a + b;
};

function subtract(a, b){
    return a - b;
};

function divide(a, b){
    return a / b;
};

function multiply(a, b){
    return a * b;
};

function operate(operation, a, b){
    a = Number(a);
    b = Number(b);
    if(operation === "+"){
        return add(a, b);
    } else if(operation === "-"){
        return subtract(a, b);
    } else if(operation === "x"){
        return multiply(a, b);
    }else if(operation === "/"){
        return divide(a, b);
    }else{
        return null;
    }
}