var RULES = [
    {id:"no-font-family", priority:0, summary:"不允许业务代码设置字体", desc:"由于业务代码中随意设置字体，导致字体取值混乱，因此不允许随意在业务代码中设置字体", checked:true},
    {id:"combine-into-one", priority:1, summary:"将多个子样式合并", desc:"有的子样式可以合并为总样式，包括<code>margin</code> <code>padding</code> <code>font</code> <code>background</code> <code>border</code>等，合并以后可以获得更好的执行效率和压缩效果，<br/>例如：<br/><code>.test {margin:4px; margin-right:0;}</code><br/><code>==></code><br/><code>.test{margin:4px 0 4px 4px}</code><br/>", checked:true},
    {id:"combine-same-rulesets", priority:0, summary:"合并两个完全相同的规则集", desc:"如果两个规则集完全一样，则可以进行合并。<br>需要指出的是：合并可能会带来功能上的问题。如果有问题，还请告知~<br>例如：<br><code>.a {width:100px}</code><br><code>.b {width:100px}</code><br><code>==></code><br><code>.a, .b {width:100px}</code><br><br><strong>安全模式下将不执行此规则</strong><br>", checked:true},
    {id:"comment-length", priority:2, summary:"注释不能超过80个字符", desc:"注释长度不能超过80个字符，40个汉字，如果超出，则应该要换行~", checked:false},
    {id:"css3-with-prefix", priority:2, summary:"CSS3前缀相关检查", desc:"CSS3属性的前缀，有的可以省略，比如：<br><code>border-radius</code><br>有的是省略，必须写全，比如：<br><code>transition</code> <code>transform</code>等<br>在编写顺序上，本工具要求按照<br><code>-webkit-,-moz-,-ms-,-o-,std</code><br>的顺序来编写，并且严格将属性的第一个字符对齐。", checked:false},
    {id:"css3-prop-spaces", priority:2, summary:"CSS3缩进相关检查", desc:"CSS3属性的缩进，必须将属性名称的第一个字符对齐。即：<br><code>-webkit-transition:3s;</code><br><code>&nbsp;&nbsp;&nbsp;-moz-transition:3s;</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;-ms-transition:3s;</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-o-transition:3s;</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;transition:3s;</code>", checked:false},
    {id:"extra-for-browsers", priority:0, summary:"嵌套规则区分浏览器", desc:"目的是针对不同的浏览器，生成不同的CSS规则集", checked:true},
    {id:"rule-for-browsers", priority:0, summary:"在属性级别区分浏览器", desc:"目的是针对不同的浏览器，生成不同的CSS", checked:true},
    {id:"ruleset-for-browsers", priority:0, summary:"在规则集级别区分浏览器", desc:"目的是针对不同的浏览器，生成不同的CSS规则集", checked:true},
    {id:"no-style-for-simple-selector", priority:0, summary:"不要为简单选择器设置样式", desc:"一些简单的选择器，比如：<br><code>.nav/.list/.content</code><br>非常容易造成属性的相互覆盖，因此在写这样的选择器时，最好加上前缀，比如<br><code>.module-name .nav</code><br><br>工具现有的简单选择器判断，请参考：<br><code>plugins/helper.py</code>", checked:true},
    {id:"no-style-for-tag", priority:0, summary:"不要为html tag设置样式", desc:"除了重置 CSS(如Reset.css) 的相关设置，其他代码一律不允许为html tag设置样式。", checked:true},
    {id:"outline-zero", priority:1, summary:"修复outline:none", desc:"<code>outline:none</code> 和 <code>outline:0</code> 实现了相同的功能，但是后者的代码更简洁，便于压缩。", checked:true},
    {id:"font-unit", priority:0, summary:"字体的单位必须用px或pt", desc:"字体的单位可以有很多种，比如 <code>px pt em %</code> 等等，为了统一取值，统一要求为 <code>px/pt</code> ， 例如：<br><code>font-size: 12px;</code><br><code>font-size: 14pt;</code>", checked:true},
    {id:"hack-prop", priority:0, summary:"hack属性时的检查", desc:"必须使用正确的 hack 方式， 比如 <code>_ * +</code> 等，其他的属性前缀一律不允许", checked:true},
    {id:"hack-ruleset", priority:0, summary:"hack规则时的检查", desc:"针对Firefox Opera Safari等浏览器的 hack 方式， <strong>人人FED CSS编码规范</strong>中有详细的描述， 不允许使用规定之外的方式进行规则级别的hack", checked:true},
    {id:"hexadecimal-color", priority:1, summary:"16进制颜色大写&缩写", desc:"<p>浏览器会先将小写的颜色值转换成大写，所以写成大写格式可以省略这部分的开销，并且尽量省略，例如：</br><code>color:#ffffff; </code><br/><code>==></code><br/><code>color:#FFF;</code></p>", checked:true},
    {id:"high-perf-selector", priority:0, summary:"针对低性能的选择器的检查", desc:"低性能选择器，害人害己还集体，本工具收集了一些低性能选择器的情形，具体请参见：<br><code>FEDHighPerformanceSelector.py</code>中的相关内容", checked:true},
    {id:"multi-line-brace", priority:2, summary:"多行CSS风格的括号检查", desc:"用于检查多行风格下的 <code>{</code> 和 <code>}</code> 的编写风格，前后空格符和回车符的情况等。", checked:false},
    {id:"multi-line-selector", priority:2, summary:"多行CSS风格的选择器检查", desc:"多行风格下，每一个选择器单独占一行，并以逗号结尾，例如：<br><code>.a,</code><br><code>.b,</code><br><code>.c {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;width: 100px;</code><br><code>}</code>", checked:false},
    {id:"multi-line-space", priority:2, summary:"CSS多行风格的空格检查", desc:"多行风格下，CSS的空格检查包括：<ol><li>选择器的空格</li><li>属性的空格</li><li>结尾}的空格</li></ol>具体请参见人人相关的CSS规范", checked:false},
    {id:"add-author", priority:0, summary:"需要在文件中添加作者信息", desc:"需要在文件中添加作者的信息，本工具认可的作者信息是在文件顶部的注释中添加 <code>@author:xxx</code>", checked:true},
    {id:"no-alpha-image-loader", priority:1, summary:"不要使用AlphaImageLoader", desc:"<code>AlphaImageLoader</code> 主要用于在IE6下显示半透明图片，此举实际上费力不讨好，对IE的性能影响极大，为了更好地实现网页的 <strong>渐进增强</strong> ，建议不要使用 <code>AlphaImageLoader</code>", checked:true},
    {id:"no-appearance-word-in-selector", priority:1, summary:"选择器中避免表现相关的词汇", desc:"避免将在selector中出现 <code>.red</code> <code>.left</code> 等描述性词汇，用具体的实际意义来代替，比如 <code>.error</code> <code>.sidebar</code> ", checked:true},
    {id:"no-comment-in-value", priority:2, summary:"不要在css属性中添加注释", desc:"CSS的注释应该写在 <code>selector</code> 前面，属性中不允许添加css注释，例如：<br><code>.selector {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;width: 100px;/*comment here*/</code><br><code>}</code>", checked:false},
    {id:"no-empty-ruleset", priority:0, summary:"删除空的规则", desc:"空的CSS规则集是没有任何意义的，应该直接删除掉", checked:true},
    {id:"no-expression", priority:0, summary:"不要使用非一次性表达式", desc:"IE下，非一次性expression对性能有很大的影响，或许一次鼠标移动，将触发<strong>成千上万次</strong>的expression表达式的执行，因此，为了浏览器的更新换代，应该杜绝使用非一次性表达式。<br>本工具针对一次性表达式的检查，将判断expression中是否有如下两个内容：<br>1. <code>Expressions</code><br>2. <code>this.style.attrName = </code>", checked:true},
    {id:"number-in-selector", priority:1, summary:"不要在选择器中使用简单数字", desc:"在业务代码的css中，选择器中不要使用简单的 <code>1, 2, 3</code> 来进行命名，下面的命名方式就是错误的：<br><code>.test1</code> <code>.main1</code>，但是允许使用 <code>v1</code> <code>step1</code> <code>item1</code> 来代表版本、步骤、第几个元素的意思", checked:true},
    {id:"no-star-in-selector", priority:0, summary:"不要在选择器中使用星号", desc:"禁止在选择器中加入<code>*</code>来选择所有元素，例如：<br><br><code>*html</code> <code>*+html</code> <code>*:not</code>等几种特殊hack除外", checked:true},
    {id:"del-unit-after-zero", priority:1, summary:"删除0后面的单位", desc:"0后面的单位可以删除，以实现更好的压缩。比如 <code>0px ==> 0</code> ，<code>0em ==> 0</code> 等，但是<code>transition: 0s</code>的<code>s</code>不能省略", checked:true},
    {id:"no-zero-before-dot", priority:1, summary:"删除0.x前面的0", desc:" 0.xxx 前面的 0 是可以删除的，以实现更好的压缩。例如<br><code>0.3px ==> .3px</code><br><br><code>rgba(0,0,0,0.3)<code><br><code>==></code><br><code>rgba(0,0,0,.3)</code>", checked:true},
    {id:"remove-duplicated-attr", priority:0, summary:"删除重复的属性设置", desc:"如果在一个规则集中，对相同的两个属性进行了赋值，而且取值相同，则可以删除前面的赋值，例如：<br><code>.test {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;width: 100px;</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;width: 100px;</code><br><code>}</code><br><code>==></code><br><code>.test {</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;width: 100px;</code><br><code>}</code>", checked:true},
    {id:"no-border-zero", priority:1, summary:"用border:none替换border:0", desc:"<code>border:0</code> 实际上是有border的，只不过宽度为0， 而 <code>border:none;</code> 是根本没有border的，对于浏览器来说后者的效率高，但是要注意，后者的代码长度稍微长一些。", checked:true},
    {id:"no-underline-in-selector", priority:1, summary:"不要在选择器中使用下划线", desc:"在selector中不要使用下划线 <code>_</code> ，可以使用中划线 <code>-</code>", checked:true},
    {id:"add-semicolon", priority:1, summary:"为每一个属性后添加分号", desc:"按照CSS编码规范，每一个规则后面都必须加上分号 <code>;</code>", checked:true},
    {id:"do-not-use-important", priority:0, summary:"不要使用!important", desc:"CSS中不要使用<code>!important</code>", checked:true},
    {id:"single-line-brace", priority:2, summary:"单行的括号检查", desc:"与单行CSS编码风格相关的括号检查", checked:false},
    {id:"single-line-selector", priority:2, summary:"单行的选择器检查", desc:"单行的选择器检查内容，请参考多行选择器检查和人人FED CSS编码规范", checked:false},
    {id:"single-line-space", priority:2, summary:"单行的空格检查", desc:"单行CSS编码风格相关的空格检查，具体内容请参见CSS编码规范", checked:false},
    {id:"keep-in-order", priority:1, summary:"属性应该按照推荐的顺序编写", desc:"相同的CSS属性，如果按照推荐的顺序来编写，浏览器的处理性能会更高，推荐的顺序一般为：<br>显示属性 => 盒模型属性 => 背景/行高 => 文本属性 => 其他", checked:true},
    {id:"no-chn-font-family", priority:0, summary:"字体设置时使用英文", desc:"有的字体设置可以通过中文和英文两者方式来声明，比如<br><code>微软雅黑</code> 和 <code>Microsoft Yahei</code> ，我们推荐用英文的方式来实现", checked:true},
    {id:"unknown-css-prop", priority:0, summary:"错误的css属性", desc:"本工具会帮您查找错误的CSS属性，如果写错了，即可收到错误提示", checked:true},
    {id:"unknown-html-tag", priority:0, summary:"错误的HTML Tag", desc:"如果您输入了错误的HTML Tag，本工具也会给出响应的提示", checked:true},
    {id:"lowercase-prop", priority:1, summary:"属性名称应该用小写", desc:"所有的CSS属性名称一律小写，例如 <code>width</code> ，大写的方式是不正确的，例如： <code>WIDTH:100px;</code>", checked:true},
    {id:"lowercase-selector", priority:1, summary:"选择器用小写字母", desc:"选择器应该用小写字母， 例如 <code>.demo</code> ， 不允许使用大写，例如： <code>.Demo .Test</code>", checked:true},
    {id:"single-quotation", priority:1, summary:"使用单引号", desc:"CSS的属性取值一律使用单引号<code>'</code>， 不允许使用双引号", checked:true},
    {id:"valid-values", priority:0, summary:"不正确的属性取值", desc:"检查不正确的属性取值，比如： <code>width: underline;</code> 等", checked:true},
    {id:"z-index-in-range", priority:0, summary:"z-index取值应符合范围要求", desc:"<code>z-index</code> 的取值如果混乱，则会造成层之间的相互覆盖，因此 <code>z-index</code> 取值必须符合一定的范围要求，具体要求请参见人人FED CSS编码规范", checked:true}
];