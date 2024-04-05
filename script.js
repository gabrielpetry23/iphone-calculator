const numbers = document.querySelectorAll('.number');
const result = document.querySelector('.display span');
const signs = document.querySelectorAll('.sign');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const negative = document.querySelector('.negative');
const percent = document.querySelector('.percent');
const comma = document.querySelector('.comma');

let firstValue = "";
let hasFirstValue = false;
let secondValue = "";
let hasSecondValue = false;
let sign = "";
let resultValue = 0;

for (let i = 0 ; i < numbers.length ; i++) {
    numbers[i].addEventListener('click', (e) => {
        let num = e.target.getAttribute('value');
        if (hasFirstValue === false) {
            getFirstValue(num);
        } 
        else if (hasSecondValue == false) {
            getSecondValue(num);
        }
    })
}

function getFirstValue (num) {
    result.innerHTML = "";
    firstValue += num;
    result.innerHTML = firstValue;
    firstValue = +firstValue;
}

function getSecondValue (num) {
    if (firstValue != "" && sign != "") {
        secondValue += num;
        result.innerHTML = secondValue;
        secondValue = +secondValue;
    }
}

function getSign () {
    for (let i = 0 ; i < signs.length ; i++) {
        signs[i].addEventListener('click', (e) => {
            sign = e.target.getAttribute('value');
            hasFirstValue = true;
        })
    }
}
getSign();

equals.addEventListener('click', () => {
    if (firstValue !== "") {
        resultValue = firstValue;
    }

    result.innerHTML = "";
    if (sign === "+") {
        resultValue = firstValue + secondValue;
    } else if (sign === "-") {
        resultValue = firstValue - secondValue;
    } else if (sign === "/") {
        resultValue = firstValue / secondValue;
    } else if (sign === "x") {
        resultValue = firstValue * secondValue;
    } 
    result.innerHTML = resultValue;
    firstValue = resultValue;
    secondValue = "";

    checkResultLength();
})

function checkResultLength () {
    resultValue = JSON.stringify(resultValue);

    if (resultValue.length >= 8) {
        resultValue = JSON.parse(resultValue);
        result.innerHTML = resultValue.toFixed(5);
    }
}

negative.addEventListener('click', (e) => {
    result.innerHTML = "";
    if (firstValue != "") {
        resultValue = -firstValue;
        firstValue = resultValue;
    }
    if (firstValue != "" && secondValue != "" && sign != "") {
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
    if (firstValue != "" && secondValue != "" && sign != "") {
        resultValue = resultValue / 100;
    }
})

clear.addEventListener('click', (e) => {
    result.innerHTML = 0;

    firstValue = "";
    hasFirstValue = false;
    secondValue = "";
    hasSecondValue = false;
    sign = "";
    resultValue = 0;
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

