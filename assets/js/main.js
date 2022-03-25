/*=============== CHECK IF PAGE LOADED ===============*/ 
const html = document.getElementsByTagName('html');

// Rome 'transition - none' when page is loaded
document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    html[0].classList.remove('preload');
  }
};

/*=============== CALCULATOR ===============*/
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    if (this.currentOperand == 'Infinity') {
      this.currentOperand = '';
      return
    }
    this.currentOperand = this.currentOperand.slice(0, -1);
  }

  appendNumber(number) {
    if (currentOperandTextElement.innerText.length == 14){
      return
    };

    if (number === '.' && this.currentOperand.includes('.')) {
      return
    }

    if (this.wasComputed !== true) {
      this.currentOperand = (this.currentOperand ?? '') + number;
    } else {
      this.wasComputed = false;
      number === '.' ? this.currentOperand = (this.currentOperand ?? '') + number : this.currentOperand = '' + number
    }

  }

  chooseOperation(operation) {
    if (this.currentOperand === '' || this.currentOperand === '.'){
      return
    }
    if (this.previousOperand !== '') {
      this.compute();
    }
    
    this.operation = operation
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const current = parseFloat(this.currentOperand);
    const prev = parseFloat(this.previousOperand);
    this.wasComputed;

    if(isNaN(prev) || isNaN(current)) {
      return
    }
    switch (this.operation) {
      case '+':
        computation = prev + current;
        this.wasComputed = true;
        break;
      case '-':
        computation = prev - current;
        this.wasComputed = true;
        break;
      case 'x':
        computation = prev * current;
        this.wasComputed = true;
        break;
      case '/':
        computation = prev / current;
        this.wasComputed = true;
        break;
    }

    let computationString = computation.toString();
    if (!computationString.length == 11) {
      this.currentOperand = computation;
    } else {
      this.currentOperand = computationString.slice(0, (computationString.length - (computationString.length - 11)));
    }

    this.previousOperand = '';
    this.operation = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDispay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}

const numberButtons = document.querySelectorAll('.calculator__body-number');
const operationButtons = document.querySelectorAll('.calculator__body-operation');
const equalsButton = document.querySelector('.calculator__body-equals');
const deleteButton = document.querySelector('.calculator__body-delete');
const resetButton = document.querySelector('.calculator__body-reset');
const currentOperandTextElement = document.querySelector('.calculator__currentOperand');
const previousOperandTextElement = document.querySelector('.calculator__previousOperand');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDispay();
  })
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDispay();
  })
});

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDispay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDispay();
})

resetButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDispay();
});

/*=============== THEME ===============*/
const themeSelector = document.querySelector('.header__selector-scroll');
const selectorButtonClassList = document.querySelector('.selector__button').classList;
const bodyClassList = document.getElementsByTagName('body')[0].classList;
const body = document.getElementsByTagName('body');

function themeChange() {
  
  switch (bodyClassList[0]) {
    case undefined:
      bodyClassList.toggle('light__theme');
      selectorButtonClassList.toggle('selector__step-2');
      break;
    case 'light__theme':
      bodyClassList.replace('light__theme', 'purple__theme');
      selectorButtonClassList.replace('selector__step-2', 'selector__step-3');
      break;
    case 'purple__theme':
      bodyClassList.toggle('purple__theme');
      selectorButtonClassList.toggle('selector__step-3');
      break;
  }
}

themeSelector.addEventListener('click', themeChange);