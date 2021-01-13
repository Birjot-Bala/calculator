const NUMBERS_AREA = document.querySelector('#numbersArea');
const OPERATORS_AREA = document.querySelector('#operatorsArea');
const DISPLAY = document.querySelector('#display');

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

function operate(operator, a , b) {
    switch (operator) {
        case 'add':
            return add(a, b);
        case 'subtract':
            return subtract(a, b);
        case 'multiply':
            return multiply(a, b);
        case 'divide':
            return divide(a, b);
    }
}

let userInput = {
    operator: "",
    firstInput: 1,
    secondInput: 0,
};


// Create numberpad
for (let i = 9; i > -1; i--) {
    let numButton = document.createElement('button');
    numButton.classList.add('number');
    numButton.textContent = i;
    numButton.style.width = "30%";
    numButton.style.flexGrow = "1";
    numButton.addEventListener('click', () => {
        DISPLAY.textContent += numButton.textContent;
    })
    NUMBERS_AREA.appendChild(numButton);
}

for (let i = 0; i < OPERATORS_AREA.children.length; i++) {
    let child = OPERATORS_AREA.children[i];
    child.style.width = "40%";
    child.style.flexGrow = "1";

    switch (child.id) {
        case 'clear':
            child.addEventListener('click', () => {
                DISPLAY.textContent = "";
            });
            break;
        case 'equal':
            child.addEventListener('click', () => {
                userInput.secondInput = parseInt(DISPLAY.textContent);
                console.log(userInput);
                let result = operate(userInput.operator, userInput.firstInput, userInput.secondInput);
                console.log(result);
                DISPLAY.textContent = result;
            });
            break;
        default:
            child.addEventListener('click', () => {
                if (userInput.operator != "") {
                    let result = operate(userInput.operator,
                                        userInput.firstInput, 
                                        userInput.secondInput
                    );

                }
                userInput.firstInput = parseInt(DISPLAY.textContent);
                userInput.operator = child.id;
                DISPLAY.textContent = "";
            });
    }
}

