
# 前言
最近看到一个案例，初看的时候对产品经理说很简单，是一个长页面，底图上有按钮，按了之后有素材动效，这对于前端来说是最基础的功能。后来定睛一看发现，还有微信阅读数和评论，发现事情并不简单。整个交互层全都在公众号文章里，这可是新鲜，翻了一下评论发现有不少同行在问是如何实现的，结果作者很得意地笑而不答，直到看到有人提到svg。有关键字就好办了，上网一查确实是黑科技，利用了微信文章富文本编辑的一个——漏洞？亲自上手之后发现确实可行，写一个简单的教程希望对大家有所帮助。

# 准备工作
+ 大家要有订阅号或服务号，能正常发送公众号文章；
+ 在线svg编辑工具、html编辑器，在做正式推送的时候方便调试；
+ 背景图片，推荐实际像素在640px+，其作用是设置svg的css->background。

# 编写svg
svg标签最外层如下：<br>
```
<svg style="display: inline-block;width: 100%;background-image:url("https://mmbiz.qpic.cn/mmbiz_jpg/3ncjibLbkcT5B5AVicjgw06P2biaywPFGEGOiaHao8M8dXByoZULpicK9w0ctICMiak5AzsKB5qCcVw2hicS51NPkUIhA/640?wx_fmt=jpeg");background-size: 100%,100%;background-repeat: no-repeat;" version="1.1" viewBox="0 0 640 800" xmlns="http://www.w3.org/2000/svg">
</svg>
```
这里要注意的是必须使用微信素材库内的图片，因此需要事先将背景图存入素材库。微信素材库内的图片不可在外部引用，因此直接在外部编辑器打开这个svg是无法正常显示背景图的，不过不用担心，最终在微信渲染的版本会正常显示<br>
还有一个要点就是`viewBox`这个属性，对svg舞台有了解的同学应该知道这个viewBox的具体工作原理，`viewBox="x,y,width,height"`x和y控制svg元素内的基准点，width和height控制viewBox的分辨率，svg的实际宽高需要在style属性内设置。

接着使用g标签控制svg内的分组：
```
<svg 属性省略>
<g transform="translate(200,220)" style="opacity:0.1"></g>
</svg>
```
`<g>`标签中控制transform需要用专门的transform属性，否则svg的动画无法正常运作，这里设置了css的透明度，是为了之后展示`animate`和`animateTransform`用法的区别。<br>
接着添加内部的svg，通常使用`<path>`标签，其中的`d`属性表示绘制路径，这里涉及起始点、结束点、直线点、贝塞尔曲线中间点等信息，手绘难度很大，所以切图时建议切成svg格式并导出，把绘制路径复制到属性内就可以了，目前的svg如下：<br>
```
<svg 属性省略>
<g transform="translate(200,220)" style="opacity:0.1">
<path d="M45,11.5H33.333c0.735-1.159,1.167-2.528,1.167-4C34.5,3.364,31.136,0,27,0s-7.5,3.364-7.5,7.5c0,1.472,0.432,2.841,1.167,4H9l-9,32h54L45,11.5z M22.5,7.5C22.5,5.019,24.519,3,27,3s4.5,2.019,4.5,4.5c0,1.752-1.017,3.257-2.481,4h-4.037 C23.517,10.757,22.5,9.252,22.5,7.5z" />
</g>
</svg>
```

接下来再添加动效，先添加`<animate>`标签`<animate attributeName="opacity" values="0.1;1" dur="1s" begin="click"/>`
animate是用来控制非transform属性的css属性，具体大家可以参考[animate标签MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/animate)attributeName是css的属性名称，我直接使用value属性控制值的渐变过程，大家也可以使用from，to属性来控制，begin可以设置为某一秒，也可以设置click事件，即用户点击开始动画。

再添加`<animateTransform>`标签:
```
<animateTransform attributeName="transform" type="translate" from="0 0" to="-47 -38" dur="1s" additive="sum" begin="click"></animateTransform>
<animateTransform attributeName="transform" type="scale" from="1" to="3" dur="1s"  additive="sum" begin="click"></animateTransform>
```
`<animateTransform>`标签在控制scale的时候会以图形的(0,0)点作为基准点，可以通过transformOrigin设置也可以像我一样添加一个反向位移的动画相互抵消，最终的结果是按中心放大，这里需要注意的是translate的结束值，需要根据图形的具体大小来设置，方向都为负。到这里svg的最终结果是：
```
<svg style="display: inline-block;width: 100%;background-image:url("https://mmbiz.qpic.cn/mmbiz_jpg/3ncjibLbkcT5B5AVicjgw06P2biaywPFGEGOiaHao8M8dXByoZULpicK9w0ctICMiak5AzsKB5qCcVw2hicS51NPkUIhA/640?wx_fmt=jpeg");background-size: 100%,100%;background-repeat: no-repeat;" version="1.1" viewBox="0 0 640 800" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(200,220)" style="opacity:0.1">
        <animateTransform attributeName="transform" type="translate" from="0 0" to="-47 -38" dur="1s" additive="sum" begin="click"></animateTransform>
        <animate attributeName="opacity" values="0.1;1" dur="1s" begin="click"/>
        <animateTransform attributeName="transform" type="scale" from="1" to="3" dur="1s"  additive="sum" begin="click"></animateTransform>
    <path d="M45,11.5H33.333c0.735-1.159,1.167-2.528,1.167-4C34.5,3.364,31.136,0,27,0s-7.5,3.364-7.5,7.5c0,1.472,0.432,2.841,1.167,4H9l-9,32h54L45,11.5z M22.5,7.5C22.5,5.019,24.519,3,27,3s4.5,2.019,4.5,4.5c0,1.752-1.017,3.257-2.481,4h-4.037 C23.517,10.757,22.5,9.252,22.5,7.5z" />
</g>
</svg>
```
点击中间的图形，看一下效果：
![](https://file3.ih5.cn/v35/files/8ea95b5186ccbde3363776d8f21558e6_2735_390_377.png)

# 添加至微信
打开微信文章编辑页，由于微信规定文章必须有文本，我们随便写点介绍或引导语就ok了：
![](https://privatecdn.h5sys.cn/v35/files/8615543ec4295d294ed6e1abd8353a58_5143_518_173.png)

按f12打开开发者模式指向对应的任意一段富文本内容元素，选择edit as html：
![](https://privatecdn.h5sys.cn/v35/files/ea14c58a6ce9102b337ae5ea2413027c_5137_261_157.png)

将刚才编辑好的svg全部替换进去：
![](https://privatecdn.h5sys.cn/v35/files/5559599cd3812372bba71806f1078123_12657_189_311.png)

点击其他元素失焦以让html保存修改，看到编辑页面已经有正常显示，并且已有点击互动效果：
![](https://privatecdn.h5sys.cn/v35/files/588b61ec2bdddb0541562a4e2db46be9_297465_421_389.png)

最后记得点击保存按钮。这里还有一点要注意，`background-image:url()`里的url不能加引号，否则图片地址会被强转，引号会变成`&quot`。

有了这个功能之后就不用再去开发一个h5再做跳转了，用户可以直接在当前页评论互动，不需要将资源挂载到服务器，节省开发成本和开发时间。应用场景可以有：

+ 长图+交互
+ 选择题选后展示答案
+ 开幸运饼
+ 拆信类动画展示
+ 互动游戏
+ 。。。

用在公众号里会很吸引眼球，快去试试吧！

【转载请注明出处】