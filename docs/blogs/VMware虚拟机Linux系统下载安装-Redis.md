---
title: VMware虚拟机Linux系统下载安装Redis
date: 2025-11-05
categories:
  - 数据库
  - 中间件
tags:
  - Redis
  - Linux
  - CentOS 7
  - 缓存
  - NoSQL
author: 剑桥折刀
---

# VMware虚拟机Linux系统下载安装Redis

大多数企业都是基于Linux服务器来部署项目，而且Redis官方也没有提供Windows版本的安装包。

我们会基于Linux系统来安装Redis.

此处选择的Linux版本为CentOS 7.

Redis的官方网站地址：[https://redis.io/](https://redis.io/)

## 一、单机安装Redis

### 1.1 安装Redis依赖

Redis是基于C语言编写的，因此首先需要安装Redis所需要的gcc依赖：

```sh
yum install -y gcc tcl
```

**如果发生下述报错：**

```scheme
[root@localhost ~]# yum install -y gcc tcl
已加载插件：fastestmirror
Determining fastest mirrors
Could not retrieve mirrorlist http://mirrorlist.centos.org/?release=7&arch=x86_64&repo=os&infra=stock error was
14: curl#6 - "Could not resolve host: mirrorlist.centos.org; 未知的错误"


 One of the configured repositories failed (未知),
 and yum doesn't have enough cached data to continue. At this point the only
 safe thing yum can do is fail. There are a few ways to work "fix" this:

     1. Contact the upstream for the repository and get them to fix the problem.

     2. Reconfigure the baseurl/etc. for the repository, to point to a working
        upstream. This is most often useful if you are using a newer
        distribution release than is supported by the repository (and the
        packages for the previous distribution release still work).

     3. Run the command with the repository temporarily disabled
            yum --disablerepo=<repoid> ...

     4. Disable the repository permanently, so yum won't use it by default. Yum
        will then just ignore the repository until you permanently enable it
        again or use --enablerepo for temporary usage:

            yum-config-manager --disable <repoid>
        or
            subscription-manager repos --disable=<repoid>

     5. Configure the failing repository to be skipped, if it is unavailable.
        Note that yum will try to contact the repo. when it runs most commands,
        so will have to try and fail each time (and thus. yum will be be much
        slower). If it is a very temporary problem though, this is often a nice
        compromise:

            yum-config-manager --save --setopt=<repoid>.skip_if_unavailable=true

Cannot find a valid baseurl for repo: base/7/x86_64

```

解决方案：

```scheme
#!/bin/bash
echo "开始配置CentOS 7软件源..."

# 配置DNS
echo "配置DNS..."
echo "nameserver 8.8.8.8" > /etc/resolv.conf
echo "nameserver 114.114.114.114" >> /etc/resolv.conf

# 备份原有配置
echo "备份yum配置..."
cd /etc/yum.repos.d/
mkdir -p backup
mv *.repo backup/ 2>/dev/null

# 下载阿里云镜像源
echo "设置阿里云镜像源..."
curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo

# 禁用最快镜像插件
echo "禁用最快镜像插件..."
sed -i 's/enabled=1/enabled=0/' /etc/yum/pluginconf.d/fastestmirror.conf 2>/dev/null

# 清理缓存
echo "清理yum缓存..."
yum clean all

# 重建缓存
echo "重建yum缓存..."
yum makecache

# 安装软件
echo "安装gcc和tcl..."
yum install -y gcc tcl wget

echo "安装完成！"
```

然后输入指令进入下述目录：

```
cd /usr/local/src/
```

### 1.2 上传安装包并解压

然后将提供的Redis安装包上传到虚拟机的任意目录：

![image-20211211071712536](./attachments/image-20211211071712536.png)

例如，我放到了/usr/local/src 目录：

![image-20211211080151539](./attachments/image-20211211080151539.png)

解压缩：

```sh
tar -xzf redis-6.2.6.tar.gz
```

解压后：

![image-20211211080339076](./attachments/image-20211211080339076.png)

进入redis目录：

```sh
cd redis-6.2.6
```



运行编译命令：

```sh
make && make install
```

如果没有出错，应该就安装成功了。



默认的安装路径是在 `/usr/local/bin`目录下：

<img src="./attachments/image-20211211080603710.png" alt="image-20211211080603710" style="zoom:50%;" />

该目录以及默认配置到环境变量，因此可以在任意目录下运行这些命令。其中：

- redis-cli：是redis提供的命令行客户端
- redis-server：是redis的服务端启动脚本
- redis-sentinel：是redis的哨兵启动脚本



### 1.3 启动

redis的启动方式有很多种，例如：

- 默认启动
- 指定配置启动
- 开机自启



#### 1.3.1 默认启动

安装完成后，在任意目录输入redis-server命令即可启动Redis：

```
redis-server
```

如图：

<img src="./attachments/image-20211211081716167.png" alt="image-20211211081716167" style="zoom:33%;" />



这种启动属于`前台启动`，会阻塞整个会话窗口，窗口关闭或者按下`CTRL + C`则Redis停止。不推荐使用。



#### 1.3.2 指定配置启动

如果要让Redis以`后台`方式启动，则必须修改Redis配置文件，就在我们之前解压的redis安装包下（`/usr/local/src/redis-6.2.6`），名字叫redis.conf：

<img src="./attachments/image-20211211082225509-174808655491183.png" alt="image-20211211082225509" style="zoom:50%;" />

我们先将这个配置文件备份一份：

```
cp redis.conf redis.conf.bck
```



然后修改redis.conf文件中的一些配置：

```
vi redis.conf
```

<img src="./attachments/image-20251105112327569.png" alt="image-20251105112327569" style="zoom:50%;" />

<img src="./attachments/image-20251105112430697.png" alt="image-20251105112430697" style="zoom: 62%;" />

<img src="./attachments/image-20251105112546044.png" alt="image-20251105112546044" style="zoom: 67%;" />

```properties
# 找到并修改（按 i 进入编辑模式）
# 使用 vim 或 nano 编辑器内的搜索
# 如果你已经在用 vim 或 nano 编辑这个文件了，那么直接在里面搜索是最方便的。

# 在 Vim 中搜索：
# 用 vim 打开文件：vim redis.conf
# 按下 / 键，屏幕底部会出现 /。
# 输入 requirepass，然后按 Enter。
# Vim 会高亮所有匹配项并跳转到第一个。按 n 键跳到下一个匹配项，按 N 键跳回上一个。

# 在 Nano 中搜索：
# 用 nano 打开文件：nano redis.conf
# 按下 Ctrl + W。
# 输入 requirepass，然后按 Enter。
# 光标会跳转到第一个匹配项。要继续查找下一个，按 Alt + W。

# 允许访问的地址，默认是127.0.0.1，会导致只能在本地访问。修改为0.0.0.0则可以在任意IP访问，生产环境不要设置为0.0.0.0
bind 0.0.0.0
# 守护进程，修改为yes后即可后台运行
daemonize yes 
# 密码，设置后访问Redis必须输入密码
requirepass 123123
```



Redis的其它常见配置：

<img src="./attachments/image-20251105112705552.png" alt="image-20251105112705552" style="zoom: 67%;" />

```properties
# 监听的端口
port 6379
# 工作目录，默认是当前目录，也就是运行redis-server时的命令，日志、持久化等文件会保存在这个目录
dir .
# 数据库数量，设置为1，代表只使用1个库，默认有16个库，编号0~15
databases 1
# 设置redis能够使用的最大内存
maxmemory 512mb
# 日志文件，默认为空，不记录日志，可以指定日志文件名
logfile "redis.log"
```



启动Redis：

```sh
# 进入redis安装目录 
cd /usr/local/src/redis-6.2.6
# 启动
redis-server redis.conf
```

```
ps -ef | grep redis
```

停止服务：

```sh
# 利用redis-cli来执行 shutdown 命令，即可停止 Redis 服务，
# 因为之前配置了密码，因此需要通过 -u 来指定密码
redis-cli -u 123456 shutdown
```



#### 1.3.3 开机自启

我们也可以通过配置来实现开机自启。

首先，新建一个系统服务文件：

```sh
vi /etc/systemd/system/redis.service
```

内容如下：

```conf
[Unit]
Description=redis-server
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/bin/redis-server /usr/local/src/redis-6.2.6/redis.conf
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```



然后重载系统服务：

```sh
systemctl daemon-reload
```



现在，我们可以用下面这组命令来操作redis了：

```sh
# 启动
systemctl start redis
# 停止
systemctl stop redis
# 重启
systemctl restart redis
# 查看状态
systemctl status redis
```



执行下面的命令，可以让redis开机自启：

```sh
systemctl enable redis
```



放行防火墙，redis使用端口6379

```shell
# 方式1（推荐），关闭防火墙
systemctl stop firewalld		# 关闭
systemctl disable firewalld		# 关闭开机自启

# 方式2，放行6379端口
firewall-cmd --add-port=6379/tcp --permanent		# 放行tcp规则下的6379端口，永久生效
firewall-cmd --reload	
```



## 二、Redis客户端

安装完成Redis，我们就可以操作Redis，实现数据的CRUD了。这需要用到Redis客户端，包括：

- 命令行客户端
- 图形化桌面客户端
- 编程客户端



### 2.1 Redis命令行客户端

Redis安装完成后就自带了命令行客户端：redis-cli，使用方式如下：

```sh
redis-cli [options] [commonds]
```

其中常见的options有：

- `-h 127.0.0.1`：指定要连接的redis节点的IP地址，默认是127.0.0.1
- `-p 6379`：指定要连接的redis节点的端口，默认是6379
- `-a 123321`：指定redis的访问密码 

其中的commonds就是Redis的操作命令，例如：

- `ping`：与redis服务端做心跳测试，服务端正常会返回`pong`

不指定commond时，会进入`redis-cli`的交互控制台：

![image-20211211110439353](./attachments/image-20211211110439353.png)



### 2.2 图形化桌面客户端

GitHub上的大神编写了Redis的图形化桌面客户端，地址：[https://github.com/uglide/RedisDesktopManager](https://github.com/uglide/RedisDesktopManager)

不过该仓库提供的是RedisDesktopManager的源码，并未提供windows安装包。



在下面这个仓库可以找到安装包：[https://github.com/lework/RedisDesktopManager-Windows/releases](https://github.com/lework/RedisDesktopManager-Windows/releases)

![image-20211211111351885](./attachments/image-20211211111351885.png)

#### 2.2.1 安装

在课前资料中可以找到Redis的图形化桌面客户端：

![image-20211214154938770](./attachments/image-20211214154938770.png)

解压缩后，运行安装程序即可安装：

![image-20211214155123841](./attachments/image-20211214155123841.png)

此处略。

安装完成后，在安装目录下找到rdm.exe文件：

![image-20211211110935819](./attachments/image-20211211110935819.png)

双击即可运行：

<img src="./attachments/image-20211214155406692.png" alt="image-20211214155406692" style="zoom:50%;" />



#### 2.2.2 建立连接

点击左上角的`连接到Redis服务器`按钮：

<img src="./attachments/image-20211214155424842.png" alt="image-20211214155424842" style="zoom:75%;" />

在弹出的窗口中填写Redis服务信息：

<img src="./attachments/image-20211211111614483.png" alt="image-20211211111614483" style="zoom:58%;" />

点击确定后，在左侧菜单会出现这个链接：

<img src="./attachments/image-20211214155804523.png" alt="image-20211214155804523" style="zoom:50%;" />

点击即可建立连接了：

<img src="./attachments/image-20211214155849495.png" alt="image-20211214155849495" style="zoom:50%;" />

Redis默认有16个仓库，编号从0至15.  通过配置文件可以设置仓库数量，但是不超过16，并且不能自定义仓库名称。

如果是基于redis-cli连接Redis服务，可以通过select命令来选择数据库：

```sh
# 选择 0号库
select 0
```



## 三、常用图形化界面

| 工具名称                          | 主要特点                                                     | 官方网站                                             | 支持平台            | 安装方式概要                                                 |
| --------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------- | ------------------- | ------------------------------------------------------------ |
| **Another Redis Desktop Manager** | 开源免费、性能出色、支持集群/哨兵/SSL/SSH、暗黑模式、多种数据格式支持 | [goanother.com/cn](https://goanother.com/cn)                             | Windows, Mac, Linux | 从官网、GitHub 或Gitee 下载安装包；或通过 Chocolatey (Windows) 、Snap (Linux) 、Homebrew (Mac) 安装 |
| **RedisInsight**                  | Redis官方出品、功能强大、支持深色/浅色主题、多种数据类型管理、CLI功能 | [redis.com/redis-enterprise/redis-insight](https://redis.com/redis-enterprise/redis-insight/)    | 桌面版及Web版       | 从官网下载对应操作系统的安装包                               |
| **Tiny RDM**                      | 轻量级、现代化界面、深色/浅色主题、跨平台、完全开源          | [redis.tinycraft.cc/zh](https://redis.tinycraft.cc/zh/)                       | Windows, Mac, Linux | 从官网下载安装包                                             |
| **QuickRedis**                    | 永久免费、支持海量Key、直连/哨兵/集群模式、UI体验较好        | [github.com/quick123official/quick_redis_blog](https://github.com/quick123official/quick_redis_blog) | Windows, Mac, Linux | 需先安装 Node.js 和 Yarn，然后克隆项目、安装依赖并构建       |

### 3.1 Another Redis Desktop Manager

一款非常受欢迎的开源、跨平台客户端，性能出色，功能全面。

| 项目         | 说明                                                         |
| :----------- | :----------------------------------------------------------- |
| **官方网站** | [https://goanother.com/cn](https://goanother.com/cn)         |
| **中文支持** | ✅ 界面支持简体中文                                           |
| **核心特点** | 响应快速、支持集群/哨兵模式、支持SSH隧道、SSL连接、命令行模式、深色主题 |

#### **下载与安装**

1. **下载**：

   *   访问官方网站 [https://goanother.com/cn](https://goanother.com/cn)，页面会自动检测你的操作系统并提供对应的下载链接（Windows: `.exe`， macOS: `.dmg`， Linux: `.AppImage`）。
   *   你也可以在 **Gitee**（国内速度快）的发布页下载：[https://gitee.com/qishibo/AnotherRedisDesktopManager/releases](https://gitee.com/qishibo/AnotherRedisDesktopManager/releases)

2. **安装**：

   * **Windows**: 双击下载的 `.exe` 文件，跟随安装向导完成即可。

   * **macOS**:

     *   双击下载的 `.dmg` 文件。
     *   将 `Another Redis Desktop Manager` 图标拖拽到 `Applications` 文件夹中。
     *   首次启动时，如果提示“无法验证开发者”，请前往 **系统设置 > 隐私与安全性**，点击 **仍要打开**。

   * **Linux**: 为下载的 `.AppImage` 文件添加可执行权限后，直接双击运行。

     ```bash
     chmod +x Another-Redis-Desktop-Manager.1.x.x.AppImage
     ./Another-Redis-Desktop-Manager.1.x.x.AppImage
     ```

#### **使用方法**

1.  **新建连接**：
    *   启动软件，点击左上角的 **新建连接** 按钮（或按 `Ctrl+N`）。
    *   在弹出窗口中填写连接信息：
        *   **名称**： 给你的连接起个名字（如：`本地测试`）。
        *   **地址**： Redis服务器IP（本地填 `127.0.0.1` 或 `localhost`）。
        *   **端口**： 默认 `6379`。
        *   **密码**： 如果设置了密码，在此填写。
        *   **其他**： 根据需要设置SSH隧道、SSL等。
    *   点击 **测试连接**，成功后再点击 **确定** 保存。

2.  **管理数据**：
    *   在左侧连接列表中找到你创建的连接并双击。
    *   你会看到所有的Key列表。可以搜索、筛选、按模式删除Key。
    *   点击任何一个Key，右侧会显示其值和详细信息。你可以方便地对其进行 **新增、修改、删除、重命名、设置TTL** 等操作。

---

### 3.2  RedisInsight

Redis官方出品的桌面客户端，功能权威且强大，尤其适合想使用Redis最新特性的用户。

| 项目         | 说明                                                         |
| :----------- | :----------------------------------------------------------- |
| **官方网站** | [https://redis.com/redis-enterprise/redis-insight/](https://redis.com/redis-enterprise/redis-insight/) |
| **中文支持** | ✅ 界面支持简体中文                                           |
| **核心特点** | 官方开发、支持Redis模块、内置CLI、内存分析、慢日志查询       |

#### **下载与安装**

1. **下载**：

   *   访问官方网站 [https://redis.com/redis-enterprise/redis-insight/](https://redis.com/redis-enterprise/redis-insight/)。
   *   点击 **Download Now** 按钮，选择你的操作系统（Windows, macOS, Linux）进行下载。

2. **安装**：

   * **Windows**: 运行 `.exe` 安装程序，按步骤完成。

   * **macOS**: 打开 `.dmg` 文件，将 `RedisInsight` 拖到 `Applications` 文件夹。

   * **Linux**: 使用下载的 `.AppImage` 文件，或通过Snap商店安装。

     ```bash
     # 使用 AppImage
     chmod +x RedisInsight-2.x.x.AppImage
     ./RedisInsight-2.x.x.AppImage
     # 使用 Snap
     sudo snap install redis-insight
     ```

#### **使用方法**

1.  **添加数据库**：
    *   首次启动，你会看到欢迎界面。点击 **添加Redis数据库**。
    *   你可以选择 **连接到一个Redis数据库**，或者 **使用Redis Stack** 的本地体验版。
    *   填写连接信息（主机、端口、密码等），点击 **添加Redis数据库**。

2.  **使用功能**：
    *   成功连接后，左侧是功能导航栏。
    *   **浏览器**： 查看和管理所有Key。
    *   **CLI**： 内置的命令行界面，可以直接执行Redis命令。
    *   **分析**： 查看内存使用情况，分析大的Key。
    *   **慢日志**： 查询执行缓慢的命令。

---

### 3.3 Tiny RDM

一款新兴的、注重用户体验的轻量级现代化客户端，界面简洁美观。

| 项目         | 说明                                                         |
| :----------- | :----------------------------------------------------------- |
| **官方网站** | [https://redis.tinycraft.cc/zh/](https://redis.tinycraft.cc/zh/) |
| **中文支持** | ✅ 界面支持简体中文                                           |
| **核心特点** | 轻量快速、界面现代化、支持深色/浅色主题、完全开源            |

#### **下载与安装**

1. **下载**：

   *   访问中文官网 [https://redis.tinycraft.cc/zh/](https://redis.tinycraft.cc/zh/)。
   *   点击首页的 **免费下载** 按钮，选择适合你操作系统的版本。

2. **安装**：

   * **Windows**: 运行 `.exe` 安装程序。

   * **macOS**:

     *   打开 `.dmg` 文件，将 `Tiny RDM` 拖到 `Applications` 文件夹。
     *   如果遇到安全提示，处理方式同 **Another Redis Desktop Manager**。

   * **Linux**: 使用 `.AppImage` 文件。

     ```bash
     chmod +x Tiny-RDM-1.x.x.AppImage
     ./Tiny-RDM-1.x.x.AppImage
     ```

#### **使用方法**

1.  **创建连接**：
    *   打开软件，点击左侧导航栏的 **连接管理**。
    *   点击右上角的 **+** 号新建连接。
    *   填写基本的连接信息（名称、地址、端口、密码）。
    *   点击 **测试连接**，成功后保存。

2.  **操作数据**：
    *   在左侧 **连接管理** 中，点击你创建的连接即可进入。
    *   上方是Key的搜索和筛选栏。
    *   点击Key可以查看和编辑值，界面直观，操作流畅。

---

### 3.4 QuickRedis

一款基于Node.js开发的跨平台客户端，永久免费，UI体验较好。

| 项目                | 说明                                                         |
| :------------------ | :----------------------------------------------------------- |
| **官方网站/GitHub** | [https://github.com/quick123official/quick_redis_blog](https://github.com/quick123official/quick_redis_blog) |
| **中文支持**        | ✅ 界面支持中文                                               |
| **核心特点**        | 支持直连/哨兵/集群模式、海量Key加载、发布订阅                |

#### **下载与安装**

**注意：** 此工具需要先安装 **Node.js** 运行环境。

1. **准备工作**：

   * 访问 [Node.js 官网](https://nodejs.org/) 下载并安装 **LTS**（长期支持版）。安装过程会自动包含 `npm` 包管理器。

   * 打开终端/命令提示符，安装 `yarn`（一个更快的包管理工具）：

     ```bash
     npm install -g yarn
     ```

2. **安装QuickRedis**：

   ```bash
   # 1. 克隆项目到本地
   git clone https://github.com/quick123official/quick_redis_blog.git
   # 2. 进入项目目录
   cd quick_redis_blog
   # 3. 安装项目依赖
   yarn install
   # 4. 启动项目
   yarn start
   ```

   *   执行 `yarn start` 后，会自动打开浏览器并访问 [http://localhost:8080](http://localhost:8080)，这就是QuickRedis的界面。

#### **使用方法**

1.  **创建连接**：
    *   在Web界面中，点击 **新建连接**。
    *   填写连接配置信息。
    *   点击 **保存并连接**。

2.  **使用**：
    *   界面布局与桌面应用类似，左侧是连接和Key列表，右侧是Key的值和操作区。
    *   由于其是Web形式，使用体验与桌面应用基本一致。

---

### **3.5 总结与建议**

| 工具                              | 适合人群                                           | 安装简易度 |
| :-------------------------------- | :------------------------------------------------- | :--------- |
| **Another Redis Desktop Manager** | **绝大多数用户**，功能全面，安装简单，性能好。     | ★★★★★      |
| **RedisInsight**                  | **专业用户或开发者**，希望使用官方工具和最新功能。 | ★★★★★      |
| **Tiny RDM**                      | **追求轻量、美观和现代UI体验**的用户。             | ★★★★★      |
| **QuickRedis**                    | 不介意搭建**Node.js环境**，喜欢Web应用形态的用户。 | ★★★☆☆      |

**新手推荐**：
如果你不确定该选哪个，**Another Redis Desktop Manager** 或 **Tiny RDM** 是最安全、最直接的选择，它们无需复杂的环境配置，下载即用，功能足以满足日常开发和运维需求。