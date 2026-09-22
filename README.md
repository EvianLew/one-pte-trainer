# 壹ONE PTE Vocabulary Trainer · Deploy v5

基于开源项目 Qwerty Learner（GPL-3.0）的键盘记忆逻辑改造成 PTE 专项训练器。前台品牌使用「壹ONE FILM INSTITUTION」。

## 当前模块

### FIB Listening
- 467 个听力高频词。
- 保留逐字输入、错误重打、错题本、统计、章节、本地学习记录等原版训练能力。
- 已从用户提供的 FIB 词汇 PDF 回填中文释义。
- 原项目可匹配的英文参考例句继续保留；没有可靠逐句中文时明确显示“语境中文解释”，说明该词在该句中的含义，并注明资料没有该句逐句译文，不伪装成原资料翻译。

### SST
- 不再按“每 20 个词一章”切分，而是按 **SST 题号 / 题目**组织。
- 当前资料解析出 97 道题，其中 54 道标记为“8月最高频”。
- 568 条 SST 重点词条（561 个不重复词形）中，当前有 550 个不重复词可在题目资料正文/答案中匹配到；同一词可在多题重复出现。
- 训练卡显示：题号、题名、题目优先级、来源类型、中文释义、英文例句、中文解释、该词还出现在哪些 SST 题目。原资料已有逐句中文时直接使用；没有时明确标成“语境中文解释”。
- 来源区分：原音/真题原文、参考文本（非原文）、疑似原文、音频题资料、题库答案/考生回忆、未匹配；不会把参考文本冒充真题原文。

### SGD
- 保留 5 个分类、20 个 Topic、525 条短句。
- 固定顺序：分类 → Topic → Round → S1/S2/S3 → phrase，不随机。
- 界面明确显示所属分类、Topic、Round、Speaker、He/She、前一句。
- v3 的本地合成 MP3 已删除；改用系统自然语音，并按 He/She 自动倾向不同声线。
- SGD 原题 PDF 当前仍无法解锁，因此原文例句/逐句中文暂不虚构；拿到可读原文后直接补入现有字段。

## 语音

设置 → 声音设置 → `PTE 自然语音` 可选择本机英文声线。默认“自动选择高质量英文声线”，优先考虑英语 Natural / Premium / Enhanced / Microsoft / Apple / Google 声线。

## 部署

见 [DEPLOY.md](./DEPLOY.md)。Vercel / Netlify 配置已经放好。

```bash
npm install
npm run dev
npm run build
```

## 文件

- `public/dicts/PTE_FIB_Listening.json`
- `public/dicts/PTE_SST_By_Question.json`
- `public/dicts/PTE_SST_By_Question.meta.json`
- `public/dicts/PTE_SGD_*.json`
- `public/reference-dicts/`：保留的内部英文参考词典

## License

本项目继续保留原 Qwerty Learner 的 GPL-3.0 License 与 NOTICE。若分发基于该源码的版本，需要继续遵守 GPL-3.0。
