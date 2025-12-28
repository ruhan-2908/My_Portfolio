import { useState } from "react";
import { motion } from "framer-motion";

type Operator = '+' | '-' | '×' | '÷' | '=' | null;

export function CalculatorApp() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    setDisplay(String(-parseFloat(display)));
  };

  const inputPercent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const performOperation = (nextOperator: Operator) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const currentValue = previousValue;
      let newValue: number;

      switch (operator) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = inputValue !== 0 ? currentValue / inputValue : 0;
          break;
        default:
          newValue = inputValue;
      }

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const buttons = [
    { label: "AC", action: clear, type: "function" },
    { label: "±", action: toggleSign, type: "function" },
    { label: "%", action: inputPercent, type: "function" },
    { label: "÷", action: () => performOperation('÷'), type: "operator" },
    { label: "7", action: () => inputDigit("7"), type: "number" },
    { label: "8", action: () => inputDigit("8"), type: "number" },
    { label: "9", action: () => inputDigit("9"), type: "number" },
    { label: "×", action: () => performOperation('×'), type: "operator" },
    { label: "4", action: () => inputDigit("4"), type: "number" },
    { label: "5", action: () => inputDigit("5"), type: "number" },
    { label: "6", action: () => inputDigit("6"), type: "number" },
    { label: "-", action: () => performOperation('-'), type: "operator" },
    { label: "1", action: () => inputDigit("1"), type: "number" },
    { label: "2", action: () => inputDigit("2"), type: "number" },
    { label: "3", action: () => inputDigit("3"), type: "number" },
    { label: "+", action: () => performOperation('+'), type: "operator" },
    { label: "0", action: () => inputDigit("0"), type: "number", wide: true },
    { label: ".", action: inputDecimal, type: "number" },
    { label: "=", action: () => performOperation('='), type: "operator" },
  ];

  return (
    <div className="h-full bg-[#1e1e1e] flex flex-col p-4">
      {/* Display */}
      <div className="bg-[#2d2d2d] rounded-xl p-4 mb-4">
        <div className="text-right text-4xl font-light text-white overflow-hidden">
          {display.length > 12 ? parseFloat(display).toExponential(5) : display}
        </div>
        {operator && previousValue !== null && (
          <div className="text-right text-sm text-white/40 mt-1">
            {previousValue} {operator}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2 flex-1">
        {buttons.map((btn, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.95 }}
            onClick={btn.action}
            className={`
              ${btn.wide ? "col-span-2" : ""}
              rounded-xl text-xl font-medium transition-colors
              ${btn.type === "function" ? "bg-[#505050] hover:bg-[#606060] text-white" : ""}
              ${btn.type === "number" ? "bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white" : ""}
              ${btn.type === "operator" ? "bg-[#e95420] hover:bg-[#ff6f3c] text-white" : ""}
            `}
          >
            {btn.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
