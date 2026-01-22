'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCalculatorContext } from '@/contexts/calculator-context';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * 历史记录面板组件
 * 显示计算历史，支持点击重用和清空
 */
export function HistoryPanel() {
  const { history, loadFromHistory, clearHistory } = useCalculatorContext();
  const [mounted, setMounted] = useState(false);

  // 等待客户端挂载后再显示，避免 SSR Hydration 错误
  useEffect(() => {
    setMounted(true);
  }, []);

  // 服务器端渲染时显示占位符
  if (!mounted) {
    return (
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-lg font-semibold">计算历史</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="p-0">
          <ScrollArea className="h-[600px]">
            <div className="flex items-center justify-center h-40 text-slate-400 dark:text-slate-500">
              加载中...
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-semibold">计算历史</CardTitle>
        {history.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearHistory}
            className="h-8 w-8"
            title="清空历史"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>

      <Separator />

      <CardContent className="p-0">
        <ScrollArea className="h-[600px]">
          {history.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-slate-400 dark:text-slate-500">
              暂无历史记录
            </div>
          ) : (
            <div className="p-4 space-y-2">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                  onClick={() => loadFromHistory(item)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 mr-2">
                      <div className="text-sm text-slate-600 dark:text-slate-400 font-mono break-all">
                        {item.expression}
                      </div>
                      <div className="text-lg font-semibold text-slate-900 dark:text-slate-100 font-mono mt-1">
                        = {item.result}
                      </div>
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">
                      {item.mode}
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                    {new Date(item.timestamp).toLocaleString('zh-CN', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
