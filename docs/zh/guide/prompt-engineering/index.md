# YC-提示词指南

本系列指南将帮助你系统性地掌握提示词工程（Prompt Engineering）的核心概念和实践技巧。

## 什么是提示词工程？

提示工程是一门较新的学科，关注提示词开发和优化，有助于用户将大语言模型（Large Language Model, LLM）用于各场景和研究领域。

## 推荐阅读顺序

- [文本生成控制参数](./text-generation-params.md)
- [提示词结构（角色 / 指令 / 约束 / 输出）](./prompt-structure.md)
- [评估与迭代（从“能用”到“稳定”）](./evaluation-and-iteration.md)
- [常用提示技术（零样本 / 少样本 / CoT 等）](./prompt-techniques.md)
- [ReAct：思考 + 行动（工具调用）](./react.md)
- [DSP：方向性刺激提示](./dsp.md)
- [模型幻觉与校验](./hallucination.md)
- [提示词安全（注入 / 越狱 / 防护）](./prompt-security.md)
- [参考资料](./references.md)

## 快速参考

:::tip 核心参数速查
- **Temperature**: 控制随机性，越高越多样
- **Top_p**: 核采样，控制候选词范围
- **建议**: 两个参数只调其中一个，另一个保持默认 1.0
:::

## 你可以怎么用这套指南

- 先用“结构”把提示词写清楚，再用“参数”把输出调稳定
- 每个提示词都配一份评估用例（10～30 条就够），避免只靠主观感觉
- 当要接工具/外部系统时，优先用 ReAct 思路把“推理”和“动作”拆开
