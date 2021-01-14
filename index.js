const NUMBERS_AREA = document.querySelector('#numbersArea');
const OPERATORS_AREA = document.querySelector('#operatorsArea');
const DISPLAY = document.querySelector('#display');
const BUTTON_WIDTH = "72px"
const DISPLAY_MAX = 19;

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
    firstInput: 0,
    secondInput: 0,
    resultDisplay: false,
    hasDecimal: false,
};


// Create numberpad
for (let i = 9; i > -1; i--) {
    let numButton = document.createElement('button');
    numButton.classList.add('number');
    numButton.textContent = i;
    numButton.style.width = BUTTON_WIDTH;
    if (i == 0) {
        numButton.style.width = "149px";
    }
    numButton.style.height = BUTTON_WIDTH;
    numButton.addEventListener('click', () => {
        if (userInput.resultDisplay) {
            DISPLAY.textContent = numButton.textContent;
            userInput.resultDisplay = false;
            userInput.hasDecimal = false;
        } else if (DISPLAY.textContent.length < DISPLAY_MAX) {
            DISPLAY.textContent += numButton.textContent;
        }
    });
    NUMBERS_AREA.appendChild(numButton);
}

// Add decimal button to end
let decimalButton = document.createElement('button');
decimalButton.classList.add('decimal');
decimalButton.textContent = ".";
decimalButton.style.width = BUTTON_WIDTH;
decimalButton.style.height = BUTTON_WIDTH;
decimalButton.addEventListener('click', () => {
    if (userInput.resultDisplay) {
        DISPLAY.textContent = "0" + decimalButton.textContent;
        userInput.resultDisplay = false;
        userInput.hasDecimal = true;
    } else if (DISPLAY.textContent.length == 0) {
        DISPLAY.textContent = "0" + decimalButton.textContent;
        userInput.hasDecimal = true;
    } else if (DISPLAY.textContent.length < 23 && !userInput.hasDecimal) {
        DISPLAY.textContent += decimalButton.textContent;
        userInput.hasDecimal = true;
    }
});
NUMBERS_AREA.appendChild(decimalButton);



// Set up operator functionality
for (let i = 0; i < OPERATORS_AREA.children.length; i++) {
    let child = OPERATORS_AREA.children[i];
    child.style.width = "40%";
    child.style.flexGrow = "1";

    switch (child.id) {
        case 'clear':
            child.addEventListener('click', () => {
                DISPLAY.textContent = "";
                userInput.operator = "";
                userInput.firstInput = 0;
                userInput.secondInput = 0;
                userInput.resultDisplay = false;
                userInput.hasDecimal = false;
            });
            break;
        case 'equal':
            child.addEventListener('click', () => {
                userInput.secondInput = parseFloat(DISPLAY.textContent);
                let result = operate(userInput.operator, 
                                    userInput.firstInput, 
                                    userInput.secondInput
                );
                DISPLAY.textContent = result;
                userInput.operator = "";
                userInput.hasDecimal = false;
                userInput.resultDisplay = true;
            });
            break;
        default:
            child.addEventListener('click', () => {
                if (userInput.operator != "") {
                    userInput.secondInput = parseFloat(DISPLAY.textContent);
                    let result = operate(userInput.operator,
                                        userInput.firstInput, 
                                        userInput.secondInput
                    );
                    userInput.firstInput = result;
                    userInput.operator = child.id;
                    DISPLAY.textContent = result;
                    userInput.resultDisplay = true;
                } else {
                    userInput.firstInput = parseFloat(DISPLAY.textContent);
                    userInput.operator = child.id;
                    userInput.resultDisplay = true;
                }
            });
    }
}

