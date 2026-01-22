import { useState, useEffect } from 'react';

/**
 * 本地存储 Hook
 * 封装 localStorage 的读写，支持泛型类型和 SSR 安全
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // 初始化状态
  const [storedValue, setStoredValue] = useState<T>(() => {
    // SSR 安全检查
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // 从 localStorage 获取值
      const item = window.localStorage.getItem(key);
      // 解析 JSON 或返回初始值
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // 更新 localStorage 的函数
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // 允许 value 是函数（类似 useState）
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // 保存状态
      setStoredValue(valueToStore);

      // 保存到 localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
