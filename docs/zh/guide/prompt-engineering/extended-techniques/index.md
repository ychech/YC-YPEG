## <font style="background-color:rgba(255, 255, 255, 0)">一、 DSP方向性刺激提示</font>
**<font style="background-color:rgba(0, 0, 0, 0)">方向性刺激提示（Directional Stimulus Prompting, DSP）</font>** 是一种的提示工程技术，核心是通过**<font style="background-color:rgba(0, 0, 0, 0)">小型策略模型</font>**自动生成精准的**<font style="background-color:rgba(0, 0, 0, 0)">关键词 / 线索</font>**，引导黑盒大模型（LLM）输出高度符合预期的内容。

<font style="background-color:rgba(0, 0, 0, 0)">他的核心原理是双模型架构</font>

<font style="background-color:rgba(0, 0, 0, 0)">策略模型（Policy LM）</font><font style="background-color:rgba(0, 0, 0, 0)">：轻量级可调模型（如 T5、BERT），负责生成</font><font style="background-color:rgba(0, 0, 0, 0)">方向性刺激</font><font style="background-color:rgba(0, 0, 0, 0)">（关键词、短语、关键信息）。</font>

<font style="background-color:rgba(0, 0, 0, 0)">大语言模型（LLM）：冻结参数的黑盒模型（如 GPT、Claude），接收 “原始输入 + 方向性刺激”，生成最终结果。</font>

<font style="background-color:rgba(0, 0, 0, 0)"></font>

## <font style="background-color:rgba(0, 0, 0, 0)">1.1、 工作流程</font>
1. <font style="background-color:rgba(0, 0, 0, 0)">策略模型分析输入，生成</font>**<font style="background-color:rgba(0, 0, 0, 0)">方向性刺激</font>**<font style="background-color:rgba(0, 0, 0, 0)">（如摘要任务的关键人物、时间、事件）。</font>
2. <font style="background-color:rgba(0, 0, 0, 0)">刺激与原始提示合并，输入大模型。</font>
3. <font style="background-color:rgba(0, 0, 0, 0)">大模型依据刺激，</font>**<font style="background-color:rgba(0, 0, 0, 0)">精准聚焦</font>**<font style="background-color:rgba(0, 0, 0, 0)">生成内容。</font>
4. <font style="background-color:rgba(0, 0, 0, 0)">（训练阶段）通过奖励信号（如 ROUGE、人类评分）优化策略模型。</font>

<font style="background-color:rgba(0, 0, 0, 0)"></font>

<font style="background-color:rgba(0, 0, 0, 0)">与传统提示的区别</font>

+ **<font style="background-color:rgba(0, 0, 0, 0)">标准提示</font>**<font style="background-color:rgba(0, 0, 0, 0)">：静态、通用指令（如 “总结此文”）。</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">方向性刺激提示</font>**<font style="background-color:rgba(0, 0, 0, 0)">：动态、实例化的</font>**<font style="background-color:rgba(0, 0, 0, 0)">精准线索</font>**<font style="background-color:rgba(0, 0, 0, 0)">，强制模型关注关键信息。</font>
    - **<font style="background-color:rgba(0, 0, 0, 0)">例（摘要）</font>**
        * **<font style="background-color:rgba(0, 0, 0, 0)">标准</font>**<font style="background-color:rgba(0, 0, 0, 0)">：总结以下新闻。</font>
        * **<font style="background-color:rgba(0, 0, 0, 0)">DSP</font>**<font style="background-color:rgba(0, 0, 0, 0)">：总结以下新闻，</font>**<font style="background-color:rgba(0, 0, 0, 0)">必须包含：Bob Barker; TV; April 1; The Price Is Right; 2007; 91</font>**<font style="background-color:rgba(0, 0, 0, 0)">。</font>

## 1.2、示例
<font style="background-color:rgba(255, 255, 255, 0)">下图显示了方向性刺激提示与标准提示的比较。</font>

<img src="/prompt-assets/pt-02.png" width="1075" title="" crop="0,0,1,1" id="u2162ae36" class="ne-image">这张图是一个**AI文本摘要效果对比实验**，它展示了两种不同提示策略在生成文章摘要时的表现差异。

从上往下

+ **输入文本（Input text）**：一篇CNN新闻，讲述Bob Barker时隔8年重返他主持了35年的节目《The Price Is Right》（4月1日播出），时年91岁，他曾在2007年卸任主持人一职，这次回归表现依旧稳健。
+ **参考摘要（Reference）**：人工撰写的标准摘要，包含关键信息：_Bob Barker在周三回归主持《The Price Is Right》，91岁的他于2007年卸任该节目主持人。_

### 两种提示策略对比
| 维度 | **定向刺激提示（Directional Stimulus Prompting）** | **标准提示（Standard Prompting）** |
| --- | --- | --- |
| **提示方式** | 在指令中加入了**关键词提示（Hint）**：`Bob Barker; TV: April 1; "The Price Is Right"; 2007; 91`，引导AI聚焦这些关键信息。 | 仅用通用指令：“简要总结文章，2-3句话。” |
| **生成结果** | 包含了所有关键细节：4月1日回归、节目名称、时隔8年、91岁高龄、2007年卸任，与参考摘要高度吻合。 | 只提到了“时隔8年回归”和“曾将主持权交给Drew Carey”，遗漏了“4月1日”“91岁”“2007年卸任”等关键信息。 |
| **ROUGE-1得分** | **48.39** ✅ 得分更高，说明生成的摘要与参考摘要的重叠度更高，质量更好。 | **34.48** ❌ 得分较低，信息遗漏较多。 |


---

### 3. 实验结论
这一对比清晰展示了**定向刺激提示（加入关键词提示）**的优势：通过在提示中明确给出核心关键词，AI生成的摘要能更精准地覆盖原文关键信息，从而显著提升摘要质量（ROUGE得分更高）。

<font style="background-color:rgba(0, 0, 0, 0)">给 LLM 划的</font>**<font style="background-color:rgba(0, 0, 0, 0)">必须关注的区域</font>**<font style="background-color:rgba(0, 0, 0, 0)"> → 用来</font>**<font style="background-color:rgba(0, 0, 0, 0)">强制模型聚焦、不跑偏、不漏信息</font>**

<font style="background-color:rgba(0, 0, 0, 0)">它的作用不是 “总结”，而是</font>**<font style="background-color:rgba(0, 0, 0, 0)">把模型的生成路径 “钉” 在这些词上</font>**<font style="background-color:rgba(0, 0, 0, 0)">。</font>

<font style="background-color:rgba(0, 0, 0, 0)"></font>

**<font style="background-color:rgba(0, 0, 0, 0)">ROUGE 得分</font>**<font style="background-color:rgba(0, 0, 0, 0)">（Recall-Oriented Understudy for Gisting Evaluation）是</font>**<font style="background-color:rgba(0, 0, 0, 0)">自然语言处理（NLP）领域最主流的自动评估指标</font>**<font style="background-color:rgba(0, 0, 0, 0)">，专门用来</font>**<font style="background-color:rgba(0, 0, 0, 0)">量化机器生成的文本（如摘要、翻译）和人工标准答案（参考文本）之间的相似度</font>**

**<font style="background-color:rgba(0, 0, 0, 0)">统计两段文本中 “重叠单元”（词、词组、句子结构）的比例，主要看「召回率」（参考内容被覆盖了多少）。</font>**





定向刺激提示模板

### 基础版（适合大多数场景）
```plain
请你用2-3句话简要总结下面的文章。
【关键信息提示】：[关键词1]; [关键词2]; [关键词3]; [关键词4]

[粘贴需要总结的原文]
```

---

### 进阶版（适合更复杂的文本）
```plain
请你为以下文章生成一份精准摘要，确保包含所有关键信息。
【必须包含的核心要素】：
- 核心人物/主体：[关键词1]
- 关键时间/节点：[关键词2]
- 核心事件/动作：[关键词3]
- 关键数据/背景：[关键词4]

[粘贴需要总结的原文]
```

---

### 示例套用（以你提供的图片为例）
```plain
请你用2-3句话简要总结下面的文章。
【关键信息提示】：Bob Barker; April 1; "The Price Is Right"; 2007; 91

Article: (CNN) For the first time in eight years... [原文省略]
```

---

### 使用小技巧
1. **关键词怎么选**：优先提取原文中的**人物、时间、地点、事件、核心数据**，这些是构成摘要的骨架。
2. **数量控制**：关键词建议控制在3-5个，太多会干扰AI，太少则起不到引导作用。
3. **灵活调整**：如果你的目标不是摘要，而是写文案、做翻译，也可以把关键词换成你想突出的核心卖点或术语。



<font style="background-color:rgba(0, 0, 0, 0)">另外他也不是标签或者关键词提取，他是方向的</font>

<font style="background-color:rgba(0, 0, 0, 0)">普通关键词提取：</font>

+ <font style="background-color:rgba(0, 0, 0, 0)">只抓</font>**<font style="background-color:rgba(0, 0, 0, 0)">名词、实体</font>**
+ <font style="background-color:rgba(0, 0, 0, 0)">目的是</font>**<font style="background-color:rgba(0, 0, 0, 0)">概括内容</font>**
+ <font style="background-color:rgba(0, 0, 0, 0)">是静态、无方向的</font>

<font style="background-color:rgba(0, 0, 0, 0)">方向性刺激（DSP）的 “刺激”：</font>

+ <font style="background-color:rgba(0, 0, 0, 0)">不只是关键词，还可以是</font>**<font style="background-color:rgba(0, 0, 0, 0)">逻辑线索、推理步骤、语气倾向、结构要点、约束条件</font>**
+ <font style="background-color:rgba(0, 0, 0, 0)">目的不是概括，而是</font>**<font style="background-color:rgba(0, 0, 0, 0)">给大模型 “导航”</font>**
+ <font style="background-color:rgba(0, 0, 0, 0)">是</font>**<font style="background-color:rgba(0, 0, 0, 0)">带方向、带约束、带任务目标</font>**<font style="background-color:rgba(0, 0, 0, 0)">的引导</font>

<font style="background-color:rgba(0, 0, 0, 0)">形式上像关键词，但功能上是 “任务制导信号”。关键词提取：</font>**<font style="background-color:rgba(0, 0, 0, 0)">总结信息，</font>**<font style="background-color:rgba(0, 0, 0, 0)">方向性刺激：</font>**<font style="background-color:rgba(0, 0, 0, 0)">控制生成路径</font>**











## <font style="background-color:rgba(255, 255, 255, 0)">二、MM-CoT / M-CoT多模态思维链提示方法</font>
**<font style="background-color:rgba(0, 0, 0, 0)">多模态思维链提示（Multimodal Chain-of-Thought Prompting, 简称 MM-CoT / M-CoT）</font>**<font style="background-color:rgba(0, 0, 0, 0)">，是将传统</font>**<font style="background-color:rgba(0, 0, 0, 0)">文本思维链（CoT）</font>**<font style="background-color:rgba(0, 0, 0, 0)"> 扩展到</font>**<font style="background-color:rgba(0, 0, 0, 0)">图像、文本、音频</font>**<font style="background-color:rgba(0, 0, 0, 0)">等多种输入模态的提示工程技术，核心是让模型</font>**<font style="background-color:rgba(0, 0, 0, 0)">显式分步整合多模态信息进行推理</font>**<font style="background-color:rgba(0, 0, 0, 0)">，并输出可解释的中间步骤。</font>

<font style="background-color:rgba(0, 0, 0, 0)">引导模型在生成答案前，先输出</font>**<font style="background-color:rgba(0, 0, 0, 0)">文本化的中间推理步骤</font>**<font style="background-color:rgba(0, 0, 0, 0)">，每一步都</font>**<font style="background-color:rgba(0, 0, 0, 0)">结合图像 / 音频等非文本线索</font>**<font style="background-color:rgba(0, 0, 0, 0)">，把 “看图→理解→思考→结论” 的过程拆解开。</font>

<font style="background-color:rgba(0, 0, 0, 0)">核心定义（一句话）</font>**<font style="background-color:rgba(0, 0, 0, 0)">多模态思维链 = 分步推理 + 跨模态信息融合</font>**

**<font style="background-color:rgba(0, 0, 0, 0)">就是先把每一个步骤加上图片/音频等内容，再一步一步去得到内容</font>**

<font style="background-color:rgba(255, 255, 255, 0)">传统的思维链提示方法侧重于语言模态。相比之下，多模态思维链提示将文本和视觉融入到一个两阶段框架中。第一步涉及基于多模态信息的理性生成。接下来是第二阶段的答案推断，它利用生成的理性信息。</font>

这张图展示了一个**多模态思维链（Multimodal Chain-of-Thought, Multimodal CoT）**任务的典型例子，它结合了视觉和语言信息，让模型像人一样一步步推理出答案。

<img src="/prompt-assets/pt-08.png" width="912" title="" crop="0,0,1,1" id="ua3b73ca0" class="ne-image">



+ **输入部分（Input）**
    - **语言模块**：问题是“这两个物体有什么共同属性？”，选项为（A）软的、（B）咸的。
    - **视觉模块**：展示了两个物体——一块薄脆饼干（cracker）和一份薯条（fries）。
+ **输出部分（Output）**
    - **思维链（Rationale）**：模型先分别分析每个物体的属性：
        1. 薯条是软的，但饼干是硬的，所以“软的”不是共同属性。
        2. 饼干和薯条通常都是咸的，所以“咸的”是两者的共同属性。
    - **最终答案**：（B）salty（咸的）。



多模态CoT的核心价值

+ **结合视觉与语言**：不仅理解文字问题，还能“看懂”图片里的物体，实现跨模态理解。
+ **显式推理过程**：不是直接给出答案，而是像人一样分步说明思考过程，让结果更可信、可解释。
+ **提升复杂任务表现**：在需要多步推理的场景中，这种“先想后答”的方式能显著提高准确率。

技术意义来看

这是当前大模型研究的一个重要方向，它让AI不仅能处理单一模态的信息，还能像人类一样，把看到的画面和读到的文字结合起来，通过逻辑推理解决问题，是迈向更通用人工智能（AGI）的关键一步。







## <font style="background-color:rgba(255, 255, 255, 0)">三、 PAL（程序辅助语言模型）</font>
**<font style="background-color:rgba(0, 0, 0, 0)">PAL（Program-Aided Language Models，程序辅助语言模型）</font>** 是一种将**<font style="background-color:rgba(0, 0, 0, 0)">大语言模型（LLM）</font>** 与**<font style="background-color:rgba(0, 0, 0, 0)">代码解释器（如 Python）</font>** 深度结合的**<font style="background-color:rgba(0, 0, 0, 0)">推理框架</font>**，核心是让 LLM 生成代码作为中间推理步骤，把**<font style="background-color:rgba(0, 0, 0, 0)">精确计算</font>**交给解释器执行，彻底解决纯文本思维链（CoT）的计算错误问题

[<font style="background-color:rgba(255, 255, 255, 0)">Gao 等人（2022）(opens in a new tab)</font>](https://arxiv.org/abs/2211.10435)<font style="background-color:rgba(255, 255, 255, 0)">提出了一种使用 LLMs 读取自然语言问题并生成程序作为中间推理步骤的方法。被称为程序辅助语言模型（PAL），它与思维链提示不同，因为它不是使用自由形式文本来获得解决方案，</font>

<font style="background-color:rgba(255, 255, 255, 0)">而是将解决步骤卸载到类似 Python 解释器的编程运行时中。</font>

<font style="background-color:rgba(255, 255, 255, 0)">【程序思维化】</font>

<img src="/prompt-assets/pt-03.png" width="656" title="" crop="0,0,1,1" id="u54e2b8d6" class="ne-image">

这张图对比了两种解决数学问题的 AI 方法：

**<font style="background-color:rgba(0, 0, 0, 0)">Chain-of-Thought (CoT)</font>** 和 **<font style="background-color:rgba(0, 0, 0, 0)">Program-aided Language Models (PAL)</font>**，非常直观地展示了它们的核心区别。

<font style="background-color:rgba(0, 0, 0, 0)">左边：Chain-of-Thought (CoT)</font>

<font style="background-color:rgba(0, 0, 0, 0)">这是一种让模型用自然语言一步步推理的方法。</font>

+ **<font style="background-color:rgba(0, 0, 0, 0)">优点</font>**<font style="background-color:rgba(0, 0, 0, 0)">：用人类能看懂的语言拆解问题，思路清晰。</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">缺点</font>**<font style="background-color:rgba(0, 0, 0, 0)">：完全依赖语言推理，容易在计算中出错。</font>
    - <font style="background-color:rgba(0, 0, 0, 0)">在面包店的例子里，模型算错了 </font>`<font style="background-color:rgba(0, 0, 0, 0)">200 - 93 - 39</font>`<font style="background-color:rgba(0, 0, 0, 0)">，得到了错误的结果 </font>`<font style="background-color:rgba(0, 0, 0, 0)">62</font>`<font style="background-color:rgba(0, 0, 0, 0)">，导致最终答案错误。</font>

<font style="background-color:rgba(0, 0, 0, 0)">右边：Program-aided Language Models (PAL)</font>

<font style="background-color:rgba(0, 0, 0, 0)">这是让模型把问题转化为可执行代码，再通过运行代码得到结果的方法。</font>

+ **<font style="background-color:rgba(0, 0, 0, 0)">核心思路</font>**<font style="background-color:rgba(0, 0, 0, 0)">：</font>
    1. <font style="background-color:rgba(0, 0, 0, 0)">把问题中的数字和关系提取出来，写成变量（比如 </font>`<font style="background-color:rgba(0, 0, 0, 0)">loaves_baked = 200</font>`<font style="background-color:rgba(0, 0, 0, 0)">）。</font>
    2. <font style="background-color:rgba(0, 0, 0, 0)">用代码逻辑描述计算过程（比如 </font>`<font style="background-color:rgba(0, 0, 0, 0)">answer = loaves_baked - loaves_sold_morning - loaves_sold_afternoon + loaves_returned</font>`<font style="background-color:rgba(0, 0, 0, 0)">）。</font>
    3. <font style="background-color:rgba(0, 0, 0, 0)">运行代码得到精确结果。</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">优点</font>**<font style="background-color:rgba(0, 0, 0, 0)">：计算交给代码执行，避免了语言推理中的算术错误。</font>
    - <font style="background-color:rgba(0, 0, 0, 0)">在面包店的例子里，代码会正确计算 </font>`<font style="background-color:rgba(0, 0, 0, 0)">200 - 93 - 39 + 6</font>`<font style="background-color:rgba(0, 0, 0, 0)">，得到正确结果 </font>`<font style="background-color:rgba(0, 0, 0, 0)">74</font>`<font style="background-color:rgba(0, 0, 0, 0)">（</font><font style="background-color:rgba(0, 0, 0, 0)">✅</font><font style="background-color:rgba(0, 0, 0, 0)">）。</font>

<font style="background-color:rgba(0, 0, 0, 0)"></font>

**<font style="background-color:rgba(0, 0, 0, 0)">CoT 像人一样 “心算 + 口述”，而 PAL 像人一样 “写代码 + 运行”</font>**<font style="background-color:rgba(0, 0, 0, 0)">。当问题涉及复杂计算时，PAL 通常更可靠。</font>

+ **<font style="background-color:rgba(0, 0, 0, 0)">问题理解（LLM）</font>**<font style="background-color:rgba(0, 0, 0, 0)">输入自然语言问题 → LLM 解析题意、拆解步骤</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">代码生成（LLM）</font>**<font style="background-color:rgba(0, 0, 0, 0)">LLM 写出</font>**<font style="background-color:rgba(0, 0, 0, 0)">带注释的 Python 代码</font>**<font style="background-color:rgba(0, 0, 0, 0)">（注释是自然语言思路，代码是执行逻辑）</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">执行求解（解释器）</font>**<font style="background-color:rgba(0, 0, 0, 0)">代码传给 Python 运行 → 输出精确结果 → 整合为自然语言答案</font>



## <font style="background-color:rgba(255, 255, 255, 0.06)">四、自我反思（Reflexion）</font>
<font style="background-color:rgba(255, 255, 255, 0.06)">自我反思是一个通过语言反馈来强化基于语言的智能体的框架。根据 </font>[<font style="color:rgb(65, 110, 210); background-color:rgb(25, 28, 31)">Shinn et al. (2023)(opens in a new tab)</font>](https://arxiv.org/pdf/2303.11366.pdf)<font style="background-color:rgba(255, 255, 255, 0.06)">，“自我反思是一种‘口头’强化的新范例，它将策略参数化为智能体的记忆编码与 LLM 的参数选择配对。”</font>

<font style="background-color:rgba(255, 255, 255, 0.06)">在高层次上，自我反思将来自环境的反馈（自由形式的语言或者标量）转换为语言反馈，也被称作 self-reflection，为下一轮中 LLM 智能体提供上下文。这有助于智能体快速有效地从之前的错误中学习，进而提升许多高级任务的性能。</font>

<font style="background-color:rgba(255, 255, 255, 0.06)">其将环境反馈（比如＋1 分 -2 分）转化为语言反馈（你刚才错在哪，哪里逻辑有问题，下次应该怎么做）为 LLM 智能体提供上下文，助其从错误中学习，提升高级任务性能。</font>



<font style="background-color:rgba(255, 255, 255, 0.06)">该框架由三个模型构成：</font>

## <font style="background-color:rgba(255, 255, 255, 0.06)">4.1、 参与者（Actor）</font>
<font style="background-color:rgba(255, 255, 255, 0.06)">依状态观测量生成文本与动作，采取行动并接收观察结果，形成轨迹，添加记忆组件提供额外上下文。</font>

<font style="background-color:rgba(255, 255, 255, 0.06)">Actor 根据当前</font>**<font style="background-color:rgba(0, 0, 0, 0)">环境状态 / 观察到的信息</font>**<font style="background-color:rgba(255, 255, 255, 0.06)">来做两件事：1、生成</font>**<font style="background-color:rgba(0, 0, 0, 0)">文本 </font>**<font style="background-color:rgba(255, 255, 255, 0.06)">2、生成</font>**<font style="background-color:rgba(0, 0, 0, 0)">动作</font>**

+ <font style="background-color:rgba(0, 0, 0, 0)">Actor 执行动作 → 得到新的观察结果</font>
+ <font style="background-color:rgba(0, 0, 0, 0)">这一整段 “做动作 → 得结果” 的过程叫 </font>**<font style="background-color:rgba(0, 0, 0, 0)">轨迹（trajectory）</font>**
+ <font style="background-color:rgba(0, 0, 0, 0)">Actor 还带有</font>**<font style="background-color:rgba(0, 0, 0, 0)">记忆组件</font>**<font style="background-color:rgba(0, 0, 0, 0)">，用来存历史信息，给下一步提供上下文</font>

**<font style="background-color:rgba(0, 0, 0, 0)">它就是 “执行任务的主体”，只负责做事，不负责判断对错。</font>**

## <font style="background-color:rgba(0, 0, 0, 0)">4.2、</font><font style="background-color:rgba(255, 255, 255, 0.06)">评估者（Evaluator）</font>
<font style="background-color:rgba(255, 255, 255, 0.06)">评价参与者输出，将生成轨迹作为输入，依任务不同用不同奖励函数输出奖励分数。</font>

+ <font style="background-color:rgba(0, 0, 0, 0)">输入：Actor 生成的</font>**<font style="background-color:rgba(0, 0, 0, 0)">轨迹</font>**
+ <font style="background-color:rgba(0, 0, 0, 0)">功能：评价这段轨迹好不好</font>
+ <font style="background-color:rgba(0, 0, 0, 0)">输出：一个</font>**<font style="background-color:rgba(0, 0, 0, 0)">奖励分数（reward score）</font>**
+ <font style="background-color:rgba(0, 0, 0, 0)">特点：不同任务用不同的奖励函数</font>

**<font style="background-color:rgba(0, 0, 0, 0)">它只负责 “打分”，不说话、不解释、不生成语言。</font>**

<font style="background-color:rgba(255, 255, 255, 0.06)"></font>

## <font style="background-color:rgba(255, 255, 255, 0.06)">4.3、自我反思（Self - Reflection）</font>
<font style="background-color:rgba(255, 255, 255, 0.06)">由大语言模型担当，利用奖励信号、当前轨迹与持久记忆生成反馈，存于记忆组件，助智能体改进决策。关键步骤包括定义任务、生成轨迹、评估、执行自我反思、生成下一条轨迹。实验显示，自我反思能显著提升 AlfWorld 决策任务、HotPotQA 问题推理及 HumanEval 编程任务的性能。适合自我反思的情况有：智能体需从试错中学习；传统强化学习方法失效；需要细致反馈；可解释性和直接记忆重要。其在序列决策、推理、编程任务中有效。不过，它也存在依赖自我评估能力、长期记忆受限、代码生成受限等局限。</font>

+ <font style="background-color:rgba(0, 0, 0, 0)">由 </font>**<font style="background-color:rgba(0, 0, 0, 0)">LLM 本身</font>**<font style="background-color:rgba(0, 0, 0, 0)"> 担任</font>
+ <font style="background-color:rgba(0, 0, 0, 0)">输入三样东西：1、奖励分数（来自 Evaluator）2、当前轨迹（来自 Actor）3、持久记忆（历史信息）</font>
+ <font style="background-color:rgba(0, 0, 0, 0)">输出：</font>**<font style="background-color:rgba(0, 0, 0, 0)">自然语言形式的反馈</font>**
+ <font style="background-color:rgba(0, 0, 0, 0)">作用：把反馈存入记忆，让 Actor 下一次决策更好</font>

**<font style="background-color:rgba(0, 0, 0, 0)">这是整个框架最关键的一步：把 “数字分数” 翻译成 “LLM 能看懂的人话教训”。</font>**

<font style="background-color:rgba(255, 255, 255, 0.06)">“感知 - 行动 - 反思 - 学习”</font>

<img src="/prompt-assets/pt-05.png" width="939" title="" crop="0,0,1,1" id="HrBiv" class="ne-image">

上图中<font style="background-color:rgba(0, 0, 0, 0)">整体结构</font>

<font style="background-color:rgba(0, 0, 0, 0)">整个系统分为两大核心部分（上下）：</font>

+ **<font style="background-color:rgba(0, 0, 0, 0)">Agent（智能体）</font>**<font style="background-color:rgba(0, 0, 0, 0)">：包含决策、记忆、评估和反思的核心逻辑</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">Environment（环境）</font>**<font style="background-color:rgba(0, 0, 0, 0)">：智能体所处的外部世界，提供观察和反馈</font>
+ <font style="background-color:rgba(0, 0, 0, 0)">右下的 Actor (LM)，这是智能体的决策执行模块，由大语言模型驱动</font>

<font style="background-color:rgba(0, 0, 0, 0)">输入：短期记忆（Trajectory）、长期记忆（Experience）</font>

<font style="background-color:rgba(0, 0, 0, 0)">输出：</font><font style="background-color:rgba(0, 0, 0, 0)">Action（动作）</font><font style="background-color:rgba(0, 0, 0, 0)">，作用于外部环境</font>

+ <font style="background-color:rgba(0, 0, 0, 0)">左边 Trajectory (short-term memory)</font>

<font style="background-color:rgba(0, 0, 0, 0)">存储智能体与环境交互的</font><font style="background-color:rgba(0, 0, 0, 0)">短期轨迹</font><font style="background-color:rgba(0, 0, 0, 0)">，例如最近的观察、动作和反馈</font>

<font style="background-color:rgba(0, 0, 0, 0)">为 Actor 提供即时上下文，也为 Evaluator 提供评估素材</font>

+ <font style="background-color:rgba(0, 0, 0, 0)">轨道的上面 Evaluator (LM)，这是智能体的自我评估模块，由大语言模型驱动</font>

<font style="background-color:rgba(0, 0, 0, 0)">输入：短期轨迹（Trajectory）、环境的 Obs/Reward</font>

<font style="background-color:rgba(0, 0, 0, 0)">输出：</font><font style="background-color:rgba(0, 0, 0, 0)">Internal feedback（内部反馈）</font><font style="background-color:rgba(0, 0, 0, 0)">，用于自我反思</font>

+ <font style="background-color:rgba(0, 0, 0, 0)">agent 下面的 Self-reflection (LM)，这是智能体的自我反思模块，由大语言模型驱动</font>

<font style="background-color:rgba(0, 0, 0, 0)">输入：Evaluator 的内部反馈、环境的 External feedback</font>

<font style="background-color:rgba(0, 0, 0, 0)">输出：Reflective text（反思文本），沉淀为长期记忆</font>

+ <font style="background-color:rgba(0, 0, 0, 0)">另一个存储 Experience (long-term memory),存储智能体经过反思后的经验总结</font>

<font style="background-color:rgba(0, 0, 0, 0)">这些长期经验会被 Actor 调用，用于优化未来的决策</font>



![画板](/prompt-assets/pt-06.jpeg)

<font style="background-color:rgba(0, 0, 0, 0)">顺序就是：</font>

1. <font style="background-color:rgba(0, 0, 0, 0)">定义任务</font>
2. <font style="background-color:rgba(0, 0, 0, 0)">Actor 生成轨迹</font>
3. <font style="background-color:rgba(0, 0, 0, 0)">Evaluator 评估打分</font>
4. <font style="background-color:rgba(0, 0, 0, 0)">Self-Reflection 生成语言反思</font>
5. <font style="background-color:rgba(0, 0, 0, 0)">用反思信息，Actor 再生成下一条轨迹</font>

**<font style="background-color:rgba(0, 0, 0, 0)">循环往复，智能体越来越强。</font>**

<font style="background-color:rgba(0, 0, 0, 0)">完整交互流程</font>

1. **<font style="background-color:rgba(0, 0, 0, 0)">环境输入</font>**<font style="background-color:rgba(0, 0, 0, 0)">：Environment 向 Agent 发送 Observation（观察）和 Reward（奖励）</font>
2. **<font style="background-color:rgba(0, 0, 0, 0)">短期记忆更新</font>**<font style="background-color:rgba(0, 0, 0, 0)">：Trajectory 记录最新的交互数据</font>
3. **<font style="background-color:rgba(0, 0, 0, 0)">决策与行动</font>**<font style="background-color:rgba(0, 0, 0, 0)">：Actor 结合短期记忆和长期经验，生成 Action 并作用于环境</font>
4. **<font style="background-color:rgba(0, 0, 0, 0)">自我评估</font>**<font style="background-color:rgba(0, 0, 0, 0)">：Evaluator 基于短期轨迹和环境反馈，生成内部反馈</font>
5. **<font style="background-color:rgba(0, 0, 0, 0)">自我反思</font>**<font style="background-color:rgba(0, 0, 0, 0)">：Self-reflection 结合内部和外部反馈，生成反思文本</font>
6. **<font style="background-color:rgba(0, 0, 0, 0)">长期记忆沉淀</font>**<font style="background-color:rgba(0, 0, 0, 0)">：反思结果存入 Experience，用于未来决策优化</font>
7. **<font style="background-color:rgba(0, 0, 0, 0)">循环迭代</font>**<font style="background-color:rgba(0, 0, 0, 0)">：环境根据 Action 产生新的 Obs/Reward，开启下一轮循环</font>

<font style="background-color:rgba(0, 0, 0, 0)"></font>

<font style="background-color:rgba(0, 0, 0, 0)">关键在于</font>

+ **<font style="background-color:rgba(0, 0, 0, 0)">闭环学习</font>**<font style="background-color:rgba(0, 0, 0, 0)">：通过 “执行 - 评估 - 反思 - 沉淀” 的闭环，实现持续自我进化</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">双记忆系统</font>**<font style="background-color:rgba(0, 0, 0, 0)">：区分短期轨迹和长期经验，兼顾即时性和成长性</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">大模型驱动</font>**<font style="background-color:rgba(0, 0, 0, 0)">：所有核心功能（Actor/Evaluator/Self-reflection）都基于大语言模型，实现自然语言级别的推理和决策</font>

<font style="background-color:rgba(0, 0, 0, 0)"></font>

<font style="background-color:rgba(0, 0, 0, 0)"></font>

<font style="background-color:rgba(0, 0, 0, 0)">总的来说，自我反思的关键步骤是</font>

<font style="background-color:rgba(0, 0, 0, 0)">a、 定义任务，</font>

<font style="background-color:rgba(0, 0, 0, 0)">b、 生成轨迹，</font>

<font style="background-color:rgba(0, 0, 0, 0)">c、评估，</font>

<font style="background-color:rgba(0, 0, 0, 0)">d、执行自我反思，</font>

<font style="background-color:rgba(0, 0, 0, 0)">e、生成下一条轨迹。</font>

<font style="background-color:rgba(0, 0, 0, 0)"></font>

## <font style="background-color:rgba(0, 0, 0, 0)">4.4、示例</font>
<font style="background-color:rgba(0, 0, 0, 0)">下图展示了自我反思的智能体学习迭代优化其行为来解决决策、编程和推理等各种人物的例子。</font>

<font style="background-color:rgba(0, 0, 0, 0)">自我反思（Refelxion）通过引入自我评估、自我反思和记忆组件来拓展 ReAct 框架。</font>

<img src="/prompt-assets/pt-07.png" width="1286" title="" crop="0,0,1,1" id="rdFMi" class="ne-image">

<font style="background-color:rgba(0, 0, 0, 0)">整体框架逻辑</font>

<font style="background-color:rgba(0, 0, 0, 0)">图中三个任务（决策、编程、推理）都遵循了相同的五步迭代流程：</font>

+ **<font style="background-color:rgba(0, 0, 0, 0)">(a) Task</font>**<font style="background-color:rgba(0, 0, 0, 0)">：明确要解决的问题。</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">(b) Trajectory</font>**<font style="background-color:rgba(0, 0, 0, 0)">：模型的第一次尝试和执行路径。</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">(c) Evaluation</font>**<font style="background-color:rgba(0, 0, 0, 0)">：通过规则、启发式或环境反馈，评估首次尝试的结果。</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">(d) Reflection</font>**<font style="background-color:rgba(0, 0, 0, 0)">：分析失败原因，识别错误点。</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">(e) Next Trajectory</font>**<font style="background-color:rgba(0, 0, 0, 0)">：基于反思，生成修正后的执行路径，完成任务。</font>

<font style="background-color:rgba(0, 0, 0, 0)">分任务解读</font>

<font style="background-color:rgba(0, 0, 0, 0)">任务 1：决策（Decision making）</font>

+ **<font style="background-color:rgba(0, 0, 0, 0)">场景</font>**<font style="background-color:rgba(0, 0, 0, 0)">：清理平底锅并放到台面上。</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">首次失败</font>**<font style="background-color:rgba(0, 0, 0, 0)">：模型尝试从炉灶 1 取锅，但锅不在那里；又尝试在水槽 1 清洗，同样失败。</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">反思</font>**<font style="background-color:rgba(0, 0, 0, 0)">：发现锅的位置判断错误（实际在炉灶 2）。</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">修正后行动</font>**<font style="background-color:rgba(0, 0, 0, 0)">：改为从炉灶 2 取锅，并成功放到台面。</font>

<font style="background-color:rgba(0, 0, 0, 0)">任务 2：编程（Programming）</font>

+ **<font style="background-color:rgba(0, 0, 0, 0)">场景</font>**<font style="background-color:rgba(0, 0, 0, 0)">：判断括号字符串是否匹配。</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">首次失败</font>**<font style="background-color:rgba(0, 0, 0, 0)">：仅检查左右括号数量相等，未考虑括号的嵌套顺序。</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">反思</font>**<font style="background-color:rgba(0, 0, 0, 0)">：认识到顺序检查是关键，仅靠数量相等会误判。</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">修正后行动</font>**<font style="background-color:rgba(0, 0, 0, 0)">：新增对括号嵌套顺序的检查逻辑。</font>

<font style="background-color:rgba(0, 0, 0, 0)">任务 3：推理（Reasoning）</font>

+ **<font style="background-color:rgba(0, 0, 0, 0)">场景</font>**<font style="background-color:rgba(0, 0, 0, 0)">：找出两位作者共同的职业。</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">首次失败</font>**<font style="background-color:rgba(0, 0, 0, 0)">：错误假设两人有多个共同职业，导致答案包含 “编剧”（仅其中一人拥有该职业）。</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">反思</font>**<font style="background-color:rgba(0, 0, 0, 0)">：确认两人唯一的共同职业是 “小说家”。</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">修正后行动</font>**<font style="background-color:rgba(0, 0, 0, 0)">：输出准确的共同职业 “小说家”。</font>

---

<img src="/prompt-assets/pt-23.png" width="2732" title="" crop="0,0,1,1" id="ayQmz" class="ne-image">

<font style="background-color:rgba(0, 0, 0, 0)">这张总结揭示了当前大语言模型的一个重要能力突破：</font>**<font style="background-color:rgba(0, 0, 0, 0)">不再是单次生成结果，而是通过 “自我反思” 和多轮迭代，主动修正错误、优化输出</font>**<font style="background-color:rgba(0, 0, 0, 0)">。这种闭环机制极大提升了模型在复杂任务中的可靠性，也是迈向通用人工智能（AGI）的关键一步。</font>
