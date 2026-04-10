# langchain-community：功能扩展层

`langchain-community` 是 LangChain 生态里的功能扩展层，用于承载社区贡献的第三方集成组件（向量库、文档加载器、小众模型等）。在工程落地时，它往往是你“接入外部能力”的第一站。

## 1. 定位与作用

- 基于 `langchain-core` 定义的标准接口实现，但不属于官方核心维护，由社区贡献维护
- 作用：扩展 LangChain 主包能力，让你快速对接各类第三方服务、工具与模型

## 2. 与其他包的关系

- `langchain-core`：底层接口与基础抽象（LLM、Embeddings 基类等）
- `langchain`：高层应用编排（Chains、Agents 等）
- `langchain-community`：第三方集成集合（向量库、Loader、小众模型等）
- `langchain-openai` / `langchain-anthropic`：热门服务商专用包（更稳定、维护更好）

## 3. 核心包含内容（常用）

- 文档处理：Loader（PDF/CSV/网页/目录）、文本分割器、解析器
- 向量存储：FAISS、Chroma、PGVector、Weaviate 等
- Embeddings：HuggingFace、Ollama、本地/开源嵌入等
- LLM / Chat Models：通义千问、文心一言、DeepSeek、Ollama 等
- 工具与检索：自定义工具、多查询检索器、第三方 API 适配器

:::tip 实战建议
优先使用厂商专用包（如 `langchain-openai`）保证稳定性；只有当你需要更广的生态集成时，再引入 `langchain-community`。
:::

