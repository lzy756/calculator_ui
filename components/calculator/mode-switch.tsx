'use client';

import { Switch } from '@/components/ui/switch';
import { AngleMode } from '@/types/calculator';

interface ModeSwitchProps {
  /** 当前角度模式 */
  mode: AngleMode;
  /** 切换回调 */
  onToggle: () => void;
}

/**
 * 角度模式切换组件
 * 切换 DEG（角度制）和 RAD（弧度制）
 */
export function ModeSwitch({ mode, onToggle }: ModeSwitchProps) {
  return (
    <div className="flex items-center justify-center space-x-3 px-2 py-3 bg-slate-100 dark:bg-slate-800 rounded-lg mb-4">
      <label
        htmlFor="angle-mode"
        className={`text-sm font-semibold cursor-pointer ${
          mode === 'DEG'
            ? 'text-indigo-600 dark:text-indigo-400'
            : 'text-slate-500 dark:text-slate-400'
        }`}
      >
        DEG
      </label>

      <Switch
        id="angle-mode"
        checked={mode === 'RAD'}
        onCheckedChange={onToggle}
        aria-label="切换角度模式"
      />

      <label
        htmlFor="angle-mode"
        className={`text-sm font-semibold cursor-pointer ${
          mode === 'RAD'
            ? 'text-indigo-600 dark:text-indigo-400'
            : 'text-slate-500 dark:text-slate-400'
        }`}
      >
        RAD
      </label>
    </div>
  );
}
