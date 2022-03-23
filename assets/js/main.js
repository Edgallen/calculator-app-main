/*=============== CHEK IF PAGE LOADED ===============*/ 
const body = document.getElementsByTagName('body');

// Rome 'transition - none' when page is loaded
document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    body[0].classList.remove('preload');
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
    if (this.currentOperand === ''){
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

    this.currentOperand = computation.toString();
    this.previousOperand = '';
    this.operation = '';
  }

  getDisplayNumber(number) {

  }

  updateDispay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = 
        `${this.previousOperand} ${this.operation}`
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