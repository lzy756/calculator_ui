import { Calculator } from '@/components/calculator/calculator';
import { CalculatorProvider } from '@/contexts/calculator-context';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <CalculatorProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 py-8">
        <ThemeToggle />

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            科学计算器
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            支持三角函数、幂指数、历史记录和暗色模式
          </p>
        </div>

        <Calculator />
      </div>
    </CalculatorProvider>
  );
}
