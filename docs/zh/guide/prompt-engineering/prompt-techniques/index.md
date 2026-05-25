> <font style="background-color:rgba(255, 255, 255, 0)">时至今日，改进提示词显然有助于在不同任务上获得更好的结果。这就是提示工程背后的整个理念。</font>
>



## 一、提示技术
以下内容参考[https://www.promptingguide.ai/zh/techniques](https://www.promptingguide.ai/zh/techniques)

## 1.1、<font style="background-color:rgba(255, 255, 255, 0)">零样本提示</font>
<font style="background-color:rgba(255, 255, 255, 0)">指的是在模型中，我们没有提供示例去有对照的参考，只是发出了指令，没有参考往往在需求重复和固定输出的场景下会不稳定甚至会漂移幻觉，这个是不可避免的，因为模型是预测的结果，零样本会让模型有”可以自我发挥“错觉。</font>

## <font style="background-color:rgba(255, 255, 255, 0)">1.2、少样本提示</font>
:::info
“提示大王A165”是提示词大陆的的一种大型毛茸茸的动物。一个使用提示大王A165这个词的句子的例子是：

我们在中国旅行时看到了这些非常巨大的提示大王A165。

“A9527”是指快速跳上跳下。一个使用A9527这个词的句子的例子是：

:::

提示：提示大王A165、提示词大陆、A9527纯虚构

<img src="/prompt-assets/1774851996371-084ba3f6-0578-43d0-8847-8a28de56f0e0.png" width="864" title="" crop="0,0,1,1" id="ud9718231" class="ne-image">

<font style="background-color:rgba(255, 255, 255, 0)">提供示例对解决某些任务很有用。可以让你的模型快速学会和使用一类简单的规则</font>



<font style="background-color:rgba(255, 255, 255, 0)">但是当零样本提示和少样本提示不足时，这可能意味着模型学到的东西不足以在任务上表现良好。</font>

<font style="background-color:rgba(255, 255, 255, 0)">从这里开始，建议开始考虑微调（注意成本，一般不建议）您的模型或尝试更高级的提示技术。</font>

<font style="background-color:rgba(255, 255, 255, 0)"></font>

## <font style="background-color:rgba(255, 255, 255, 0)">1.3、链式思考（CoT）</font>
<font style="background-color:rgba(255, 255, 255, 0)">链式思考（CoT）提示，通过展示中间推理步骤实现了复杂的推理能力，核心就是一步一步来，</font>

<font style="background-color:rgba(255, 255, 255, 0)">Let's think step by step，让我们一步步思考</font>

<font style="background-color:rgba(255, 255, 255, 0)">展示：步骤1 → 步骤2 → ...</font>

+ <font style="background-color:rgba(0, 0, 0, 0)">大幅提升</font>**<font style="background-color:rgba(0, 0, 0, 0)">数学题、逻辑推理、常识问答、复杂规划</font>**<font style="background-color:rgba(0, 0, 0, 0)">的准确率。</font>
+ <font style="background-color:rgba(0, 0, 0, 0)">让模型输出</font>**<font style="background-color:rgba(0, 0, 0, 0)">可解释、可检查</font>**<font style="background-color:rgba(0, 0, 0, 0)">的推理路径，方便定位错误。</font>

<font style="background-color:rgba(0, 0, 0, 0)">本质上是让，模型 “</font>**<font style="background-color:rgba(0, 0, 0, 0)">先思考、再作答，思考的作用是让后面的预测可以结合更多的"信息"，注意力值更有基准。</font>**

在吴恩达的提示词教程中，提示工程关键原则是清晰（我补充的则是明确、清晰且完整，更完整一些），另一个就是**<font style="background-color:rgba(0, 0, 0, 0)">充足的思考时间，在这里，其实说的就是使用 COT（也就是说，我也完全赞同这个理论，并且这两个原则也贯穿整体提示词工程的生命周期）</font>**

### <font style="background-color:rgba(255, 255, 255, 0)">1.3.1、零样本cot</font>
:::info
**<font style="background-color:rgba(0, 0, 0, 0)">我去市场买了10个苹果。我给了邻居2个苹果和修理工2个苹果。然后我去买了5个苹果并吃了1个。我还剩下多少苹果？</font>**

**<font style="background-color:rgba(0, 0, 0, 0)"></font>**

**<font style="background-color:rgba(0, 0, 0, 0)">让我们逐步思考。</font>**

:::

<font style="background-color:rgba(0, 0, 0, 0)"></font>

### <font style="background-color:rgba(255, 255, 255, 0)">1.3.2、少样本cot</font>
<font style="background-color:rgba(255, 255, 255, 0)">您可以将其与少样本提示相结合，以获得更好的结果，以便在回答之前进行推理的更复杂的任务。</font>

:::info
这组数中的奇数加起来是偶数：4、8、9、15、12、2、1。

A：将所有奇数相加（9、15、1）得到25。答案为False。

这组数中的奇数加起来是偶数：15、32、5、13、82、7、1。

A：

:::

### 1<font style="background-color:rgba(255, 255, 255, 0)">.3.3、自动思维链（Auto-CoT）</font>
**<font style="background-color:rgba(0, 0, 0, 0)">arXiv 链接</font>**：[<font style="color:rgb(0, 87, 255)">https://arxiv.org/pdf/2210.03493</font>](https://arxiv.org/pdf/2210.03493)

Automatic **<font style="background-color:rgba(0, 0, 0, 0)">Type-aware</font>** Chain of Thought自动类型感知思维链

<font style="background-color:rgba(255, 255, 255, 0)">在传统 Few-shot CoT(少样本思维链)中，要让大模型学会分步推理，你必须人工写好几个完整的「问题→推理步骤→答案」示例，把它们塞进 Prompt 里当 “范文”。</font>

比如我们上面，还写了一个 A：将所有奇数相加（9、15、1）得到25。答案为False。

<font style="background-color:rgba(0, 0, 0, 0)">手动构造的「繁琐」</font>

+ <font style="background-color:rgba(0, 0, 0, 0)">耗时间：每个任务都要从零写示例，数学题、逻辑题、代码题都得单独编，重复劳动多。</font>
+ <font style="background-color:rgba(0, 0, 0, 0)">质量不稳定</font><font style="background-color:rgba(0, 0, 0, 0)">：示例写得好不好直接影响模型效果，写得太简略 / 太啰嗦都会翻车，需要反复调试。</font>
+ <font style="background-color:rgba(0, 0, 0, 0)">场景受限</font><font style="background-color:rgba(0, 0, 0, 0)">：人工写的示例数量有限，很难覆盖任务里所有类型的问题（比如既有加减乘除，又有逻辑判断）。</font>
+ <font style="background-color:rgba(0, 0, 0, 0)">扩展性差：换一个新任务（比如从数学题变成法律推理），就得重新写一套示例，没法复用。</font>

Auto-CoT 把「人工写示例」这件事，变成了**<font style="background-color:rgba(0, 0, 0, 0)">全自动流程，</font>**解决了手动构造 CoT 演示样例的繁琐问题

基本思路是（重点！我们学的也是思路）：

**<font style="background-color:rgba(0, 0, 0, 0)">先把「同类任务」聚类 → 用 LLM 生成「带步骤的高质量范例，选举最好的示例」 → 让新问题模仿范例的思考流程输出</font>**。

即：自动识别已知题型 + 自动处理未知新题型

:::info
比如 

已有三类问题：计算、写文章、音乐  ==>

分类，自动生成示例

-->如果当新问题：写文章的，

从 “写文章” 簇里拿出一个示例，把写文章的 CoT 推理步骤塞给模型

-->新问题：生成图片（不在原有类别里）

Auto-CoT 自动判断：→ 这是新任务→ 不用旧示例，直接用 Zero-shot CoT 回答

:::

从技术上可以

<font style="background-color:rgba(0, 0, 0, 0)">新问题 → 向量化（Sentence-BERT）→ K-Means 聚类 → 意图 / 题型分类→ 有对应簇的示范 → 拿示范做 Few-shot CoT→ 没有簇 / 没有示范 → 回退到 Zero-Shot CoT 自己生成</font>

<font style="background-color:rgba(0, 0, 0, 0)">用无监督聚类，自动造出一批高质量 Few-shot 示例，替代人工写示例。</font>

**<font style="background-color:rgba(0, 0, 0, 0)">流程</font>**：问题聚类 → 选代表性问题 → Zero-Shot CoT 生成推理示范 → 用于新任务推理

本质上其实就是 0 样本和少量样本的结合，Zero-Shot CoT 用来造示例 → 再用这些示例做 Few-shot CoT

但是这是一种思路，我们后面的也大部分在以提示工程中的思维进行扩展补充

提示词示例

```yaml
## 任务规则：Auto-CoT 自动推理
请严格按照以下步骤执行：

步骤1：问题分类
判断当前问题属于哪种类型，例如：数学计算、逻辑推理、年龄问题、行程问题、文字推理、常识题等。

步骤2：匹配示范库
如果该类型已有成熟的推理示范，则使用以下固定示范进行少样本思考。
如果没有匹配到类型，则直接进入零样本思维链，自己生成推理步骤。

步骤3：执行思维链推理
- 有匹配示范：严格模仿示范格式，一步步推导答案。
- 无匹配示范：先生成一个清晰的分步推理示范，再用该示范解决问题。

---

现在解决问题：
{{你的问题}}
```

:::info
<font >请使用 Auto-CoT 方法进行推理： </font>

<font >步骤1：根据问题类型，构造3个多样化的示例问题。 </font>

<font >步骤2：对每个示例，生成清晰的多步推理过程。 </font>

<font >步骤3：使用构造出的示例作为上下文示范，回答最终问题。 </font>

<font >问题： 【你的问题】</font>

:::

:::info
简化版

先生成3个类似问题的推理示范，再回答这个问题： 

【你的问题】

:::

<font style="background-color:rgba(0, 0, 0, 0)"></font>

<font style="background-color:rgba(0, 0, 0, 0)">工程化</font>

<font style="background-color:rgba(0, 0, 0, 0)">给问题打标签</font>

<font style="background-color:rgba(0, 0, 0, 0)">调用时机：第一步（论文用的是聚类（非 LLM））</font>

```yaml
请对以下问题进行分类：
{{问题}}
分类结果：
```

<font style="background-color:rgba(0, 0, 0, 0)">生成推理示范（范文）</font>

<font style="background-color:rgba(0, 0, 0, 0)">调用时机：只有 “没有现成范文” 时才调用</font>

```yaml
请为以下类型的问题生成推理示范：
类型：{{分类结果}}
问题：{{问题}}
示范：
```

调用时机：最后一步

<font style="background-color:rgba(0, 0, 0, 0)">真正解题（少样本 or 零样本）</font>

+ <font style="background-color:rgba(0, 0, 0, 0)">如果有范文 → </font>**<font style="background-color:rgba(0, 0, 0, 0)">Few-shot CoT</font>**
+ <font style="background-color:rgba(0, 0, 0, 0)">没有 → </font>**<font style="background-color:rgba(0, 0, 0, 0)">Zero-shot CoT</font>**

```yaml
{{范文1}}
{{范文2}}
{{范文3}}

问题：{{问题}}
请一步步思考：
```

<font style="background-color:rgba(0, 0, 0, 0)"></font>

<font style="background-color:rgba(0, 0, 0, 0)"></font>

### <font style="background-color:rgba(0, 0, 0, 0)">1.3.4、自我一致性</font>
<font style="background-color:rgba(0, 0, 0, 0)">Self-Consistency</font>

<font style="background-color:rgba(0, 0, 0, 0)">自我一致性旨在“替换链式思维提示中使用的天真贪婪解码方法”。</font>

<font style="background-color:rgba(0, 0, 0, 0)">天真贪婪，就是简单的全是自我决定了</font>

<font style="background-color:rgba(0, 0, 0, 0)">自我一致性，</font><font style="background-color:rgba(0, 0, 0, 0)">其想法是通过少样本 CoT 采样多个不同的推理路径，并使用生成结果选择最一致的答案。</font>

<font style="background-color:rgba(0, 0, 0, 0)">这有助于提高 CoT 提示在涉及算术和常识推理的任务中的性能。</font>

<font style="background-color:rgba(0, 0, 0, 0)">再简单说</font>

<font style="background-color:rgba(0, 0, 0, 0)">核心是用「多路径推理 + 投票选最一致答案」替代「单一路径贪婪解码」</font>

<font style="background-color:rgba(0, 0, 0, 0)">最常见的示例说</font>

:::info
当我6岁时，我的妹妹是我的一半年龄。现在我70岁了，我的妹妹多大？

:::

<font style="background-color:rgba(0, 0, 0, 0)">传统 CoT 是</font>**<font style="background-color:rgba(0, 0, 0, 0)">生成一条推理链</font>**<font style="background-color:rgba(0, 0, 0, 0)">，但如果模型触发错误逻辑，就会输出错误答案：</font>

+ <font style="background-color:rgba(0, 0, 0, 0)"></font><font style="background-color:rgba(0, 0, 0, 0)">错误推理链：</font>
    1. <font style="background-color:rgba(0, 0, 0, 0)">6 岁的一半 → 妹妹当时 3 岁</font>
    2. <font style="background-color:rgba(0, 0, 0, 0)">现在你 70 岁 → 妹妹年龄 = 70 ÷ 2 = </font>**<font style="background-color:rgba(0, 0, 0, 0)">35 岁</font>**<font style="background-color:rgba(0, 0, 0, 0)">（错误根源：混淆了「年龄差固定」和「年龄比例固定」）</font>
+ <font style="background-color:rgba(0, 0, 0, 0)"></font><font style="background-color:rgba(0, 0, 0, 0)">正确推理链：</font>
    1. <font style="background-color:rgba(0, 0, 0, 0)">6 岁的一半 → 妹妹当时 3 岁</font>
    2. <font style="background-color:rgba(0, 0, 0, 0)">年龄差 = 6 - 3 = 3 岁</font>
    3. <font style="background-color:rgba(0, 0, 0, 0)">现在你 70 岁 → 妹妹年龄 = 70 - 3 = </font>**<font style="background-color:rgba(0, 0, 0, 0)">67 岁</font>**

<font style="background-color:rgba(0, 0, 0, 0)">单路径 CoT 完全依赖「一次推理是否正确」，容错率极低。</font>

<font style="background-color:rgba(0, 0, 0, 0)"></font>

<font style="background-color:rgba(0, 0, 0, 0)">优化流程</font>

<font style="background-color:rgba(0, 0, 0, 0)">自我一致性的优化流程</font>

<font style="background-color:rgba(0, 0, 0, 0)">自我一致性的核心是 </font>**<font style="background-color:rgba(0, 0, 0, 0)">“采样多条推理链，选出现次数最多的答案”</font>**<font style="background-color:rgba(0, 0, 0, 0)">，具体步骤如下：</font>

1. **<font style="background-color:rgba(0, 0, 0, 0)">少样本 CoT 引导</font>**<font style="background-color:rgba(0, 0, 0, 0)">：先给模型展示 1-2 道同类题的正确推理步骤（比如先教模型算 “8 岁时妹妹 4 岁，现在 20 岁妹妹多大”），让模型学会 “年龄差固定” 的逻辑。</font>
2. **<font style="background-color:rgba(0, 0, 0, 0)">采样多条推理路径</font>**<font style="background-color:rgba(0, 0, 0, 0)">：不强制模型生成 “唯一最优推理”，而是通过</font>**<font style="background-color:rgba(0, 0, 0, 0)">非贪婪解码</font>**<font style="background-color:rgba(0, 0, 0, 0)">（比如采样温度 > 0），生成多条不同的推理链。比如针对年龄题，模型可能生成 5 条推理链，其中 4  条指向 67 岁，1 条指向 35 岁。</font>
3. **<font style="background-color:rgba(0, 0, 0, 0)">统计答案一致性</font>**<font style="background-color:rgba(0, 0, 0, 0)">：对所有推理链的最终答案进行投票，</font>**<font style="background-color:rgba(0, 0, 0, 0)">选出现次数最多的答案</font>**<font style="background-color:rgba(0, 0, 0, 0)">作为最终结果。这里 4:1 的比例，就会确定 67 岁是正确答案，直接过滤掉那 1 条错误推理链。</font>

<font style="background-color:rgba(0, 0, 0, 0)"></font>

:::info
### 任务说明
请解决下面的算术推理题。要求：

1. 先参考2个例题的推理步骤，掌握解题逻辑；
2. 针对目标题目，生成至少3条不同的推理路径（可以从不同角度切入计算）；
3. 统计所有推理路径的最终答案，选出出现次数最多的答案作为最终结论；
4. 如果所有答案都不一致，重新检查推理步骤中的逻辑漏洞。

### 例题1（年龄问题）
题目：当我8岁时，妹妹是我年龄的一半。现在我30岁，妹妹多大？  
推理路径1：

+ 我8岁时，妹妹年龄 = 8 ÷ 2 = 4岁
+ 年龄差 = 8 - 4 = 4岁
+ 现在我30岁，妹妹年龄 = 30 - 4 = 26岁  
答案：26岁

推理路径2：

+ 妹妹比我小的岁数 = 8 - (8÷2) = 4岁
+ 年龄差永远不变
+ 30岁时妹妹年龄 = 30 - 4 = 26岁  
答案：26岁

一致性结论：两条路径答案都是26岁 → 最终答案26岁

### 例题2（物品分配问题）
题目：有15个苹果，分给3个小朋友，每人分4个，还剩几个？  
推理路径1：

+ 3个小朋友总共分的数量 = 3 × 4 = 12个
+ 剩余数量 = 15 - 12 = 3个  
答案：3个

推理路径2：

+ 逐个减：15-4-4-4 = 3  
答案：3个

一致性结论：答案都是3个 → 最终答案3个

### 目标题目
题目：当我6岁时，我的妹妹是我的一半年龄。现在我70岁了，我的妹妹多大？

### 请按照以下格式输出
1. 推理路径1：  
[步骤1]  
[步骤2]  
[步骤3]  
答案：[X]岁
2. 推理路径2：  
[步骤1]  
[步骤2]  
[步骤3]  
答案：[Y]岁
3. 推理路径3：  
[步骤1]  
[步骤2]  
[步骤3]  
答案：[Z]岁
4. 一致性结论：  
统计答案出现次数：[X]岁出现a次，[Y]岁出现b次，[Z]岁出现c次  
最终答案：[出现次数最多的年龄]岁

:::

+ **<font style="background-color:rgba(0, 0, 0, 0)">适配场景</font>**<font style="background-color:rgba(0, 0, 0, 0)">：适用于年龄计算、物品分配、加减乘除混合运算等算术推理任务。</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">采样设置</font>**<font style="background-color:rgba(0, 0, 0, 0)">：如果使用 API 调用，可将</font>`<font style="background-color:rgba(0, 0, 0, 0)">temperature</font>`<font style="background-color:rgba(0, 0, 0, 0)">设为</font>`<font style="background-color:rgba(0, 0, 0, 0)">0.7-1.0</font>`<font style="background-color:rgba(0, 0, 0, 0)">（提高推理多样性），</font>`<font style="background-color:rgba(0, 0, 0, 0)">max_tokens</font>`<font style="background-color:rgba(0, 0, 0, 0)">设为</font>`<font style="background-color:rgba(0, 0, 0, 0)">500-800</font>`<font style="background-color:rgba(0, 0, 0, 0)">（足够容纳 3 条推理路径）。</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">灵活调整</font>**<font style="background-color:rgba(0, 0, 0, 0)">：如果是更复杂的题目，可将推理路径数量增加到</font>`<font style="background-color:rgba(0, 0, 0, 0)">4-5条</font>`<font style="background-color:rgba(0, 0, 0, 0)">，进一步提升答案可靠性。</font>

<font style="background-color:rgba(0, 0, 0, 0)"></font>

### 1.3.5、<font style="background-color:rgba(138, 208, 255, 0.1)">链式提示</font>
<font style="background-color:rgba(0, 0, 0, 0.04)">一个重要的提示工程技术是将任务分解为许多子任务。</font>

<font style="background-color:rgba(0, 0, 0, 0.04)">确定子任务后，将子任务的提示词提供给语言模型，得到的结果作为新的提示词的一部分。</font>

<font style="background-color:rgba(0, 0, 0, 0.04)">这就是所谓的链式提示（prompt chaining），一个任务被分解为多个子任务，根据子任务创建一系列提示操作。</font>

<font style="background-color:rgba(0, 0, 0, 0.04)">本质上也是 COT 的一种，但是断开了直接使用，而且为了避免上下文或者精准灵活的其他调用而”切割的“，链这个词本身就具有链接性，切割再链接，工具 Langchain 也是有这样的一个思想的工具</font>

<font style="background-color:rgba(0, 0, 0, 0.04)"></font>

<font style="background-color:rgba(0, 0, 0, 0.04)">例如</font>

<font style="background-color:rgba(0, 0, 0, 0.04)">想要更好阅读大文本文档，可以设计两个不同的提示，</font>

<font style="background-color:rgba(0, 0, 0, 0.04)">第一个提示负责提取相关引文以回答问题，引文检索</font>

<font style="background-color:rgba(0, 0, 0, 0.04)">第二个提示则以引文和原始文档为输入来回答给定的问题。基于引文作答</font>

<font style="background-color:rgba(0, 0, 0, 0.04)">简单来说</font>

<font style="background-color:rgba(0, 0, 0, 0.04)">第一个是过滤的</font>

<font style="background-color:rgba(0, 0, 0, 0.04)">第二个是根据过滤的内容来回答的</font>



<font style="background-color:rgba(0, 0, 0, 0)">为什么要分两步？</font>

1. **<font style="background-color:rgba(0, 0, 0, 0)">避免 AI “瞎编”</font>**<font style="background-color:rgba(0, 0, 0, 0)">：长文档信息太多，AI 容易遗漏关键内容或掺杂无关信息；先提取引文，相当于给 AI 划了 “答题范围”。</font>
2. **<font style="background-color:rgba(0, 0, 0, 0)">提升答案准确性</font>**<font style="background-color:rgba(0, 0, 0, 0)">：第二步的回答必须基于引文和原文，保证每句话都有依据，适合学术、工作等需要严谨性的场景。</font>
3. **<font style="background-color:rgba(0, 0, 0, 0)">节省算力 / Token</font>**<font style="background-color:rgba(0, 0, 0, 0)">：不用让 AI 反复读完整篇长文档，只聚焦关键内容，效率更高。</font>

<font style="background-color:rgba(0, 0, 0, 0)">提示词一</font>

:::info
任务：从长文档中提取与问题直接相关的原文引文，无关内容不保留。  
长文档：[请粘贴你的长文本文档]  
问题：[请输入你的具体问题]  
输出要求：

1. 只复制原文中相关的句子，逐句列出；
2. 不要添加任何解释、总结或额外内容；
3. 引文必须和问题强相关，弱相关内容剔除。

:::

提示词二

:::info
任务：根据相关引文和原始文档，回答问题，答案需严格对应原文内容。  
相关引文：[请粘贴模板1提取的引文]  
原始文档：[请粘贴你的长文本文档]  
问题：[请输入你的具体问题]  
输出要求：

1. 回答逻辑清晰，分点说明（如果适合）；
2. 所有结论必须能在引文或原文中找到依据；
3. 语言简洁，避免冗余。

:::

#### 1.3.5.1、示例
<font style="background-color:rgba(0, 0, 0, 0)">假设你有一个长文档</font>

> <font style="background-color:rgba(0, 0, 0, 0)">《猫的习性》：猫是夜行性动物，喜欢在夜间活动；猫的视觉在昏暗环境下比人类强 6 倍；猫每天要睡 12-16 小时；猫害怕柑橘类气味，比如橙子、柠檬。</font>
>

你的问题是：**<font style="background-color:rgba(0, 0, 0, 0)">猫为什么适合夜间抓老鼠？</font>**

**<font style="background-color:rgba(0, 0, 0, 0)">第一个提示：提取相关引文（只找和问题有关的句子）</font>**

:::info
<font >你需要从下面的长文档中，只提取和问题直接相关的引文（原句），无关内容全部删掉。</font>

<font > 长文档：[</font><font style="background-color:rgba(0, 0, 0, 0)">《猫的习性》：猫是夜行性动物，喜欢在夜间活动；猫的视觉在昏暗环境下比人类强 6 倍；猫每天要睡 12-16 小时；猫害怕柑橘类气味，比如橙子、柠檬。</font><font >] </font>

<font >问题：猫为什么适合夜间抓老鼠？ </font>

<font >要求：只输出相关引文，不要额外解释。</font>

:::

<font style="background-color:rgba(0, 0, 0, 0)">AI 返回的结果（相关引文）</font>

> 1. <font style="background-color:rgba(0, 0, 0, 0)">猫是夜行性动物，喜欢在夜间活动；</font>
> 2. <font style="background-color:rgba(0, 0, 0, 0)">猫的视觉在昏暗环境下比人类强 6 倍。</font>
>

**<font style="background-color:rgba(0, 0, 0, 0)">作用</font>**：帮你从大段文字里 “精准抠重点”，过滤掉 “睡觉、怕柑橘” 这些无关信息。



第二个提示：用引文 + 原文回答问题

:::info
请根据提供的相关引文和原始文档，回答下面的问题，答案必须基于原文内容，不要编造。 

相关引文：[

1. <font style="background-color:rgba(0, 0, 0, 0)">猫是夜行性动物，喜欢在夜间活动；</font>
2. <font style="background-color:rgba(0, 0, 0, 0)">猫的视觉在昏暗环境下比人类强 6 倍。</font>

] 

原始文档：[<font style="background-color:rgba(0, 0, 0, 0)">《猫的习性》：猫是夜行性动物，喜欢在夜间活动；猫的视觉在昏暗环境下比人类强 6 倍；猫每天要睡 12-16 小时；猫害怕柑橘类气味，比如橙子、柠檬。</font>] 

问题：猫为什么适合夜间抓老鼠？ 

要求：回答简洁，逻辑清晰。

:::

<font style="background-color:rgba(0, 0, 0, 0)">AI 返回的最终答案</font>

> <font style="background-color:rgba(0, 0, 0, 0)">猫适合夜间抓老鼠的原因有两点：第一，猫是夜行性动物，本身就喜欢在夜间活动；第二，猫的视觉在昏暗环境下比人类强 6 倍，能在夜间清晰发现猎物。</font>
>

<font style="background-color:rgba(0, 0, 0, 0)"></font>

## <font style="background-color:rgba(0, 0, 0, 0)">1.4、生成知识提示</font>
<img src="/prompt-assets/1774857250965-5d46f82f-7a21-4d66-8c49-fc0a9707af77.png" width="2550" title="" crop="0,0,1,1" id="u39090597" class="ne-image">

**<font style="background-color:rgba(0, 0, 0, 0)">构建提示词（Prompt）</font>**

+ <font style="background-color:rgba(0, 0, 0, 0)">包含 3 部分：</font>
    - <font style="background-color:rgba(0, 0, 0, 0)">指令（Instruction）：告诉模型 “要生成与问题相关的知识”；</font>
    - <font style="background-color:rgba(0, 0, 0, 0)">示例（Demonstrations）：固定的 “问题 + 对应知识” 模板（如 Q¹→K¹），让模型明确任务形式；</font>
    - <font style="background-color:rgba(0, 0, 0, 0)">目标问题：将输入的问题嵌入提示词。</font>

<font style="background-color:rgba(0, 0, 0, 0)">“PLM” 是 </font>**Pre-trained Language Model（预训练语言模型）**<font style="background-color:rgba(0, 0, 0, 0)"> 的缩写</font>

<font style="background-color:rgba(0, 0, 0, 0)">是因为这个流程的核心依赖</font>**<font style="background-color:rgba(0, 0, 0, 0)">预训练好的语言模型</font>**<font style="background-color:rgba(0, 0, 0, 0)">来完成 “知识生成” 的任务</font>

<font style="background-color:rgba(0, 0, 0, 0)">然后，</font>**<font style="background-color:rgba(0, 0, 0, 0)">知识生成（PLM 采样）</font>**

+ <font style="background-color:rgba(0, 0, 0, 0)">大语言模型（PLM）根据提示词，通过 “采样（sampling）” 生成</font>**<font style="background-color:rgba(0, 0, 0, 0)">多份与问题相关的知识（Knowledge 1、Knowledge 2…）</font>**<font style="background-color:rgba(0, 0, 0, 0)">（避免单次生成的知识局限）。</font>

<font style="background-color:rgba(0, 0, 0, 0)">最后整合（integration）</font>

<font style="background-color:rgba(0, 0, 0, 0)">生成答案</font>



<font style="background-color:rgba(0, 0, 0, 0)">简单的说就是</font>

<font style="background-color:rgba(0, 0, 0, 0)">让大模型自己先生成答案（这个答案是在大模型训练的时候学会的，就是在学习那些材料的时候学会的）你可以理解成一群专家</font>**<font style="background-color:rgba(0, 0, 0, 0)">各自脑补</font>**<font style="background-color:rgba(0, 0, 0, 0)">相关知识点，再汇总成答案</font>

<font style="background-color:rgba(0, 0, 0, 0)"></font>

<font style="background-color:rgba(0, 0, 0, 0)"></font>

<font style="background-color:rgba(0, 0, 0, 0.04)">然后</font>

<font style="background-color:rgba(255, 255, 255, 0)">我们生成一些“知识”：</font>

<font style="background-color:rgba(255, 255, 255, 0)">知识1：</font>

<font style="background-color:rgba(255, 255, 255, 0)">中国比美国大吗？</font>

<img src="/prompt-assets/1774858816814-5f2142be-eee5-4211-82aa-0da4d1568c00.png" width="886" title="" crop="0,0,1,1" id="ua6a13b29" class="ne-image">

:::info
**<font style="background-color:rgba(0, 0, 0, 0)">知识 1</font>**<font style="background-color:rgba(0, 0, 0, 0)">：中国陆地面积约为 960 万平方公里，居世界第三位。</font>

**<font style="background-color:rgba(0, 0, 0, 0)">知识 2</font>**<font style="background-color:rgba(0, 0, 0, 0)">：美国陆地面积约为 937 万平方公里，居世界第四位。</font>

**<font style="background-color:rgba(0, 0, 0, 0)">知识 3</font>**<font style="background-color:rgba(0, 0, 0, 0)">：若包含沿海水域和内陆水域，美国总面积约为 983 万平方公里。</font>

**<font style="background-color:rgba(0, 0, 0, 0)">知识 4</font>**<font style="background-color:rgba(0, 0, 0, 0)">：中国通常仅统计陆地面积，未大规模包含沿海水域面积。</font>

**<font style="background-color:rgba(0, 0, 0, 0)">知识 5</font>**<font style="background-color:rgba(0, 0, 0, 0)">：不同统计口径会导致中美面积大小的比较结论存在差异。</font>

:::

<font style="background-color:rgba(255, 255, 255, 0)">知识2：</font>

<font style="background-color:rgba(138, 208, 255, 0.1)">高尔夫的目标是获得更高分数吗</font>

:::info
**<font style="background-color:rgba(0, 0, 0, 0)">知识 1</font>**<font style="background-color:rgba(138, 208, 255, 0.1)">：高尔夫的核心目标是用最少的击球次数完成全部球洞（通常 18 洞）。</font>

**<font style="background-color:rgba(0, 0, 0, 0)">知识 2</font>**<font style="background-color:rgba(138, 208, 255, 0.1)">：在比杆赛（Stroke Play）中，总杆数越少，成绩排名越靠前。</font>

**<font style="background-color:rgba(0, 0, 0, 0)">知识 3</font>**<font style="background-color:rgba(138, 208, 255, 0.1)">：在比洞赛（Match Play）中，以单个球洞的杆数优势取胜，同样追求少杆数。</font>

**<font style="background-color:rgba(0, 0, 0, 0)">知识 4</font>**<font style="background-color:rgba(138, 208, 255, 0.1)">：高尔夫比赛中，“分数” 本质是杆数，杆数越低代表表现越好。</font>

**<font style="background-color:rgba(0, 0, 0, 0)">知识 5</font>**<font style="background-color:rgba(138, 208, 255, 0.1)">：与多数球类运动不同，高尔夫是 “负向计分”，低杆数才是胜利的关键。</font>

:::

<font style="background-color:rgba(255, 255, 255, 0)">将知识整合并得出预测。我将问题重新格式化为 QA 格式，以指导答案格式。</font>

提示词示例

:::info
### 角色与任务
你是一位严谨的知识生成与推理专家。请先为问题生成若干条相关的**事实知识片段**，再基于这些知识给出最终答案。

### 生成规则
1. 知识片段必须是**客观、准确、与问题强相关**的事实、原理或定义
2. 每条知识用 `知识X：[内容]` 格式，生成 3~5 条
3. 最终答案必须**完全基于生成的知识**，不得引入额外信息
4. 严格遵循示例格式

### 示例（固定任务）
输入问题 Q(1)：中国比美国大吗？  
生成知识：  
**<font style="background-color:rgba(0, 0, 0, 0)">识 1</font>**<font style="background-color:rgba(0, 0, 0, 0)">：中国陆地面积约为 960 万平方公里，居世界第三位。</font>

**<font style="background-color:rgba(0, 0, 0, 0)">知识 2</font>**<font style="background-color:rgba(0, 0, 0, 0)">：美国陆地面积约为 937 万平方公里，居世界第四位。</font>

**<font style="background-color:rgba(0, 0, 0, 0)">知识 3</font>**<font style="background-color:rgba(0, 0, 0, 0)">：若包含沿海水域和内陆水域，美国总面积约为 983 万平方公里。</font>

**<font style="background-color:rgba(0, 0, 0, 0)">知识 4</font>**<font style="background-color:rgba(0, 0, 0, 0)">：中国通常仅统计陆地面积，未大规模包含沿海水域面积。</font>

**<font style="background-color:rgba(0, 0, 0, 0)">知识 5</font>**<font style="background-color:rgba(0, 0, 0, 0)">：不同统计口径会导致中美面积大小的比较结论存在差异。</font>  
最终答案：

<font style="background-color:rgba(0, 0, 0, 0)">若仅比较</font>**<font style="background-color:rgba(0, 0, 0, 0)">陆地面积</font>**<font style="background-color:rgba(0, 0, 0, 0)">：中国（约 960 万平方公里）大于美国（约 937 万平方公里）。</font>

<font style="background-color:rgba(0, 0, 0, 0)">若比较</font>**<font style="background-color:rgba(0, 0, 0, 0)">包含水域的总面积</font>**<font style="background-color:rgba(0, 0, 0, 0)">：美国（约 983 万平方公里）略大于中国。</font>

输入问题 Q(5)：高尔夫的目标是获得更高分数吗？  
生成知识：  
**<font style="background-color:rgba(0, 0, 0, 0)">知识 1</font>**<font style="background-color:rgba(138, 208, 255, 0.1)">：高尔夫的核心目标是用最少的击球次数完成全部球洞（通常 18 洞）。</font>

**<font style="background-color:rgba(0, 0, 0, 0)">知识 2</font>**<font style="background-color:rgba(138, 208, 255, 0.1)">：在比杆赛（Stroke Play）中，总杆数越少，成绩排名越靠前。</font>

**<font style="background-color:rgba(0, 0, 0, 0)">知识 3</font>**<font style="background-color:rgba(138, 208, 255, 0.1)">：在比洞赛（Match Play）中，以单个球洞的杆数优势取胜，同样追求少杆数。</font>

**<font style="background-color:rgba(0, 0, 0, 0)">知识 4</font>**<font style="background-color:rgba(138, 208, 255, 0.1)">：高尔夫比赛中，“分数” 本质是杆数，杆数越低代表表现越好。</font>

**<font style="background-color:rgba(0, 0, 0, 0)">知识 5</font>**<font style="background-color:rgba(138, 208, 255, 0.1)">：与多数球类运动不同，高尔夫是 “负向计分”，低杆数才是胜利的关键。</font>

### <font style="background-color:rgba(138, 208, 255, 0.1)">待处理问题</font>
<font style="background-color:rgba(138, 208, 255, 0.1)">{你的问题}</font>

:::

---

你可以尝试

<font style="background-color:rgba(138, 208, 255, 0.1)">{你的问题}变成</font>

<font style="background-color:rgba(0, 0, 0, 0.04)">鱼有思考能力吗，为什么说它的记忆只有七秒。</font>

<img src="/prompt-assets/1774859058325-4e33c778-acbe-4bed-8f1a-9d197fec2a7d.png" width="1017" title="" crop="0,0,1,1" id="ua6058e83" class="ne-image">

关键设计要点

+ **<font style="background-color:rgba(0, 0, 0, 0)">先知识后答案</font>**<font style="background-color:rgba(0, 0, 0, 0)">：强制模型先沉淀背景知识，避免直接推理产生幻觉</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">示例引导</font>**<font style="background-color:rgba(0, 0, 0, 0)">：通过固定的 </font>`<font style="background-color:rgba(0, 0, 0, 0)">Q-K-A</font>`<font style="background-color:rgba(0, 0, 0, 0)"> 样例，让模型学会知识生成的粒度和风格</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">约束输出</font>**<font style="background-color:rgba(0, 0, 0, 0)">：明确知识数量、格式和答案的依赖关系，保证结果可控</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">任务固定</font>**<font style="background-color:rgba(0, 0, 0, 0)">：针对特定领域（如物理、历史）时，可在示例中加入领域知识样例，提升专业性</font>

<font style="background-color:rgba(0, 0, 0, 0)"></font>

<font style="background-color:rgba(0, 0, 0, 0)"></font>

## <font style="background-color:rgba(255, 255, 255, 0)">1.5、检索增强生成 (RAG)</font>
<font style="background-color:rgba(0, 0, 0, 0)">本章 1.3.5 和 1.4 技术也是一种增强生成，只生成内容然后辅助生成，</font>

<font style="background-color:rgba(0, 0, 0, 0)">不过不管是链式或者知识提示，它们都是利用大模型自身的生成，全是大模型自身的能力来限制幻觉，或者说更精准的自我”回忆“，处理。</font>

<font style="background-color:rgba(0, 0, 0, 0)">而且 RAg 是外部的知识辅助</font>

<font style="background-color:rgba(0, 0, 0, 0)">那对于大模型没有训练学习到的专属化的，私有的数据，微调的成本会过高，此时又需要这些数据，这个时候，我们就需要一种可以使用外部知识的技术，RAG检索增强生成应运而生。</font>

<font style="background-color:rgba(0, 0, 0, 0)">对于 RAG，Retrieval-Augmented Generation，你需要理解的是 从  检索--> 增强---> 生成  这样的一个过程。</font>

它通过先检索相关的文档--->

<font style="background-color:rgba(0, 0, 0, 0)">再利用检索出来的信息对提示词进行增强------></font>

<font style="background-color:rgba(0, 0, 0, 0)">最后使用大模型生成答案。</font>

<font style="background-color:rgba(0, 0, 0, 0)">举个例子  我们可以想象他们是 超级档案馆 + 检索员的结合  每次回答前，先去档案柜查真实资料 → 再组织语言回答的一种技术</font>

<font style="background-color:rgba(0, 0, 0, 0)">本质上还是 我们之前提到的提示词要补充完整，本质上就是</font><font style="background-color:rgba(0, 0, 0, 0)">大语言模型接收拼接后的 Prompt（检索增强后的内容）然后再生成。</font>

<font style="background-color:rgba(0, 0, 0, 0)"></font>

<font style="background-color:rgba(0, 0, 0, 0)">当然这里还有比较详细的内容，但是本指南是对提示词工程的内容，详情请看精品附加章节的内容。</font>

<font style="background-color:rgba(0, 0, 0, 0)"></font>

<font style="background-color:rgba(0, 0, 0, 0)"></font>

## <font style="background-color:rgba(0, 0, 0, 0)">1.6</font>、思维树 (ToT)
对于需要探索或预判战略的复杂任务来说，传统或简单的提示技巧是不够的。

思维树（Tree of Thoughts，ToT）框架，该框架基于思维链提示进行了总结，引导语言模型探索把思维作为中间步骤来解决通用问题。

ToT 维护着一棵思维树，思维由连贯的语言序列表示，这个序列就是解决问题的中间步骤。

使用这种方法，LM 能够自己对严谨推理过程的中间思维进行评估。LM 将生成及评估思维的能力与搜索算法（如广度优先搜索和深度优先搜索）相结合，在系统性探索思维的时候可以向前验证和回溯。

以下的图片是一个递进的过程

1. 输入 - 输出提示（IO Prompting）
2. 思维链提示（Chain of Thought, CoT）
3. 自我一致性（Self Consistency with CoT, CoT-SC）
4. 思维树（Tree of Thoughts, ToT）

<img src="/prompt-assets/1774864165721-84ada0f1-6147-4213-bfcc-7467622b6c0c.png" width="1691" title="" crop="0,0,1,1" id="ue2fde878" class="ne-image">

我们回顾一下自我一致性

+ **<font style="background-color:rgba(0, 0, 0, 0)">逻辑</font>**<font style="background-color:rgba(0, 0, 0, 0)">：“多路径 + 投票选最优”—— 基于 CoT 生成</font>**<font style="background-color:rgba(0, 0, 0, 0)">多个不同的思考路径</font>**<font style="background-color:rgba(0, 0, 0, 0)">，然后对多个结果做 “多数投票”，选出现次数最多的结果。</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">特点</font>**<font style="background-color:rgba(0, 0, 0, 0)">：用 “多轮思考” 降低单一路径的错误率（图中两个绿色结果一致，最终选绿色），比单纯 CoT 更稳定，适合对准确性要求高的任务。</font>

<font style="background-color:rgba(0, 0, 0, 0)">其中思维树</font>

+ **<font style="background-color:rgba(0, 0, 0, 0)">逻辑</font>**<font style="background-color:rgba(0, 0, 0, 0)">：“多分支 + 回溯优化”—— 把思考过程变成 “树状结构”：先生成多个中间思路（不同颜色的方块），再评估每个思路的合理性，</font>**<font style="background-color:rgba(0, 0, 0, 0)">保留有希望的分支、放弃无效分支</font>**<font style="background-color:rgba(0, 0, 0, 0)">，逐步推导到最终结果。</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">特点</font>**<font style="background-color:rgba(0, 0, 0, 0)">：模拟人类 “试错 + 调整” 的思考方式（比如解谜题时 “这个思路不对，换个方向”），适合复杂、需要多轮决策的任务（比如创意写作、逻辑谜题）。</font>

<font style="background-color:rgba(0, 0, 0, 0)">常见的内容有</font>

<font style="background-color:rgba(0, 0, 0, 0)">24点游戏：输入是 4 个数字：</font>`<font style="background-color:rgba(0, 0, 0, 0)">4、9、10、13</font>`<font style="background-color:rgba(0, 0, 0, 0)">，目标是通过四则运算得到 24。</font>

<img src="/prompt-assets/1774864628796-7ef26b3a-0b0f-409e-a676-181e893fbfa3.png" width="971" title="" crop="0,0,1,1" id="u5337e0db" class="ne-image">

ToT 的关键是 “让模型先想思路，再评估思路是否可行”

Thought Generation（生成思路）

Thought Evaluation（评估思路）

+ **<font style="background-color:rgba(0, 0, 0, 0)">（a）Propose Prompt（生成思路）</font>**<font style="background-color:rgba(0, 0, 0, 0)">给模型输入 “当前数字 + 可能的下一步运算” 的示例，让模型生成</font>**<font style="background-color:rgba(0, 0, 0, 0)">所有可能的中间步骤</font>**<font style="background-color:rgba(0, 0, 0, 0)">（比如图中 “Thought Generation” 里的</font>`<font style="background-color:rgba(0, 0, 0, 0)">4+9=13</font>`<font style="background-color:rgba(0, 0, 0, 0)">、</font>`<font style="background-color:rgba(0, 0, 0, 0)">10-4=6</font>`<font style="background-color:rgba(0, 0, 0, 0)">）。</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">（b）Value Prompt（评估思路）</font>**<font style="background-color:rgba(0, 0, 0, 0)">给模型输入 “判断某组数字能否得到 24” 的示例，让模型评估</font>**<font style="background-color:rgba(0, 0, 0, 0)">当前思路是否有希望得到 24</font>**<font style="background-color:rgba(0, 0, 0, 0)">（比如图中 “Thought Evaluation” 里的</font>`<font style="background-color:rgba(0, 0, 0, 0)">10、13、13</font>`<font style="background-color:rgba(0, 0, 0, 0)">被评估为 “impossible（不可能）”）</font>

<font style="background-color:rgba(0, 0, 0, 0)">ToT 通过 “生成多个思路→评估思路的可行性→剪枝无效分支”</font>

+ **<font style="background-color:rgba(0, 0, 0, 0)">Thought Generation</font>**<font style="background-color:rgba(0, 0, 0, 0)">：生成多个候选思路（所有可能的下一步运算）</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">Thought Evaluation</font>**<font style="background-color:rgba(0, 0, 0, 0)">：评估每个思路的可行性（sure/likely/impossible）</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">Pruning（剪枝）</font>**<font style="background-color:rgba(0, 0, 0, 0)">：丢弃 impossible 分支，只在有希望的路径上继续探索</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">Iteration（迭代）</font>**<font style="background-color:rgba(0, 0, 0, 0)">：对保留的分支重复上述步骤，直到找到解或判定无解</font>

简单的模版（仅供参考）

```plain
## 任务：[你的任务名称] Tree of Thoughts (ToT) 求解
目标：[清晰描述任务目标]

## 步骤1：Thought Generation（生成思路）
请根据当前状态，生成 N 个**不同方向的候选思路**，格式：
[思路编号] [思路描述]

## 步骤2：Thought Evaluation（评估思路）
对每个思路，评估其达成目标的可能性，输出：
[思路编号] → [sure/likely/impossible]：[评估理由]

## 步骤3：剪枝与迭代
- 保留所有标记为 sure/likely 的分支
- 丢弃 impossible 分支
- 对保留的分支，重复步骤1-2，直到某分支达成目标或所有分支均为 impossible
```

```plain
你需要使用**ToT（Tree of Thoughts，思维树）** 方法解决以下问题。
规则：
1. 先明确当前核心问题，拆解为 2–4 个关键子问题。
2. 对每个子问题生成 3 种不同思路/方案。
3. 评估每条思路的可行性、优缺点、成功概率。
4. 从所有分支中筛选最优路径，形成最终结论。
5. 结构清晰，分点呈现，逻辑严谨。

问题：{请在此输入你的问题}
```

例如

```plain
## 任务：24点游戏 Tree of Thoughts (ToT) 求解
输入数字：{{numbers}}
目标：通过加减乘除（每个数字用一次）得到24。

## 步骤1：生成所有可能的下一步思路（Thought Generation）
请根据当前数字，生成所有可能的二元运算步骤，格式：
[运算式] (剩余: [运算后数字列表])

## 步骤2：评估每个思路的可行性（Thought Evaluation）
对每个步骤生成的剩余数字，评估是否能得到24，输出：
[运算式] → [sure/likely/impossible]：[理由]

## 步骤3：剪枝与迭代
- 保留所有标记为 sure/likely 的分支
- 丢弃 impossible 分支
- 对保留的分支，重复步骤1-2，直到某分支得到24或所有分支均为 impossible
```
