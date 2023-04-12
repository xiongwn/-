![图片](./asset/screenshot_0)


# 简介

stable diffusion是一个基于python深度学习的text-image开源项目。该项目的主要功能包括文字描述生成图片，图片生成图片，低像素图片高清化，模型训练等功能。其基本工作原理是通过描述，利用本地现有模型文件基于采样算法生成图片。整个交互过程依赖其本地构建的web页面

，前端的操作会修改本地env文件，本地文件如模型等也会影响web的可选项信息。本文旨在通过本地搭建环境，使用后的经验，进行一定程度的技术总结。

# 配置要求（重要）

生成图片对硬件配置要求很高，所以优先说明。

## 内存

不低于16g

## 硬盘

如果只用单一模型，硬盘空间40GB就可以了，如果要让用户可选模型。一个模型下载下来是3GB往上，latest版本通常一个7GB

## 显卡品牌

不算intel，主流显卡市场就2个牌子：amd、nv。sd本身是基于cuda核心做的加速，并且对n卡有专门的兼容处理，速度和可靠性都是最高的。a卡没有cuda，但是不是不能用于sd图像生成，但是如果部署再服务器上是否稳定就不清楚了，好处是成本比n卡低。

## 显存

sd纸面上最低要求2g显存，实际情况是4g基本不够用，sd1.5版本的model跑满占了3.7g。2.0版本直接爆显存，本人不推荐低于6g的配置。真实跑起来共享内存的部分没有调用。生成半精度大图可以选择cuda11编译的torch代替原有torch的方法改善显存占用，前提是

## 显卡型号

因为要部署到服务器，所以不涉及家用卡。建议工作站显卡配置至少高于M6000，推荐GV100。另外说一下不仅速度上，10**/16**的生成效果也不如20**/30**/40**。低型号显卡随机性也大，即使种子完全一样也很难有相似结果，最终成品不好控制。具体时间性能参考下图：

![图片]


## 实测性能

* gtx1650显卡（4g）；
* cpu默频3.9ghz；
* 模型sd官方版本模型v1.5；
* 采样步数20；
* 生成尺寸512*512；
* 循环次数1；
* 单次创建图片数1；
* 采样方法euler a；
* 平均单步时长6s；
* 最终平均生成时长2分钟；
* 测试次数6；
* 描述词：
```plain
prompt: (masterpiece:1.331), best quality,
asian male boxer,
fighter,
'ivx' tattoo on chest,
ready to fight,
exited,
boxing ring, many viewers, under the spotlight

Negative prompt: lowres,bad anatomy,bad hands,error,missing fingers,
extra digit,fewer digits,cropped,worst quality,
low quality,normal quality,jpeg artifacts,signature,
watermark,username,blurry,missing arms,long neck,
Humpbacked,missing limb,too many fingers,
mutated,poorly drawn,out of frame,bad hands,
unclear eyes,poorly drawn,cloned face,bad face
```
* 测试效果：
![图片]


# 应用场景

可以让用户输入提示词信息，或一些相关入参也让用户可以选择。这边把python代码做成接口，接收参数之后在服务器显卡上计算生成，最终生成图片上传到bucket记录地址并返回给调用端。sd有多显卡并行的功能，还没试过。按照这个方案需要将目前web的图片生成功能抽离出来单做成一个脚本。

# 参考文档

prompt语法，参数示意，基本操作等都有现成的文档，不做专门说明

[https://github.com/AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui) 官方github

[https://guide.novelai.dev/guide/install/sd-webui](https://guide.novelai.dev/guide/install/sd-webui) 入门指南，还介绍了sd的替代方案

[https://www.tjsky.net/tutorial/488](https://www.tjsky.net/tutorial/488) 如何设置

[https://civitai.com/](https://civitai.com/) 模型下载门户网站

