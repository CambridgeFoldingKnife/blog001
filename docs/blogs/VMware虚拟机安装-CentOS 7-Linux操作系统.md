---
title: VMware虚拟机安装CentOS 7 Linux操作系统
date: 2025-11-05
categories:
  - 运维部署
  - 虚拟化技术
tags:
  - VMware
  - CentOS 7
  - Linux
  - 虚拟机
  - 系统安装
author: 剑桥折刀
---

# VMware虚拟机安装CentOS 7 Linux操作系统

## 一、准备Linux环境

首先，我们要准备一个Linux的系统，成本最低的方式就是在本地安装一台虚拟机。为了统一学习环境，不管是使用MacOS还是Windows系统的同学，都建议安装一台虚拟机。

windows采用VMware，Mac则采用Fusion

### 1.1 安装VMware

VMware是业界最好用的虚拟机软件之一。

windows版本的网站如下：

[https://www.vmware.com/cn/products/workstation-pro/workstation-pro-evaluation.html](https://www.vmware.com/cn/products/workstation-pro/workstation-pro-evaluation.html)

Mac下也有对应版本，叫做VMware Fusion：

[https://www.vmware.com/cn/products/fusion.html](https://www.vmware.com/cn/products/fusion.html)

特别注意，Windows10以上版本操作系统需要下载安装VMware Workstation Pro16及以上版本，安装方式此处略。

如果自己电脑上已经有了低版本的VMware，则需要先卸载，再重新安装。卸载过程比较麻烦。

#### 1.1.1 卸载旧版VMware（可选）

首先，在控制面板找到程序和功能选项，找到VMware，进行卸载操作：

<img src="./attachments/17481440873541.png" alt="img" style="zoom:50%;" />

弹出确认框, 点击"下一步":

<img src="./attachments/17481440903224.png" alt="img" style="zoom:50%;" />

下一步之后, 选择删除:

![img](./attachments/17481440925297.png)

接下来，按照提示完成卸载操作即可。

卸载完成后，还需要看看VMware的安装目录是否有旧数据，一并清理掉。

比如安装在**C盘的Program Files(x86)：**

<img src="./attachments/174814409417210.png" alt="img" style="zoom:50%;" />

则需要直接删除整个VMware目录：

<img src="./attachments/174814411173813.png" alt="img" style="zoom:50%;" />

接下来要清理注册表：

首先，按住Windows + R , 在弹出框中输入 "regedit" 调出注册表：

<img src="./attachments/174814411492516.png" alt="img" style="zoom:50%;" />

进入注册表编辑器，如图：

<img src="./attachments/174814411674619.png" alt="img" style="zoom:50%;" />

打开**`HKEY_CURRENT_USER`**文件夹，找到**`Software`**文件夹并打开

<img src="./attachments/174814411836022.png" alt="img" style="zoom:50%;" />

找到“VMware.Inc”，右键删除：

![img](./attachments/174814411972825.png)

#### 1.1.2.安装VMware

安装步骤略。。

安装以后可以免费试用，大家可以去官网购买正版许可证，或者去网上看看有没有好心人赠送你一个许可证。启动后的界面如图所示：

<img src="./attachments/174814412184828.png" alt="img" style="zoom:50%;" />

#### 1.1.3.常见错误

如果VMware虚拟机运行报错，例如：

<img src="./attachments/174814412729131.png" alt="img" style="zoom:50%;" />

这个是由于英特尔的虚拟化技术, 没有开启, 需要进入系统的BIOS界面 , 开启英特尔的虚拟化技术 ; 不同的电脑型号 , 进入BIOS界面的方式不同, 需要百度查询一下自己电脑的型号 , 如何进BIOS ;

windows10系统可以参考: [https://blog.csdn.net/biu_code/article/details/107504627](https://blog.csdn.net/biu_code/article/details/107504627)

以ThinkPad为例，如图：

<img src="./attachments/174814412892134.png" alt="img" style="zoom:50%;" />

### 1.2.创建虚拟机

Centos7是比较常用的一个Linux发行版本，在国内的使用比例还是比较高的。

大家首先要下载一个Centos7的iso文件，我在资料中给大家准备了一个mini的版本，体积不到1G，推荐大家使用：

<img src="./attachments/174814413057137.png" alt="img" style="zoom:50%;" />

我们在VMware《主页》界面中点击《创建新的虚拟机》按钮：

<img src="./attachments/174814413212340.png" alt="img" style="zoom:50%;" />

然后会弹出一个窗口，我们直接点击下一步：

<img src="./attachments/174814413417643.png" alt="img" style="zoom:50%;" />

然后页面中选择你准备好的ISO文件，继续点击下一步：

<img src="./attachments/174814413576746.png" alt="img" style="zoom:50%;" />

然后填写`虚拟机的名称`以及虚拟机将来`保存的位置`：

<img src="./attachments/174814414022349.png" alt="img" style="zoom:50%;" />

再次下一步，填写虚拟机磁盘大小。这里建议给大一点，否则将来不够用调整起来麻烦。而且这里设置大小并不是立刻占用这么多，而是设置一个上限：

<img src="./attachments/174814414220252.png" alt="img" style="zoom:50%;" />

继续下一步，然后选择虚拟机硬件设置：

<img src="./attachments/174814414401855.png" alt="img" style="zoom:50%;" />

在弹出的窗口中设置虚拟机硬件，建议CPU给到4核，内存给到8G：

<img src="./attachments/174814414559358.png" alt="img" style="zoom:50%;" />

配置完成后，点击`关闭`，回到上一页面，继续点击`完成`：

<img src="./attachments/174814414794961.png" alt="img" style="zoom:50%;" />

虚拟机就创建完毕了：

<img src="./attachments/174814415035564.png" alt="img" style="zoom:50%;" />

### 1.3.安装Centos7

接下来，我们启动刚刚创建的虚拟机，开始安装Centos7系统：

<img src="./attachments/174814415246467.png" alt="img" style="zoom:50%;" />

启动后需要选择安装菜单，将鼠标移入黑窗口中后，将无法再使用鼠标，需要按上下键选择菜单。选中Install Centos 7 后按下回车：

<img src="./attachments/174814415435470.png" alt="img" style="zoom: 67%;" />

然后会提示我们按下enter键继续：

<img src="./attachments/174814415622273.png" alt="img" style="zoom:50%;" />

过一会儿后，会进入语言选择菜单，这里可以使用鼠标选择。选择中文-简体中文，然后继续：

<img src="./attachments/174814415787876.png" alt="img" style="zoom:50%;" />

接下来，会进入安装配置页面：

<img src="./attachments/174814416008479.png" alt="img" style="zoom:50%;" />

鼠标向下滚动后，找到系统-安装位置配置，点击：

<img src="./attachments/174814416186282.png" alt="img" style="zoom:50%;" />

选择刚刚添加的磁盘，并点击完成：

<img src="./attachments/174814416415085.png" alt="img" style="zoom:50%;" />

然后回到配置页面，这次点击《网络和主机名》：

<img src="./attachments/174814416618188.png" alt="img" style="zoom:50%;" />

在网络页面做下面的几件事情：

1. 修改主机名为自己喜欢的主机名，不要出现中文和特殊字符，建议用localhost
2. 点击应用
3. 将网络连接打开
4. 点击配置，设置详细网络信息

<img src="./attachments/174814416813991.png" alt="img" style="zoom:50%;" />

最好用一个截图软件，记住上图中的网络详细信息，接下来的配置要参考：

![img](./attachments/174814417026294.png)

点击配置按钮后，我们需要把网卡地址改为静态IP，这样可以避免每次启动虚拟机IP都变化。所有配置照搬你自己截图的网络信息填写，不要照抄我的：

<img src="./attachments/174814417202497.png" alt="img" style="zoom:50%;" />

上图中的四个信息参考之前的**以太网**(ens33)网卡的截图，不要照搬我的来写。

最后，点击完成按钮：

<img src="./attachments/1748144174360100.png" alt="img" style="zoom:50%;" />

回到配置界面后，点击`开始安装`：

<img src="./attachments/1748144176269103.png" alt="img" style="zoom:50%;" />

接下来需要设置root密码：

<img src="./attachments/1748144178325106.png" alt="img" style="zoom:50%;" />

填写你要使用的root密码，然后点击完成：

<img src="./attachments/1748144180147109.png" alt="img" style="zoom:50%;" />

接下来，耐心等待安装即可。

<img src="./attachments/1748144181806112.png" alt="img" style="zoom:50%;" />

等待安装完成后，点击**重启**：

<img src="./attachments/1748144183741115.png" alt="img" style="zoom:50%;" />

耐心等待一段时间，不要做任何操作，虚拟机即可启动完毕：

<img src="./attachments/1748144185743118.png" alt="img" style="zoom:50%;" />

输入用户名root，然后点击回车，会要求你输入密码：

![img](./attachments/1748144188172121.png)

此时你要输入密码，不过需要注意的是密码是**隐藏**的，输入了也看不见。所以放心输入，完成后回车即可：

![img](./attachments/1748144189645124.png)

只要密码输入正确，就可以正常登录。此时可以用命令测试虚拟机网络是否畅通：

```Bash
ping www.baidu.com
```

如果看到这样的结果代表网络畅通：

<img src="./attachments/1748144191309127.png" alt="img" style="zoom:50%;" />

默认ping命令会持续执行，按下`CTRL `+ `C`后命令即可停止。

### 1.4.设置虚拟机快照

在虚拟机安装完成后，最好立刻设置一个快照，这样一旦将来虚拟机出现问题，可以快速恢复。

我们先停止虚拟机，点击VMware顶部菜单中的`暂停`**`下拉选框`**，选择`关闭客户机`：

<img src="./attachments/1748144193272130.png" alt="img" style="zoom:50%;" />

接着，点击VMware菜单中的🔧按钮:

<img src="./attachments/1748144195253133.png" alt="img" style="zoom:50%;" />

然后在弹出的快照管理窗口中，点击**拍摄快照**，填写新的快照信息：

<img src="./attachments/1748144197256136.png" alt="img" style="zoom:50%;" />

快照拍摄完成了！而且我们可以在不同阶段拍摄多个不同快照作为备份，方便后期恢复数据。

假如以后虚拟机文件受损，需要恢复到初始状态的话，可以选中要恢复的快照，点击转到即可：

<img src="./attachments/1748144199611139.png" alt="img" style="zoom:50%;" />

## 二、SSH客户端

在VMware界面中操作虚拟机非常不友好，所以一般推荐使用专门的SSH客户端。市面上常见的有：

- Xshell：个人免费，商业收费，之前爆出过有隐藏后门。不推荐
- Finshell：基础功能免费，高级功能收费，基于Java，内存占用较高（在1个G左右）。不推荐
- MobarXterm：基础功能免费、高级功能收费。开源、功能强大、内存占用低（只有10m左右），但是界面不太漂亮。推荐使用

### 2.1.安装MobarXterm

这里我们会选择内存占用较低的MobarXterm作为SSH客户端，其官网地址：

[https://mobaxterm.mobatek.net/](https://mobaxterm.mobatek.net/)

安装完成后界面如图所示：

<img src="./attachments/1748144204315142.png" alt="img" style="zoom: 50%;" />

点击session按钮，进入会话管理：

<img src="./attachments/1748144208326148.png" alt="img" style="zoom: 65%;" />

在弹出的session管理页面中，按照下图填写信息并保存：

<img src="./attachments/1748144205957145.png" alt="img" style="zoom:50%;" />

点击OK后会提示你是第一次连接，询问你是信任连接的服务：

<img src="./attachments/1748144213554151.png" alt="img" style="zoom:50%;" />

选择accept之后，会询问你是否要记住密码，选择yes：

<img src="./attachments/1748144215580154.png" alt="img" style="zoom:50%;" />

紧接着需要你设置一个MobarXterm的全局密码用于做密码管理，建议设置一个与虚拟机密码不同的：

输入密码：

<img src="./attachments/1748144217630157.png" alt="img" style="zoom:50%;" />

输入成功后，就会连接成功，并进入操作界面了：

<img src="./attachments/1748144219471160.png" alt="img" style="zoom:50%;" />

这里需要做一些基础的配置：

<img src="./attachments/1748144221443163.png" alt="img" style="zoom:50%;" />

### 2.2.配置默认编辑器

首先建议设置一下默认编辑器，这样我们通过MobarXterm的FTP工具打开文件时会以指定的编辑器打开，方便修改。我这里配置的是vscode：

<img src="./attachments/1748144223552166.png" alt="img" style="zoom:50%;" />

### 2.3.配置右键粘贴

复制粘贴是很常用的配置，MobarXterm默认左键选中即**复制**，但是需要配置右键点击为**粘贴：**

<img src="./attachments/1748144227169169.png" alt="img" style="zoom:50%;" />

这样，复制和粘贴可以全部通过鼠标操作，无需按键。

### 2.4.SSH配置

接下来还有几个ssh配置：

<img src="./attachments/1748144229050172.png" alt="img" style="zoom:50%;" />

分别是：

- 默认的登录用户
- ssh保持连接
- 取消连接成功后的欢迎banner

### 2.5.关闭X-Server服务

大多数情况下，我们没有x-server的需求，因此可以选择不要自启动：

<img src="./attachments/image-20251105150053905.png" alt="image-20251105150053905" style="zoom:50%;" />