const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');
let key, action, keyContent, displayedNum, previousKeyType;



function calculate(n1, operator, n2) {
    let result = '';

    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2);
      } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2);
      } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2);
      } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2);
      }
    
      return result;
}



function typeOfKey() {
    if (!action) {
        if (
          displayedNum === '0' ||
          previousKeyType === 'operator' ||
          previousKeyType === 'calculate'
        ) {
          display.textContent = keyContent;
        } else {
          display.textContent = displayedNum + keyContent;
        }
        calculator.dataset.previousKeyType = 'number';
      }
}

function decimalKey() {
    if (action === 'decimal') {
        if (!displayedNum.includes('.')) {
          display.textContent = displayedNum + '.';
        } else if (
          previousKeyType === 'operator' ||
          previousKeyType === 'calculate'
        ) {
          display.textContent = '0.';
        }
          calculator.dataset.previousKeyType = 'decimal';
      }
}

function doMath() {
    if (action === 'add' ||
          action === 'subtract' ||
          action === 'multiply' ||
          action === 'divide') {


        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedNum;
  
        if (
          firstValue &&
          operator &&
          previousKeyType !== 'operator' &&
          previousKeyType !== 'calculate') {
          const calcValue = calculate(firstValue, operator, secondValue);
          display.textContent = calcValue;
          calculator.dataset.firstValue = calcValue;
        } else {
          calculator.dataset.firstValue = displayedNum;
        }
  
        key.classList.add('is-depressed');
        calculator.dataset.previousKeyType = 'operator';
        calculator.dataset.operator = action;
      }
}

function clearDisplay() {
    if (action === 'clear') {
        if (key.textContent === 'AC') {
          calculator.dataset.firstValue = '';
          calculator.dataset.modValue = '';
          calculator.dataset.operator = '';
          calculator.dataset.previousKeyType = '';
        } else {
          key.textContent = 'AC';
        }
  
        display.textContent = 0;
        calculator.dataset.previousKeyType = 'clear';
      }
}



// I use event delegation on parent Element
keys.addEventListener('click', function(e) {
    if (e.target.matches('button')) {

    key = e.target;
    action = key.dataset.action;
    keyContent = key.textContent;
    displayedNum = display.textContent;
    previousKeyType = calculator.dataset.previousKeyType;
    
    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));

    //   Check if the key does not have a data-action attribute, it must be a number
      typeOfKey();
    //   Check if Key is a decimal
      decimalKey();
    //   Math Operators in work
      doMath();
    //  Clear Display Field
      clearDisplay()
    
  
      if (action !== 'clear') {
        const clearButton = calculator.querySelector('[data-action=clear]');
        clearButton.textContent = 'CE';
      }
  
      if (action === 'calculate') {
        let firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        let secondValue = displayedNum;
  
        if (firstValue) {
          if (previousKeyType === 'calculate') {
            firstValue = displayedNum;
            secondValue = calculator.dataset.modValue;
          }
  
          display.textContent = calculate(firstValue, operator, secondValue);
        }
  
        calculator.dataset.modValue = secondValue;
        calculator.dataset.previousKeyType = 'calculate';
      }
    }
  });


