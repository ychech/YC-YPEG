> **<font style="background-color:rgba(255, 255, 255, 0)">提示词工程</font>**<font style="background-color:rgba(255, 255, 255, 0)">是为模型编写有效指令的过程，目的是让模型持续生成符合你要求的内容。</font>
>
> <font style="background-color:rgba(255, 255, 255, 0)">由于模型生成的内容具有不确定性，要通过提示词获得理想的输出，既需要技巧，也需要科学方法。不过，你可以运用一些技巧和最佳实践，从而持续获得良好的结果。</font>
>

<font style="color:rgb(52, 73, 94)"></font>

Prompt 中文可译作**提示词**或**提示指令**，它最初是自然语言处理（NLP）研究者为特定任务设计的专用输入模板。在 ChatGPT 开启大语言模型时代后，Prompt 便成为与大模型进行交互时，所有输入内容的统称。

简单来说，我们向大模型发送的输入内容就是 Prompt，而大模型返回的回复则称为 Completion。

一个合理的提示词设计，在很大程度上决定了大模型能力的发挥效果。

**提示词工程（Prompt Engineering）**，就是针对特定任务构建提示词、以充分释放大模型能力的一系列方法与技巧。想要高效、充分地使用大语言模型（LLM），掌握提示词工程是必不可少的核心技能。

从现在开始，我们将系统学习提示词工程。  
本章将从 Prompt（输入）与 Completion（模型输出）的角色划分讲起，再介绍提示词的核心要素与基本架构，为后续内容的学习打下基础。  


## <font style="background-color:rgba(255, 255, 255, 0)">一、提示词中模型角色</font>
#### 1.1、user
在使用豆包、千问、GPT、Claude 等大语言模型时，无论是通过网页还是 App 进行对话，

你直接输入的那段内容，就是**<font style="background-color:rgba(0, 0, 0, 0)">用户层面的 Prompt</font>**。

<img src="/prompt-structure/1773378745260-677e09f8-cada-4fc1-a666-4f6fcee8c8d9.png" width="900" title="" crop="0,0,1,1" id="uc2a677c4" class="ne-image">

在代码中，实际上当前的角色是user

```plain
"role": "user"
```

对于大模型来说，user 是人类用户，发起对话的一方，指**用户当前提出的问题、指令、需求**

+ 作用：告诉模型 “现在要做什么”
+ 特点：每次对话都可以变

#### 1.2、Assistant
大模型回答的内容则是**Assistant助手级的，简单说就是大模型的回复**

**Assistant（助手）**：大模型返回给你的内容 → **模型回复（Completion）**

<img src="/prompt-structure/1773378772732-00363685-43c8-4c21-963e-5bd2a4999bbc.png" width="956" title="" crop="0,0,1,1" id="u9b3c9089" class="ne-image">

```plain
"role": "Assistant"
```

<font >你可以使用预填充的方式，引导你的内容指向</font>

<font >haiku：俳句；三行俳句诗</font>

<img src="/prompt-structure/1775012557413-97a23a7f-113f-4db0-babe-dfd451f36ae2.png" width="571" title="" crop="0,0,1,1" id="u2bc9a839" class="ne-image">

<img src="/prompt-structure/1775012571503-b1b1590c-e097-4969-992d-0fd60c770d8c.png" width="301" title="" crop="0,0,1,1" id="u88a38ef2" class="ne-image">



#### 1.3、**System Prompt**
而 **系统层级（System Prompt**） 属于权限最高、约束最强的底层提示，通常在网页或普通 APP 对话中无法直接查看和修改。它是开发者预先给模型设定的身份定位、行为规则、回答边界与安全约束。  
下面我们会做一些边界测试，尝试让模型泄露自身的系统提示词 —— **System Prompt**也常被称为隐藏提示，正常情况下模型不应透露。这部分内容，也正是我们后续要讲解的提示词安全相关知识点。

<img src="/prompt-structure/1773379192912-530bba66-40cd-47be-8b77-88f2c3596734.png" width="973" title="" crop="0,0,1,1" id="u76894724" class="ne-image">

```plain
"role": "systemprompt"
```

具体配置要参考不同模型产商的文档，有些版本可能是叫 system 或者是叫 **<font >instructions，</font>**<font style="background-color:rgba(255, 255, 255, 0)">隐藏提示</font>**<font >。</font>**

**<font ></font>**

**<font ></font>**

_**<font >在</font>**__<font style="background-color:rgba(0, 0, 0, 0)">Brex 内部工程团队中写到</font>_

_**<font > </font>**__<font style="background-color:rgba(255, 255, 255, 0)">You should think of a hidden prompt as a means to make the user experience better or more inline with the persona you’re targeting. </font>__**<font style="background-color:rgba(255, 255, 255, 0)">Never place any information in a prompt that you wouldn’t visually render for someone to read on screen</font>**__<font style="background-color:rgba(255, 255, 255, 0)">.</font>_

_<font style="background-color:rgba(255, 255, 255, 0)">你应该将隐藏提示视为一种改善用户体验或使其更符合你所针对的角色的手段。</font>__**<font style="background-color:rgba(255, 255, 255, 0)">绝不要在提示中放置任何你不会在屏幕上直观呈现给用户阅读的信息</font>**__<font style="background-color:rgba(255, 255, 255, 0)">。</font>_

**<font ></font>**



#### 1.4、 总结
| **<font >术语</font>** | **<font >解释</font>** |
| --- | --- |
| **<font >System/instructions(有些版本)</font>** | <font >系统级指令，设定全局规则</font> |
| **<font >User</font>** | <font >人类用户，发起对话的一方</font> |
| **<font >Assistant</font>** | <font >人工智能助手，即模型本身的角色</font> |


<font >在实际生成开发过程中，一般会在系统提示强约束最重要的内容，约束核心，这部分往往要精悍，而且最好可以全面，因为系统级别的提示词决定了模型的大部分核心要素，一般是</font>**<font >最要约束的</font>**<font >，</font>**<font >最要防范的</font>**<font >，</font>**<font >最需要注意</font>**<font >的写在这里，把一些可能杂乱的，需求直接要求的，显性的，可以替换，或者经常替换的放到用户提示词里，并且最好可以关联搭配使用，相互呼应。</font>

<font >对于新人如果你分不清楚，你可以把替换和不可以替换作为判断基础，把可能使用到参数/变量多的安排在填充到用户提示词中,把一些规则性固定的内容放到系统提示中（当然这个并非必然如此，但是对于刚开始学习使用是一个非常好的判断技巧）</font>

~~那说完了最常用的基础的配置参数和内容后我们开始讲对 LLM 如何去写提示词的具体方法和一些思想~~



## 二、给LLM提示
#### 2.1、明确、清晰、完整
给LLM提示，笼统的说也就是我们给大模型一个提示词，

但是当我们给出的指令越模糊，越不那么完善，此时大模型只能去推测时，得到的内容也就越宽泛，越不容易精确，甚至有可能完全不对。

所以，第一步，请保持你的提示词，<font style="color:##DF2A3F">明确、清晰</font>且**<font style="color:##DF2A3F">完整</font>**



_这是你真正的写提示词工程的第一步，所以他尤为的重要，明确你的想法，清晰你的业务，任务，不管怎么样，什么目标，你都得明确、清晰且完整。_

_这是你写好提示词的关键，核心和灵魂。_

<font >---来自 </font>逸尘的黑金钻石 PE 指南



> **<font >Define the task and success criteria:</font>**<font > The first and most crucial step is to clearly define the specific task you want Claude to perform. This could be anything from entity extraction, question answering, or text summarization to more complex tasks like code generation or creative writing. Once you have a well-defined task, establish the success criteria that will guide your evaluation and optimization process.</font>
>
> **<font >定义任务和成功标准：</font>**<font > 第一步也是最关键的一步是清晰地定义你希望Claude执行的具体任务。这可以是从实体提取、问答、文本摘要到更复杂的任务，如代码生成或创意写作等任何内容。一旦你有了明确的任务，就要制定成功标准，以此指导你的评估和优化过程</font>
>
> <font >---来自 claudev3.x 的指南</font>
>



此外在<font >吴恩达和openai官方的提示词工程课中开篇就点题到</font><font style="color:##DF2A3F; background-color:##FBDE28">编写清晰、具体的指令</font>

_<font >你应该通过提供尽可能清晰和具体的指令来表达您希望模型执行的操作。这将引导模型给出正确的输出，并减少你得到无关或不正确响应的可能。编写清晰的指令不意味着简短的指令，因为在许多情况下，更长的提示实际上更清晰且提供了更多上下文，这实际上可能导致更详细更相关的输出。</font>_

<font >---来自 </font><font >吴恩达和 openai出了官方的提示词工程课</font>

<font ></font>

#### <font >2.2、总结</font>
<font >明确，</font>明确一般要求我们的思路明确对业务熟悉，你在实际开发中，如果在团队配合中，一定要问清楚，最好可以有一个文档整理，即使没有，也需要你对业务对需要配合的同事要清楚，如果遇到陌生的行业，我的建议甚至是先去了解一下行业，写提示词往往并不只是写提示词，你需要的是整体脉络的一个把握，这甚至比任何技巧都更重要。

你可以推演，但是脑子里如果没有的东西是不会平白无故生成的，

--yc

sdjky



清晰和一定的提示词技巧/提示词格式有关，在本章我们也会从提示词格式的角度去分析，怎么去写一个清楚提示词，将会学会提示词要素和提示词架构的基本知识。

完整则是我们需要对提示词补充，我们会从句意句式格式开始讨论



<font ></font>

## 三、提示词补充
###### 2.1.1、句意补充
举一个简单的、不完整的示例指令，输入

:::info
今天是

:::

_以下使用豆包 进行提问_

我们可以看到模型给出了一些回答，都是都只是推测，结果可能是对的，也可能是出乎意料的。

<img src="/prompt-structure/1767599718223-55cef0d3-adb7-4de1-96d9-cb00ca8b7f77.png" width="891" title="" crop="0,0,1,1" id="uc9e9adea" class="ne-image">

接下里我们再给出明确且比较完整的提示词

:::info
<font style="background-color:rgba(0, 0, 0, 0.04)">从天气来看：</font>

<font style="background-color:rgba(0, 0, 0, 0.04)">今天是</font>

:::

<img src="/prompt-structure/1767599741513-6e597aff-21e6-4376-9ec6-eec908eafd37.png" width="820" title="" crop="0,0,1,1" id="ue7720efa" class="ne-image">

你看，当我们告知模型比较完整的句子，输出结果看起来要好得多，符合我们的预期，因为它完全按照你告诉它要做的（“完善句子”）去做。







###### 2.1.2、格式补充
当我们需要大模型给出判断的时候，我们可以提供格式要求，这样大模型会出比较准确的格式（这其实也是我们后面要说的少量样本的一种）

_以下使用千问 进行提问_

:::info
<font style="background-color:rgba(255, 255, 255, 0)">这太棒了！</font>

<font style="background-color:rgba(255, 255, 255, 0)">这太糟糕了！</font>

<font style="background-color:rgba(255, 255, 255, 0)">哇，那部电影太酷了！</font>

<font style="background-color:rgba(255, 255, 255, 0)">多么糟糕的表演啊！//</font>

:::

<img src="/prompt-structure/1773909799349-d1201b45-9209-4aaa-8016-69c6d14c7514.png" width="1002" title="" crop="0,0,1,1" id="u445b2e64" class="ne-image">

当我们给出格式补充

:::info
<font style="background-color:rgba(255, 255, 255, 0)">这太棒了！// 积极</font>

<font style="background-color:rgba(255, 255, 255, 0)">这太糟糕了！// 消极</font>

<font style="background-color:rgba(255, 255, 255, 0)">哇，那部电影太酷了！// 积极</font>

<font style="background-color:rgba(255, 255, 255, 0)">多么糟糕的表演啊！//</font>

:::

<img src="/prompt-structure/1775111009266-fc270419-4365-4162-8188-7e7ce117d2d4.png" width="1047" title="" crop="0,0,1,1" id="u2b43220e" class="ne-image">

注意：格式补充和还是格式约束不一样 后面我们也会谈到



_以上通过两种简单方式，我们学到了，可以提高我们大语言模型的准确性的小技巧，这种设计有效的提示词以指导模型执行期望任务的方法被称为提示工程。_

_-yc_





当然，这里我们只简单的进行介绍完整性，后面我们还会补充其他方式比如知识提示， RAG，大模型上下文设置这些内容。





## 四、<font style="background-color:rgba(255, 255, 255, 0)">提示词要素</font>
一般在常规的提示词（日常使用中）我们一句话就描述了一个指令，

实际上一个最基础的提示词也就是由一个要素构成的，但是为了让我们的提示词更清晰我们可能还需要其他的提示词元素来帮助我们。

#### <font style="background-color:rgba(138, 208, 255, 0.1)">4.1、指令</font>
<font style="background-color:rgba(138, 208, 255, 0.1)">指令实际上是任务指令和输出指示组成</font>

:::info
帮我写一首诗

:::

帮我写是<font style="background-color:rgba(138, 208, 255, 0.1)">任务指令，</font>一首诗则是<font style="background-color:rgba(138, 208, 255, 0.1)">输出指示</font>

<font style="background-color:rgba(138, 208, 255, 0.1)">以下使用 kimi 生成</font>

<img src="/prompt-structure/1773911181077-f771d09c-f19b-4c22-aa5c-b63854739804.png" width="832" title="" crop="0,0,1,1" id="u3377a65e" class="ne-image">

好吧，看来它是记住了我们前面学的给 LLM 提示，要完整的内容了

我们切换一个模型，使用元宝

以下使用的是混元模型

<img src="/prompt-structure/1773911339668-a63ec003-a40a-4df1-a451-9ff67fbecbf4.png" width="975" title="" crop="0,0,1,1" id="u6c85d90a" class="ne-image">

ok，他就比较单纯了，写了，^_^

<font style="background-color:rgba(138, 208, 255, 0.1)">这当然是为了方便快捷，当需求明确固定且工程化，那只有清晰的表达才可以清晰的完成。</font>

<font style="background-color:rgba(138, 208, 255, 0.1)"></font>

<font style="background-color:rgba(138, 208, 255, 0.1)"></font>

<font style="background-color:rgba(255, 255, 255, 0)">此外提示词的要素可能还有，两类</font><font style="background-color:rgba(138, 208, 255, 0.1)">额外信息和限制</font>

#### <font style="background-color:rgba(138, 208, 255, 0.1)">4.2、 </font><font style="background-color:rgba(138, 208, 255, 0.1)">额外信息</font>
###### <font style="background-color:rgba(138, 208, 255, 0.1)">4.2.1、</font><font style="background-color:rgba(255, 255, 255, 0)">场景</font>
:::info
<font style="background-color:rgba(255, 255, 255, 0)">文本：这个苹果好吃。</font>

<font style="background-color:rgba(138, 208, 255, 0.1)">请将文本分为中性、否定或肯定的情绪</font>

<font style="background-color:rgba(255, 255, 255, 0)"></font>

:::

<font style="background-color:rgba(255, 255, 255, 0)"></font>

###### <font style="background-color:rgba(138, 208, 255, 0.1)">4.2.2、 </font><font style="background-color:rgba(255, 255, 255, 0)">上下文</font>
<font style="background-color:rgba(255, 255, 255, 0)">包含外部信息或额外的上下文信息，引导语言模型更好地响应。</font>

<font style="background-color:rgba(138, 208, 255, 0.1)">给出场景描述。然后你去指令和约束写出想得到的结果</font>

:::info
背景信息：刚才和客户沟通，客户觉得价格太高，有点犹豫，我想礼貌挽留，但不降价。从 xx 语言可以看出，用户 xx 脾气比较暴躁。

帮我写一段回复客户的话术。

:::



<font style="background-color:rgba(138, 208, 255, 0.1)">场景和上下文稍稍有点区别，但是都是补充额外信息，如果确实想感觉没什么区别也不用太死板区分。</font>

<font style="background-color:rgba(138, 208, 255, 0.1)"></font>

###### <font style="background-color:rgba(138, 208, 255, 0.1)">4.2.3、 角色</font>
:::info
**<font style="background-color:rgba(0, 0, 0, 0)">角色</font>**：你是专业的 xxxx

请你 xxxx

:::

######## 
#### 4.3、限制
使用限制的目的是希望获得大模型生产内容是预期的结果，限制一般分为格式约束和禁止约束，使用限制也是提示词的一个重要要素，我们说写提示第一步是<font style="color:##DF2A3F">明确</font>且**<font style="color:##DF2A3F">完整，</font>****也就是要保持清晰，**那么一般来说为了清晰的写好提示词，请不要用模糊的概念，对应的最终返回的方法：格式约束一般是“是”的要求，而禁止要求是“否”的要求。

###### 4.3.1、格式约束
在格式约束中一般我们总体是要求是“是”的方向，也就是把大模型返回值变成想要的“形状”，无论是常用的 json 还是你想要的其他格式，

一般来说我们不要说，不要什么，我们只会明确要什么

:::info


:::



4.3.1.1、关于 json

在很多大模型都会给出专门返回 json 格式输出的，因为 json适合程序直接解析、结构化读取数据

像 OpenAI 早起版本 3.5-4 ，核心是通过`<font style="background-color:rgba(0, 0, 0, 0)">response_format</font>`参数强制指定 JSON 输出



Anthropic 的 Claude 没有专门的 JSON 格式参数，核心是通过**<font style="background-color:rgba(0, 0, 0, 0)">提示词约束</font>** + `<font style="background-color:rgba(0, 0, 0, 0)">temperature=0</font>`（降低随机性）来保证 JSON 输出。

<font style="color:rgb(28, 30, 33)">DeepSeek 提供了 JSON Output 功能，来确保模型输出合法的 JSON 字符串</font>

<font style="color:rgb(28, 30, 33)">即</font>

<details class="lake-collapse"><summary id="u247f04e7"><span class="ne-text" style="color: rgb(28, 30, 33)">JSON Output</span></summary><p id="u559995f1" class="ne-p"><span class="ne-text" style="color: rgb(28, 30, 33); font-size: 16px">1、 设置 </span><code class="ne-code"><span class="ne-text" style="color: rgb(28, 30, 33); font-size: 16px">response_format</span></code><span class="ne-text" style="color: rgb(28, 30, 33); font-size: 16px"> 参数为 </span><code class="ne-code"><span class="ne-text" style="color: rgb(28, 30, 33); font-size: 16px">{'type': 'json_object'}</span></code><span class="ne-text" style="color: rgb(28, 30, 33); font-size: 16px">。</span></p><p id="ubf8cda8c" class="ne-p"><span class="ne-text" style="color: rgb(28, 30, 33); font-size: 16px">2、 写入的系统提示词大概是这样的模版</span></p><pre data-language="plain" id="Dmcau" class="ne-codeblock language-plain"><code>xxxxxx（额外信息），解析，并以 JSON 格式输出。
示例输入：
xxxxxx（额外信息）
示例 JSON 输出：{
“key1”：v1
“key2”：v2}</code></pre><p id="u109d45a6" class="ne-p"><span class="ne-text" style="font-size: 16px">3、注意</span></p><ol class="ne-ol"><li id="uc439e49f" data-lake-index-type="0"><span class="ne-text" style="color: rgb(28, 30, 33); font-size: 16px">用户传入的 system 或 user prompt 中必须含有</span><span class="ne-text" style="color: rgb(28, 30, 33); font-size: 16px"> </span><code class="ne-code"><span class="ne-text" style="color: rgb(28, 30, 33); font-size: 16px">json</span></code><span class="ne-text" style="color: rgb(28, 30, 33); font-size: 16px"> </span><span class="ne-text" style="color: rgb(28, 30, 33); font-size: 16px">字样，并给出希望模型输出的 JSON 格式的样例，以指导模型来输出合法 JSON。</span></li><li id="u91a45646" data-lake-index-type="0"><span class="ne-text" style="color: rgb(28, 30, 33); font-size: 16px">需要合理设置 </span><code class="ne-code"><span class="ne-text" style="color: rgb(28, 30, 33); font-size: 16px">max_tokens</span></code><span class="ne-text" style="color: rgb(28, 30, 33); font-size: 16px"> 参数，防止 JSON 字符串被中途截断。</span></li></ol><p id="u7b0ff8a4" class="ne-p"><span class="ne-text" style="color: rgb(28, 30, 33); font-size: 16px">源文档内容如下 python</span></p><pre data-language="plain" id="B6hIF" class="ne-codeblock language-plain"><code>import json
from openai import OpenAI

client = OpenAI(
    api_key=&quot;&lt;your api key&gt;&quot;,
    base_url=&quot;https://api.deepseek.com&quot;,
)

system_prompt = &quot;&quot;&quot;
The user will provide some exam text. Please parse the &quot;question&quot; and &quot;answer&quot; and output them in JSON format. 

EXAMPLE INPUT: 
Which is the highest mountain in the world? Mount Everest.

EXAMPLE JSON OUTPUT:
{
    &quot;question&quot;: &quot;Which is the highest mountain in the world?&quot;,
    &quot;answer&quot;: &quot;Mount Everest&quot;
}
&quot;&quot;&quot;

user_prompt = &quot;Which is the longest river in the world? The Nile River.&quot;

messages = [{&quot;role&quot;: &quot;system&quot;, &quot;content&quot;: system_prompt},
            {&quot;role&quot;: &quot;user&quot;, &quot;content&quot;: user_prompt}]

response = client.chat.completions.create(
    model=&quot;deepseek-chat&quot;,
    messages=messages,
    response_format={
        'type': 'json_object'
    }
)

print(json.loads(response.choices[0].message.content))</code></pre></details>


**<font style="background-color:rgba(0, 0, 0, 0)">通用方案</font>**：所有模型都能适配 “样例 + 约束” 的后处理逻辑，兜底性最强。



###### 4.3.2、禁止要求
<font style="background-color:rgba(0, 0, 0, 0)">在生成图片、严肃内容、高安全场景，或是需要绝对化约束的场景中，</font>

**<font style="background-color:rgba(0, 0, 0, 0)">禁止使用 “不要”“不能” 等口语化表述</font>**<font style="background-color:rgba(0, 0, 0, 0)">，应统一使用</font>**<font style="color:##DF2A3F; background-color:rgba(0, 0, 0, 0)">禁止</font>**<font style="background-color:rgba(0, 0, 0, 0)">。</font>

<font style="background-color:rgba(0, 0, 0, 0)">严格的 “禁止” 类命令，指令效果远强于 “不要”“不能” 这类柔和表达。</font>

<font style="background-color:rgba(0, 0, 0, 0)">以下是关于禁止要求的常用提示词示例：</font>

```plain
禁止生成违法、违规、涉政、暴力、血腥、恐怖内容。
禁止生成色情、低俗、露骨、性暗示内容。
禁止生成涉及人身攻击、辱骂、歧视、仇恨言论内容。
禁止编造虚假信息、谣言、不实信息。
禁止提供违法犯罪方法、危险操作指导。
禁止泄露个人隐私、他人信息、内部数据。
禁止生成自残、自杀、危害自身或他人安全的内容。
禁止生成广告、营销、引流、诱导付费内容。
禁止使用不文明用语、脏话、网络恶俗梗。
禁止偏离任务目标，禁止答非所问。
禁止添加无关表情、符号、多余格式。
禁止模仿、冒充他人身份或官方机构发言。
禁止生成可能引起争议、引发不良引导的内容。
```



<font style="background-color:rgba(255, 255, 255, 0)">注意，提示词所需的格式取决于您想要语言模型完成的任务类型，并非所有以上要素都是必须的。</font>

<font style="background-color:rgba(255, 255, 255, 0)">所以，可以按照需要进行搭配和补充，形成</font><font style="background-color:rgba(255, 255, 255, 0)">提示词架构。</font>

<font style="background-color:rgba(255, 255, 255, 0)"></font>





## <font style="background-color:rgba(255, 255, 255, 0)">五、提示词架构</font>
整体的脉络架构格式，让提示工程师更方便阅读和补充

架构一般可以从提示词业务架构和提示词结构内容架构来分析

提示词内结构容架构就是把要素搭配成架构，

业务架构是应对如果一段提示词特别冗余，可以分开内容写，把内容分割为元内容，比如又要生成A又要生成bcdefj最后格式还要生成h 的内容，那么就可以考虑抽离了，或者其他方式了



#### 5.1、提示词结构内容架构
结构内容架构就是把一些提示词要素搭配成结构架构，

常见的如：

:::info
##角色

<示例>

*限制*

【禁止】

:::

那怎么搭配我们的提示词要素形成合理的结构呢，像##，<>和**【】这些是什么呢



###### 5.1.1、<font >结构化提示标签</font>
向上面我们看到的那些符号我们称为<font >结构化提示标签（Structured Prompt Sections）</font>

经常的你会在架构中看见的是两种结构

![画板](/prompt-structure/1773974441906-a53054e4-0ef5-41f9-8068-2b80238f7d89.jpeg)

一类是以##开头的

比如##Role，##

来源于 markdon

还有一种是

`<font style="background-color:rgba(0, 0, 0, 0)"></output_contract></font>`<font style="background-color:rgba(0, 0, 0, 0)"> 这种用类似 XML/HTML 标签包裹规则的风格。</font>

他们都是<font >结构化提示标签一种方式。</font>

<font ></font>

<font >如果你想严格区分的话，不妨叫他们</font>

**<font style="background-color:rgba(0, 0, 0, 0)">结构式和标签式（标记式提示）</font>**

ps： 不过还是一样，叫什么不重要，如果你有独特的想法的话



<font >这种结构是</font>**<font >对人类非常有用的</font>**,**<font >对大模型“本身理解能力”没有硬性语义加成</font>**

**<font >原因是大模型本身能力是不会变化的，他在训练的时候权重就已经确定了，但是这就代表这个没有用了吗，不是这样的</font>**

<font >结构化提示标签</font>**<font >对结构化和整体有提升，更核心的影响是</font>**

<font >帮助模型“分块理解”，整体更清晰更加结构化，更醒目，可以让人更清晰的写好提示词更充分发挥大模型能力</font>

<font >对模型而言，结构化的指令能减少</font>**<font style="background-color:rgba(0, 0, 0, 0)">指令漂移</font>**<font >（模型偏离核心要求）</font>

<font >就好比</font>

<font >一个学生，在学完所有内容的时候，知识已经固定了，</font>

<font >但是如果考试过程中，能很好调度自己的实力，少粗心，能够充分发挥自己的能力，这时候会拿的分数高一些，但是核心本质水平不会变化。</font>

<font >总结一下</font>

+ **<font style="background-color:rgba(0, 0, 0, 0)">模型本身的理解能力 = 先天能力，</font>**<font style="background-color:rgba(0, 0, 0, 0)">由</font>**<font style="background-color:rgba(0, 0, 0, 0)">参数量、训练数据、训练目标</font>**<font style="background-color:rgba(0, 0, 0, 0)">决定</font>
+ <font style="background-color:rgba(0, 0, 0, 0)">你加不加标签，它</font>**<font style="background-color:rgba(0, 0, 0, 0)">能懂什么、不能懂什么</font>**<font style="background-color:rgba(0, 0, 0, 0)">不会变</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">不会提升模型能力上限，</font>**<font style="background-color:rgba(0, 0, 0, 0)">模型做不到的推理、知识、逻辑，加再多标签也</font>**<font style="background-color:rgba(0, 0, 0, 0)">做不到</font>**
+ <font style="background-color:rgba(0, 0, 0, 0)">不是让它 “变聪明”，而是</font>**<font style="background-color:rgba(0, 0, 0, 0)">减少误解、提高稳定性</font>**
+ <font style="background-color:rgba(0, 0, 0, 0)">相当于</font>**<font style="background-color:rgba(0, 0, 0, 0)">划重点、分段落、标标题，</font>**<font style="background-color:rgba(0, 0, 0, 0)">让模型</font>**<font style="background-color:rgba(0, 0, 0, 0)">更容易找到你要它做什么</font>**
+ **<font style="background-color:rgba(0, 0, 0, 0)">结构化标签 = 给模型 “注意力聚焦”</font>**

<font ></font>

**<font style="background-color:rgba(0, 0, 0, 0)">结构化提示词（Structured Prompt）</font>**<font style="background-color:rgba(0, 0, 0, 0)">用标签、符号、层级把提示词分成模块：角色、任务、约束、输出格式、示例。</font>

<font >如果想让核心约束</font>**<font style="background-color:rgba(0, 0, 0, 0)">权重更高</font>**<font >，可以在## 标题后加</font>**<font style="background-color:rgba(0, 0, 0, 0)">强标识</font>**<font >（如大写 / 加粗），比如：</font>

## MANDATORY SCORING RULE (NON-NEGOTIABLE)

注意：这还是要看具体的模型情况，对某些模型生效



##的格式来源于 markdon 的一级标签，那么你在子内容就可以加####，一般推荐最多到######三级标签



**<font style="background-color:rgba(0, 0, 0, 0)"></font>**

**<font style="background-color:rgba(0, 0, 0, 0)">标记式提示 / 标签式提示</font>**<font style="background-color:rgba(0, 0, 0, 0)">像 </font>`<font style="background-color:rgba(0, 0, 0, 0)"></output_contract></font>`<font style="background-color:rgba(0, 0, 0, 0)"> 这种用类似 XML/HTML 标签包裹规则的风格。</font>

<font >分离数据</font>

<img src="/prompt-structure/1773976697716-48a4d084-f609-4553-8b6c-4671c891ad3e.png" width="251" title="" crop="0,0,1,1" id="uae93eb65" class="ne-image">

<img src="/prompt-structure/1773976649008-2f96f870-ae69-4e59-8d1a-746586566959.png" width="1001" title="" crop="0,0,1,1" id="u51be1805" class="ne-image">

<font style="background-color:rgba(0, 0, 0, 0)"></font>

<font style="background-color:rgba(0, 0, 0, 0)"></font>

<font style="background-color:rgba(0, 0, 0, 0)">一般在讨论中，这种书写一般认为是</font>**<font style="background-color:rgba(0, 0, 0, 0)">可以比较好的发挥水平，稍微比##格式好一点，当然在实际中还是需要自己去综合决定，例如在 coze 中使用的大多是##写法，并且其实这个能力还是看当初训练材料有没有大量对应的训练这样的标识，如果大模型有提起最好请对应，比如 claudecode 这样使用的<>的作为标识训练的，XML 标签格式：AI 模型训练时见过大量类似格式</font>**

**<font style="background-color:rgba(0, 0, 0, 0)"></font>**

**<font style="background-color:rgba(0, 0, 0, 0)"></font>**

**<font style="background-color:rgba(0, 0, 0, 0)">特别提醒：适合自己的才是最好的，网上有大量花里胡哨，或者看似哲学的提示词内容，本质上只要你自己可以工程化自己的提示词，那就是最好的，不能邯郸学步，亦如学我者生，似我者死。形成自己的风格，积累，突破，你会发现自己会在不段否定中进步，最后殊途同归。</font>**

**<font style="background-color:rgba(0, 0, 0, 0)"></font>**

**<font style="background-color:rgba(0, 0, 0, 0)">在实践中，你可以利用思维图的方式先创建你的 idea，然后去补充，这样也会很清晰的去梳理你的结构。</font>**

**<font style="background-color:rgba(0, 0, 0, 0)"></font>**

###### <font style="background-color:rgba(0, 0, 0, 0)">5.1.2、</font><font >角色提示</font>
<font >这种技术被称为角色提示。</font>

**<font >更高的准确性和更好的性能，量身定制的语气和风格：</font>**<font >通过指定角色，你可以影响Claude的语气、举止和沟通风格，使其更符合你的需求。例如，让Claude扮演幼儿园老师，其给出的回应会与让它扮演研究生教授时截然不同。</font>

<img src="/prompt-structure/1773976520299-4888210f-45ac-4000-b429-0d15d761890c.png" width="991" title="" crop="0,0,1,1" id="ud2a63a44" class="ne-image">

<img src="/prompt-structure/1773976545777-ef36fd15-f393-452a-aa24-2cbcae944106.png" width="991" title="" crop="0,0,1,1" id="uf13b56f3" class="ne-image">

<img src="/prompt-structure/1773976564099-bd3c92b0-f922-4380-8ad8-a18226178b87.png" width="994" title="" crop="0,0,1,1" id="uc03c95b1" class="ne-image">

<img src="/prompt-structure/1773976570815-8acc9403-56db-4584-a095-1019d4ced9e6.png" width="998" title="" crop="0,0,1,1" id="u95efbd88" class="ne-image">

+ **<font >Be specific:</font>**<font > </font><font >Provide clear and detailed context about the role you want Claude to play. The more information you give, the better Claude can understand and embody the desired role.</font>**<font >要具体：</font>**<font >提供关于你希望Claude扮演的角色的清晰且详细的背景信息。你提供的信息越多，Claude就越能理解并体现出你期望的角色。</font>
+ **<font >Experiment and iterate:</font>**<font > </font><font >Try different roles and variations of your prompts to find the best approach for your specific use case. Prompt engineering often involves experimentation and iteration to achieve optimal results.</font>**<font >试验和迭代：</font>**<font >尝试不同的角色和提示词变体，以找到适合您特定使用场景的最佳方法。提示词工程通常需要通过试验和迭代来获得最佳结果。</font>

<font ></font>

<font ></font>

###### <font style="background-color:rgba(0, 0, 0, 0)">5.1.2、</font><font >步骤提示</font>
在处理单任务<font >复杂任务时，可以考虑将指令分解为</font>**<font >编号步骤</font>**<font >或</font>**<font >项目符号。</font>**

<img src="/prompt-structure/1773975891577-f6ded4b7-66a4-42a6-9137-632cbb610fd4.png" width="970" title="" crop="0,0,1,1" id="hmyeS" class="ne-image">

你可以将你的内容去分点去描述，这样可以拆分复杂的任务

<font ></font>

###### <font style="background-color:rgba(0, 0, 0, 0)">5.1.3、结构化 Prompt 优化框架</font>
"优化"框架只是在特定的场景下，给与的一种书写步骤，但是实际情况还要根据整体去把控，但是在写提示词初期，我们依然建议可以套用这些场景

学其术再到忘其术学其神，直接忘，那肯定是不可取的

下面介绍一些常见的“标准化公式”

######## <font style="background-color:rgba(0, 0, 0, 0)">5.1.3.1、</font>**<font style="background-color:rgba(0, 0, 0, 0)">PRO 结构</font>**
**<font style="background-color:rgba(0, 0, 0, 0)">极简三要素</font>**

+ **<font style="background-color:rgba(0, 0, 0, 0)">P</font>**<font style="background-color:rgba(0, 0, 0, 0)">urpose（目的）</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">R</font>**<font style="background-color:rgba(0, 0, 0, 0)">ules（规则）</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">O</font>**<font style="background-color:rgba(0, 0, 0, 0)">utput（输出）</font>

```yaml
【Purpose】{一句话说明任务目标}
【Rules】{列出所有约束、受众、风格、禁忌、关键点}
【Output】{明确格式、数量、长度、结构}
```

<font ></font>

<font >标准化框架工具请看附章  
</font>

######## <font style="background-color:rgba(0, 0, 0, 0)">5.1.3.2、ICIO 结构</font>
比较基础的,最接近 “输入→处理→输出” 的计算机底层逻辑，**<font style="background-color:rgba(0, 0, 0, 0)">极简、通用、无冗余</font>**

**<font style="background-color:rgba(0, 0, 0, 0)">简单的说指令如：    把，桌子上，水，（喝了，洒了，画出来）</font>**

+ **Instruction（指令）**：核心任务，必须用「动词开头」，明确告诉AI“做什么”，不模糊、不绕弯，比如“分析”“改写”“生成”“校验”“总结”“翻译”。
+ **Context（背景）**：补充上下文，让AI理解场景、约束条件、角色定位、目标受众等，避免AI误解需求。比如“用于公司内部培训”“面向刚入职的运营”“需符合品牌调性，不使用网络热词”。
+ **Input Data（输入数据）**：AI需要处理的原始素材，必须具体、完整，比如待改写的文本、待分析的数据、待落地的需求原文，是AI执行任务的基础。
+ **Output Indicator（输出引导）**：明确输出的格式、风格、长度、结构，限定AI的输出边界，避免自由发挥。比如“分3点输出，每点不超过50字”“用正式商务风格，生成表格格式”“改写后保留原文核心信息，字数精简20%”。

```yaml
【Instruction】改写产品宣传文案，适配朋友圈短文案场景。
【Context】产品是家用小型破壁机，受众是25-35岁宝妈，风格要亲切、接地气，突出“小巧、易清洗”核心卖点，不使用专业术语。
【Input Data】原文案：本款家用破壁机，体积小巧，容量300ml，食品级材质，一键破壁，易拆卸清洗，适合单人/双人使用，高效便捷。
【Output Indicator】生成2条文案，每条18字内，口语化，带场景感，突出“宝妈适用”“易清洗”，可加简单表情（不超过1个）。
```

######## <font style="background-color:rgba(0, 0, 0, 0)">5.1.3.3、ROLE 结构</font>
大厂最爱的工程化提示词框架，本质是我们上面说的角色提示的一种，

注：像国内的 coze、千问、kimi 的一些提示词就比较喜欢这样的结构

**<font style="background-color:rgba(0, 0, 0, 0)">R：Role（角色）</font>** → 给 AI 设定专业身份

**<font style="background-color:rgba(0, 0, 0, 0)">O：Output（输出要求）</font>** → 明确产出内容、长度、格式

**<font style="background-color:rgba(0, 0, 0, 0)">L：Logic（逻辑 / 步骤）</font>** → 执行思路、推理流程、约束规则

**<font style="background-color:rgba(0, 0, 0, 0)">E：Example（示例）</font>** → 给 1 个参考样例，对齐风格与格式

```yaml
Role：你是一位【专业身份】，擅长【核心能力】。
Output：请输出【内容类型】，要求【长度/格式/语言/结构】。
Logic：请按【步骤1→步骤2→步骤3】执行，遵守【规则1、规则2】。
Example：参考格式如下：【简短示例】
```

######## <font style="background-color:rgba(0, 0, 0, 0)">5.1.3.4、COSTAR 结构</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">C</font>**<font style="background-color:rgba(0, 0, 0, 0)">ontext（背景）</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">O</font>**<font style="background-color:rgba(0, 0, 0, 0)">bjective（目标）</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">S</font>**<font style="background-color:rgba(0, 0, 0, 0)">tyle（风格）</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">T</font>**<font style="background-color:rgba(0, 0, 0, 0)">one（语气）</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">A</font>**<font style="background-color:rgba(0, 0, 0, 0)">udience（受众）</font>
+ **<font style="background-color:rgba(0, 0, 0, 0)">R</font>**<font style="background-color:rgba(0, 0, 0, 0)">esponse（输出格式）</font>

<font style="background-color:rgba(0, 0, 0, 0)">以下是 GPT-4 官方推荐的标准 COSTAR 提示词结构，可直接套用：</font>

```yaml
【Context】请基于以下背景信息：{补充具体背景、资料、场景}
【Objective】请完成以下任务：{明确要做什么}
【Style】内容风格要求：{专业/口语/故事/教程/分析/清单等}
【Tone】整体语气：{正式/轻松/幽默/严谨/温和/权威等}
【Audience】目标受众：{初学者/行业专家/职场人士/学生等}
【Response】输出格式：{分点/表格/段落/代码/标题层级/字数限制等}
```

```yaml
背景：{背景}
目标：{任务}
风格：{风格}
语气：{语气}
受众：{对象}
格式：{结构/长度}
```

######## 5.1.3.5、其他
还有比如 RASCEF、TRACE、PREP、CRISPE、RAP 、ELI5（Explain It Like I’m 5）、TORE、SELF、SAFE、CREA、包括我们后面重要的 COT、整体的SPC 等等

######## 所以本身这些结构就是比较繁杂的，甚至你可以命名自己形成风格的一套结构，但是写好提示词核心是不变的：明确、清晰、完整、结合我们的提示词要素。如果使用相对于一些比较繁杂的结构，设计的提示词较长，就属于简单任务过度设计。只涉及简单中等任务，不建议在这块学习成本过高。


#### 5.2、提示词业务架构
业务内容上可以考虑不同的角度去考虑

核心是构建标准化、可复用、可迭代的提示词体系，实现从 “零散指令” 到 “工程化生产” 的升级



所以每个业务不同，对应的提示词必然也是有偏差的，其中，标准和可复用极其重要，但是对于不同场景下，也要从不同维度去思考

> 这也是为什么我个人没有过多关注互联网文章中的“30个完美提示”的原因，因为我认为可能没有适用于所有情况的完美提示。开发一个适用于您特定应用程序的好提示的流程比任何其他事情都更重要。
>
> ---吴恩达讲 prompt
>



一般来说考虑的是两方面

使用场景

使用程度



###### 5.2.1、 使用场景：
+ <font style="background-color:rgba(0, 0, 0, 0)">内容生产类：文案、新闻、文案、短视频脚本、小说、SEO 文章</font>
+ <font style="background-color:rgba(0, 0, 0, 0)">办公效率类：总结、翻译、润色、表格生成、PPT 大纲</font>
+ <font style="background-color:rgba(0, 0, 0, 0)">技术开发类：代码生成、代码解释、Bug 排查、架构设计</font>
+ <font style="background-color:rgba(0, 0, 0, 0)">运营营销类：广告语、活动方案、用户画像、话术脚本</font>
+ <font style="background-color:rgba(0, 0, 0, 0)">专业服务类：法律咨询、医疗科普、教育题库、财务分析</font>

<font style="background-color:rgba(0, 0, 0, 0)">等等</font>

<font style="background-color:rgba(0, 0, 0, 0)">只有明确业务才可以写好提示词，也就是不只是提示词的角色是角色，写好一个提示词，你本身也要扮演好一个角色，你了解你的业务，去学习你的业务，这样，你才可以写的更好。</font>



###### 5.2.2、使用程度
使用程度就看灵活度和技术配置

看整体提示词是作为全场景，还是部分去使用，是替换成为“中间层”还是“顶端”还是全流程解决,这样在不同的场景下，复杂度结合整体的 提示词数量去综合考虑消耗，包括业务的中的折中方案。

从当前技术背景下，一般是全用大模型去解决问题是比较困难的，或者消耗 token 的，此时会结合一些代码，那么在配置的过程中，可以在开始配置比较轻的提示词，这样对 后面的调试也会很优好，但是，如果是完全用大模型去解决问题，那么应当适当的全面考虑。

######## 5.2.2.1、<font >Prompt模板</font>
在当前和代码结合的提示词工程场景下，为了提高复用性，产生了一种固定格式＋灵活参数变量的<font >Prompt模板</font>

```yaml
请使用${style}风格写一篇${number}字以内，关于${content} 的文案。
```

整体大部分变量环境是结合 js 代码或者是 python 为主的，混合代码变量的，在工程上、代码设计使用中，是及其频繁用到的，你可以在自己的业务场景下使用自己创建的<font >Prompt模板或者使用三方的模版库进行长期设计。</font>



<font >在构建大语言模型应用时，为不同业务场景反复构建和调整结构相似的 Prompt 耗时且难以维护。通过使用 Prompt 模板，可将 Prompt 的固定结构与动态变量分离，创建可复用的模板，以实现Prompt的统一管理和优化，高效生成Prompt。</font>

<font >--阿里云百炼 prompt</font>

<font ></font>

<font ></font>

<font >回顾一下本章的内容</font>

<font >首先明确你的目标、业务</font>

<font >-->能清楚完整的说出你的指令，有方向性的知道要的结果是什么</font>

<font >确定好你的提示词要素、架构</font>

<font >-->这里就是你的提示词的技巧</font>

<font >学到这里，可以说已经入门了提示词了</font>

<font ></font>

<font ></font>

<font >本章参考</font>

[https://help.aliyun.com/zh/model-studio/prompt-template?spm=a2c4g.11186623.help-menu-2400256.d_1_2_0.540e5b99upsJDk&scm=20140722.H_2589889._.OR_help-T_cn~zh-V_1](https://help.aliyun.com/zh/model-studio/prompt-template?spm=a2c4g.11186623.help-menu-2400256.d_1_2_0.540e5b99upsJDk&scm=20140722.H_2589889._.OR_help-T_cn~zh-V_1)
