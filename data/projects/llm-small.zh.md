LLM-Small 是一个从零开始构建的小型语言模型项目，涵盖从 自定义分词器训练（SentencePiece）、数据管线构建（Hugging Face Datasets）、模型训练（GPT-2 架构） 到 文本生成与可视化 的完整流程。
模型基于 自回归语言建模（Causal Language Modeling, CLM） 原理，通过最小化预测下一个 token 的交叉熵损失来学习语言分布。
项目实现了完整的训练管线：包括数据清洗、tokenizer 自动修复、批处理动态填充（padding/truncation）、混合精度训练、loss 与 perplexity 曲线可视化等。
核心框架基于 PyTorch 与 Hugging Face Transformers，配合 SentencePiece 用于词汇单元建模，Datasets 负责高效数据流处理，Matplotlib 用于训练过程监控与可视化。