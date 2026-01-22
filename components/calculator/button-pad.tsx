'use client';

import { CalculatorButton } from './calculator-button';
import { CALCULATOR_BUTTONS } from '@/lib/calculator/constants';
import { useCalculatorContext } from '@/contexts/calculator-context';

/**
 * 按钮面板组件
 * 使用 Grid 布局展示所有计算器按钮
 */
export function ButtonPad() {
  const {
    inputDigit,
    inputOperator,
    inputFunction,
    inputDecimal,
    inputParenthesis,
    inputPercent,
    calculate,
    clear,
    backspace,
    toggleSign,
  } = useCalculatorContext();

  /**
   * 处理按钮点击
   */
  const handleButtonClick = (value: string) => {
    // 数字
    if (/^[0-9]$/.test(value)) {
      inputDigit(value);
    }
    // 常量
    else if (['pi', 'e'].includes(value)) {
      inputOperator(value);
    }
    // 基本运算符
    else if (['+', '-', '×', '÷', '^'].includes(value)) {
      inputOperator(value);
    }
    // 括号
    else if (value === '(' || value === ')') {
      inputParenthesis(value as '(' | ')');
    }
    // 百分号
    else if (value === '%') {
      inputPercent();
    }
    // 函数
    else if (
      [
        'sin',
        'cos',
        'tan',
        'asin',
        'acos',
        'atan',
        'sinh',
        'cosh',
        'tanh',
        'asinh',
        'acosh',
        'atanh',
        'ln',
        'log',
        'sqrt',
        'cbrt',
        'exp',
        'x^2',
        'x^3',
        '10^x',
        '!',
      ].includes(value)
    ) {
      inputFunction(value);
    }
    // 小数点
    else if (value === '.') {
      inputDecimal();
    }
    // 等号
    else if (value === '=') {
      calculate();
    }
    // 清除
    else if (value === 'C') {
      clear();
    }
    // 退格
    else if (value === 'Backspace') {
      backspace();
    }
    // 正负号
    else if (value === '+/-') {
      toggleSign();
    }
  };

  return (
    <div className="grid grid-cols-6 gap-3 sm:gap-4">
      {CALCULATOR_BUTTONS.map((button, index) => (
        <CalculatorButton
          key={`${button.value}-${index}`}
          value={button.value}
          label={button.label}
          variant={button.variant}
          onClick={handleButtonClick}
          colSpan={button.colSpan}
          rowSpan={button.rowSpan}
          disabled={button.disabled}
        />
      ))}
    </div>
  );
}
