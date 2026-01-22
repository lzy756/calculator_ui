'use client';

import { Display } from './display';
import { ModeSwitch } from './mode-switch';
import { ButtonPad } from './button-pad';
import { HistoryPanel } from './history-panel';
import { useCalculatorContext } from '@/contexts/calculator-context';

/**
 * 主计算器容器组件
 * 整合显示屏、模式切换、按钮面板和历史面板
 */
export function Calculator() {
  const { expression, result, error, angleMode, toggleAngleMode } =
    useCalculatorContext();

  return (
    <div className="container mx-auto p-4 min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 w-full max-w-6xl">
        {/* 左侧：计算器主体 */}
        <div className="relative">
          {/* 装饰性背景元素 */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
          
          <div className="glass rounded-3xl p-8 relative z-10">
            {/* 显示屏 */}
            <Display
              expression={expression}
              result={result}
              error={error}
              mode={angleMode}
            />

            {/* 角度模式切换 */}
            <div className="flex justify-end mb-4">
              <ModeSwitch mode={angleMode} onToggle={toggleAngleMode} />
            </div>

            {/* 按钮面板 */}
            <ButtonPad />
          </div>
        </div>

        {/* 右侧：历史记录面板 */}
        <div className="hidden lg:block relative">
           <div className="glass rounded-3xl p-6 h-full min-h-[600px]">
            <HistoryPanel />
          </div>
        </div>
      </div>

      {/* 移动端历史记录（在底部显示） */}
      <div className="lg:hidden mt-8 w-full max-w-md mx-auto">
        <div className="glass rounded-3xl p-6">
          <HistoryPanel />
        </div>
      </div>
    </div>
  );
}
