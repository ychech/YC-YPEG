# LangChain：从概念到落地

## 1、什么是 LangChain？

LangChain 是一套用于构建基于大语言模型（LLM）的应用程序的开源框架。

- 核心作用：整合数据、工具和工作流，让 LLM 实现更复杂的任务（如 RAG、智能体）。

## 2、为什么需要 LangChain？

当你只调用 LLM API 时，通常会遇到这些真实需求：

- 需要把外部数据接入（本地文档、数据库、网页）
- 需要工具调用（搜索、业务系统、函数执行）
- 需要把复杂逻辑结构化（可组合、可复用、可扩展）
- 需要跨模型、跨厂商切换时降低迁移成本

LangChain 的价值在于：把“搭积木”的方式固定成一套统一接口与组件体系。

## 3、资料入口

- 官网：https://www.langchain.com/langchain
- 文档：https://python.langchain.com/docs/introduction/
- API：https://python.langchain.com/api_reference/
- GitHub：https://github.com/langchain-ai/langchain

## 4、LangGraph

LangGraph 可以理解为在 LangChain 能力之上的“图式工作流编排”，用于协调多个 Chain / Agent / Tools 完成更复杂任务，实现更高级的状态管理与流程控制。

## 5、何为 RAG？

RAG（Retrieval-Augmented Generation，检索增强生成）典型分两段：知识库构建 + 查询生成。

### 5.1 文档预处理（知识库构建）

1. 本地文档（PDF/TXT/网页等）
2. Loader 统一加载为文本
3. 文本分割器切块（避免超上下文）
4. Embedding 将文本块向量化
5. Vector Store 存储向量，完成知识库构建

### 5.2 查询响应（召回-重排-生成）

1. 用户 Query 向量化
2. 向量相似度检索召回 Top-K 文本块
3. 重排（Rerank）精筛 Top-N
4. 提示词模板拼接「问题 + 证据」
5. LLM 生成回答

:::tip Reranker 使用建议
- 适合：追求回答高精度/高相关性（专业知识库、客服）
- 不适合：对响应延迟要求很高（Rerank 会增加耗时）
:::

## 6、什么是 Agent？

Agent 可以理解为：负责把 LLM 的“思考/规划”与“工具调用/执行”串起来的代理层。

## 7、Memory（记忆）

- 短期记忆：单次对话上下文，受上下文窗口限制
- 长期记忆：跨任务/跨时间复用的知识与经验，常见实现：向量数据库、知识图谱、微调固化

## 8、大模型应用开发的 4 个常见场景

1. 纯 Prompt：直接提示词驱动输出
2. Agent + Function Calling：工具调用与外部系统协同
3. RAG：引入领域知识，降低幻觉
4. Fine-tuning：把知识/风格固化到模型参数

