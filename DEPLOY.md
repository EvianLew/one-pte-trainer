# 壹ONE PTE Trainer 部署说明

## 推荐：Vercel

1. 把整个项目上传到 GitHub/GitLab，或在 Vercel 直接导入项目。
2. Framework Preset 选择 **Vite**（通常会自动识别）。
3. Build Command：`npm run build`
4. Output Directory：`build`
5. 部署即可。项目已包含 `vercel.json`，刷新 `/gallery`、`/analysis` 等路由不会 404。

## Netlify

项目已包含 `netlify.toml` 和 `public/_redirects`：

- Build command: `npm run build`
- Publish directory: `build`

## 本地检查

```bash
npm install
npm run dev
```

正式构建：

```bash
npm run build
npm run preview
```

## 数据与隐私

学习记录使用浏览器 IndexedDB/localStorage 保存，不需要后端数据库。换浏览器、清理网站数据或更换设备不会自动同步，请使用软件内的数据导出/导入功能备份。

## 语音

部署版不再使用 v3 中生成的 SGD MP3。FIB/SST/SGD 的 PTE 训练内容优先使用浏览器/系统 Speech Synthesis 自然语音，并可在设置中选择英文声线。不同系统可用声线不同，带 Natural / Premium / Enhanced 的系统声线通常更自然。

## SGD 原文状态

当前 `PTE大西瓜·SGD题库(1).pdf` 在本环境中无法用已提供密码解锁，因此本版**没有伪造** SGD 的原文例句或逐句中文翻译。现有 SGD 分类、Topic、Round、Speaker 与短句顺序仍来自用户提供的九宫格资料。代码和数据结构已经预留原文/中文字段，拿到可读 PDF 后可直接补入。
