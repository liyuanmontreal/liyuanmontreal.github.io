# 如何使用GitPage与GitPress搭建个人博客

GitHub是一个代码托管平台和开发者社区，开发者可以在Github上创建自己的开源项目并与其他开发者协作编码。GitHub中有一项Page功能，允许用户自定义项目首页，用来替代默认的源码列表。而GitPress是基于GitHub的内容托管服务的博客发布平台。

我们可以利用上述功能来发布个人网站，并将网站源文件托管在GitHub上。同时，使用GitPress来自动同步GitHub上所发表的文章，创建个人博客。

本文是一篇学习笔记。我在搭建的过程中没有截图。因此本文部分内容和图片直接引用自以下两篇文章，读者也可以自行查阅参考。
  
  文章一:[三分钟在GitHub上搭建个人博客](https://zhuanlan.zhihu.com/p/28321740)

 文章二：[这个基于 GitHub 的博客系统，让你能一键快速搭建个人博客](https://zhuanlan.zhihu.com/p/58966004)



## Part I  使用 GitPage 发布个人网站

### step 1: 创建GitHub账号
首先，我们需要创建GitHub账号，以便将网站文件托管至GitHub上。

[图1](https://github.com/liyuanmontreal/liyuanmontreal.github.io/blob/main/articles/article1_1.jpg)


[图2](https://github.com/liyuanmontreal/liyuanmontreal.github.io/blob/main/articles/article1_2.png)

[图3](https://github.com/liyuanmontreal/liyuanmontreal.github.io/blob/main/articles/article1_3.jpg)

[图4](https://github.com/liyuanmontreal/liyuanmontreal.github.io/blob/main/articles/article1_4.png)

[图5](https://github.com/liyuanmontreal/liyuanmontreal.github.io/blob/main/articles/article1_5.jpg)



### step 2: 创建Repository
   
拥有GitHub账号后，用户可以创建不同的repository来托管不同的项目。这里我们需要创建一个repository来存放个人网站的数据。
  
  [图6](https://github.com/liyuanmontreal/liyuanmontreal.github.io/blob/main/articles/article1_6.jpg)
  
  这里需要为repository指定名称。我们可以输入用户名。
用户名.github.io，这将是未来个人网站的访问地址。
  
  [图7](https://github.com/liyuanmontreal/liyuanmontreal.github.io/blob/main/articles/article1_7.jpg)
 



### step 3: set GitPage templete
 选择Setting
  
   [图8](https://github.com/liyuanmontreal/liyuanmontreal.github.io/blob/main/articles/article1_8.jpg)
  
  找到GitPage配置页面
  
 [图9](https://github.com/liyuanmontreal/liyuanmontreal.github.io/blob/main/articles/article1_9.jpg)
  
  设置source，选择博客主题
  
   [图10](https://github.com/liyuanmontreal/liyuanmontreal.github.io/blob/main/articles/article1_10.jpg)

  现在个人网页已经设置成功，在浏览器中输入 用户名.github.io 就可以成功访问了。如果暂时没有显示，可以等待1、2分钟。


### step 4: update your website files
  
   在前三步中，我们已经发布了个人网页。后续如何对其修改呢？

  我们需要使用Git的功能，将repository的数据clone到本地，在本地修改后再重新push到GitHub上。安装后可以通过命令窗口对github进行操作，也可以下载Github桌面应用来进行操作，效果是一样的。此处以命令窗口的操作为例。
  
  流程如下：
   1. 首先安装Git.安装方法可以[参考此处.](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git)
   2. 打开cmd命令窗口，使用cd命令进入到你想存放网站文件的目录下。
   3. 使用 git clone 地址 命令将GitHub端的repository目录下的文件全部获取到本地。
      
      [图11](https://github.com/liyuanmontreal/liyuanmontreal.github.io/blob/main/articles/article1_11.jpg)    
4. 对网站文件进行修改。我们可以自己定制网页的内容，也可以使用现成的模板。网络上如https://html5up.net/有很多免费的模板可以下载使用。如果选择下载模板，那么进行如下操作：
    * 将本地文件夹中的文件除.git外全部删除。
    * 将下载好的模板拷贝到此目录。
    * 对模板文件按自己的需要进行修改。

5. 在cmd命令窗口，使用cd命令进入到本地的文件夹之后。使用git add .命令将所有文件提交至stage。
6. 继续使用 git commit 命令将所有文件commit。
7. 使用 git push命令将所有文件推送至github端。


至此，再次在浏览器中输入 用户名.github.io 就可以看到更新后的个人网站了。

## Part II use GitPress to create a personal blog
GitPress支持markdown形式的博客文件。在完成partI 后，只需要简单的几步操作，我们就可以搭建一个样式简洁的个人博客，用来发表读书笔记、技术文章等。

### step1： 使用GitHub账号登录GitPress

 [图12](https://github.com/liyuanmontreal/liyuanmontreal.github.io/blob/main/articles/article1_12.jpg)

### step2: 设置Repository

 在welcome窗口中选择个人网站所在的Repository.此处如果设置为/则表示博客文章都存放在根目录中。我们也可以将博客文档放置在一个单独的子目录中如article.此处则需要相应设置为/article/

 [图13](https://github.com/liyuanmontreal/liyuanmontreal.github.io/blob/main/articles/article1_13.jpg)

### step3: 添加webhook
  
  由于 GitPress 是使用 webhook 的方式来同步 GitHub 上的文章，因此接下来会出现一个窗口，提示用户需要允许 GitPress 将 webhook 添加到 GitHub 仓库上。

   [图14](https://github.com/liyuanmontreal/liyuanmontreal.github.io/blob/main/articles/article1_14.jpg)

至此，就搭建完成了。完成后的界面如下。

 [图15](https://github.com/liyuanmontreal/liyuanmontreal.github.io/blob/main/articles/article1_15.jpg)
   
   当我们在GitHub端新增加一篇文章时，这里会自动更新。注意可能会有几分钟的延迟。


### 其他

1. 如何修改repository目录设置
   
   点击页面左侧的dashboard按钮，可以对repository重新进行设置。
2. GitPress提供了Collection功能
   
   GitPress还提供了Collection功能，可以将文章进行分类。

3. GitPress支持运行代码片段

   目前支持Java，Python，Ruby，Swift等，可以说非常适合进行技术博客的写作。
4. GitPress提供了评论功能
   
   没有删除评论的功能。



以上就是用GitPress搭建博客的介绍。在调查中发现，GitHub 还有其它博客搭建方式，如 Jekyll 和 Hexo。后续可以继续研究一下。整体感觉GitPress的界面简单，功能布局不是非常合理，今天我在设置目录时为了找setting的入口花费了很多时间。另外，没有账号登出功能。按照目前收集到的资料，作者后续还会继续优化，可以持续关注一下。   
此外，今天在搭建过程中，一开始没有顺利同步。我发现GitHub的SSH密钥需要设置，有可能是这个原因造成的，后续研究一下。SSH密钥的设置
方法之后另文发表。