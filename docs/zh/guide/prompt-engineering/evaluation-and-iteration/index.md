---
title: 评估与迭代（从“能用”到“稳定”）
---

> <font style="color:rgba(154, 121, 14, 1)">提示词工程是一门经验科学，它涉及对提示词进行迭代和测试以优化性能。在提示词工程周期中，大部分精力实际上并非用于撰写提示词。相反，提示词工程的大部分时间都用于开发一套完善的评估方法，然后根据这些评估进行测试和迭代。</font>
>

::: info评估与迭代（从“能用”到“稳定”）
提示词工程是一门经验科学：大部分时间不是写提示词，而是做评估、做对比、做迭代。
:::

## 一、表现预估
<font style="color:rgba(237, 241, 245, 1)">评估一般会在前中后都会考虑并且使用到，所以如果你开始写提示词，你可以参考如下的流程</font>

<font style="color:rgba(237, 240, 243, 1)"></font>
1、 在实际的工作场景中，第一点需要评估的就是

表现度：也就问<font style="color:rgba(232, 235, 240, 1)">该模型在这项任务上需要达到怎样的表现？</font>

<font style="color:rgb(255, 255, 255)">比如生成奇特的图片，写有创意的广告，去固定的整理材料，写完整的新闻，以及你需要他们完成到怎么样的程度，这你在实际工作场景中第一步需要做的</font>



**<font style="color:rgb(255, 255, 255)">2、 其次是准确性/正确性和完整性</font>**

**<font style="color:rgb(255, 255, 255)">一般我们在准确性的要求是为了结合内容，比如生成一个 json 然后传递给下一个地方去使用，那么格式和字段就必须百分之百的正确，格式就得正确，并且字段需要完整</font>**

**<font style="color:rgb(255, 255, 255)">如果是小说风格类的，那么就是写法的内容准确性逻辑是否通畅。</font>**



**<font style="color:rgb(255, 255, 255)">3、 最后就是可用性，即性能方面和消耗价格</font>**

**<font style="color:rgb(255, 255, 255)">延迟：</font>**<font style="color:rgb(255, 255, 255)">模型可接受的响应时间是多少？这将取决于您的应用程序的实时需求和用户期望。</font>

<font style="color:rgb(255, 255, 255)">稳定：是否稳定</font>

<font style="color:rgb(255, 255, 255)">便捷度：是否便于下游消费（接口/前端/运营）</font>

<font style="color:rgb(255, 255, 255)">价格：请考虑诸如每次 API 调用的成本、模型的大小以及使用频率等各项因素。</font>

比如在什么地方使用版本比较高的模型，什么时候用低版本的，而且输入的价格和输出的时候价格不一样，怎么规划这在中小公司往往很重要，模型与模型一个版本消耗可能在 10 倍差甚至更高的时候，你或许不得不思考和评估一下。



> <font style="color:rgb(255, 255, 255)">Having clear, measurable success criteria from the outset will help you make informed decisions throughout the adoption process and ensure that you're optimizing for the right goals.</font>
>
> <font style="color:rgb(255, 255, 255)">从一开始就拥有清晰、可衡量的成功标准，将有助于你在整个采用过程中做出明智的决策，并确保你在为正确的目标进行优化。</font>
>
> <font style="color:rgb(255, 255, 255)">---来自 claudev3.x 的指南</font>
>



总结一下

<font style="color:rgba(233, 235, 239, 1)">表现预估决定了你后续到底要优化什么</font>

<font style="color:rgb(255, 255, 255)">常见的评估维度可以拆成四类：</font>

<font style="color:rgb(255, 255, 255)">- 正确性：事实、逻辑是否正确</font>

<font style="color:rgb(255, 255, 255)">- 相关性：有没有答非所问、跑题</font>

<font style="color:rgb(255, 255, 255)">- 完整性：关键点有没有漏</font>

<font style="color:rgb(255, 255, 255)">- 可用性：格式是否稳定、是否便于下游消费（接口/前端/运营）、价格是否合理</font>

<font style="color:rgb(255, 255, 255)">不同任务权重不同：客服类更偏“正确 + 可用”，创意类更偏“多样 + 贴合风格”。</font>







## 二、迭代优化
当提到优化，我们肯定希望一次性达到最好，但是和现实中绝大部分任务一样，这是没办法的事情，所以请记住

<font style="background-color:#FBDE28">提示词没有最好，要不断优化</font>

<font style="color:#DF2A3F; background-color:rgba(255, 255, 255, 0)">在开始设计提示时，你应该记住，这实际上是一个迭代过程，需要大量的实验才能获得最佳结果。</font>

<font style="color:#DF2A3F; background-color:rgba(255, 255, 255, 0)"></font>

<font style="background-color:rgba(255, 255, 255, 0)">在实践中，我们强烈的建议您对版本进行</font>**<font style="background-color:rgba(255, 255, 255, 0)">历史保存</font>**<font style="background-color:rgba(255, 255, 255, 0)">，归档，否则在大量工程化后，糟糕的体验会让你崩溃,并且可以适当的在部分内容添加注解，以便于下一次的修改，这有助于你的管理。</font>

<font style="background-color:rgba(255, 255, 255, 0)"></font>



<font style="background-color:rgba(255, 255, 255, 0)">ps： 我也在开发对应功能的提示词管理器</font>

<font style="background-color:rgba(255, 255, 255, 0)">如果有兴趣 xxxx</font>

## 三、常见的优化思路
### 3.1、指令
请以<font style="color:#DF2A3F">动词</font>为基础请写提示词

执行简单的任务

例如：

<font style="background-color:rgba(255, 255, 255, 0)">”写入”、“分类”、“总结”、“翻译”、“排序”等，从而为各种简单任务设计有效的提示。</font>

<font style="background-color:rgba(255, 255, 255, 0)">注意：建议将重要的指令放在提示的开头几段或者结尾几段。另有人则建议是使用像“###”或者"<>"这样的清晰分隔符(</font><font style="color:rgb(255, 255, 255)">结构化提示标签</font><font style="background-color:rgba(255, 255, 255, 0)">)来分隔指令和上下文。这个是赞同的，如果不考虑token的极致性（节省）可以用这样的清晰格式去写，但是如果是简短快捷的场景内容也看综合喜好去写，不要过于拘泥于技术使用，内容和思路会更重要一点。</font>

<font style="background-color:rgba(255, 255, 255, 0)"></font>

<font style="background-color:rgba(255, 255, 255, 0)"></font>

### <font style="background-color:rgba(255, 255, 255, 0)">3.2、内容</font>
<font style="background-color:rgba(255, 255, 255, 0)">内容就是看具体性，提示越具描述性和详细，结果精确，但是因为提示词是有上限的，所以并不是把所有细节点列出来才是对的。</font>

<font style="background-color:rgba(255, 255, 255, 0)">你列出的这些细节应该是相关的，关键的</font>

<font style="background-color:rgba(255, 255, 255, 0)">重复注意：我们鼓励大量实验和迭代，以优化适用于你应用的提示。</font>

<font style="background-color:rgba(255, 255, 255, 0)">此外有一些点要记住</font>

<font style="color:#DF2A3F; background-color:rgba(255, 255, 255, 0)">不要说不做什么，尽量说要做什么。</font>

<font style="background-color:rgba(255, 255, 255, 0)">不要的内容最好直接禁止，写</font><u>禁止要求</u><font style="background-color:rgba(255, 255, 255, 0)">，要避免一些模糊，不明确的内容。</font>

<font style="background-color:rgba(255, 255, 255, 0)"></font>

## 四、提示词示例
<font style="background-color:rgba(255, 255, 255, 0)">4.1、概括</font>

:::info
<font style="background-color:rgba(255, 255, 255, 0)">xxxxxxx（一大段内容）</font>

<font style="background-color:rgba(255, 255, 255, 0)">用一句话解释上面的信息</font>

:::

<font style="background-color:rgba(255, 255, 255, 0)"></font>

> <font style="background-color:rgba(255, 255, 255, 0)">在当今的世界中，有如此多的文本存在，几乎没有人有足够的时间阅读我们希望有时间阅读的所有文本。因此，我看到大型语言模型最令人兴奋的应用之一是使用它来概括文本。</font>
>
> <font style="background-color:rgba(255, 255, 255, 0)">--吴</font>
>





<font style="background-color:rgba(255, 255, 255, 0)">4.2、信息提取</font>

:::info
<font style="background-color:rgba(255, 255, 255, 0)">xxxxxxx（一大段内容）</font>

<font style="background-color:rgba(255, 255, 255, 0)">请提及上述段落中提到的基于xxx的xx：</font>

:::



<font style="background-color:rgba(255, 255, 255, 0)">4.3、给定示范</font>

<font style="background-color:rgba(255, 255, 255, 0)">除了指令之外，你需要更多考虑上下文和其他元素（在提示词中使用）的地方。</font>

<font style="background-color:rgba(255, 255, 255, 0)">你可以提供的其他元素包括</font>`<font style="background-color:rgba(255, 255, 255, 0)">输入数据</font>`<font style="background-color:rgba(255, 255, 255, 0)">或</font>`<font style="background-color:rgba(255, 255, 255, 0)">示例</font>`<font style="background-color:rgba(255, 255, 255, 0)">。</font>

:::info
<font style="color:rgb(255, 255, 255)">将文本归类为中性、负面或正面。 </font>

<font style="color:rgb(255, 255, 255)">文本：我觉得这次休假挺合适的。 </font>

<font style="color:rgb(255, 255, 255)">情绪：【中性】</font>

<font style="color:rgb(255, 255, 255)">文本：我觉得食物还可以。 </font>

<font style="color:rgb(255, 255, 255)">情绪：</font>

:::

<font style="color:rgb(255, 255, 255)">回答应该为【中性】</font>

<font style="color:rgb(255, 255, 255)">都是如果回答是中性，则错误，需要按照示例加上【】</font>

<img src="/prompt-assets/1767665490658-3c1dc621-37fa-4286-85a3-641c7f7a9271.png" width="890" title="" crop="0,0,1,1" id="u9f00ae4d" class="ne-image">



<font style="background-color:rgba(255, 255, 255, 0)">4.4、场景和身份</font>

:::info
<font style="color:rgb(255, 255, 255)">以下是与一位AI研究助理的对话。该助理的语气具有技术性和科学性。 </font>

<font style="color:rgb(255, 255, 255)">人类：你好，你是谁？ </font>

<font style="color:rgb(255, 255, 255)">AI：您好！</font>

<font style="color:rgb(255, 255, 255)">我是AI研究助理。</font>

<font style="color:rgb(255, 255, 255)">今天有什么可以帮您的吗？ </font>

<font style="color:rgb(255, 255, 255)">人类：您能谈谈黑洞的形成吗？ </font>

<font style="color:rgb(255, 255, 255)">AI：</font>

:::

<font style="background-color:rgba(255, 255, 255, 0)">指定它的行为意图和身份。 当你在构建对话系统，如客户服务聊天机器人时，这尤其有用。</font>

<font style="background-color:rgba(255, 255, 255, 0)">这种应用场景有时也被称为角色提示（Role Prompting）</font>

<font style="background-color:rgba(255, 255, 255, 0)">当应对不同场景不同要求你可以改写场景和身份定位，我们的AI研究助手听起来有点太技术性了，对吗？好的，让我们改变这种行为，并指示系统给出更易于理解的回答。</font>

:::info
<font style="color:rgb(255, 255, 255)">以下是与一位AI研究助理的对话。</font>

<font style="color:rgb(255, 255, 255)">助理的回答应该简单易懂，连小学生都能理解。</font>

:::

<font style="color:rgb(255, 255, 255)">当然，</font><font style="background-color:rgba(255, 255, 255, 0)">如果你再添加更多的示例，可能会得到更好的结果。</font>

<font style="background-color:rgba(255, 255, 255, 0)"></font>

<font style="background-color:rgba(255, 255, 255, 0)">4.5、</font>转换

翻译器

格式转换

语调



4.6、<font style="color:rgb(206, 206, 206); background-color:rgb(18, 18, 18)">扩展</font>

<font style="background-color:rgba(255, 255, 255, 0)">提醒、客服对话，回复，扩展文本</font>

<font style="background-color:rgba(255, 255, 255, 0)"></font>

## 五、代码生成
<font style="background-color:rgba(255, 255, 255, 0)">大语言模型（LLMs）在代码生成方面非常有效。</font>

<font style="background-color:rgba(255, 255, 255, 0)">例如</font>

<font style="background-color:rgba(255, 255, 255, 0)">核心需求是</font>**<font style="color:rgb(255, 255, 255); background-color:rgba(0, 0, 0, 0)">获取用户输入的姓名，并输出对应的 "Hello + 姓名" 问候语</font>**<font style="background-color:rgba(255, 255, 255, 0)">。</font>

:::info
<font style="background-color:rgba(138, 208, 255, 0.1)">/*Ask the user for their name and say "Hello"*/</font>

:::



我们也可以补充示例

:::info
<font style="color:rgb(255, 255, 255)">""" Table departments, columns = [DepartmentId, DepartmentName] Table students, columns = [DepartmentId, StudentId, StudentName] Create a MySQL query for all students in the Computer Science Department """</font>

:::

以上的提示词就说给出个输入数据然后写出对应的一个mysql内容



当然我们可以加入像我们5章节的内容，比如一句话概括和输出示例





## 六、推理
当今大型语言模型（LLM）面临的最困难任务之一是需要某种形式的推理的任务。推理是最具吸引力的领域之一，因为有了推理，就可以从LLM中涌现出各种复杂的应用类型。



当然随着模型的发展，涉及数学能力的推理任务已经有了一些改进，有些问题也可以解决，但是执行推理任务可能会有一些难度，因此就需要更高级的提示词工程技术。

当模型推理有问题的时候，我们可以自己写提示词去让其COT（链式生成一步一步去推理）

:::info
<font style="color:rgb(255, 255, 255)">该组中的奇数之和为偶数：15、32、5、13、82、7、1。 </font>

<font style="color:rgb(255, 255, 255)">通过分步解决问题。</font>

<font style="color:rgb(255, 255, 255)">首先，找出奇数，将它们相加，并指出结果是奇数还是偶数。</font>

:::







先去确定好思路，通过各种方式去不全内容（包括 ai，交叉使用）

<font style="background-color:rgba(255, 255, 255, 0)">后面的章节我们也对优化提示词阐述了大量的一些工程技术手段，你可以对应的使用在你的提示词中。</font>

<font style="background-color:rgba(255, 255, 255, 0)"></font>

<img src="/prompt-assets/1774856663107-537eb294-b7ff-45ac-81e6-0855be7cc1ca.png" width="956" title="" crop="0,0,1,1" id="u92543c50" class="ne-image">












## 1、你到底在优化什么？

常见的评估维度可以拆成四类：

- 正确性：事实、逻辑是否正确
- 相关性：有没有答非所问、跑题
- 完整性：关键点有没有漏
- 可用性：格式是否稳定、是否便于下游消费（接口/前端/运营）

不同任务权重不同：客服类更偏“正确 + 可用”，创意类更偏“多样 + 贴合风格”。

## 2、最小评估集怎么做

建议从 20 条开始：

1. 15 条真实业务样本（覆盖主流场景）
2. 3 条边界样本（缺信息、冲突信息）
3. 2 条对抗样本（诱导违规、诱导编造）

每条样本都要写“期望答案的验收标准”，而不是只写“看起来不错”。

## 3、迭代策略（避免越改越差）

### 3.1 只改一处

一次只调整一个变量：

- 改提示词结构（不改参数）
- 或改参数（不改提示词）
- 或改模型（不改其它）

否则无法定位是哪里导致结果变化。

### 3.2 固化输出结构

如果你的输出要进入下游系统，优先固定结构：

- 先固定字段与格式
- 再优化内容质量

结构不稳定会让所有下游都变成“脆弱系统”。

## 4、常见的评估方法

- 人工评估：小样本、高质量，但成本高
- LLM 评估：快，但要做一致性控制（固定提示词与打分标尺）
- 三角验证：同一问题让不同模型回答，交叉对比（发现“过度合理”的编造）

## 5、一个可用的打分表（示例）

对每条样本给 0～2 分：

- 正确性：0/1/2
- 相关性：0/1/2
- 完整性：0/1/2
- 格式合规：0/1/2

累计 8 分满分，设一个最低通过线（例如 6/8），每次改动必须回归。
