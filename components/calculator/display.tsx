'use client';

import { Badge } from '@/components/ui/badge';
import { AngleMode } from '@/types/calculator';
import { cn } from '@/lib/utils';

interface DisplayProps {
  /** 当前表达式 */
  expression: string;
  /** 计算结果 */
  result: string;
  /** 错误信息 */
  error: string | null;
  /** 角度模式 */
  mode: AngleMode;
}

/**
 * 计算器显示屏组件
 * 显示表达式、结果、错误信息和角度模式
 */
export function Display({ expression, result, error, mode }: DisplayProps) {
  // 根据表达式长度自适应字体大小
  const getFontSize = (text: string) => {
    const length = text.length;
    if (length < 15) return 'text-5xl';
    if (length < 25) return 'text-4xl';
    if (length < 35) return 'text-3xl';
    return 'text-2xl';
  };

  return (
    <div className="relative rounded-2xl bg-black/5 dark:bg-white/5 p-10 mb-8 transition-all duration-300">
      {/* 角度模式指示器 */}
      <div className="absolute top-6 left-6">
        <Badge 
          variant="outline" 
          className={cn(
            "text-xs font-medium border-0 bg-black/10 dark:bg-white/10 backdrop-blur-sm px-3 py-1",
            mode === 'DEG' ? 'text-orange-600 dark:text-orange-400' : 'text-blue-600 dark:text-blue-400'
          )}
        >
          {mode}
        </Badge>
      </div>

      {/* 表达式显示 */}
      <div
        className={cn(
          'min-h-[5rem] flex items-center justify-end font-light tracking-tight break-all',
          getFontSize(expression || '0'),
          'text-slate-800 dark:text-slate-100'
        )}
      >
        {expression || '0'}
      </div>

      {/* 结果或错误显示 */}
      <div className="mt-4 text-right min-h-[2rem]">
        {error ? (
          <div
            className={cn(
              'text-rose-500 dark:text-rose-400 font-medium text-xl',
              'animate-shake'
            )}
          >
            {error}
          </div>
        ) : result ? (
          <div className="text-slate-500 dark:text-slate-400 text-3xl font-light animate-in fade-in slide-in-from-bottom-2 duration-300">
            = {result}
          </div>
        ) : (
          <div className="text-slate-400/50 dark:text-slate-500/50 text-lg italic">
            Enter an expression
          </div>
        )}
      </div>
    </div>
  );
}
