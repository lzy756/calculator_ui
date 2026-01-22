'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { CalculatorContextType } from '@/types/calculator';
import { useCalculator } from '@/lib/hooks/use-calculator';
import { useKeyboard } from '@/lib/hooks/use-keyboard';

/**
 * 计算器 Context
 */
const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

/**
 * 计算器 Provider 组件
 */
export function CalculatorProvider({ children }: { children: ReactNode }) {
  const calculator = useCalculator();

  // 启用键盘支持
  useKeyboard(calculator.actions);

  const value: CalculatorContextType = {
    // 状态
    expression: calculator.expression,
    result: calculator.result,
    error: calculator.error,
    angleMode: calculator.angleMode,
    history: calculator.history,
    isNewCalculation: calculator.isNewCalculation,
    lastOperator: calculator.lastOperator,

    // 操作
    ...calculator.actions,
  };

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
}

/**
 * 使用计算器 Context 的 Hook
 */
export function useCalculatorContext() {
  const context = useContext(CalculatorContext);

  if (context === undefined) {
    throw new Error('useCalculatorContext must be used within a CalculatorProvider');
  }

  return context;
}
