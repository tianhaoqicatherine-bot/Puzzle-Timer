# 拼图专注计时器 - Puzzle Timer

一个游戏化专注计时器移动端 Web App，用户通过完成专注任务来解锁并收集拼图碎片。

## 🎮 功能特性

### 核心功能
- 🎯 **专注计时** - 番茄钟式专注计时，支持自定义时长
- 🧩 **拼图解锁** - 完成专注任务解锁拼图碎片
- 🎨 **主题系统** - 多种拼图主题可选（猫咪、风景、太空等）
- 🔊 **语音输入** - AI辅助录入任务信息
- 📅 **日程规划** - 日历视图管理专注计划

### 页面概览
1. **首页** - 当前拼图进度、统计数据、快捷入口
2. **专注设置** - 设置时长、深度专注模式、语音/拍照输入
3. **专注倒计时** - 极简界面，支持暂停/继续
4. **成功结算** - 解锁拼图块动画、奖励展示
5. **失败结算** - 鼓励文案、重试选项
6. **发现主题** - 主题列表、分类筛选、拼图块数滑块
7. **创建主题** - UGC上传图片、设置拼图块数
8. **日程规划** - 日历视图、添加/删除日程
9. **个人中心** - 统计数据、成就展示

## 🛠 技术栈

- **框架**: Next.js 16.2.2 + React + TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **构建**: Turbopack
- **部署**: Netlify

## 🚀 部署指南

### 1. 推送到 GitHub

由于当前无法直接推送，你需要手动执行以下命令：

```bash
cd /home/alvin/puzzle-app

# 配置Git身份（如未配置）
git config user.email "you@example.com"
git config user.name "Your Name"

# 使用Personal Access Token推送
git remote set-url origin https://YOUR_GITHUB_TOKEN@github.com/tianhaoqicatherine-bot/Puzzle-Timer.git
git push -u origin main
```

或者使用SSH方式：
```bash
git remote set-url origin git@github.com:tianhaoqicatherine-bot/Puzzle-Timer.git
git push -u origin main
```

### 2. 部署到 Netlify

#### 方法一：GitHub 自动部署（推荐）

1. **在 Netlify 创建站点**
   - 访问 [Netlify](https://app.netlify.com/)
   - 点击 "Add new site" → "Import an existing project"
   - 选择 GitHub 并授权
   - 选择 `Puzzle-Timer` 仓库
   - 构建设置：
     - Build command: `npm run build`
     - Publish directory: `dist`
   - 点击 "Deploy site"

2. **配置环境变量**
   - 在站点设置中找到 "Site settings" → "Environment variables"
   - 添加：`NODE_VERSION = 20`

#### 方法二：GitHub Actions 自动部署

1. **获取 Netlify 凭证**
   - 登录 [Netlify](https://app.netlify.com/)
   - 创建新站点或使用现有站点
   - 进入 "Site settings" → "General" 
   - 复制 **Site ID**
   - 进入 "User settings" → "Applications" → "Personal access tokens"
   - 生成新的 **Personal Access Token**

2. **在 GitHub 设置 Secrets**
   - 访问 `https://github.com/tianhaoqicatherine-bot/Puzzle-Timer/settings/secrets/actions`
   - 点击 "New repository secret"
   - 添加以下 secrets:
     - `NETLIFY_AUTH_TOKEN`: 你的 Netlify Personal Access Token
     - `NETLIFY_SITE_ID`: 你的 Netlify Site ID

3. **触发部署**
   - Push 代码到 main 分支会自动触发部署
   - 在 GitHub Actions 标签页查看部署状态

### 3. 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 本地预览构建结果
npx serve dist
```

访问 http://localhost:3000

## 📁 项目结构

```
puzzle-app/
├── app/                    # Next.js App Router
│   ├── context/           # 全局状态管理
│   ├── create/            # 创建主题页面
│   ├── profile/           # 个人中心页面
│   ├── result/            # 结果页面
│   │   ├── success/       # 成功结算
│   │   └── failed/        # 失败结算
│   ├── schedule/          # 日程规划页面
│   ├── themes/            # 发现主题页面
│   ├── timer/             # 专注计时页面
│   │   └── active/        # 倒计时页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── .github/workflows/     # GitHub Actions
├── netlify.toml           # Netlify 配置
└── package.json           # 项目依赖
```

## 🎨 UI/UX 设计

- **风格**: 极简、现代、年轻化
- **主色调**: 紫色 (#9333ea)
- **设计元素**: 大圆角卡片、轻微阴影、浅灰背景
- **移动端优先**: 针对移动端优化的交互体验

## 📝 注意事项

1. 图片使用 Unsplash 外链，生产环境建议替换为自有 CDN
2. 当前为演示版本，用户数据存储在内存中
3. 深度专注模式为演示功能，实际需配合系统权限

## 📄 许可证

MIT License

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
