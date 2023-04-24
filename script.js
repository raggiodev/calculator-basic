const plus = document.getElementById('plus');
const subtract = document.getElementById('subtract');
const multiplication = document.getElementById('multiplication');
const division = document.getElementById('division');

const operations = [plus, subtract, multiplication, division]

const equal = document.getElementById('equal');
const percentage = document.getElementById('percentage');

const numbers = document.querySelectorAll('.number');

const decimal = document.getElementById('decimal');
const negative = document.getElementById('negative');

const clear = document.getElementById('clear');

const secondScreen = document.getElementById('calculate');
const screen = document.getElementById('result');

let lastNumber = ""
let lastResult = ""
let operation = ""
let lastEqual = ""

//Volver a un string una ecuacion aritmética
function parse(str) {
    return Function(`'use strict'; return (${str})`)()
}

numbers.forEach(e => e.addEventListener('click', function (e) {
    if (lastEqual !== "") {
        secondScreen.innerHTML = ""
        lastEqual = ""
        operation = ""
        lastResult = ""
    }
    lastNumber = lastNumber + e.target.innerHTML
    screen.innerHTML = lastNumber
}))
decimal.addEventListener('click', function () {
    if (!lastNumber.includes(".")) {
        lastNumber === "" ? lastNumber += "0." : lastNumber += ".";
        screen.innerHTML = lastNumber
    }
})
negative.addEventListener('click', function () {
    if (lastNumber != "") {
        lastNumber.includes("-") ?
            lastNumber = lastNumber.substring(2, lastNumber.length - 1)
            : lastNumber = "(-" + lastNumber + ")";
        screen.innerHTML = lastNumber
    }
})
clear.addEventListener('click', function () {
    screen.innerHTML = "";
    secondScreen.innerHTML = "";
    lastNumber = "";
    lastResult = "";
    operation = "";
})
operations.forEach(e => e.addEventListener('click', function (e) {
    lastEqual = ""
    switch (e.target.id) {
        case "plus": operation = "+";
            break;
        case "subtract": operation = "-";
            break;
        case "division": operation = "/";
            break;
        default: operation = "*";
            break;
    }
    if (lastNumber != "") {
        let ecuation = screen.innerHTML + operation
        let showInScreen = parse(lastResult + screen.innerHTML)
        if (showInScreen % 1 !== 0) { showInScreen = showInScreen.toFixed(6) }
        screen.innerHTML = showInScreen
        secondScreen.innerHTML += ecuation
        lastResult = screen.innerHTML + operation
    } else {
        lastResult = lastResult.substring(0, lastResult.length - 1) + operation
        secondScreen.innerHTML = secondScreen.innerHTML.substring(0, secondScreen.innerHTML.length - 1) + operation
    }
    lastNumber = ""
    console.log(lastResult)
}))
equal.addEventListener('click', function () {
    if (lastNumber !== "") {
        let showInScreen = parse(lastResult + screen.innerHTML)
        if (showInScreen % 1 !== 0) { showInScreen = showInScreen.toFixed(6) }
        screen.innerHTML = showInScreen
        lastEqual = lastNumber
    } else {
        let showInScreen = parse(screen.innerHTML + operation + lastEqual)
        if (showInScreen % 1 !== 0) { showInScreen = showInScreen.toFixed(6) }
        screen.innerHTML = showInScreen
    }
    lastResult = screen.innerHTML + operation
    secondScreen.innerHTML += lastEqual + operation
    lastNumber = ""
})
percentage.addEventListener('click', function () {
    lastNumber = parse(lastNumber) / 100
    screen.innerHTML = lastNumber
})