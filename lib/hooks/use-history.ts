import { nanoid } from 'nanoid';
import { HistoryItem, AngleMode } from '@/types/calculator';
import { useLocalStorage } from './use-local-storage';

/**
 * 历史记录管理 Hook
 * 处理计算历史的添加、清空和持久化
 */
export function useHistory() {
  const [history, setHistory] = useLocalStorage<HistoryItem[]>(
    'calculator-history',
    []
  );

  /**
   * 添加历史记录
   */
  const addToHistory = (
    expression: string,
    result: string,
    mode: AngleMode
  ) => {
    const newItem: HistoryItem = {
      id: nanoid(),
      expression,
      result,
      mode,
      timestamp: Date.now(),
    };

    // 添加到历史列表开头，限制最多 50 条
    setHistory((prev) => [newItem, ...prev].slice(0, 50));
  };

  /**
   * 清空历史记录
   */
  const clearHistory = () => {
    setHistory([]);
  };

  /**
   * 删除单条历史记录
   */
  const removeHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    history,
    addToHistory,
    clearHistory,
    removeHistoryItem,
  };
}
