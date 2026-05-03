# LeetCode Hot 100 刷题打卡助手

一个基于 React 的 LeetCode Hot 100 算法题刷题打卡应用。支持随机出题、分阶段解题（题目 -> 提示 -> 答案）、代码高亮、学习进度跟踪与每日打卡日历。

## 功能特性

- **随机刷题** -- 从 LeetCode Hot 100 中随机抽取题目，支持按难度和标签筛选
- **三阶段解题** -- 先展示题目供思考，再依次显示关键词提示和完整题解
- **多语言代码高亮** -- 支持 Python、Java、C++、Go 四种语言的语法高亮展示
- **学习进度管理** -- 标记题目为「已掌握」或「进行中」，自动统计完成率
- **每日打卡日历** -- 记录每日刷题情况，连续打卡天数统计
- **数据可视化** -- 进度环形图、难度分布柱状图、标签掌握情况网格
- **数据导入导出** -- 支持 JSON 格式的进度备份与恢复
- **深色模式** -- 一键切换亮色 / 暗色主题
- **响应式布局** -- 桌面端与移动端自适应

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 19 + TypeScript 6 |
| 构建 | Vite 8 |
| 样式 | Tailwind CSS 4 |
| 状态管理 | Zustand 5 (persist middleware) |
| 路由 | React Router 7 |
| 代码高亮 | Prism.js |
| 字体 | IBM Plex Sans / Mono + Noto Sans SC |

## 快速开始

```bash
# 克隆项目
git clone <repo-url>
cd leetcode-hot100

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 项目结构

```
src/
  components/          # 通用 UI 组件
    Navbar.tsx           # 导航栏（桌面顶部 + 移动端底部）
    ProblemCard.tsx      # 题目卡片（描述 + 示例）
    HintPanel.tsx        # 提示面板（关键词 + 解题思路）
    SolutionPanel.tsx    # 题解面板（思路 + 代码 + 复杂度）
    CodeBlock.tsx        # 代码高亮块（Prism.js）
    CheckinCalendar.tsx  # 打卡日历
    ProgressRing.tsx     # 进度环形图
    DifficultyChart.tsx  # 难度分布图
    TagProgress.tsx      # 标签掌握情况
    StatCard.tsx         # 统计卡片
    DifficultyBadge.tsx  # 难度标签
    StatusBadge.tsx      # 状态标签
    TagList.tsx          # 标签列表
  pages/               # 页面组件
    HomePage.tsx         # 首页（统计概览 + 快捷入口）
    PracticePage.tsx     # 刷题页（三阶段状态机）
    ProblemListPage.tsx  # 题目列表（筛选 + 排序 + 表格/卡片）
    RecordsPage.tsx      # 学习记录（日历 + 图表）
    SettingsPage.tsx     # 设置（主题 / 语言 / 出题策略 / 数据）
    ProblemDetailPage.tsx
  data/                # 题目数据
    index.ts             # 数据入口 + 辅助函数
    1.json ~ 98.json     # 98 道 Hot 100 题目的完整数据
  stores/              # Zustand 状态管理
    useProgressStore.ts  # 刷题进度（localStorage 持久化）
    useCheckinStore.ts   # 打卡记录（localStorage 持久化）
    useSettingsStore.ts  # 用户设置（localStorage 持久化）
  types/               # TypeScript 类型定义
    problem.ts           # 题目相关类型
    user.ts              # 用户 / 设置相关类型
  utils/               # 工具函数
    randomProblem.ts     # 随机选题逻辑
    dataManager.ts       # 数据导入 / 导出 / 重置
    useDarkMode.ts       # 深色模式 Hook
  index.css            # 全局样式 + 设计系统
  main.tsx             # 应用入口
  App.tsx              # 根组件 + 路由配置
```

## 数据说明

项目包含 LeetCode Hot 100 中的 98 道题目数据，每道题目包含：

- 题目描述与中英文标题
- 输入输出示例与解释
- 关键词提示、解题思路、时间/空间复杂度
- Python 参考代码

数据存储在 `src/data/` 目录下的 JSON 文件中，通过 TypeScript 类型定义保证结构一致性。

## 使用方式

1. **首页** -- 查看整体进度统计，点击「开始刷题」进入练习
2. **刷题** -- 可选筛选条件后随机出题，依次查看题目、提示、答案
3. **题库** -- 浏览全部 98 道题目，点击跳转到对应题目练习
4. **记录** -- 查看打卡日历、进度环图、难度分布和标签掌握情况
5. **设置** -- 切换主题、选择默认代码语言、出题策略，管理数据备份

## License

MIT
