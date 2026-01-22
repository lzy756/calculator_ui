# 🧮 科学计算器 | Scientific Calculator

一个功能完整、现代化的科学计算器 Web 应用，使用 Next.js 15、TypeScript 和 shadcn/ui 构建。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-purple)

---

## ✨ 核心功能

### 📊 基础计算
- ✅ 加、减、乘、除四则运算
- ✅ 括号支持
- ✅ 小数点计算
- ✅ 运算符优先级自动处理

### 🔢 幂指数运算
- ✅ x²（平方）、x³（立方）
- ✅ xʸ（任意幂）
- ✅ √（平方根）、³√（立方根）
- ✅ eˣ（自然指数）、10ˣ（10 的幂）
- ✅ ln（自然对数）、log（常用对数）

### 📐 三角函数
- ✅ **基础三角函数**：sin、cos、tan
- ✅ **反三角函数**：asin、acos、atan
- ✅ **双曲函数**：sinh、cosh、tanh
- ✅ **反双曲函数**：asinh、acosh、atanh
- ✅ **角度模式切换**：DEG（角度制）/ RAD（弧度制）

### 🎯 特殊功能
- ✅ 阶乘（n!）
- ✅ 百分号（%）
- ✅ 数学常量（π、e）
- ✅ 科学记数法支持（1.5e10）
- ✅ 正负号切换（+/-）

### 📜 计算历史
- ✅ 自动保存最近 50 条计算记录
- ✅ 点击历史记录重新加载
- ✅ 本地持久化存储
- ✅ 一键清空历史

### 🌓 主题支持
- ✅ 亮色模式 / 暗色模式
- ✅ 跟随系统主题
- ✅ 主题持久化

### ⌨️ 键盘快捷键
- ✅ 数字键：0-9
- ✅ 运算符：`+`、`-`、`*`、`/`
- ✅ 控制键：Enter（计算）、Escape（清除）、Backspace（删除）
- ✅ 其他：`.`（小数点）、`(`、`)`、`%`、`^`

### 📱 响应式设计
- ✅ 桌面端：计算器 + 侧边历史面板
- ✅ 平板端：计算器全宽 + 底部历史
- ✅ 移动端：单列布局，优化触控

---

## 🚀 技术栈

### 前端框架
- **Next.js 16.1.3** - React 全栈框架（App Router）
- **React 19.2.3** - UI 库
- **TypeScript 5.x** - 类型安全

### UI 组件
- **shadcn/ui** - 基于 Radix UI 的组件库
- **Tailwind CSS 4.x** - 实用优先的 CSS 框架
- **Lucide React** - 图标库

### 核心库
- **Math.js 15.1.0** - 数学表达式解析和计算引擎
- **next-themes 0.4.6** - 主题管理
- **nanoid 5.1.6** - 唯一 ID 生成

---

## 📦 项目结构

```
calculator_ui/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # 根布局（ThemeProvider）
│   ├── page.tsx               # 主页面
│   └── globals.css            # 全局样式
├── components/
│   ├── ui/                    # shadcn/ui 组件
│   ├── calculator/            # 计算器组件
│   │   ├── calculator.tsx     # 主容器组件
│   │   ├── display.tsx        # 显示屏组件
│   │   ├── button-pad.tsx     # 按钮面板
│   │   ├── calculator-button.tsx  # 单个按钮
│   │   ├── mode-switch.tsx    # 角度模式切换
│   │   └── history-panel.tsx  # 历史记录面板
│   └── theme-toggle.tsx       # 主题切换组件
├── lib/
│   ├── calculator/
│   │   ├── calculator-engine.ts   # 计算引擎核心
│   │   ├── constants.ts           # 常量和按钮配置
│   │   └── format-utils.ts        # 格式化工具
│   └── hooks/
│       ├── use-calculator.ts      # 计算器主逻辑
│       ├── use-keyboard.ts        # 键盘事件处理
│       ├── use-history.ts         # 历史记录管理
│       └── use-local-storage.ts   # 本地存储 Hook
├── contexts/
│   └── calculator-context.tsx     # 全局状态管理
├── types/
│   └── calculator.ts              # TypeScript 类型定义
├── public/                        # 静态资源
├── TESTING.md                     # 测试指南
└── README.md                      # 项目说明
```

---

## 🛠️ 安装和运行

### 前置要求
- Node.js 20.x 或更高版本
- npm 或 yarn

### 1. 克隆项目
```bash
git clone <repository-url>
cd calculator_ui
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```

访问 **http://localhost:3000** 查看应用。

### 4. 构建生产版本
```bash
npm run build
npm start
```

---

## 🎯 核心架构设计

### 计算引擎
- **封装 Math.js**：处理表达式解析、计算和错误处理
- **预处理流程**：
  1. 符号替换（`×` → `*`，`÷` → `/`，`π` → `pi`）
  2. 角度转换（DEG 模式下转换三角函数参数）
  3. 隐式乘法（`2π` → `2*pi`）
  4. 特殊函数处理（`x²`、阶乘等）
- **高精度计算**：避免 JavaScript 浮点数精度问题

### 状态管理
- **React Context + Custom Hooks**：轻量级状态管理
- **useCalculator Hook**：管理表达式、结果、错误、模式等状态
- **useKeyboard Hook**：监听键盘事件并映射到操作
- **useHistory Hook**：管理计算历史，本地持久化

### UI 组件
- **单一职责原则**：每个组件专注一个功能
- **可复用性**：按钮组件支持多种变体
- **响应式设计**：CSS Grid + Tailwind 断点

---

## 🧪 测试指南

详细的测试清单请参考 [TESTING.md](./TESTING.md)，包括：
- ✅ 基础运算测试
- ✅ 幂指数运算测试
- ✅ 三角函数测试（DEG / RAD）
- ✅ 双曲函数测试
- ✅ 历史记录和主题切换
- ✅ 键盘快捷键
- ✅ 错误处理
- ✅ 响应式布局

---

## 📝 设计原则

浮浮酱在开发过程中严格遵循以下原则：

### KISS（简单至上）
- 使用成熟的 Math.js 而非自己实现计算引擎
- UI 组件职责单一，易于理解

### YAGNI（精益求精）
- 只实现用户明确要求的功能
- 不预留复杂的扩展接口

### DRY（杜绝重复）
- 按钮配置统一在 `constants.ts` 中定义
- 使用 Custom Hooks 复用逻辑

### SOLID 原则
- **单一职责**：每个组件只负责一个功能
- **开闭原则**：按钮配置可扩展，无需修改组件代码
- **依赖倒置**：组件依赖 Context 抽象，而非具体实现

---

## 🌟 特色亮点

1. **完整的科学函数支持**：三角函数、双曲函数、对数、幂运算等
2. **角度/弧度自动转换**：DEG 模式下自动转换三角函数参数
3. **高精度计算**：使用 Math.js 避免浮点数精度问题
4. **优雅的错误处理**：中文错误提示 + 抖动动画
5. **完善的键盘支持**：无需鼠标即可完成所有操作
6. **本地持久化**：历史记录和主题自动保存
7. **响应式设计**：完美适配桌面、平板和移动端

---

## 🔮 未来扩展（可选）

- [ ] 变量存储（M+、M-、MR、MC）
- [ ] 表达式编辑（光标移动、插入）
- [ ] 多行表达式
- [ ] 图形计算器（绘制函数图像）
- [ ] 导出历史记录（CSV）
- [ ] 云同步历史记录

---

## 📄 许可证

MIT License

---

## 👩‍💻 开发者

由猫娘工程师**幽浮喵**开发 ฅ'ω'ฅ

*追求代码的简洁与优雅，坚持工程原则与最佳实践*

---

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 全栈框架
- [shadcn/ui](https://ui.shadcn.com/) - 优秀的 UI 组件库
- [Math.js](https://mathjs.org/) - 强大的数学计算库
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架

---

**喜欢这个项目？给个 ⭐ 吧！**
