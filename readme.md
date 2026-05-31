# 徐州红色工业遗产展示平台

一个基于 Vue 3 + Vite 构建的徐州红色工业遗产主题展示网站，围绕煤矿、铁路、纺织、工业精神与文化创意等内容，提供展览浏览、全景导览、互动问答和 AI 智能讲解能力。

## 项目特色

- 主题清晰：聚焦徐州红色工业遗产与城市工业记忆。
- 页面完整：包含首页、遗产分类页、工业精神页、文化创意页、全景页、指南页和答题页。
- 交互丰富：支持路由切换、全景浏览与 AI 助手入口。
- 智能问答：内置 AI 讲解员页面，可对接千问接口进行对话式讲解。

## 技术栈

- Vue 3
- Vue Router 4
- Vite 5

## 目录结构

```text
src/
  assets/                全局样式与资源
  components/            公共组件与页面组件
    pages/               各功能页面
  router.js              路由配置
  main.js                应用入口
```

## 主要页面

- `/` 首页
- `/heritage/coal-mine` 煤矿遗产
- `/heritage/railway` 铁路遗产
- `/heritage/textile` 纺织遗产
- `/heritage/others` 其他遗产
- `/spirit/coal-mine` 煤矿精神
- `/spirit/railway` 铁路精神
- `/spirit/model-worker` 劳模精神
- `/culture` 工业文化
- `/culture/creative` 文创产品
- `/culture/digital-preservation` 数字化保护
- `/panorama` 全景地图
- `/guide` 参观指南
- `/quiz` 互动答题
- `/ai-agent` AI 智能体入口
- `/ai-chat` AI 聊天页面

## 本地运行

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发环境

```bash
npm run dev
```

默认开发地址为 `http://localhost:3000`。

### 3. 打包构建

```bash
npm run build
```

### 4. 预览构建结果

```bash
npm run preview
```

## AI 聊天配置

项目在开发环境下通过 Vite 代理访问千问兼容接口，代理地址为 `/api/qwen-chat`。若要让聊天功能正常工作，请在本地环境中配置以下任意一个变量：

- `QWEN_API_KEY`
- `VITE_QWEN_API_KEY`

也可以通过下面的可选变量覆盖模型与接口地址：

- `QWEN_MODEL` 或 `VITE_QWEN_MODEL`
- `VITE_QWEN_API_BASE`

说明：静态部署后的 `dist` 目录不会自动带有开发代理，如果需要在线环境可用，聊天页应直接连接千问接口并提供有效的 API Key。

## 说明

- 项目标题显示为“徐州红色工业遗产”。
- 页面样式和导航由 `src/App.vue`、`src/router.js` 与各页面组件共同控制。
- AI 助手入口仅在首页、全景页和工业文化页显示。
