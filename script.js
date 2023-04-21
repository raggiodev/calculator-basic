// Agarramos elementos del DOM
// Constantes
const screen = document.querySelector("#screen");
const calculate = document.querySelector("#calculate");
const result = document.querySelector("#result");
const clearBtn = document.querySelector("#clear");
const negativeBtn = document.querySelector("#negative");
const percentageBtn = document.querySelector("#percentage");
const divisionBtn = document.querySelector("#division");
const multiplicationBtn = document.querySelector("#multiplication");
const subtractBtn = document.querySelector("#subtract");
const plusBtn = document.querySelector("#plus");
const equalBtn = document.querySelector("#equal");
const decimalBtn = document.querySelector("#decimal");
const numbersBtn = document.querySelectorAll(".number");

// Variables
let firstValue = "";
let secondValue = "";
let currentOperation = null;
let shouldResetScreen = false;

// Escuchadores de eventos
numbersBtn.forEach((number) => {
    number.addEventListener("click", () => appendNumber(number.textContent));
});

decimalBtn.addEventListener("click", () => appendNumber("."));

plusBtn.addEventListener("click", () => setOperation("+"));

subtractBtn.addEventListener("click", () => setOperation("-"));

multiplicationBtn.addEventListener("click", () => setOperation("*"));

divisionBtn.addEventListener("click", () => setOperation("/"));

percentageBtn.addEventListener("click", () => applyPercentage());

equalBtn.addEventListener("click", () => evaluate());

clearBtn.addEventListener("click", () => clear());

negativeBtn.addEventListener("click", () => toggleNegative());

// Funciones
function appendNumber(number) {
    if (result.textContent === "0" || shouldResetScreen) resetScreen();
    result.textContent += number;
}

function resetScreen() {
    result.textContent = "";
    shouldResetScreen = false;
}

function clear() {
    result.textContent = "0";
    calculate.textContent = "";
    firstValue = "";
    secondValue = "";
    currentOperation = null;
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate();
    firstValue = result.textContent;
    currentOperation = operator;
    calculate.textContent = `${firstValue} ${currentOperation}`;
    shouldResetScreen = true;
}

function applyPercentage() {
    result.textContent = `${parseFloat(result.textContent) / 100}`;
}

function toggleNegative() {
    result.textContent = `${parseFloat(result.textContent) * -1}`;
}

function evaluate() {
    if (currentOperation === null || shouldResetScreen) return;
    if (currentOperation === "÷" && result.textContent === "0") {
        alert("No se puede dividir por cero");
        clear();
        return;
    }
    secondValue = result.textContent;
    calculate.textContent = "";
    result.textContent = operate(
        currentOperation,
        firstValue,
        secondValue
    );
    currentOperation = null;
}

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return a / b;
        default:
            return null;
    }
}