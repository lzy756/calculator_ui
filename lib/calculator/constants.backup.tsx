import { ButtonConfig } from '@/types/calculator';
import { Delete } from 'lucide-react';

/**
 * 数学常量
 */
export const MATH_CONSTANTS = {
  PI: 'pi',
  E: 'e',
} as const;

/**
 * 键盘映射表
 * 将键盘按键映射到计算器按钮值
 */
export const KEYBOARD_MAP: Record<string, string> = {
  // 数字
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',

  // 基本运算符
  '+': '+',
  '-': '-',
  '*': '×',
  '/': '÷',

  // 控制键
  'Enter': '=',
  'Escape': 'C',
  'Backspace': 'Backspace',
  'Delete': 'CE',

  // 小数点
  '.': '.',

  // 括号
  '(': '(',
  ')': ')',

  // 百分号
  '%': '%',

  // 幂运算
  '^': '^',
};

/**
 * 计算器按钮配置
 * 按照从左到右、从上到下的顺序排列
 */
export const CALCULATOR_BUTTONS: ButtonConfig[] = [
  // 第一行：函数和常量
  { value: 'sin', label: 'sin', variant: 'function' },
  { value: 'cos', label: 'cos', variant: 'function' },
  { value: 'tan', label: 'tan', variant: 'function' },
  { value: 'pi', label: 'π', variant: 'number' },
  { value: 'e', label: 'e', variant: 'number' },
  { value: 'C', label: 'C', variant: 'special' },

  // 第二行：反三角函数
  { value: 'asin', label: 'asin', variant: 'function' },
  { value: 'acos', label: 'acos', variant: 'function' },
  { value: 'atan', label: 'atan', variant: 'function' },
  { value: '(', label: '(', variant: 'operator' },
  { value: ')', label: ')', variant: 'operator' },
  { value: '÷', label: '÷', variant: 'operator' },

  // 第三行：双曲函数
  { value: 'sinh', label: 'sinh', variant: 'function' },
  { value: 'cosh', label: 'cosh', variant: 'function' },
  { value: 'tanh', label: 'tanh', variant: 'function' },
  { value: '^', label: 'xʸ', variant: 'operator' },
  { value: 'sqrt', label: '√', variant: 'function' },
  { value: '×', label: '×', variant: 'operator' },

  // 第四行：对数和幂函数
  { value: 'ln', label: 'ln', variant: 'function' },
  { value: 'log', label: 'log', variant: 'function' },
  { value: 'x^2', label: 'x²', variant: 'function' },
  { value: 'x^3', label: 'x³', variant: 'function' },
  { value: 'exp', label: 'eˣ', variant: 'function' },
  { value: '-', label: '-', variant: 'operator' },

  // 第五行：数字 7-9 和运算符
  { value: '7', label: '7', variant: 'number' },
  { value: '8', label: '8', variant: 'number' },
  { value: '9', label: '9', variant: 'number' },
  { value: '!', label: 'n!', variant: 'function' },
  { value: '10^x', label: '10ˣ', variant: 'function' },
  { value: '+', label: '+', variant: 'operator' },

  // 第六行：数字 4-6
  { value: '4', label: '4', variant: 'number' },
  { value: '5', label: '5', variant: 'number' },
  { value: '6', label: '6', variant: 'number' },
  { value: 'cbrt', label: '³√', variant: 'function' },
  { value: '%', label: '%', variant: 'operator' },
  { value: 'Backspace', label: <Delete className="size-5" />, variant: 'operator' },

  // 第七行：数字 1-3
  { value: '1', label: '1', variant: 'number' },
  { value: '2', label: '2', variant: 'number' },
  { value: '3', label: '3', variant: 'number' },
  { value: 'asinh', label: 'asinh', variant: 'function' },
  { value: 'acosh', label: 'acosh', variant: 'function' },
  { value: 'atanh', label: 'atanh', variant: 'function' },

  // 第八行：数字 0 和小数点
  { value: '0', label: '0', variant: 'number', colSpan: 2 },
  { value: '.', label: '.', variant: 'number' },
  { value: '+/-', label: '+/-', variant: 'operator' },
  { value: '=', label: '=', variant: 'equals', colSpan: 2 },
];

/**
 * 需要添加括号的函数列表
 */
export const FUNCTIONS_REQUIRE_PARENTHESIS = [
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
];

/**
 * 运算符优先级（不使用，Math.js 会处理）
 */
export const OPERATOR_PRECEDENCE = {
  '+': 1,
  '-': 1,
  '×': 2,
  '÷': 2,
  '^': 3,
} as const;

/**
 * 显示符号到计算符号的映射
 */
export const DISPLAY_TO_CALC_SYMBOL: Record<string, string> = {
  '×': '*',
  '÷': '/',
  'π': 'pi',
};
