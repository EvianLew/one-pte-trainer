# 壹ONE PTE Trainer v5.1 修复说明

本版针对实际部署后发现的三个核心问题进行修复：

1. **语音无限循环**
   - 每一道训练项只自动播放一次。
   - 输入错误后的清空不会再次触发自动发音。
   - PTE 训练发音强制单次播放，不继承旧版“循环发音”缓存。
   - 仍可点击喇叭或使用 `Ctrl + J` 主动重播。

2. **拼写模式恢复**
   - FIB / SST / SGD 默认开启“听音→拼写”。
   - 使用新的本地配置 key，避免旧浏览器缓存继续把拼写模式关闭。
   - 顶部新增明显的“拼写模式 ON/OFF”状态。

3. **SGD 语音自然度**
   - 取消旧版通过 pitch 强行模拟男女声的方式。
   - 自动优先 Natural / Neural / Premium / Enhanced 英文声线。
   - S1 / S2 / S3 自动尽量使用不同声线。
   - 设置页可分别给 S1 / S2 / S3 固定系统英文声线并即时试听。
   - SGD 独立语速，默认 0.92x。
   - 对九宫格短语补轻微句末停顿，让浏览器 TTS 的韵律更自然。

> 说明：本版仍使用浏览器/系统 Speech Synthesis，因此最终音质取决于设备安装的声线。设置页已提供三人独立声线选择与试听；如果设备有 Microsoft Natural、Google 或 Apple Enhanced，建议优先使用。真正跨设备完全一致的 Neural TTS，需要后续把 525 条 SGD 短句预生成成静态音频文件。

此外，`vercel.json` 已强制使用 `npm install --legacy-peer-deps`，并移除旧 `.yarnrc` / `yarn.lock`，避免镜像源和 Yarn 自动识别干扰 Vercel 安装。
