

![画板](/prompt-assets/pt-25.jpeg)

## 一、什么是模型幻觉
<font >模型幻觉是指模型生成了与事实不符、逻辑断裂、脱离上下文的内容，但是其本质上是统计概率驱动的合理猜测。</font>

<font >简单的说在使用大模型的时候常见到模型“胡言乱语，胡说八道的迷之发言”那就是模型出现幻觉了</font>

<font ></font>

<font >一般来说模型幻觉分为事实性幻觉（与现实矛盾）和忠实性幻觉（偏离指令/上下文）两种类型</font>

## <font >1.1、事实性幻觉</font>
<font >事实性幻觉指的是模型生成的内容与可验证的现实世界事实不一致，简单的说：事实上是错误的事情，无中生有的给出了,比如唐僧大闹天宫(实际上是孙悟空)</font>

<font >一般来说</font><font >事实性幻觉会在几个地方出现</font>

### <font >1.1.1、常识错误</font>
<font >常识错误随着模型能力的提高，基础材料的不断补全，加之人们普遍掌握，一般也可以及时发现，问题不大，比如刚刚的</font><font >唐僧大闹天宫，就很离谱，但是如果对于一些稍微涉及到偏僻的场景的那就不好确认了，比如岳飞有 7 个孩子，</font><font style="background-color:rgba(0, 0, 0, 0.04)">锦瑟有 50 弦</font>

<font style="background-color:rgba(0, 0, 0, 0.04)"></font>

### <font >1.1.2、虚构实践</font>
<font >虚构实践，就很可怕了，大模型为了上下文的相近度匹配，也为了生成内容，会出现谎报数据，学会了“</font><font style="color:#DF2A3F">说谎</font><font >”，特别在金融，案例，数据报告，虚构实践，这些往往很难辨清楚</font>

<font >比如下面内容有哪一个是真的哪一个是假的</font>

```yaml
可以关注博安稳健债券 A（012345），该基金近一年收益率为 4.62%，最大回撤仅 0.28%，在同类纯债基金中排名前 12%。
根据 2025 年一季度季报显示，基金规模稳定在 136.7 亿元，持仓以高等级信用债为主，信用风险极低，适合风险保守型投资者长期配置


根据 IDC 2025 年上半年中国可穿戴设备报告：
华为：27.3%
小米：22.1%
苹果：18.6%
荣耀：9.4%
整体市场出货量同比增长 11.7%，其中健康监测功能渗透率已达 83.2%。


根据《中华人民共和国刑法》第 196 条第 3 款司法解释，单家银行信用卡欠款本金超过 5 万元，逾期超过 90 天，经两次有效催收仍不归还，即可构成信用卡诈骗罪，公安机关可依法立案追诉。
多地法院判例显示，此类案件 2025 年判决率超过 76%。

根据 Liu et al. (2024) 发表在 IEEE Journal of Medical Imaging 上的研究，基于 Transformer 的肺部 CT 病灶检测模型准确率可达 96.73%，敏感度 95.2%，特异度 97.1%，在 12 家三甲医院外部验证集上表现稳定。
```

<font >没错，全是假的，这对于普通人来说想要凭借个人去识别是分清是很难的</font>

<font >另外在多模态的视觉模型当中，斯坦福大学李飞飞团队发布了一篇论文《海市蜃楼：视觉理解的幻象》。</font>

**<font style="background-color:rgba(255, 255, 255, 0)">顶尖多模态模型普遍存在 “海市蜃楼效应（Mirage Effect）”</font>**<font style="background-color:rgba(255, 255, 255, 0)">即便</font>**<font style="background-color:rgba(255, 255, 255, 0)">完全不提供图像</font>**<font style="background-color:rgba(255, 255, 255, 0)">，GPT‑5、Gemini‑3‑Pro、Claude Opus 4.5 等模型仍能在超 60% 的视觉问答任务中，输出高度详细、看似合理的 “看图” 结果，</font>

<font style="background-color:rgba(255, 255, 255, 0)">本质是</font>**<font style="background-color:rgba(255, 255, 255, 0)">基于文字线索脑补虚假视觉信息</font>**<font style="background-color:rgba(255, 255, 255, 0)">，而非真正看懂图像。</font>

<font >https://arxiv.org/pdf/2603.21687v2</font>

<font ></font>

### <font >1.1.3、逻辑陷阱</font>
<font >还有之前比较火的洗车问题</font>

:::info
<font style="background-color:rgba(0, 0, 0, 0.04)">距离洗车店50米去洗车，是走过去还是开车去</font>

:::

这个在当时很多模型回答的是资料去，因为比较近，没必要开车，但是忽略了一个前提条件，那就是目的点是为了洗车。

<font style="background-color:rgba(0, 0, 0, 0)">当然逻辑问题很多这里就不一一列举了，有兴趣可以看附录的一些问题。</font>



## <font >1.2、</font><font >忠实性幻觉</font>
**<font style="background-color:rgba(255, 255, 255, 0)">答内容虽无事实错误，但是驴头不对马嘴，指模型生成的内容与用户的指令或上下文不一致，关注点错了</font>**

**<font style="background-color:rgba(255, 255, 255, 0)">简单的说就是：没有言而如一的回答忠实的回答内容</font>**

**<font style="background-color:rgba(255, 255, 255, 0)"></font>**

**<font style="background-color:rgba(255, 255, 255, 0)">例子：</font>**

<font style="background-color:rgba(0, 0, 0, 0)">文章：小明去过上海、广州，从未去过北方城市。</font>

<font style="background-color:rgba(0, 0, 0, 0)">问题：根据文章，判断：小明是否去过北京？只回答 “是” 或 “否”。</font>

<font style="background-color:rgba(0, 0, 0, 0)">回答：小明去过很多大城市，</font>**<font style="background-color:rgba(0, 0, 0, 0)">是</font>**<font style="background-color:rgba(0, 0, 0, 0)">，他去过北京。</font>

+ <font style="background-color:rgba(0, 0, 0, 0)">完全违背原文信息</font>
+ <font style="background-color:rgba(0, 0, 0, 0)">无视 “只回答是 / 否” 的约束</font>

<font style="background-color:rgba(0, 0, 0, 0)">训练目标更偏好 “流畅”，而非 “忠实”，没遵守指令，但内容看起来很合理。</font>

**<font style="background-color:rgba(255, 255, 255, 0)"></font>**

**<font style="background-color:rgba(255, 255, 255, 0)"></font>**

## <font style="background-color:rgba(255, 255, 255, 0)">二</font><font style="background-color:rgba(0, 0, 0, 0)">、AI为什么会产生幻觉?</font>
## 2.1、 数据偏差
这是是大部分的一个情况，核心点就一个：<font style="color:#DF2A3F">学错了</font>

AI 学的训练资料里本来就有错、有片面信息，回答的时候回答训练数据错误/错误片面被放大，

<font style="background-color:rgba(0, 0, 0, 0)">事实与指令在模型权重中 “打架”,模型内部存储了海量世界知识。当你的原文 / 指令和模型固有知识不一致时,模型会优先相信自己 “记住的常识”,而忽略你给的临时上下文</font>

## 2.2、泛化困境
泛化能力就是广泛的适应，当一个模型训练的时候，没有学会，<font style="color:#DF2A3F">没</font>有<font style="color:#DF2A3F">学懂</font>

那么自然难处理训练集外复杂场景，遇到没见过、复杂、冷门的问题此时就会出现幻觉

## 2.3、知识固化
参数记忆强，动态更新弱，AI 的知识是固定在模型里的，不会实时更新，<font style="color:#DF2A3F">学旧了</font>

比如在 claude 中就提醒了

> <font style="background-color:rgba(0, 0, 0, 0)">While Claude has extensive knowledge from its training data, it does not have access to real-time information or current events. Its knowledge can be over a year out of date.</font>
>
> <font style="background-color:rgba(0, 0, 0, 0)">虽然 Claude 从其训练数据中获取了广泛的知识，但它无法获取实时信息或时事。其知识可能已过时一年以上。</font>
>



## 2.4、意图误解
你问得模糊，它自由发挥，AI 为了 “显得聪明”，自己脑补内容、补全情节，<font style="color:#DF2A3F">没听懂</font>





## 三、如何应对AI幻觉?
## 3.1、三角验证法
交叉比对多个AI回答或权威来源，比如交叉大模型评估，或者人工混合评估，信息工具评估



## 3.2、警惕“过度合理”
越细节丰富的回答越需谨慎(如AI虚构论文标题与作者





## 3.3、技术解决
### 3.3.1、prompt 容错通道语句
一般如果在提示词中，你只是指定了任务，但是大模型自身能力不足，那大模型就会像学生一样，会随便编一段内容，这时候你可以，留给他一个容错空间，**<font style="background-color:rgba(255, 255, 255, 0)">明确要求 “不知道就说不知道”</font>**<font style="background-color:rgba(255, 255, 255, 0)">让 Claude 在不确定时直接回复 </font>**<font style="background-color:rgba(255, 255, 255, 0)">“I don’t know”</font>**<font style="background-color:rgba(255, 255, 255, 0)">，避免强行编造答案。</font>

<font style="background-color:rgba(255, 255, 255, 0)">还有一种背诵时候，可能感觉自己背不熟的时候，</font>**<font style="background-color:rgba(255, 255, 255, 0)">限定高置信度才作答</font>**<font style="background-color:rgba(255, 255, 255, 0)">告诉 大模型：</font>**<font style="background-color:rgba(255, 255, 255, 0)">只有在对答案非常有把握时才回复</font>**<font style="background-color:rgba(255, 255, 255, 0)">，降低它 “猜答案” 的倾</font>向。



> <font >One effective way to reduce hallucinations is to explicitly give Claude permission to say "I don't know," especially when asking fact-based questions. This approach, also known as "giving Claude an out," allows the model to acknowledge its limitations and avoid generating incorrect information.</font>
>
> <font >减少幻觉的一个有效方法是明确允许Claude说“我不知道”，尤其是在提出基于事实的问题时。这种方法也被称为“给Claude一个台阶”，能让模型承认自身的局限性，避免生成错误信息。</font>
>
> <font >--来自 claude code 指南</font>
>

### 3.3.2、 使用COT
1. <font style="background-color:rgba(255, 255, 255, 0)">引导分步思考（Step-by-step thinking）</font>
    - <font style="background-color:rgba(255, 255, 255, 0)">让 大模型 在正式回答前先一步步梳理思路，减少跳跃式推理带来的错误。</font>
    - <font style="background-color:rgba(255, 255, 255, 0)">进阶技巧：可以让 大模型 把思考过程放在 </font>`<font style="color:rgb(255, 255, 255); background-color:rgb(51, 51, 51)"><thinking></thinking></font>`<font style="background-color:rgba(255, 255, 255, 0)"> 标签里，最后只输出结论，既保留推理过程又避免干扰最终结果。</font>

### 3.3.3、引用原文
<font style="background-color:rgba(255, 255, 255, 0)">基于原文引用作答针对长文档场景：让 大模型 先从原文中找到相关引用片段，再基于这些引用生成答案，强制答案锚定在真实文本上，减少凭空捏造。</font>

<font style="background-color:rgba(255, 255, 255, 0)">也可以使用我们之前说过的 RAG</font>

<font style="background-color:rgba(255, 255, 255, 0)"></font>

> <font >When working with long documents, asking Claude to extract word-for-word quotes relevant to a specific question can help minimize hallucinations. This approach is particularly effective for documents longer than 300 words and may be less reliable for shorter ones.</font>
>
> <font >处理长文档时，让Claude提取与特定问题相关的逐字引用有助于减少幻觉现象。这种方法对于超过300字的文档尤其有效，而对于较短的文档可能不太可靠。</font>
>

_<font style="color:rgb(66, 70, 80)">📌</font>__<font style="color:rgb(66, 70, 80)"> Quote Extraction Accuracy Note</font>__<font style="color:rgb(66, 70, 80)"> </font>__<font style="color:rgb(66, 70, 80)">📌</font>__<font style="color:rgb(66, 70, 80)"> 引文提取准确性说明</font>_

_<font style="color:rgb(66, 70, 80)">While you might not get 100% reproduction of the original document text when asking for quotes, you want fidelity to be high. Minor additions like "[sic.]" for errors or contextual clarifications are acceptable, as long as the added content is accurate. If you notice inaccurate additions, consider filtering for a very high degree of overlap and making the instructions more rigorous, e.g., "Please ensure your quotes are directly taken verbatim from the document. Do not add any additional content like disambiguations or comments."</font>_

_<font style="color:rgb(66, 70, 80)">虽然在要求引用时，你可能无法100%复现原始文档的文本，但你希望保真度能很高。像用于标注错误的“[原文如此]”或提供上下文说明这类微小补充是可以接受的，只要添加的内容准确即可。如果你发现添加的内容不准确，可以考虑筛选出重叠度极高的内容，并让指令更严格，例如：“请确保你的引用是直接从文档中逐字提取的。不要添加任何额外内容，如歧义消除说明或评论。”</font>_

_<font style="color:rgb(66, 70, 80)"></font>_

_<font style="color:rgb(66, 70, 80)">在您希望模型根据文本生成答案的情况下，另一种减少幻觉的策略是要求模型首先从文本中找到任何相关的引文，然后要求它使用那些引文来回答问题，并将答案追溯回源文件通常是非常有帮助的，可以减少这些幻觉的发生。</font>_

_<font style="color:rgb(66, 70, 80)">--吴恩达讲 prompt</font>_

### 
### <font style="background-color:rgba(255, 255, 255, 0)">3.3.4、联网</font>
如果可以加上联网搜索，可以解决一些时效性的幻觉问题，但是如果被GEO 投毒可能会有让 AI 优先采信假信息的可能





### 3.3.5、采样策略（temperature、top-k）
<font style="background-color:rgba(0, 0, 0, 0)">温度越高，生成越自由、越有创意，也越容易：</font>

+ <font style="background-color:rgba(0, 0, 0, 0)">改写数字</font>
+ <font style="background-color:rgba(0, 0, 0, 0)">替换名词</font>
+ <font style="background-color:rgba(0, 0, 0, 0)">加无关内容</font>

<font style="background-color:rgba(0, 0, 0, 0)">解码越 “放飞”，忠实性越低，增加随机性</font>

<font style="background-color:rgba(0, 0, 0, 0)">可以适度的降低温度等调整采样策略</font>

### 3.3.6、精细化训练
在模型特定场景下为了减少幻觉，会进行特殊精细化的训练，这也是一种方式，但是一般成本都会比较大





### <font style="background-color:rgba(255, 255, 255, 0)">3.3.7、本质逻辑</font>
<font style="background-color:rgba(255, 255, 255, 0)">这些方法的核心都是</font>**<font style="background-color:rgba(255, 255, 255, 0)">约束模型的生成行为</font>**<font style="background-color:rgba(255, 255, 255, 0)">：</font>

+ <font style="background-color:rgba(255, 255, 255, 0)">降低 “必须给出答案” 的压力</font>
+ <font style="background-color:rgba(255, 255, 255, 0)">增加推理透明度</font>
+ <font style="background-color:rgba(255, 255, 255, 0)">让输出锚定在可验证的信息源上，提高源质量</font>

<font style="background-color:rgba(255, 255, 255, 0)">从而有效减少模型编造虚假信息的概率。</font>

<font style="background-color:rgba(255, 255, 255, 0)"></font>

<font style="background-color:rgba(255, 255, 255, 0)"></font>

<font style="background-color:rgba(255, 255, 255, 0)"></font>

### <font style="background-color:rgba(255, 255, 255, 0)">3.3.8、参考</font>
你是一名专业的研究助理。以下是一份文档，你需要针对这份文档回答问题：<document(文档）</document首先，从

文档中找出与回答问题最相关的引语，然后按编号顺序列出，引语应相对简短。如果没有相关引语，就写"无相关引语".然

后，以"答案："开头回答问题。回答中不要逐字逐句包含或引用引（语内容。回答时不要说"根据引语【1],而是仅在相关句子

末尾添加带括号的引语编号，以此来引用与答案各部分相关的引语。因此，你的整体回答格式应与examle></example>

标签之间所示的格式一致，.确保严格遵循格式和间距要求。<example>引语：[1]x公司2021年的营收为1200万美

元。"2"近90%的营收来自小部件销售，其余10%来自小器械销售。"答案：x公司赚了1200万美元。[1]其中近9%来自小

部件销售。[2]</example>如果文档无法回答该问题，需说明这一点。

<img src="/prompt-assets/pt-09.png" width="881" title="" crop="0,0,1,1" id="tqyz4" class="ne-image">

<img src="/prompt-assets/pt-10.png" width="985" title="" crop="0,0,1,1" id="gPoCE" class="ne-image">

## 3.4、理解幻觉
享受幻觉，理解幻觉的特点和应对方法,享受幻觉带来的创意灵感

有时候幻觉也可能会起到积极一面，比如创作，歌曲，或者给与一些意想不到的灵感，创意思维。

> **AI幻觉像一面棱镜，既折射出技术的局限性，也投射出超越人类想象的可能。与其追求“绝对**
>
> **正确”，不如学会与AI的“想象力”共舞——因为最伟大的创新，往往诞生于理性与狂想的交**
>
> **界处。**
>
> **——DeepSeek R1**
>





参考

沈阳教授团队，张家铖. DeepSeek 与 AI 幻觉 [R]. 清华大学新闻与传播学院新媒体研究中心、人工智能学院，2025
