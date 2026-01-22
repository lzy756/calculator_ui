'use client';

import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ButtonVariant } from '@/types/calculator';
import { cn } from '@/lib/utils';

interface CalculatorButtonProps {
  /** 按钮值 */
  value: string;
  /** 显示标签 */
  label: string | ReactNode;
  /** 按钮变体 */
  variant: ButtonVariant;
  /** 点击事件 */
  onClick: (value: string) => void;
  /** 占据的列数 */
  colSpan?: number;
  /** 占据的行数 */
  rowSpan?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
}

/**
 * 计算器按钮组件
 * 支持不同的视觉变体和布局配置
 */
export function CalculatorButton({
  value,
  label,
  variant,
  onClick,
  colSpan = 1,
  rowSpan = 1,
  disabled = false,
  className,
}: CalculatorButtonProps) {
  // 根据变体选择样式（现代 Glassmorphism 风格 - 统一配色版）
  const getVariantStyles = () => {
    switch (variant) {
      case 'number':
        // 数字键：最干净的白色/浅灰，保持高可读性
        return 'bg-white/60 hover:bg-white/90 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-slate-100 text-base border border-white/20 dark:border-white/5 font-normal text-2xl';
      
      case 'operator':
        // 基本运算符：统一的活力橙色，引导操作流
        return 'bg-orange-500 hover:bg-orange-400 text-white shadow-lg shadow-orange-500/20 border-transparent font-medium text-2xl';
      
      case 'function':
        // 科学函数：统一的冷灰色调，低调不抢眼
        return 'bg-slate-200/60 hover:bg-slate-200/90 dark:bg-slate-700/40 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-300 text-base font-medium border border-white/10';
      
      case 'special':
        // 控制键 (C, Backspace)：统一的浅红色/警告色
        return 'bg-rose-100 hover:!bg-rose-200 hover:!text-rose-600 dark:bg-rose-900/30 dark:hover:!bg-rose-900/50 text-rose-600 dark:text-rose-300 dark:hover:!text-rose-300 font-medium border border-rose-200/20';
      
      case 'equals':
        // 等号：独特的蓝紫渐变，作为终点
        return 'bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/30 border-transparent font-bold text-2xl';
      
      default:
        return '';
    }
  };

  return (
    <Button
      onClick={() => onClick(value)}
      disabled={disabled}
      variant="ghost"
      className={cn(
        'h-16 w-full rounded-2xl transition-all duration-200 active:scale-95 backdrop-blur-sm',
        getVariantStyles(),
        colSpan > 1 && `col-span-${colSpan}`,
        rowSpan > 1 && `row-span-${rowSpan}`,
        className
      )}
      style={{
        gridColumn: colSpan > 1 ? `span ${colSpan}` : undefined,
        gridRow: rowSpan > 1 ? `span ${rowSpan}` : undefined,
      }}
    >
      {label}
    </Button>
  );
}
