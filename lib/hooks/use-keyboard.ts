import { useEffect } from 'react';
import { CalculatorActions } from '@/types/calculator';
import { KEYBOARD_MAP } from '@/lib/calculator/constants';

/**
 * 键盘事件处理 Hook
 * 监听键盘输入并映射到计算器操作
 */
export function useKeyboard(actions: CalculatorActions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 获取映射的按键值
      const mappedKey = KEYBOARD_MAP[e.key];

      if (!mappedKey) return;

      // 防止浏览器默认行为
      e.preventDefault();

      // 根据按键类型执行相应操作
      if (/^[0-9]$/.test(mappedKey)) {
        // 数字
        actions.inputDigit(mappedKey);
      } else if (mappedKey === '.') {
        // 小数点
        actions.inputDecimal();
      } else if (['+', '-', '×', '÷'].includes(mappedKey)) {
        // 基本运算符
        actions.inputOperator(mappedKey);
      } else if (mappedKey === '=') {
        // 等号（计算）
        actions.calculate();
      } else if (mappedKey === 'C') {
        // 清除
        actions.clear();
      } else if (mappedKey === 'CE') {
        // 清除当前输入
        actions.clearEntry();
      } else if (mappedKey === 'Backspace') {
        // 退格
        actions.backspace();
      } else if (mappedKey === '(' || mappedKey === ')') {
        // 括号
        actions.inputParenthesis(mappedKey as '(' | ')');
      } else if (mappedKey === '%') {
        // 百分号
        actions.inputPercent();
      } else if (mappedKey === '^') {
        // 幂运算
        actions.inputOperator('^');
      }
    };

    // 添加事件监听
    window.addEventListener('keydown', handleKeyDown);

    // 清理函数
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [actions]);
}
