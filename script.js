const numbers = document.querySelectorAll('.number');
const result = document.querySelector('.display span');
const operations = document.querySelectorAll('.operation');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const negative = document.querySelector('.negative');
const percent = document.querySelector('.percent');
const comma = document.querySelector('.comma');

let firstValue = "";
let hasFirstValue = false;
let secondValue = "";
let operation = "";
let resultValue = 0;

for (let i = 0 ; i < numbers.length ; i++) {
    numbers[i].addEventListener('click', (e) => {
        let num = e.target.getAttribute('value');
        if (hasFirstValue === false) {
            getFirstValue(num);
        } 
        else {
            getSecondValue(num);
        }
    })
}

function getFirstValue (num) {
    let firstValueFloat = parseFloat(firstValue + num);

    if (isFinite(firstValueFloat)) {
    result.innerHTML = "";
    firstValue += num;
    result.innerHTML = firstValue;
    firstValue = +firstValue;
    }
}

function getSecondValue (num) {
    if (firstValue != "" && operation != "") {
        secondValue += num;
        result.innerHTML = secondValue;
        secondValue = +secondValue;
    }
}

function getOperation () {
    for (let i = 0 ; i < operations.length ; i++) {
        operations[i].addEventListener('click', (e) => {
            operation = e.target.getAttribute('value');
            hasFirstValue = true;
        })
    }
}
getOperation();

equals.addEventListener('click', () => {
    if (firstValue !== "") {
        resultValue = firstValue;
    }

    result.innerHTML = "";
    if (operation === "+") {
        resultValue = firstValue + secondValue;
    } else if (operation === "-") {
        resultValue = firstValue - secondValue;
    } else if (operation === "/") {
        resultValue = firstValue / secondValue;
    } else if (operation === "x") {
        resultValue = firstValue * secondValue;
    } 
    result.innerHTML = resultValue;
    firstValue = resultValue;
    secondValue = "";

    checkResultLength();
})

negative.addEventListener('click', (e) => {
    result.innerHTML = "";
    if (firstValue != "") {
        resultValue = -firstValue;
        firstValue = resultValue;
    }
    if (firstValue != "" && secondValue != "" && operation != "") {
        resultValue = -resultValue;
    }
    result.innerHTML = resultValue;
})

percent.addEventListener('click', (e) => {
    
    if (firstValue !== "") {
        result.innerHTML = "";
        resultValue = firstValue / 100;
        firstValue = resultValue;
        result.innerHTML = resultValue;

    }
    if (firstValue != "" && secondValue != "" && operation != "") {
        resultValue = resultValue / 100;
    }
})

clear.addEventListener('click', (e) => {
    result.innerHTML = 0;

    firstValue = "";
    hasFirstValue = false;
    secondValue = "";
    operation = "";
    resultValue = 0;
    result.style.fontSize = '80px';
})

comma.addEventListener('click', (e) => {
    if (!hasFirstValue){
        firstValue += '.'
        result.innerHTML = firstValue;
    } else if (secondValue !== "") {
        secondValue += '.';
        console.log(secondValue);
        result.innerHTML = secondValue;
    }
})

function checkResultLength() {
    let formattedResult = '';
    let resultString = resultValue.toString();
    let integerPart = '';
    let decimalPart = '';

    let isNegative = resultValue < 0;
    if (isNegative) {
        resultString = resultString.slice(1); 
    }

    if (resultString.includes('.')) {
        [integerPart, decimalPart] = resultString.split('.');
    } else {
        integerPart = resultString;
    }

    if (integerPart.length > 8) {
        formattedResult = resultValue.toExponential(5);
    } else {
        formattedResult = integerPart;
    }

    if (decimalPart) {
        formattedResult += '.' + decimalPart;
    }

    if (isNegative) {
        formattedResult = '-' + formattedResult;
    }

    result.innerHTML = formattedResult;

    if (formattedResult.length > 6) {
        result.style.fontSize = '60px';
    } else {
        result.style.fontSize = '80px'; 
    }
}

function openAppScreen () {
    window.location.href = "app-screen.html";
}

