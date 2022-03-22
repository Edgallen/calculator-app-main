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
    // this.currentOperand = '';
    // this.previousOperand = '';
    // this.operation = undefined;
  }

  delete() {

  }

  appendNumber(number) {
    // this.currentOperand = this.currentOperand.toSrting() + number.toString();
    this.currentOperand = number;
  }

  chooseOperation(operation) {

  }

  compute() {

  }

  getDisplayNumber(number) {

  }

  updateDispay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
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
})

console.log(currentOperandTextElement.innerText);
