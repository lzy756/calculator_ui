/**
 * 格式化工具函数
 */

/**
 * 格式化科学记数法
 * 将数字转换为易读的科学记数法格式
 */
export function formatScientificNotation(value: number): string {
  // 非常大或非常小的数字使用科学记数法
  if (Math.abs(value) > 1e10 || (Math.abs(value) < 1e-6 && value !== 0)) {
    return value.toExponential(6);
  }

  // 处理浮点精度问题
  const result = Number(value.toPrecision(12));

  // 去除多余的零
  return result.toString();
}

/**
 * 格式化显示结果
 * 处理特殊值和格式化
 */
export function formatResult(result: any): string {
  if (typeof result === 'number') {
    // 处理特殊值
    if (!isFinite(result)) {
      return 'Error';
    }

    return formatScientificNotation(result);
  }

  // 其他类型直接转字符串
  return String(result);
}

/**
 * 美化表达式显示
 * 添加空格使表达式更易读
 */
export function beautifyExpression(expr: string): string {
  // 在运算符周围添加空格（可选功能）
  // 这里保持原样，因为计算器通常不需要空格
  return expr;
}

/**
 * 截断长表达式
 * 用于限制显示长度
 */
export function truncateExpression(expr: string, maxLength: number = 50): string {
  if (expr.length <= maxLength) {
    return expr;
  }

  // 保留前后部分
  const halfLength = Math.floor(maxLength / 2) - 2;
  return `${expr.slice(0, halfLength)}...${expr.slice(-halfLength)}`;
}

/**
 * 验证表达式括号是否匹配
 */
export function areParenthesesBalanced(expr: string): boolean {
  let count = 0;

  for (const char of expr) {
    if (char === '(') {
      count++;
    } else if (char === ')') {
      count--;
      if (count < 0) {
        return false;
      }
    }
  }

  return count === 0;
}

/**
 * 计算未匹配的左括号数量
 */
export function getUnmatchedParentheses(expr: string): number {
  let count = 0;

  for (const char of expr) {
    if (char === '(') {
      count++;
    } else if (char === ')') {
      count--;
    }
  }

  return Math.max(0, count);
}
