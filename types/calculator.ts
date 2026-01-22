// 计算器类型定义

import { ReactNode } from 'react';

/**
 * 角度模式：DEG（角度制）或 RAD（弧度制）
 */
export type AngleMode = 'DEG' | 'RAD';

/**
 * 按钮变体类型
 */
export type ButtonVariant = 'number' | 'operator' | 'function' | 'special' | 'equals';

/**
 * 按钮配置接口
 */
export interface ButtonConfig {
  /** 按钮值（用于计算） */
  value: string;
  /** 显示标签 */
  label: string | ReactNode;
  /** 按钮类型 */
  variant: ButtonVariant;
  /** 占据的列数（用于 Grid 布局） */
  colSpan?: number;
  /** 占据的行数 */
  rowSpan?: number;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * 历史记录项接口
 */
export interface HistoryItem {
  /** 唯一标识符 */
  id: string;
  /** 计算表达式 */
  expression: string;
  /** 计算结果 */
  result: string;
  /** 角度模式 */
  mode: AngleMode;
  /** 时间戳 */
  timestamp: number;
}

/**
 * 计算器状态接口
 */
export interface CalculatorState {
  /** 当前输入的表达式 */
  expression: string;
  /** 计算结果 */
  result: string;
  /** 错误信息 */
  error: string | null;
  /** 角度模式 */
  angleMode: AngleMode;
  /** 历史记录 */
  history: HistoryItem[];
  /** 是否是新计算（用于判断是否清空表达式） */
  isNewCalculation: boolean;
  /** 上一个运算符 */
  lastOperator: string | null;
}

/**
 * 计算器操作方法接口
 */
export interface CalculatorActions {
  // 输入操作
  /** 输入数字 */
  inputDigit: (digit: string) => void;
  /** 输入运算符 */
  inputOperator: (op: string) => void;
  /** 输入函数 */
  inputFunction: (fn: string) => void;
  /** 输入小数点 */
  inputDecimal: () => void;
  /** 输入括号 */
  inputParenthesis: (paren: '(' | ')') => void;

  // 控制操作
  /** 执行计算 */
  calculate: () => void;
  /** 清除所有 */
  clear: () => void;
  /** 清除当前输入 */
  clearEntry: () => void;
  /** 退格删除 */
  backspace: () => void;
  /** 切换正负号 */
  toggleSign: () => void;
  /** 输入百分号 */
  inputPercent: () => void;
  /** 输入阶乘 */
  inputFactorial: () => void;

  // 模式切换
  /** 切换角度模式 */
  toggleAngleMode: () => void;

  // 历史操作
  /** 从历史记录加载 */
  loadFromHistory: (item: HistoryItem) => void;
  /** 清空历史记录 */
  clearHistory: () => void;
}

/**
 * 计算器 Context 类型
 */
export type CalculatorContextType = CalculatorState & CalculatorActions;
