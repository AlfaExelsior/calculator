import React, { useState } from 'react';
import './Calculator.css';
import Display from './Display';
import Button from './Button';

function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [storedValue, setStoredValue] = useState(null);

  const handleButtonClick = (buttonValue) => {
    if (buttonValue === 'C') {
      setDisplayValue('0');
      setStoredValue(null);
      setOperator(null);
      setWaitingForOperand(false);
      return;
    }

    if (['/', '*', '-', '+'].includes(buttonValue)) {
      if (operator && waitingForOperand) {
        setOperator(buttonValue);
        return;
      }

      if (storedValue === null) {
        setStoredValue(parseFloat(displayValue));
      } else if (operator) {
        const newValue = calculate(storedValue, parseFloat(displayValue), operator);
        setDisplayValue(String(newValue));
        setStoredValue(newValue);
      }

      setWaitingForOperand(true);
      setOperator(buttonValue);
      return;
    }

    if (buttonValue === '=') {
      if (operator && storedValue !== null) {
        const newValue = calculate(storedValue, parseFloat(displayValue), operator);
        setDisplayValue(String(newValue));
        setStoredValue(newValue);
        setOperator(null);
        setWaitingForOperand(false);
      }
      return;
    }

    if (buttonValue === '.') {
      if (!displayValue.includes('.')) {
        setDisplayValue(displayValue + '.');
      }
      return;
    }

    if (displayValue === '0' || waitingForOperand) {
      setDisplayValue(buttonValue);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue + buttonValue);
    }
  };

  const calculate = (leftOperand, rightOperand, operator) => {
    if (operator === '/' && rightOperand === 0) {
      return 'Error';
    }
    switch (operator) {
      case '/':
        return leftOperand / rightOperand;
      case '*':
        return leftOperand * rightOperand;
      case '-':
        return leftOperand - rightOperand;
      case '+':
        return leftOperand + rightOperand;
      default:
        return rightOperand;
    }
  };

  return (
    <div className="calculator">
      <Display value={displayValue} />
      <div className="buttons">
        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C'].map((button) => (
          <Button key={button} value={button} onClick={handleButtonClick} />
        ))}
      </div>
    </div>
  );
}

export default Calculator;

