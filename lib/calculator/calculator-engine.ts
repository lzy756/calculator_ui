import { create, all, ConfigOptions, type MathJsStatic } from 'mathjs';
import { AngleMode } from '@/types/calculator';
import { formatResult } from './format-utils';

/**
 * Math.js 配置
 */
const mathConfig: ConfigOptions = {
  number: 'number', // 使用原生 number 类型
  precision: 14, // 精度
};

/**
 * 计算器引擎类
 * 封装 Math.js，处理表达式预处理、计算和错误处理
 */
export class CalculatorEngine {
  private math: MathJsStatic;
  private angleMode: AngleMode = 'DEG';

  constructor() {
    this.math = create(all, mathConfig);
  }

  /**
   * 计算表达式
   */
  calculate(expression: string): string {
    try {
      // 预处理表达式
      const processedExpr = this.preprocessExpression(expression);

      // 使用 Math.js 计算
      const result = this.math.evaluate(processedExpr);

      // 格式化结果
      return formatResult(result);
    } catch (error) {
      throw new Error(this.parseError(error));
    }
  }

  /**
   * 预处理表达式
   * - 处理角度/弧度转换
   * - 替换特殊符号
   * - 处理隐式乘法
   * - 处理特殊函数
   */
  private preprocessExpression(expr: string): string {
    let processed = expr;

    // 1. 替换显示符号为计算符号
    processed = processed
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, 'pi');

    // 2. 处理特殊函数
    processed = this.handleSpecialFunctions(processed);

    // 3. 处理角度转换（如果是 DEG 模式）
    if (this.angleMode === 'DEG') {
      processed = this.convertTrigToDegrees(processed);
    }

    // 4. 处理隐式乘法
    processed = this.addImplicitMultiplication(processed);

    return processed;
  }

  /**
   * 处理特殊函数
   */
  private handleSpecialFunctions(expr: string): string {
    let processed = expr;

    // x^2 → (x)^2
    processed = processed.replace(/x\^2/g, (match, offset) => {
      // 获取 x^2 前面的数字或表达式
      const before = expr.slice(0, offset);
      const lastNumber = this.extractLastOperand(before);

      if (lastNumber) {
        // 移除原来的数字，添加括号
        const prefix = before.slice(0, -lastNumber.length);
        return `(${lastNumber})^2`;
      }
      return match;
    });

    // x^3 → (x)^3
    processed = processed.replace(/x\^3/g, (match, offset) => {
      const before = expr.slice(0, offset);
      const lastNumber = this.extractLastOperand(before);

      if (lastNumber) {
        const prefix = before.slice(0, -lastNumber.length);
        return `(${lastNumber})^3`;
      }
      return match;
    });

    // 10^x → 10^(x)
    processed = processed.replace(/10\^x/g, (match, offset) => {
      const after = expr.slice(offset + 4);
      const nextOperand = this.extractFirstOperand(after);

      if (nextOperand) {
        return `10^(${nextOperand})`;
      }
      return match;
    });

    // ! (阶乘) → factorial()
    // 匹配数字后的 !
    processed = processed.replace(/(\d+(\.\d+)?)\s*!/g, 'factorial($1)');

    return processed;
  }

  /**
   * 提取最后一个操作数
   */
  private extractLastOperand(expr: string): string | null {
    // 匹配最后的数字或括号表达式
    const match = expr.match(/([\d.]+|\([^)]+\))$/);
    return match ? match[0] : null;
  }

  /**
   * 提取第一个操作数
   */
  private extractFirstOperand(expr: string): string | null {
    // 匹配开头的数字或括号表达式
    const match = expr.match(/^([\d.]+|\([^)]+\))/);
    return match ? match[0] : null;
  }

  /**
   * 转换三角函数为角度模式
   * DEG 模式下: sin(x) → sin(x * pi / 180)
   */
  private convertTrigToDegrees(expr: string): string {
    const trigFuncs = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan'];

    let result = expr;

    trigFuncs.forEach((func) => {
      // 匹配 func(...)
      const regex = new RegExp(`${func}\\(([^()]+)\\)`, 'g');

      result = result.replace(regex, (match, inner) => {
        // 对于反三角函数，结果需要转换为角度
        if (func.startsWith('a')) {
          // asin, acos, atan 的结果从弧度转角度
          return `(${func}(${inner}) * 180 / pi)`;
        } else {
          // sin, cos, tan 的参数从角度转弧度
          return `${func}((${inner}) * pi / 180)`;
        }
      });
    });

    return result;
  }

  /**
   * 添加隐式乘法
   * 例如: 2π → 2*π, 2(3+4) → 2*(3+4)
   */
  private addImplicitMultiplication(expr: string): string {
    let result = expr;

    // 数字后跟 ( 或字母
    result = result.replace(/(\d)(\()/g, '$1*$2');
    result = result.replace(/(\d)([a-z])/gi, '$1*$2');

    // ) 后跟数字或 (
    result = result.replace(/(\))(\d)/g, '$1*$2');
    result = result.replace(/(\))(\()/g, '$1*$2');

    // ) 后跟字母
    result = result.replace(/(\))([a-z])/gi, '$1*$2');

    return result;
  }

  /**
   * 设置角度模式
   */
  setAngleMode(mode: AngleMode): void {
    this.angleMode = mode;
  }

  /**
   * 获取当前角度模式
   */
  getAngleMode(): AngleMode {
    return this.angleMode;
  }

  /**
   * 解析错误信息
   */
  private parseError(error: any): string {
    const message = error.message || String(error);

    // 常见错误翻译为中文
    if (message.includes('division by zero') || message.includes('Infinity')) {
      return '不能除以零';
    }
    if (message.includes('Undefined symbol')) {
      return '未定义的符号';
    }
    if (message.includes('Unexpected') || message.includes('Syntax error')) {
      return '语法错误';
    }
    if (message.includes('Value expected')) {
      return '缺少数值';
    }
    if (message.includes('Parenthesis') || message.includes('parenthesis')) {
      return '括号不匹配';
    }

    return '计算错误';
  }
}

/**
 * 单例计算引擎实例
 */
export const calculatorEngine = new CalculatorEngine();
