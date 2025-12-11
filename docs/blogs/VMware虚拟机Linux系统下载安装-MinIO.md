---
title: VMware虚拟机Linux系统下载安装MinIO
date: 2025-11-05
categories:
  - 对象存储
  - 中间件
tags:
  - MinIO
  - Linux
  - CentOS 7
  - 对象存储
  - S3
author: 剑桥折刀
---

# VMware虚拟机Linux系统下载安装MinIO

MinIO是一个高性能的对象存储服务，兼容Amazon S3云存储服务接口。它非常适合于存储大容量非结构化的数据，例如图片、视频、日志文件、备份数据和容器/虚拟机镜像等。

MinIO的官方网站地址：[https://min.io/](https://min.io/)

本教程将基于CentOS 7系统在VMware虚拟机中安装MinIO。

## 一、单机安装MinIO

### 1.1 准备工作

MinIO是基于Go语言编写的，提供了预编译的二进制文件，因此安装非常简单，无需额外依赖。

首先确保你的CentOS 7系统已经正常运行，并且可以访问互联网。

**如果网络有问题，参考VMware虚拟机安装-CentOS 7教程中的网络配置部分。**

### 1.2 下载MinIO

MinIO提供了多种下载方式，我们选择最简单的方式。

#### 1.2.1 下载MinIO Server

#### 1.2.1.1 直接下载

首先进入一个合适的目录，建议使用 `/usr/local/src/` 目录：

```sh
cd /usr/local/src/
```

使用wget下载MinIO最新版本(Linux AMD64)：

```sh
# 下载MinIO服务端
wget https://dl.min.io/server/minio/release/linux-amd64/minio
```

**如果下载速度慢或无法下载，可以使用国内镜像：**

```sh
# 使用华为云镜像
wget https://mirrors.huaweicloud.com/minio/minio/RELEASE.2023-12-07T04-16-00Z/mini
```

给MinIO添加执行权限：

```sh
chmod +x minio
```

将MinIO移动到系统可执行目录：

```sh
mv minio /usr/local/bin/
```

验证安装：

```sh
minio --version
```

#### 1.2.1.2 手动官网下载

[MinIO Download Server](https://dl.min.io/server/minio/release/linux-arm64/)

<img src="./attachments/image-20251105153019968.png" alt="image-20251105153019968" style="zoom: 33%;" />

移动到目录：

```
/usr/local/src/
```

进入该目录：

```
cd /usr/local/src/
```

<img src="./attachments/image-20251105154257101.png" alt="image-20251105154257101" style="zoom:50%;" />

解压：

```
rpm -ivh minio-20230809233022.0.0.x86_64.rpm
```

<img src="./attachments/image-20251105154634333.png" alt="image-20251105154634333" style="zoom:50%;" />

验证安装：

```
minio --version
```

<img src="./attachments/image-20251105154711973.png" alt="image-20251105154711973" style="zoom:50%;" />

#### 1.2.2 下载MinIO Client(可选)

MinIO Client(mc)是MinIO的命令行客户端，用于管理MinIO服务：

```sh
# 下载mc客户端
wget https://dl.min.io/client/mc/release/linux-amd64/mc

# 添加执行权限
chmod +x mc

# 移动到系统目录
mv mc /usr/local/bin/

# 验证安装
mc --version
```

### 1.3 创建数据存储目录

为MinIO创建专门的数据存储目录：

```sh
# 创建数据目录
mkdir -p /data/minio/data

# 创建配置目录
mkdir -p /data/minio/config
```

### 1.4 启动MinIO

MinIO的启动方式有多种：

- 前台启动(测试用)
- 后台启动
- 开机自启(推荐)

#### 1.4.1 开机自启(推荐) 集成Systemd

为了让MinIO开机自动启动，我们创建一个systemd服务。

- **Systemd概述**

  `Systemd`是一个广泛应用于Linux系统的系统初始化和服务管理器，其可以管理系统中的各种服务和进程，包括启动、停止和重启服务，除此之外，其还可以监测各服务的运行状态，并在服务异常退出时，自动拉起服务，以保证服务的稳定性。系统自带的防火墙服务`firewalld`，我们自己安装的`mysqld`和`redis`均是由`Systemd`进行管理的，此处将MinIO服务也交给Systemd管理。

- **编写MinIO服务配置文件**

  Systemd所管理的服务需要由一个配置文件进行描述，这些配置文件均位于`/etc/systemd/system/`或者`/usr/lib/systemd/system/`目录下，下面创建MinIO服务的配置文件。

**创建systemd服务文件：**

```sh
vi /etc/systemd/system/minio.service
```

添加以下内容：

`vim` 编辑下先点击 `i`再粘贴不会出现字符缺失

`dd`指令删除整行

```ini
[Unit]
Description=MinIO
Documentation=https://min.io/docs/minio/linux/index.html
Wants=network-online.target
After=network-online.target
AssertFileIsExecutable=/usr/local/bin/minio

[Service]
WorkingDirectory=/usr/local

User=root
Group=root

EnvironmentFile=/etc/default/minio
ExecStartPre=/bin/bash -c "if [ -z \"${MINIO_VOLUMES}\" ]; then echo \"Variable MINIO_VOLUMES not set in /etc/default/minio\"; exit 1; fi"
ExecStart=/usr/local/bin/minio server $MINIO_OPTS $MINIO_VOLUMES

# MinIO RELEASE.2023-05-04T21-44-30Z adds support for Type=notify (https://www.freedesktop.org/software/systemd/man/systemd.service.html#Type=)
# This may improve systemctl setups where other services use `After=minio.server`
# Uncomment the line to enable the functionality
# Type=notify

# Let systemd restart this service always
Restart=always

# Specifies the maximum file descriptor number that can be opened by this process
LimitNOFILE=65536

# Specifies the maximum number of threads this process can create
TasksMax=infinity

# Disable timeout logic and wait until process is stopped
TimeoutStopSec=infinity
SendSIGKILL=no

[Install]
WantedBy=multi-user.target
```

保存并退出(按 `ESC`，输入 `:wq`，回车)。

------

**创建一个环境配置文件：**

```sh
vi /etc/default/minio
```

添加以下内容：

```ini
# MinIO本地挂载点
MINIO_VOLUMES="/data/minio/data"

# MinIO Root用户和密码
MINIO_ROOT_USER=admin
MINIO_ROOT_PASSWORD=admin123456

# MinIO配置目录
MINIO_OPTS="--console-address :9001"
```

保存并退出(按 `ESC`，输入 `:wq`，回车)。

**注意**

- `MINIO_ROOT_USER`和`MINIO_ROOT_PASSWORD`为用于访问MinIO的用户名和密码，**密码长度至少8位**。

- `MINIO_VOLUMES`用于指定数据存储路径，需确保指定的路径是存在的，可执行以下命令创建该路径。

  ```bash
  mkdir /data
  chmod -R 777 /data
  ```

- `MINIO_OPTS`中的`console-address`,用于指定管理页面的地址。

------

重载systemd配置：

```sh
systemctl daemon-reload
```

启动MinIO服务：

```sh
systemctl start minio
```

查看服务状态：

```sh
systemctl status minio
```

如果看到 `active (running)` 说明启动成功。

设置开机自启：

```sh
systemctl enable minio
```

现在，我们可以使用以下命令管理MinIO：

```sh
# 启动
systemctl start minio

# 停止
systemctl stop minio

# 重启
systemctl restart minio

# 查看状态
systemctl status minio
```

#### 1.4.2 前台启动(测试)

最简单的启动方式，用于测试：

```sh
# 设置管理员账号和密码(必须设置，否则无法启动)
export MINIO_ROOT_USER=admin
export MINIO_ROOT_PASSWORD=admin123456

# 启动MinIO
minio server /data/minio/data
```

启动后会显示如下信息：

```
API: http://192.168.100.100:9000
Console: http://192.168.100.100:9001

Documentation: https://min.io/docs/minio/linux/index.html
```

- **API地址**：`http://你的IP:9000` - 用于S3 API访问
- **Console地址**：`http://你的IP:9001` - 用于Web管理界面

**注意：** 这种启动方式会占用终端，按 `CTRL + C` 会停止服务，仅用于测试。

#### 1.4.3 后台启动

如果要在后台运行MinIO，可以使用nohup：

```sh
# 设置环境变量
export MINIO_ROOT_USER=admin
export MINIO_ROOT_PASSWORD=admin123456

# 后台启动
nohup minio server /data/minio/data > /data/minio/minio.log 2>&1 &
```

查看进程：

```sh
ps -ef | grep minio
```

停止服务：

```sh
# 查找进程ID
ps -ef | grep minio

# 杀死进程
kill -9 <进程ID>
```



### 1.5 配置防火墙

MinIO默认使用两个端口：
- **9000**：API端口，用于S3 API访问
- **9001**：Console端口，用于Web管理界面

需要开放这两个端口：

```sh
# 方式1(推荐)，关闭防火墙
systemctl stop firewalld        # 关闭
systemctl disable firewalld     # 关闭开机自启

# 方式2，开放端口
firewall-cmd --add-port=9000/tcp --permanent
firewall-cmd --add-port=9001/tcp --permanent
firewall-cmd --reload
```

### 1.6 访问MinIO

#### 1.6.1 Web控制台

打开浏览器，访问：

```
http://你的虚拟机IP:9001
```

例如：`http://192.168.100.100:9001`

使用我们设置的账号密码登录：
- 用户名：`admin`
- 密码：`admin123456`

登录后即可看到MinIO的管理界面。

#### 1.6.2 查看日志

如果启动失败，可以查看日志：

```sh
# 查看systemd日志
journalctl -u minio -f

# 或查看服务状态
systemctl status minio
```

## 二、MinIO基本使用

### 2.1 通过Web控制台管理

登录MinIO Web控制台后，你可以：

1. **创建存储桶(Bucket)**：
   - 点击左侧 "Buckets"
   - 点击右上角 "Create Bucket"
   - 输入存储桶名称(如：`test-bucket`)
   - 点击 "Create Bucket"

2. **上传文件**：
   - 点击进入创建的存储桶
   - 点击 "Upload" 按钮
   - 选择要上传的文件
   - 上传完成后即可在列表中看到

3. **下载文件**：
   - 在文件列表中点击文件
   - 点击 "Download" 按钮

4. **创建访问密钥**：
   - 点击左侧 "Access Keys"
   - 点击 "Create access key"
   - 记录 Access Key 和 Secret Key(用于程序访问)

### 2.2 使用MinIO Client (mc)

如果安装了mc客户端，可以通过命令行管理MinIO。

#### 2.2.1 配置mc连接

```sh
# 配置本地MinIO服务器
mc alias set myminio http://localhost:9000 admin admin123456

# 测试连接
mc admin info myminio
```

#### 2.2.2 常用mc命令

```sh
# 列出所有存储桶
mc ls myminio

# 创建存储桶
mc mb myminio/test-bucket

# 上传文件
mc cp /path/to/file.txt myminio/test-bucket/

# 下载文件
mc cp myminio/test-bucket/file.txt /path/to/download/

# 删除文件
mc rm myminio/test-bucket/file.txt

# 查看存储桶内容
mc ls myminio/test-bucket

# 递归上传目录
mc cp --recursive /path/to/directory/ myminio/test-bucket/

# 同步目录
mc mirror /path/to/directory/ myminio/test-bucket/
```

### 2.3 设置存储桶访问策略

默认情况下，存储桶是私有的。如果需要公开访问，可以设置策略：

```sh
# 设置为公开只读
mc anonymous set download myminio/test-bucket

# 设置为公开读写
mc anonymous set public myminio/test-bucket

# 设置为私有
mc anonymous set private myminio/test-bucket
```

或者通过Web控制台设置：
1. 进入存储桶
2. 点击右上角设置图标
3. 选择 "Access Policy"
4. 选择对应的策略

## 三、MinIO常用配置

### 3.1 修改端口

如果需要修改默认端口，编辑 `/etc/default/minio` 文件：

```sh
vi /etc/default/minio
```

修改配置：

```conf
# 修改API端口为9100，Console端口为9101
MINIO_OPTS="--address :9100 --console-address :9101"
```

重启服务：

```sh
systemctl restart minio
```

### 3.2 使用域名访问

如果你有域名，可以配置域名访问：

```conf
# 在 /etc/default/minio 中添加
MINIO_SERVER_URL="http://minio.yourdomain.com"
MINIO_BROWSER_REDIRECT_URL="http://console.minio.yourdomain.com"
```

然后配置Nginx反向代理(此处略)。

### 3.3 常用环境变量

在 `/etc/default/minio` 中可以配置的常用变量：

```conf
# 数据目录
MINIO_VOLUMES="/data/minio/data"

# 管理员账号
MINIO_ROOT_USER=admin
MINIO_ROOT_PASSWORD=admin123456

# 端口配置
MINIO_OPTS="--address :9000 --console-address :9001"

# 域名配置
MINIO_SERVER_URL="http://your-api-domain.com"
MINIO_BROWSER_REDIRECT_URL="http://your-console-domain.com"

# 区域设置
MINIO_REGION_NAME="cn-north-1"
```

## 四、应用集成示例

### 4.1 Java Spring Boot集成

添加依赖：

```xml
<dependency>
    <groupId>io.minio</groupId>
    <artifactId>minio</artifactId>
    <version>8.5.7</version>
</dependency>
```

配置类示例：

```java
@Configuration
public class MinioConfig {
    
    @Value("${minio.endpoint}")
    private String endpoint;
    
    @Value("${minio.accessKey}")
    private String accessKey;
    
    @Value("${minio.secretKey}")
    private String secretKey;
    
    @Bean
    public MinioClient minioClient() {
        return MinioClient.builder()
                .endpoint(endpoint)
                .credentials(accessKey, secretKey)
                .build();
    }
}
```

application.yml配置：

```yaml
minio:
  endpoint: http://192.168.100.100:9000
  accessKey: admin
  secretKey: admin123456
  bucketName: test-bucket
```

### 4.2 Python集成

安装SDK：

```sh
pip install minio
```

使用示例：

```python
from minio import Minio

# 创建客户端
client = Minio(
    "192.168.100.100:9000",
    access_key="admin",
    secret_key="admin123456",
    secure=False
)

# 上传文件
client.fput_object(
    "test-bucket",
    "test.txt",
    "/path/to/test.txt"
)

# 下载文件
client.fget_object(
    "test-bucket",
    "test.txt",
    "/path/to/download/test.txt"
)
```

## 五、常见问题

### 5.1 无法访问Web控制台

检查以下几点：
1. MinIO服务是否正常运行：`systemctl status minio`
2. 防火墙是否开放端口
3. IP地址是否正确
4. 查看日志：`journalctl -u minio -f`

### 5.2 忘记管理员密码

停止服务，修改 `/etc/default/minio` 中的密码配置，重启服务：

```sh
systemctl stop minio
vi /etc/default/minio  # 修改MINIO_ROOT_PASSWORD
systemctl start minio
```

### 5.3 磁盘空间不足

MinIO会自动使用数据目录所在分区的空间。如果空间不足：

1. 清理不需要的文件
2. 扩展虚拟机磁盘
3. 挂载新的数据盘

### 5.4 性能优化

对于生产环境，建议：

1. 使用SSD硬盘
2. 增加内存
3. 使用多块硬盘(分布式部署)
4. 调整文件句柄限制

## 六、官方资源

### 官方下载渠道汇总

下面的表格为您列出了MinIO的主要官方下载地址，您可以根据需要选择访问。

| 渠道类型         | 网址                                                      | 说明                                                    |
| ---------------- | --------------------------------------------------------- | ------------------------------------------------------- |
| **主下载页面**   | [min.io/download](https://min.io/download)                                   | 官方的综合下载门户，可选择Server、Client及各种SDK        |
| **直接下载链接** | [dl.min.io/server/minio/release](https://dl.min.io/server/minio/release/)                   | 用于直接获取特定版本和平台的服务器二进制文件            |
| **中文文档站**   | [minio.org.cn](https://www.minio.org.cn)                                  | 提供中文文档和下载链接，方便中文用户阅读和操作           |
| **官方文档**     | [min.io/docs/minio/linux](https://min.io/docs/minio/linux/index.html)                | 官方英文文档                                            |
| **GitHub仓库**   | [github.com/minio/minio](https://github.com/minio/minio)                            | MinIO开源代码仓库                                       |

---

**恭喜！** 你已经成功在VMware虚拟机的CentOS 7系统中安装并配置了MinIO对象存储服务！
