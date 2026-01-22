import { useState, useCallback, useMemo } from 'react';
import { CalculatorState, CalculatorActions, HistoryItem, AngleMode } from '@/types/calculator';
import { calculatorEngine } from '@/lib/calculator/calculator-engine';
import { useHistory } from './use-history';
import { FUNCTIONS_REQUIRE_PARENTHESIS } from '@/lib/calculator/constants';

/**
 * 计算器主逻辑 Hook
 * 管理计算器的所有状态和操作
 */
export function useCalculator() {
  // 历史记录
  const { history, addToHistory, clearHistory: clearHistoryStorage } = useHistory();

  // 计算器状态
  const [state, setState] = useState<Omit<CalculatorState, 'history'>>({
    expression: '',
    result: '',
    error: null,
    angleMode: 'DEG',
    isNewCalculation: false,
    lastOperator: null,
  });

  /**
   * 输入数字
   */
  const inputDigit = useCallback((digit: string) => {
    setState((prev) => {
      // 如果刚计算完，清空表达式
      if (prev.isNewCalculation) {
        return {
          ...prev,
          expression: digit,
          result: '',
          error: null,
          isNewCalculation: false,
        };
      }

      return {
        ...prev,
        expression: prev.expression + digit,
        error: null,
      };
    });
  }, []);

  /**
   * 输入运算符
   */
  const inputOperator = useCallback((op: string) => {
    setState((prev) => {
      let expr = prev.expression;

      // 如果表达式为空，且有上次结果，使用结果
      if (!expr && prev.result) {
        expr = prev.result;
      }

      // 如果表达式为空，不添加运算符
      if (!expr) {
        return prev;
      }

      // 如果最后一个字符是运算符，替换它
      if (/[+\-×÷^]$/.test(expr)) {
        expr = expr.slice(0, -1);
      }

      return {
        ...prev,
        expression: expr + op,
        isNewCalculation: false,
        lastOperator: op,
        error: null,
      };
    });
  }, []);

  /**
   * 输入函数
   */
  const inputFunction = useCallback((fn: string) => {
    setState((prev) => {
      const expr = prev.isNewCalculation ? '' : prev.expression;

      // 检查是否需要添加括号
      if (FUNCTIONS_REQUIRE_PARENTHESIS.includes(fn)) {
        return {
          ...prev,
          expression: expr + fn + '(',
          isNewCalculation: false,
          error: null,
        };
      }

      // 特殊函数处理
      if (fn === 'x^2' || fn === 'x^3' || fn === '10^x') {
        return {
          ...prev,
          expression: expr + fn,
          isNewCalculation: false,
          error: null,
        };
      }

      // 阶乘
      if (fn === '!') {
        return {
          ...prev,
          expression: expr + '!',
          isNewCalculation: false,
          error: null,
        };
      }

      return {
        ...prev,
        expression: expr + fn,
        isNewCalculation: false,
        error: null,
      };
    });
  }, []);

  /**
   * 输入小数点
   */
  const inputDecimal = useCallback(() => {
    setState((prev) => {
      // 如果刚计算完，开始新表达式
      if (prev.isNewCalculation) {
        return {
          ...prev,
          expression: '0.',
          result: '',
          isNewCalculation: false,
          error: null,
        };
      }

      // 获取最后一个数字
      const matches = prev.expression.match(/([\d.]+)$/);
      const lastNumber = matches ? matches[0] : '';

      // 如果最后一个数字已经有小数点，不添加
      if (lastNumber.includes('.')) {
        return prev;
      }

      // 如果表达式为空或最后是运算符，添加 0.
      if (!prev.expression || /[+\-×÷^(]$/.test(prev.expression)) {
        return {
          ...prev,
          expression: prev.expression + '0.',
          error: null,
        };
      }

      return {
        ...prev,
        expression: prev.expression + '.',
        error: null,
      };
    });
  }, []);

  /**
   * 输入括号
   */
  const inputParenthesis = useCallback((paren: '(' | ')') => {
    setState((prev) => {
      return {
        ...prev,
        expression: prev.expression + paren,
        isNewCalculation: false,
        error: null,
      };
    });
  }, []);

  /**
   * 执行计算
   */
  const calculate = useCallback(() => {
    setState((prev) => {
      if (!prev.expression) {
        return prev;
      }

      try {
        // 设置角度模式
        calculatorEngine.setAngleMode(prev.angleMode);

        // 计算结果
        const result = calculatorEngine.calculate(prev.expression);

        // 添加到历史记录
        addToHistory(prev.expression, result, prev.angleMode);

        return {
          ...prev,
          result,
          error: null,
          isNewCalculation: true,
        };
      } catch (error: any) {
        return {
          ...prev,
          error: error.message || '计算错误',
          result: '',
        };
      }
    });
  }, [addToHistory]);

  /**
   * 清除所有
   */
  const clear = useCallback(() => {
    setState((prev) => ({
      ...prev,
      expression: '',
      result: '',
      error: null,
      isNewCalculation: false,
      lastOperator: null,
    }));
  }, []);

  /**
   * 清除当前输入
   */
  const clearEntry = useCallback(() => {
    setState((prev) => ({
      ...prev,
      expression: '',
      error: null,
    }));
  }, []);

  /**
   * 退格删除
   */
  const backspace = useCallback(() => {
    setState((prev) => {
      if (!prev.expression) {
        return prev;
      }

      return {
        ...prev,
        expression: prev.expression.slice(0, -1),
        error: null,
      };
    });
  }, []);

  /**
   * 切换正负号
   */
  const toggleSign = useCallback(() => {
    setState((prev) => {
      if (!prev.expression) {
        return prev;
      }

      // 获取最后一个数字
      const matches = prev.expression.match(/([\d.]+)$/);
      if (!matches) {
        return prev;
      }

      const lastNumber = matches[0];
      const prefix = prev.expression.slice(0, -lastNumber.length);

      // 切换正负号
      const newExpression = prefix + '(-' + lastNumber + ')';

      return {
        ...prev,
        expression: newExpression,
        error: null,
      };
    });
  }, []);

  /**
   * 输入百分号
   */
  const inputPercent = useCallback(() => {
    setState((prev) => {
      if (!prev.expression) {
        return prev;
      }

      // 获取最后一个数字
      const matches = prev.expression.match(/([\d.]+)$/);
      if (!matches) {
        return prev;
      }

      const lastNumber = matches[0];
      const prefix = prev.expression.slice(0, -lastNumber.length);

      // 将数字转换为百分数
      const newExpression = prefix + '(' + lastNumber + '/100)';

      return {
        ...prev,
        expression: newExpression,
        error: null,
      };
    });
  }, []);

  /**
   * 输入阶乘
   */
  const inputFactorial = useCallback(() => {
    setState((prev) => {
      return {
        ...prev,
        expression: prev.expression + '!',
        error: null,
      };
    });
  }, []);

  /**
   * 切换角度模式
   */
  const toggleAngleMode = useCallback(() => {
    setState((prev) => ({
      ...prev,
      angleMode: prev.angleMode === 'DEG' ? 'RAD' : 'DEG',
    }));
  }, []);

  /**
   * 从历史记录加载
   */
  const loadFromHistory = useCallback((item: HistoryItem) => {
    setState((prev) => ({
      ...prev,
      expression: item.expression,
      result: item.result,
      angleMode: item.mode,
      error: null,
      isNewCalculation: false,
    }));
  }, []);

  /**
   * 清空历史记录
   */
  const clearHistory = useCallback(() => {
    clearHistoryStorage();
  }, [clearHistoryStorage]);

  // 组合所有操作
  const actions: CalculatorActions = useMemo(
    () => ({
      inputDigit,
      inputOperator,
      inputFunction,
      inputDecimal,
      inputParenthesis,
      calculate,
      clear,
      clearEntry,
      backspace,
      toggleSign,
      inputPercent,
      inputFactorial,
      toggleAngleMode,
      loadFromHistory,
      clearHistory,
    }),
    [
      inputDigit,
      inputOperator,
      inputFunction,
      inputDecimal,
      inputParenthesis,
      calculate,
      clear,
      clearEntry,
      backspace,
      toggleSign,
      inputPercent,
      inputFactorial,
      toggleAngleMode,
      loadFromHistory,
      clearHistory,
    ]
  );

  return {
    ...state,
    history,
    actions,
  };
}
