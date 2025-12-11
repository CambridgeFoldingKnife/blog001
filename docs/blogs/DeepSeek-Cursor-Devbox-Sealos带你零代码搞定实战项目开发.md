---
title: DeepSeek+Cursor+Devbox+Sealos带你零代码搞定实战项目开发
date: 2025-11-03
categories:
  - AI开发
  - 实战项目
tags:
  - DeepSeek
  - Cursor
  - Devbox
  - Sealos
  - 云原生
  - AI编程
author: 剑桥折刀
---

# DeepSeek+Cursor+Devbox+Sealos带你零代码搞定实战项目开发

## 一、概述

### 1.1 概况

1. 零基础开发:基于DeepSeek + Cursor自然语言转代码能力,无需编程基础即可完成全栈项目构建。
2. AI全流程赋能:覆盖需求分析、表结构设计、代码生成、联调测试到云部署的完整开发链路。
3. 工具链深度整合:Cursor(AI编码) + Devbox(环境管理) + Sealos(云原生部署),实现开发效率倍增。
4. 导向:手把手带你基于AI完成项目的设计、开发、测试、联调、部署,全链路交付。

> 基于AI工具(DeepSeek等),根据页面原型和需求文档,设计数据库表的能力。
>
> 基于 Sealos云操作系统 + Cursor + Devbox 快速构建、开发、部署前后端应用的能力。

### 1.2 DeepSeek

[DeepSeek - 探索未至之境](https://chat.deepseek.com/)

<img src="./attachments/image-20251103160712758.png" alt="image-20251103160712758" style="zoom: 80%;" />

------

[问小白 - 更专业的AI搜索](https://www.wenxiaobai.com/chat/200006)

<img src="./attachments/image-20251103160750458.png" alt="image-20251103160750458" style="zoom: 80%;" />

------

### 1.3 Sealos-Devbox

[Sealos Cloud](https://hzh.sealos.run/)

[Sealos-专为云原生开发打造的以K8s为内核的云操作系统](https://sealos.run/)

> 不需要再本地安装 JDK、Maven、NodeJS等;
>
> 不需要再准备服务器、测试环境、生产环境;
>
> 不需要域名、证书、负载均衡等配置;
>
> 项目开发完毕之后,可以直接通过DevBox直接发版上线;

注册完成并实名之后会有10块钱的额度

<img src="./attachments/image-20251103162259700.png" alt="image-20251103162259700" style="zoom:80%;" />

------

<img src="./attachments/image-20251103162240829.png" alt="image-20251103162240829" style="zoom:80%;" />

------

<img src="./attachments/image-20251103160940938.png" alt="image-20251103160940938" style="zoom: 80%;" />

------

### 1.4 Cursor

[Cursor - The AI Code Editor](https://www.cursor.com/cn)

<img src="./attachments/image-20251103160959339.png" alt="image-20251103160959339" style="zoom: 80%;" />

------

命令提示符(管理员)Windows PowerShell

```
rmdir /S /Q "C:\Users\lenovo\AppData\Local\Programs\Cursor"
```

```
cmd  /c mklink /d "C:\\Users\\lenovo\\AppData\\Local\\Programs\\Cursor" "F:\\Chengxusheji\\Cursor\\cursor"
```

## 二、 页面原型

### 2.1 班级管理

<img src="./attachments/班级管理.png" alt="班级管理" style="zoom: 80%;" />

------

### 2.2 部门管理

<img src="./attachments/部门管理.png" alt="部门管理" style="zoom: 80%;" />

------

<img src="./attachments/部门管理1.png" alt="部门管理1" style="zoom: 80%;" />

------

<img src="./attachments/部门管理1-176215965554978.png" alt="部门管理1" style="zoom: 80%;" />

------

### 2.3 学员管理

<img src="./attachments/学员管理.png" alt="学员管理" style="zoom: 80%;" />

------

### 2.4 员工管理

<img src="./attachments/员工管理.png" alt="员工管理" style="zoom: 80%;" />

------

<img src="./attachments/员工管理-176215971952782.png" alt="员工管理" style="zoom: 80%;" />

------

<img src="./attachments/员工管理-176215972506384.png" alt="员工管理" style="zoom: 80%;" />

------

## 三、Cursor安装配置

网站:[Cursor:用 AI 编码的最佳方式](https://cursor.com/cn)

<img src="./attachments/image-20251103153602859.png" alt="image-20251103153602859" style="zoom: 80%;" />

------

### 3.1 安装

安装包在资料中已经提供,直接双击 `"Cursor Setup 0.45.11 - Build 250207y6nbaw5qc-x64.exe"` 这个文件,就可以自动完成Cursor的安装。

<img src="./attachments/17621551942977.png" alt="img" style="zoom:80%;" />

------

<img src="./attachments/17621551885184.png" alt="img" style="zoom:80%;" />

------

### 3.2 配置

#### 3.2.1 选择AI工具的语言

输入AI工具的语言为 "中文" ,输入完语言之后,直接点击 "Continue" 下一步,下一步的操作即可。

<img src="./attachments/176215520086810.png" alt="img" style="zoom: 80%;" />

------

<img src="./attachments/176215520316913.png" alt="img" style="zoom: 80%;" />

------

选择了 "Use Extensions" 就表示,如果我们本地安装了VS Code,就会将VS Code中的拓展插件、配置、快捷键的配置直接导入进来。(因为Cursor底层就是基于VS Code包装而来的)

<img src="./attachments/176215520507816.png" alt="img" style="zoom:80%;" />

------

#### 3.2.2 登录/注册

要使用Cursor需要先登录Cursor的账号,基于邮箱进行登录,如果有账号直接选择 "Login In" 进行登录;如果没有账号,直接选择 "Sign Up"注册账号即可。

点击登录之后,会跳转到官方的登录页面进行登录。输入邮箱,然后选择 "Continue",下一步。

<img src="./attachments/176215520701919.png" alt="img" style="zoom:80%;" />

------

可以基于密码登录,也可以基于邮箱验证码登录。 这里我选择基于邮箱验证码登录。

<img src="./attachments/176215520888922.png" alt="img" style="zoom:80%;" />

------

输入完验证码后就可以完成登录了。 然后我们就可以授权登录桌面端的Cursor应用了。

<img src="./attachments/176215521109025.png" alt="img" style="zoom:80%;" />

------

完成授权

<img src="./attachments/176215521386928.png" alt="img" style="zoom: 80%;" />

------

回到Cursor中,我们可以看到已经登录成功了。(如果Cursor中未加载出来,可以再点击一下 `Login In` 进行登录授权)

<img src="./attachments/176215521568331.png" alt="img" style="zoom:80%;" />

------

#### 3.2.3 配置Cursor

选择 `File -> Preferences -> VS Code Settings`,配置Cursor中集成的 VS Code的基本信息,包括字体、字体大小、行高、主题颜色等信息。

<img src="./attachments/176215521786034.png" alt="img" style="zoom:80%;" />

------

<img src="./attachments/176215522324937.png" alt="img" style="zoom: 80%;" />

------

然后将下方的这段配置,直接粘贴到 settings.json 文件中,覆盖掉原有的内容。

```JSON
{
    "window.commandCenter": 1,
    "update.enableWindowsBackgroundUpdates": false,
    "update.mode": "none",
    "workbench.colorTheme": "Default Light+",
    "workbench.statusBar.visible": false,
    "editor.fontFamily": "Fira Code, Consolas,'Courier New', monospace",
    "editor.fontSize": 15,
    "editor.lineHeight": 1.8,
    "editor.tabSize": 2,
    "editor.codeActionsOnSave": {
        "source.fixAll": "explicit"
    },
    "editor.minimap.enabled": true,
    "liveServer.settings.donotShowInfoMsg": true,
    "git.confirmSync": false,
    "terminal.integrated.defaultProfile.windows": "Command Prompt"
}
```

最终效果:

<img src="./attachments/176215524239940.png" alt="img" style="zoom:80%;" />

------

#### 3.2.4 安装插件

<img src="./attachments/176215524533043.png" alt="img" style="zoom: 80%;" />

------

然后我们就可以根据对应的插件名称来搜索对应的插件了。

<img src="./attachments/176215524714246.png" alt="img" style="zoom: 80%;" />

------

##### 3.2.4.1 Vue - Official

一个专门为 Vue 3 构建的语言支持插件。

<img src="./attachments/176215524925249.png" alt="img" style="zoom: 80%;" />

------

##### 3.2.4.2 Devbox

Devbox是一个远程开发和生产环境,可帮助您开发和部署项目。此插件支持Devbox的连接和管理。

<img src="./attachments/176215525094352.png" alt="img" style="zoom:80%;" />

------

##### 3.2.4.3 Material Icon Theme

icon 图标主题插件,为我们提供了非常丰富的icon,美化开发工具使用。

<img src="./attachments/176215525299055.png" alt="img" style="zoom:80%;" />

------

##### 3.2.4.4 Remote - SSH

Remote-SSH扩展插件允许您使用任何具有SSH服务器的远程机器作为您的开发环境。这可以大大简化各种情况下的开发和故障排除。

<img src="./attachments/176215525543358.png" alt="img" style="zoom:80%;" />

------

##### 3.2.4.5 Extension Pack for Java

该插件可以帮助在Visual Studio Code中编写、测试和调试Java应用程序。

<img src="./attachments/176215525764261.png" alt="img" style="zoom:80%;" />

------

## 四、数据库设计(DeepSeek)

### 4.1 数据库设计流程

<img src="./attachments/image-20251103164908838.png" alt="image-20251103164908838" style="zoom: 80%;" />

------

<img src="./attachments/image-20251103163626437.png" alt="image-20251103163626437" style="zoom:80%;" />

------

<img src="./attachments/image-20251103163642227.png" alt="image-20251103163642227" style="zoom: 80%;" />

------

提示词:

> 请根据提供的页面原型和需求说明,帮我分析一下部门管理涉及到几张表,具体是什么表,只需要给出涉及到几张表即可,不需要具体的字段及建表语句。(请严格根据页面原型和需求分档分析)

### 4.2 数据库表

```sql
CREATE TABLE dept (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '部门ID(唯一标识,自增主键)',
    name VARCHAR(10) NOT NULL UNIQUE COMMENT '部门名称',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后操作时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='部门信息表';


CREATE TABLE emp (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '员工ID',
    username VARCHAR(20) NOT NULL UNIQUE COMMENT '用户名(2-20位)',
    password VARCHAR(64) DEFAULT '123456' COMMENT '登录密码',
    name VARCHAR(10) NOT NULL COMMENT '姓名(2-10位)',
    gender TINYINT COMMENT '性别, 1: 男, 2: 女',
    phone CHAR(11) NOT NULL UNIQUE COMMENT '手机号(11位)',
    position TINYINT COMMENT '职位, 1: 班主任, 2: 讲师, 3: 学工主管, 4: 教研主管, 5: 咨询师',
    salary INT COMMENT '薪资(整数存储)',
    image VARCHAR(255) COMMENT '头像路径',
    hire_date DATE COMMENT '入职日期',
    dept_id INT COMMENT '所属部门ID',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后操作时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='员工信息表';


CREATE TABLE emp_expr (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '经历ID',
    emp_id INT COMMENT '关联员工ID',
    company VARCHAR(50) COMMENT '公司名称',
    position VARCHAR(50) COMMENT '担任职位',
    start_date DATE COMMENT '开始日期',
    end_date DATE COMMENT '结束日期'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='员工工作经历表';


-- 部门表测试数据(真实场景模拟)
INSERT INTO dept (name) VALUES
('学工部'), ('教研部'), ('就业部'), ('教务部'), ('产品部'),
('研发中心'), ('质量保障部'), ('市场拓展部'), ('客户成功部'),
('人力资源部'), ('财务审计部'), ('法务合规部'), ('行政后勤部'),
('品牌运营部'), ('战略投资部');

-- 员工表测试数据(符合原型展示特征)
INSERT INTO emp (username, name, gender, phone, position, salary, dept_id, hire_date) VALUES
('zhaomin', '赵敏', 2, '13810102001', 1, 4800, 1, '2020-03-15'),
('yangxiao', '杨逍', 1, '13921213002', 2, 6500, 2, '2019-07-22'),
('weiyixiao', '韦一笑', 1, '13632324003', 3, 8200, 3, '2021-11-01'),
('zhangwuji', '张无忌', 1, '15043435004', 4, 9500, 4, '2022-02-14'),
('zhouzhiruo', '周芷若', 2, '15156567005', 5, 7800, 5, '2020-08-30'),
('xiaozhao', '小昭', 2, '15267678006', 1, 5200, 6, '2023-01-05'),
('yinliting', '殷梨亭', 1, '15378789007', 2, 6800, 7, '2018-05-17'),
('songyuanqiao', '宋远桥', 1, '15489890008', 3, 8700, 8, '2017-09-10'),
('yulianzhou', '俞莲舟', 1, '15590901009', 4, 9900, 9, '2021-04-21'),
('daiyisi', '黛绮丝', 2, '15601011010', 5, 7300, 10, '2019-12-08'),
('xiexun', '谢逊', 1, '15712122011', 1, 5500, 11, '2022-07-19'),
('yinyesu', '殷野王', 1, '15823233012', 2, 7100, 12, '2020-06-25'),
('yangdingtian', '阳顶天', 1, '15934344013', 3, 8900, 13, '2016-08-14'),
('fanyao', '范遥', 1, '15045455014', 4, 10200, 14, '2015-11-30'),
('jixiaofu', '纪晓芙', 2, '15156566015', 5, 7600, 15, '2023-03-07');

-- 工作经历表测试数据(时间线逻辑验证)
INSERT INTO emp_expr (emp_id, company, position, start_date, end_date) VALUES
(1, '光明顶科技', '学员管理专员', '2018-04-01', '2020-02-28'),
(2, '武当山网络', '课程研发工程师', '2017-01-15', '2019-06-30'),
(3, '峨嵋云计算', '就业指导顾问', '2019-09-01', '2021-10-31'),
(4, '明教教育科技', '教务系统架构师', '2020-12-01', '2022-01-15'),
(5, '昆仑数据', '产品经理', '2018-11-01', '2020-07-31'),
(6, '波斯国际集团', '行政助理', '2021-03-01', '2022-12-31'),
(7, '少林科技学院', '质量保障专家', '2016-05-01', '2018-04-30'),
(8, '华山网络科技', '市场总监', '2015-02-01', '2017-08-31'),
(9, '崆峒人工智能', '客户成功经理', '2019-01-15', '2021-03-15'),
(10, '星宿派科技', 'HRBP', '2017-07-01', '2019-11-30'),
(11, '逍遥派金融', '财务分析师', '2020-09-01', '2022-05-31'),
(12, '丐帮物流科技', '法务顾问', '2018-03-01', '2020-04-30'),
(13, '古墓派科技', '品牌运营总监', '2014-06-01', '2016-07-31'),
(14, '全真教投资', '战略投资经理', '2013-08-01', '2015-10-31'),
(15, '桃花岛研究院', '教研主管', '2021-05-01', '2023-02-28');
```

### 4.3 创建数据库

<img src="./attachments/image-20251103165337062.png" alt="image-20251103165337062" style="zoom: 80%;" />

------

<img src="./attachments/image-20251103165410824.png" alt="image-20251103165410824" style="zoom: 80%;" />

------

<img src="./attachments/image-20251103165644873.png" alt="image-20251103165644873" style="zoom:80%;" />

------

> 外部应用访问需要开启外网地址进行连接数据库,点击右上角眼睛图标可以看见相关地址;
>
> 复制外网地址Host,端口号Port,账号Username,密码Password内容;

<img src="./attachments/image-20251103170334894.png" alt="image-20251103170334894" style="zoom: 80%;" />

------

> 打开DataGrip,一一对应输入;

<img src="./attachments/image-20251103171250865.png" alt="image-20251103171250865" style="zoom:80%;" />

------

## 五、接口设计(DeepSeek)

### 5.1 接口设计流程

<img src="./attachments/image-20251103171513583-17621719803427.png" alt="image-20251103171513583" style="zoom:80%;" />

------

### 5.2 部门管理

#### 5.2.1 部门列表查询

##### 5.2.1.1 基本信息

  请求路径：`/depts`

  请求方式：`GET`

  接口描述：该接口用于部门列表数据查询

##### 5.2.1.2 请求参数

无

##### 5.2.1.3 响应数据

  参数格式：`application/json`

  参数说明：

  | 参数名         | 类型      | 是否必须 | 备注                           |
  | -------------- | --------- | -------- | ------------------------------ |
  | code           | number    | 必须     | 响应码，1 代表成功，0 代表失败 |
  | msg            | string    | 非必须   | 提示信息                       |
  | data           | object[ ] | 非必须   | 返回的数据                     |
  | \|- id         | number    | 非必须   | id                             |
  | \|- name       | string    | 非必须   | 部门名称                       |
  | \|- createTime | string    | 非必须   | 创建时间                       |
  | \|- updateTime | string    | 非必须   | 修改时间                       |

  响应数据样例：

  ```JSON
  {
    "code": 1,
    "msg": "success",
    "data": [
      {
        "id": 1,
        "name": "学工部",
        "createTime": "2022-09-01T23:06:29",
        "updateTime": "2022-09-01T23:06:29"
      },
      {
        "id": 2,
        "name": "教研部",
        "createTime": "2022-09-01T23:06:29",
        "updateTime": "2022-09-01T23:06:29"
      }
    ]
  }
  ```

#### 5.2.2 删除部门

##### 5.2.2.1 基本信息

  请求路径：`/depts/{id}`

  请求方式：`DELETE`

  接口描述：该接口用于根据ID删除部门数据

##### 5.2.2.2 请求参数

参数格式：路径参数

  参数说明：

  | 参数名 | 类型   | 是否必须 | 备注   |
  | ------ | ------ | -------- | ------ |
  | id     | number | 必须     | 部门ID |

  请求参数样例：

  ```
  /depts/1
  /depts/2
  ```

##### 5.2.2.3 响应数据

参数格式：`application/json`

  参数说明：

  | 参数名 | 类型   | 是否必须 | 备注                           |
  | ------ | ------ | -------- | ------------------------------ |
  | code   | number | 必须     | 响应码，1 代表成功，0 代表失败 |
  | msg    | string | 非必须   | 提示信息                       |
  | data   | object | 非必须   | 返回的数据                     |

  响应数据样例：

  ```JSON
  {
      "code":1,
      "msg":"success",
      "data":null
  }
  ```

#### 5.2.3 添加部门

##### 5.2.3.1 基本信息

  请求路径：`/depts`

  请求方式：`POST`

  接口描述：该接口用于添加部门数据

##### 5.2.3.2 请求参数

格式：`application/json`

  参数说明：

  | 参数名 | 类型   | 是否必须 | 备注     |
  | ------ | ------ | -------- | -------- |
  | name   | string | 必须     | 部门名称 |

  请求参数样例：

  ```JSON
  {
      "name": "教研部"
  }
  ```

##### 5.2.3.3 响应数据

参数格式：`application/json`

  参数说明：

  | 参数名 | 类型   | 是否必须 | 备注                           |
  | ------ | ------ | -------- | ------------------------------ |
  | code   | number | 必须     | 响应码，1 代表成功，0 代表失败 |
  | msg    | string | 非必须   | 提示信息                       |
  | data   | object | 非必须   | 返回的数据                     |

  响应数据样例：

  ```JSON
  {
      "code":1,
      "msg":"success",
      "data":null
  }
  ```

#### 5.2.4 根据ID查询

##### 5.2.4.1 基本信息

  请求路径：`/depts/{id}`

  请求方式：`GET`

  接口描述:该接口用于根据ID查询部门数据

##### 5.2.4.2 请求参数

参数格式：路径参数

  参数说明：

  | 参数名 | 类型   | 是否必须 | 备注   |
  | ------ | ------ | -------- | ------ |
  | id     | number | 必须     | 部门ID |

  请求参数样例：

  ```
  /depts/1
  /depts/3
  ```

##### 5.2.4.3 响应数据

参数格式：`application/json`

  参数说明：

  | 参数名         | 类型   | 是否必须 | 备注                           |
  | -------------- | ------ | -------- | ------------------------------ |
  | code           | number | 必须     | 响应码，1 代表成功，0 代表失败 |
  | msg            | string | 非必须   | 提示信息                       |
  | data           | object | 非必须   | 返回的数据                     |
  | \|- id         | number | 非必须   | id                             |
  | \|- name       | string | 非必须   | 部门名称                       |
  | \|- createTime | string | 非必须   | 创建时间                       |
  | \|- updateTime | string | 非必须   | 修改时间                       |

  响应数据样例：

  ```JSON
  {
    "code": 1,
    "msg": "success",
    "data": {
      "id": 1,
      "name": "学工部",
      "createTime": "2022-09-01T23:06:29",
      "updateTime": "2022-09-01T23:06:29"
    }
  }
  ```

#### 5.2.5 修改部门

##### 5.2.5.1 基本信息

  请求路径：`/depts`

  请求方式：`PUT`

  接口描述：该接口用于修改部门数据

##### 5.2.5.2 请求参数

格式：`application/json`

  参数说明：

  | 参数名 | 类型   | 是否必须 | 备注     |
  | ------ | ------ | -------- | -------- |
  | id     | number | 必须     | 部门ID   |
  | name   | string | 必须     | 部门名称 |

  请求参数样例：

  ```JSON
  {
      "id": 1,
      "name": "教研部"
  }
  ```

##### 5.2.5.3 响应数据

参数格式：`application/json`

  参数说明：

  | 参数名 | 类型   | 是否必须 | 备注                           |
  | ------ | ------ | -------- | ------------------------------ |
  | code   | number | 必须     | 响应码，1 代表成功，0 代表失败 |
  | msg    | string | 非必须   | 提示信息                       |
  | data   | object | 非必须   | 返回的数据                     |

  响应数据样例：

  ```JSON
  {
      "code":1,
      "msg":"success",
      "data":null
  }
  ```

### 5.3 员工管理

#### 5.3.1 员工列表查询

##### 5.3.1.1 基本信息

  请求路径：`/emps`

  请求方式：`GET`

  接口描述：该接口用于员工列表数据的条件分页查询

##### 5.3.1.2 请求参数

参数格式：`queryString`

  参数说明：

  | 参数名称 | 是否必须 | 示例       | 备注                                       |
  | -------- | -------- | ---------- | ------------------------------------------ |
  | name     | 否       | 张         | 姓名                                       |
  | gender   | 否       | 1          | 性别 , 1 男 , 2 女                         |
  | begin    | 否       | 2010-01-01 | 范围匹配的开始时间(入职日期)               |
  | end      | 否       | 2020-01-01 | 范围匹配的结束时间(入职日期)               |
  | page     | 是       | 1          | 分页查询的页码，如果未指定，默认为1        |
  | pageSize | 是       | 10         | 分页查询的每页记录数，如果未指定，默认为10 |

  请求数据样例：

  ```
  /emps?page=1&pageSize=10
  /emps?name=张&page=1&pageSize=10
  /emps?gender=1&page=1&pageSize=10
  /emps?name=张&gender=1&page=1&pageSize=10
  /emps?name=张&gender=1&begin=2007-09-01&end=2022-09-01&page=1&pageSize=10
  ```

##### 5.3.1.3 响应数据

参数格式：`application/json`

  参数说明：

  | 名称           | 类型      | 是否必须 | 备注                                                         |
  | -------------- | --------- | -------- | ------------------------------------------------------------ |
  | code           | number    | 必须     | 响应码, 1 成功 , 0 失败                                      |
  | msg            | string    | 非必须   | 提示信息                                                     |
  | data           | object    | 必须     | 返回的数据                                                   |
  | \|- total      | number    | 必须     | 总记录数                                                     |
  | \|- rows       | object [] | 必须     | 数据列表                                                     |
  | \|- id         | number    | 非必须   | id                                                           |
  | \|- username   | string    | 非必须   | 用户名                                                       |
  | \|- name       | string    | 非必须   | 姓名                                                         |
  | \|- gender     | number    | 非必须   | 性别 , 1 男 ; 2 女                                           |
  | \|- image      | string    | 非必须   | 图像                                                         |
  | \|- position   | number    | 非必须   | 职位, 说明: 1 班主任,2 讲师, 3 学工主管, 4 教研主管, 5 咨询师 |
  | \|- salary     | number    | 非必须   | 薪资                                                         |
  | \|- hireDate   | string    | 非必须   | 入职日期                                                     |
  | \|- deptId     | number    | 非必须   | 部门id                                                       |
  | \|- deptName   | string    | 非必须   | 部门名称                                                     |
  | \|- createTime | string    | 非必须   | 创建时间                                                     |
  | \|- updateTime | string    | 非必须   | 更新时间                                                     |

  响应数据样例：

  ```JSON
  {
    "code": 1,
    "msg": "success",
    "data": {
      "total": 2,
      "rows": [
         {
          "id": 1,
          "username": "jinyong",
          "name": "金庸",
          "gender": 1,
          "image": "https://web-framework.oss-cn-hangzhou.aliyuncs.com/2022-09-02-00-27-53B.jpg",
          "position": 2,
          "salary": 8000,
          "hireDate": "2015-01-01",
          "deptId": 2,
          "deptName": "教研部",
          "createTime": "2022-09-01T23:06:30",
          "updateTime": "2022-09-02T00:29:04"
        },
        {
          "id": 2,
          "username": "zhangwuji",
          "name": "张无忌",
          "gender": 1,
          "image": "https://web-framework.oss-cn-hangzhou.aliyuncs.com/2022-09-02-00-27-53B.jpg",
          "position": 2,
          "salary": 6000,
          "hireDate": "2015-01-01",
          "deptId": 2,
          "deptName": "教研部",
          "createTime": "2022-09-01T23:06:30",
          "updateTime": "2022-09-02T00:29:04"
        }
      ]
    }
  }
  ```

#### 5.3.2 删除员工

##### 5.3.2.1 基本信息

  请求路径：`/emps`

  请求方式：`DELETE`

  接口描述：该接口用于批量删除员工的数据信息

##### 5.3.2.2 请求参数

参数格式：查询参数

  参数说明：

  | 参数名 | 类型       | 示例  | 是否必须 | 备注         |
  | ------ | ---------- | ----- | -------- | ------------ |
  | ids    | 数组 array | 1,2,3 | 必须     | 员工的id数组 |

  请求参数样例：`/emps?ids=1,2,3`

##### 5.3.2.3 响应数据

参数格式：`application/json`

  参数说明：

  | 参数名 | 类型   | 是否必须 | 备注                           |
  | ------ | ------ | -------- | ------------------------------ |
  | code   | number | 必须     | 响应码，1 代表成功，0 代表失败 |
  | msg    | string | 非必须   | 提示信息                       |
  | data   | object | 非必须   | 返回的数据                     |

  响应数据样例：

  ```JSON
  {
      "code":1,
      "msg":"success",
      "data":null
  }
  ```

#### 5.3.3 添加员工

##### 5.3.3.1 基本信息

  请求路径：`/emps`

  请求方式：`POST`

  接口描述：该接口用于添加员工的信息

##### 5.3.3.2 请求参数

参数格式：`application/json`

  参数说明：

  | 名称          | 类型     | 是否必须 | 备注                                                         |
  | ------------- | -------- | -------- | ------------------------------------------------------------ |
  | username      | string   | 必须     | 用户名                                                       |
  | name          | string   | 必须     | 姓名                                                         |
  | gender        | number   | 必须     | 性别, 说明: 1 男, 2 女                                       |
  | image         | string   | 非必须   | 图像                                                         |
  | deptId        | number   | 非必须   | 部门id                                                       |
  | hireDate      | string   | 非必须   | 入职日期                                                     |
  | position      | number   | 非必须   | 职位, 说明: 1 班主任,2 讲师, 3 学工主管, 4 教研主管, 5 咨询师 |
  | salary        | number   | 非必须   | 薪资                                                         |
  | exprList      | object[] | 非必须   | 工作经历列表                                                 |
  | \|- company   | string   | 非必须   | 所在公司                                                     |
  | \|- position  | string   | 非必须   | 职位                                                         |
  | \|- startDate | string   | 非必须   | 开始时间                                                     |
  | \|- endDate   | string   | 非必须   | 结束时间                                                     |

  请求数据样例：

  ```JSON
  {
    "image": "https://web-framework.oss-cn-hangzhou.aliyuncs.com/2022-09-03-07-37-38222.jpg",
    "username": "linpingzhi",
    "name": "林平之",
    "gender": 1,
    "position": 1,
    "hireDate": "2022-09-18",
    "deptId": 1,
    "phone": "18809091234",
    "salary": 8000,
    "exprList": [
        {
           "company": "百度科技股份有限公司",
           "position": "java开发",
           "startDate": "2012-07-01",
           "endDate": "2019-03-03"
        },
        {
           "company": "阿里巴巴科技股份有限公司",
           "position": "架构师",
           "startDate": "2019-03-15",
           "endDate": "2023-03-01"
        }
     ]
  }
  ```

##### 5.3.3.3 响应数据

参数格式：`application/json`

  参数说明：

  | 参数名 | 类型   | 是否必须 | 备注                           |
  | ------ | ------ | -------- | ------------------------------ |
  | code   | number | 必须     | 响应码，1 代表成功，0 代表失败 |
  | msg    | string | 非必须   | 提示信息                       |
  | data   | object | 非必须   | 返回的数据                     |

  响应数据样例：

  ```JSON
  {
      "code":1,
      "msg":"success",
      "data":null
  }
  ```

#### 5.3.4 根据ID查询

##### 5.3.4.1 基本信息

  请求路径：`/emps/{id}`

  请求方式：`GET`

  接口描述：该接口用于根据主键ID查询员工的信息

##### 5.3.4.2 请求参数

参数格式：路径参数

  参数说明：

  | 参数名 | 类型   | 是否必须 | 备注   |
  | ------ | ------ | -------- | ------ |
  | id     | number | 必须     | 员工ID |

  请求参数样例：`/emps/1`

##### 5.3.4.3 响应数据

参数格式：`application/json`

  参数说明：

  | 名称           | 类型     | 是否必须 | 备注                                                         |
  | -------------- | -------- | -------- | ------------------------------------------------------------ |
  | code           | number   | 必须     | 响应码, 1 成功 , 0 失败                                      |
  | msg            | string   | 非必须   | 提示信息                                                     |
  | data           | object   | 必须     | 返回的数据                                                   |
  | \|- id         | number   | 非必须   | id                                                           |
  | \|- username   | string   | 非必须   | 用户名                                                       |
  | \|- name       | string   | 非必须   | 姓名                                                         |
  | \|- password   | string   | 非必须   | 密码                                                         |
  | \|- hireDate   | string   | 非必须   | 入职日期                                                     |
  | \|- gender     | number   | 非必须   | 性别 , 1 男 ; 2 女                                           |
  | \|- image      | string   | 非必须   | 图像                                                         |
  | \|- position   | number   | 非必须   | 职位, 说明: 1 班主任,2 讲师, 3 学工主管, 4 教研主管, 5 咨询师 |
  | \|- salary     | number   | 非必须   | 薪资                                                         |
  | \|- deptId     | number   | 非必须   | 部门id                                                       |
  | \|- createTime | string   | 非必须   | 创建时间                                                     |
  | \|- updateTime | string   | 非必须   | 更新时间                                                     |
  | \|- exprList   | object[] | 非必须   | 工作经历列表                                                 |
  | \|- id         | number   | 非必须   | ID                                                           |
  | \|- company    | string   | 非必须   | 所在公司                                                     |
  | \|- position   | string   | 非必须   | 职位                                                         |
  | \|- startDate  | string   | 非必须   | 开始时间                                                     |
  | \|- endDate    | string   | 非必须   | 结束时间                                                     |
  | \|- empId      | number   | 非必须   | 员工ID                                                       |

  响应数据样例：

  ```JSON
  {
    "code": 1,
    "msg": "success",
    "data": {
      "id": 2,
      "username": "zhangwuji",
      "name": "张无忌",
      "gender": 1,
      "image": "https://web-framework.oss-cn-hangzhou.aliyuncs.com/2022-09-02-00-27-53B.jpg",
      "position": 2,
      "salary": 8000,
      "hireDate": "2015-01-01",
      "deptId": 2,
      "createTime": "2022-09-01T23:06:30",
      "updateTime": "2022-09-02T00:29:04",
      "exprList": [
        {
          "id": 1,
          "startDate": "2012-07-01",
          "endDate": "2019-03-03"
          "company": "百度科技股份有限公司"
          "position": "java开发",
          "empId": 2
        },
        {
          "id": 2,
          "startDate": "2019-3-15",
          "endDate": "2023-03-01"
          "company": "阿里巴巴科技股份有限公司"
          "position": "架构师",
          "empId": 2
        }
      ]
    }
  }
  ```

#### 5.3.5 修改员工

##### 5.3.5.1 基本信息

  请求路径：`/emps`

  请求方式：`PUT`

  接口描述：该接口用于修改员工的数据信息

##### 5.3.5.2 请求参数

参数格式：`application/json`

  参数说明：

  | 名称          | 类型     | 是否必须 | 备注                                                         |
  | ------------- | -------- | -------- | ------------------------------------------------------------ |
  | id            | number   | 必须     | id                                                           |
  | username      | string   | 必须     | 用户名                                                       |
  | name          | string   | 必须     | 姓名                                                         |
  | gender        | number   | 必须     | 性别, 说明: 1 男, 2 女                                       |
  | image         | string   | 非必须   | 图像                                                         |
  | deptId        | number   | 非必须   | 部门id                                                       |
  | hireDate      | string   | 非必须   | 入职日期                                                     |
  | position      | number   | 非必须   | 职位, 说明: 1 班主任,2 讲师, 3 学工主管, 4 教研主管, 5 咨询师 |
  | salary        | number   | 非必须   | 薪资                                                         |
  | exprList      | object[] | 非必须   | 工作经历列表                                                 |
  | \|- id        | number   | 非必须   | ID                                                           |
  | \|- company   | string   | 非必须   | 所在公司                                                     |
  | \|- position  | string   | 非必须   | 职位                                                         |
  | \|- startDate | string   | 非必须   | 开始时间                                                     |
  | \|- endDate   | string   | 非必须   | 结束时间                                                     |
  | \|- empId     | number   | 非必须   | 员工ID                                                       |

  请求数据样例：

  ```JSON
  {
      "id": 2,
      "username": "zhangwuji",
      "password": "123456",
      "name": "张无忌",
      "gender": 1,
      "image": "https://web-framework.oss-cn-hangzhou.aliyuncs.com/2022-09-02-00-27-53B.jpg",
      "position": 2,
      "salary": 8000,
      "hireDate": "2015-01-01",
      "deptId": 2,
      "createTime": "2022-09-01T23:06:30",
      "updateTime": "2022-09-02T00:29:04",
      "exprList": [
        {
          "id": 1,
          "startDate": "2012-07-01",
          "endDate": "2015-06-20",
          "company": "中软国际股份有限公司",
          "position": "java开发",
          "empId": 2
        },
        {
          "id": 2,
          "startDate": "2015-07-01",
          "endDate": "2019-03-03",
          "company": "百度科技股份有限公司",
          "position": "java开发",
          "empId": 2
        },
        {
          "id": 3,
          "startDate": "2019-3-15",
          "endDate": "2023-03-01",
          "company": "阿里巴巴科技股份有限公司",
          "position": "架构师",
          "empId": 2
        }
      ]
    }
  ```

##### 5.3.5.3 响应数据

参数格式：`application/json`

  参数说明：

  | 参数名 | 类型   | 是否必须 | 备注                           |
  | ------ | ------ | -------- | ------------------------------ |
  | code   | number | 必须     | 响应码，1 代表成功，0 代表失败 |
  | msg    | string | 非必须   | 提示信息                       |
  | data   | object | 非必须   | 返回的数据                     |

  响应数据样例：

  ```JSON
  {
      "code":1,
      "msg":"success",
      "data":null
  }
  ```

#### 5.3.6 查询全部员工

##### 5.3.6.1 基本信息

  请求路径：`/emps/list`

  请求方式：`GET`

  接口描述：该接口用于查询全部员工信息 

##### 5.3.6.2 请求参数

无

##### 5.3.6.3 响应数据

参数格式：`application/json`

  参数说明：

  | 名称           | 类型     | 是否必须 | 备注                                                         |
  | -------------- | -------- | -------- | ------------------------------------------------------------ |
  | code           | number   | 必须     | 响应码, 1 成功 , 0 失败                                      |
  | msg            | string   | 非必须   | 提示信息                                                     |
  | data           | object[] | 必须     | 返回的数据                                                   |
  | \|- id         | number   | 必须     | id                                                           |
  | \|- username   | string   | 必须     | 用户名                                                       |
  | \|- name       | string   | 必须     | 姓名                                                         |
  | \|- password   | string   | 非必须   | 密码                                                         |
  | \|- hireDate   | string   | 非必须   | 入职日期                                                     |
  | \|- gender     | number   | 非必须   | 性别 , 1 男 ; 2 女                                           |
  | \|- image      | string   | 非必须   | 图像                                                         |
  | \|- position   | number   | 非必须   | 职位, 说明: 1 班主任,2 讲师, 3 学工主管, 4 教研主管, 5 咨询师 |
  | \|- salary     | number   | 非必须   | 薪资                                                         |
  | \|- deptId     | number   | 非必须   | 部门id                                                       |
  | \|- createTime | string   | 非必须   | 创建时间                                                     |
  | \|- updateTime | string   | 非必须   | 更新时间                                                     |

  响应数据样例：

  ```JSON
  {
    "code": 1,
    "msg": "success",
    "data": [
      {
        "id": 21,
        "username": "zcc",
        "password": "123456",
        "name": "周星驰",
        "gender": 1,
        "image": "https://web-65.oss-cn-beijing.aliyuncs.com/99c143e9-0241-41f3-bc55-dd5e4e0824f4.jpg",
        "position": 1,
        "salary": 8000,
        "hireDate": "2023-04-23",
        "deptId": 2,
        "createTime": "2023-05-26T17:25:01",
        "updateTime": "2023-06-04T19:25:15"
      },
      {
        "id": 6,
        "username": "xiaozhao",
        "password": "123456",
        "name": "小昭",
        "gender": 2,
        "image": "https://web-65.oss-cn-beijing.aliyuncs.com/da94dc38-f165-480c-b8b7-0b3f4bcd1602.jpg",
        "position": 3,
        "salary": 8000,
        "hireDate": "2013-09-05",
        "deptId": 1,
        "createTime": "2023-04-07T11:16:00",
        "updateTime": "2023-04-14T08:22:41"
      }
    ]
  }
  ```

### 5.6 班级管理

#### 5.6.1 班级列表查询

##### 5.6.1.1 基本信息

  请求路径：`/clazzs`

  请求方式：`GET`

  接口描述：该接口用于班级列表数据的条件分页查询

##### 5.6.1.2 请求参数

参数格式：`queryString`

  参数说明：

  | 参数名称 | 是否必须 | 示例     | 备注                                       |
  | -------- | -------- | -------- | ------------------------------------------ |
  | name     | 否       | 黄埔一期 | 班级名称                                   |
  | begin    | 否       | 2023/1/1 | 范围匹配的开始时间(结课时间)               |
  | end      | 否       | 2023/5/1 | 范围匹配的结束时间(结课时间)               |
  | page     | 是       | 1        | 分页查询的页码，如果未指定，默认为1        |
  | pageSize | 是       | 10       | 分页查询的每页记录数，如果未指定，默认为10 |

  请求数据样例：

  ```
  /clazzs?page=1&pageSize=5
  /clazzs?name=java&page=1&pageSize=5
  /clazzs?begin=2023-01-01&end=2023-06-30&page=1&pageSize=5
  /clazzs?name=java&begin=2023-01-01&end=2023-06-30&page=1&pageSize=5
  ```

##### 5.6.1.3 响应数据

参数格式：`application/json`

  参数说明：

  | 名称           | 类型      | 是否必须 | 备注                            | 其他信息          |
  | -------------- | --------- | -------- | ------------------------------- | ----------------- |
  | code           | number    | 必须     | 响应码, 1 成功 , 0 失败         |                   |
  | msg            | string    | 非必须   | 提示信息                        |                   |
  | data           | object    | 必须     | 返回的数据                      |                   |
  | \|- total      | number    | 必须     | 总记录数                        |                   |
  | \|- rows       | object [] | 必须     | 数据列表                        | item 类型: object |
  | \|- id         | number    | 非必须   | id                              |                   |
  | \|- name       | string    | 非必须   | 班级名称                        |                   |
  | \|- room       | string    | 非必须   | 班级教室                        |                   |
  | \|- beginDate  | string    | 非必须   | 开课时间                        |                   |
  | \|- endDate    | string    | 非必须   | 结课时间                        |                   |
  | \|- masterId   | number    | 非必须   | 班主任(员工ID)                  |                   |
  | \|- masterName | string    | 非必须   | 班主任姓名(员工姓名)            |                   |
  | \|- createTime | string    | 非必须   | 创建时间                        |                   |
  | \|- updateTime | string    | 非必须   | 更新时间                        |                   |
  | \|- status     | string    | 非必须   | 状态 （未开班、已开班、已结课） |                   |

  响应数据样例：

  ```JSON
  {
    "code": 1,
    "msg": "success",
    "data": {
      "total": 6,
      "rows": [
        {
          "id": 7,
          "name": "黄埔四期",
          "room": "209",
          "beginDate": "2023-08-01",
          "endDate": "2024-02-15",
          "masterId": 7,
          "createTime": "2023-06-01T17:51:21",
          "updateTime": "2023-06-01T17:51:21",
          "masterName": "纪晓芙",
          "status": "已开班"
        },
        {
          "id": 6,
          "name": "JavaEE就业166期",
          "room": "105",
          "beginDate": "2023-07-20",
          "endDate": "2024-02-20",
          "masterId": 20,
          "createTime": "2023-06-01T17:46:10",
          "updateTime": "2023-06-01T17:46:10",
          "masterName": "陈友谅",
          "status": "未开班"
        }
      ]
    }
  }
  ```

#### 5.6.2 删除班级

##### 5.6.2.1 基本信息

  请求路径：`/clazzs/{id}`

  请求方式：`DELETE`

  接口描述：该接口用于删除班级信息

##### 5.6.2.2 请求参数

参数格式：路径参数

  参数说明：

  | 参数名 | 类型   | 示例 | 是否必须 | 备注     |
  | ------ | ------ | ---- | -------- | -------- |
  | id     | number | 1    | 必须     | 班级的ID |

  请求参数样例：`/clazzs/5`

##### 5.6.2.3 响应数据

参数格式：`application/json`

  参数说明：

  | 参数名 | 类型   | 是否必须 | 备注                           |
  | ------ | ------ | -------- | ------------------------------ |
  | code   | number | 必须     | 响应码，1 代表成功，0 代表失败 |
  | msg    | string | 非必须   | 提示信息                       |
  | data   | object | 非必须   | 返回的数据                     |

  响应数据样例：

  ```JSON
  {
      "code":1,
      "msg":"success",
      "data":null
  }
  ```

#### 5.6.3 添加班级

##### 5.6.3.1 基本信息

  请求路径：`/clazzs`

  请求方式：`POST`

  接口描述：该接口用于添加班级信息

##### 5.6.3.2 请求参数

参数格式：`application/json`

  参数说明：

  | 名称      | 类型   | 是否必须 | 备注                                                     |
  | --------- | ------ | -------- | -------------------------------------------------------- |
  | name      | string | 必须     | 班级名称                                                 |
  | room      | string | 必须     | 班级教室                                                 |
  | beginDate | string | 必须     | 开课时间                                                 |
  | endDate   | string | 必须     | 结课时间                                                 |
  | masterId  | number | 非必须   | 班主任                                                   |
  | subject   | number | 必须     | 学科, 1:java, 2:前端, 3:大数据, 4:Python, 5:Go, 6:嵌入式 |

  请求数据样例：

  ```JSON
  {
    "name": "JavaEE就业166期",
    "room": "101",
    "beginDate": "2023-06-01",
    "endDate": "2024-01-25",
    "masterId": 7,
    "subject": 1
  }
  ```

##### 5.6.3.3 响应数据

参数格式：`application/json`

  参数说明：

  | 参数名 | 类型   | 是否必须 | 备注                           |
  | ------ | ------ | -------- | ------------------------------ |
  | code   | number | 必须     | 响应码，1 代表成功，0 代表失败 |
  | msg    | string | 非必须   | 提示信息                       |
  | data   | object | 非必须   | 返回的数据                     |

  响应数据样例：

  ```JSON
  {
      "code":1,
      "msg":"success",
      "data":null
  }
  ```

#### 5.6.4 根据ID查询

##### 5.6.4.1 基本信息

  请求路径：`/clazzs/{id}`

  请求方式：`GET`

  接口描述：该接口用于根据主键ID查询班级的信息

##### 5.6.4.2 请求参数

参数格式：路径参数

  参数说明：

  | 参数名 | 类型   | 是否必须 | 备注   |
  | ------ | ------ | -------- | ------ |
  | id     | number | 必须     | 班级ID |

  请求参数样例：`/clazzs/8`

##### 5.6.4.3 响应数据

参数格式：`application/json`

  参数说明：

  | 名称           | 类型   | 是否必须 | 备注                                                     |
  | -------------- | ------ | -------- | -------------------------------------------------------- |
  | code           | number | 必须     | 响应码, 1 成功 , 0 失败                                  |
  | msg            | string | 非必须   | 提示信息                                                 |
  | data           | object | 必须     | 返回的数据                                               |
  | \|- id         | number | 必须     | id                                                       |
  | \|- name       | string | 必须     | 班级名称                                                 |
  | \|- room       | string | 必须     | 班级教室                                                 |
  | \|- beginDate  | string | 必须     | 开课时间                                                 |
  | \|- endDate    | string | 必须     | 结课时间                                                 |
  | \|- masterId   | number | 必须     | 班主任(员工ID)                                           |
  | \|- subject    | number | 非必须   | 学科, 1:java, 2:前端, 3:大数据, 4:Python, 5:Go, 6:嵌入式 |
  | \|- createTime | string | 必须     | 创建时间                                                 |
  | \|- updateTime | string | 必须     | 更新时间                                                 |

  响应数据样例：

  ```JSON
  {
    "code": 1,
    "msg": "success",
    "data": {
      "id": 8,
      "name": "JavaEE就业166期",
      "room": "101",
      "beginDate": "2023-06-01",
      "endDate": "2024-01-25",
      "masterId": 7,
      "subject": 1,
      "createTime": "2023-06-04T17:37:45",
      "updateTime": "2023-06-04T17:37:45"
    }
  }
  ```

#### 5.6.5 修改班级

##### 5.6.5.1 基本信息

  请求路径：`/clazzs`

  请求方式：`PUT`

  接口描述：该接口用于修改班级的数据信息

##### 5.6.5.2 请求参数

参数格式：`application/json`

  参数说明：

  | 名称      | 类型   | 是否必须 | 备注                                                     |
  | --------- | ------ | -------- | -------------------------------------------------------- |
  | id        | number | 必须     | id                                                       |
  | name      | string | 必须     | 班级名称                                                 |
  | room      | string | 必须     | 班级教室                                                 |
  | beginDate | string | 必须     | 开课时间                                                 |
  | endDate   | string | 必须     | 结课时间                                                 |
  | masterId  | number | 必须     | 班主任ID(员工ID)                                         |
  | subject   | number | 非必须   | 学科, 1:java, 2:前端, 3:大数据, 4:Python, 5:Go, 6:嵌入式 |

  请求数据样例：

  ```JSON
  {
    "id": 8,
    "name": "JavaEE就业166期",
    "room": "101",
    "beginDate": "2023-06-01",
    "endDate": "2024-01-25",
    "masterId": 7,
    "subject": 1
  }
  ```

##### 5.6.5.3 响应数据

参数格式：`application/json`

  参数说明：

  | 参数名 | 类型   | 是否必须 | 备注                           |
  | ------ | ------ | -------- | ------------------------------ |
  | code   | number | 必须     | 响应码，1 代表成功，0 代表失败 |
  | msg    | string | 非必须   | 提示信息                       |
  | data   | object | 非必须   | 返回的数据                     |

  响应数据样例：

  ```JSON
  {
      "code":1,
      "msg":"success",
      "data":null
  }
  ```

#### 5.6.6 查询所有班级

##### 5.6.6.1 基本信息

  请求路径：`/clazzs/list`

  请求方式：`GET`

  接口描述：该接口用于查询所有班级信息

##### 5.6.6.2 请求参数

无

##### 5.6.6.3 响应数据

参数格式：`application/json`

  参数说明：

  | 名称           | 类型     | 是否必须 | 备注                                                     |
  | -------------- | -------- | -------- | -------------------------------------------------------- |
  | code           | number   | 必须     | 响应码, 1 成功 , 0 失败                                  |
  | msg            | string   | 非必须   | 提示信息                                                 |
  | data           | object[] | 非必须   | 返回的数据                                               |
  | \|- id         | number   | 非必须   | id                                                       |
  | \|- name       | string   | 非必须   | 班级名称                                                 |
  | \|- room       | string   | 非必须   | 班级教室                                                 |
  | \|- beginDate  | string   | 非必须   | 开课时间                                                 |
  | \|- endDate    | string   | 非必须   | 结课时间                                                 |
  | \|- masterId   | number   | 非必须   | 班主任(员工ID)                                           |
  | \|- subject    | number   | 非必须   | 学科, 1:java, 2:前端, 3:大数据, 4:Python, 5:Go, 6:嵌入式 |
  | \|- createTime | string   | 非必须   | 创建时间                                                 |
  | \|- updateTime | string   | 非必须   | 更新时间                                                 |

  响应数据样例：

  ```JSON
  {
    "code": 1,
    "msg": "success",
    "data":[
        {
          "id": 7,
          "name": "黄埔四期",
          "room": "209",
          "beginDate": "2023-08-01",
          "endDate": "2024-02-15",
          "masterId": 7,
          "subject": 1,
          "createTime": "2023-06-01T17:51:21",
          "updateTime": "2023-06-01T17:51:21"
        },
        {
          "id": 6,
          "name": "JavaEE就业166期",
          "room": "105",
          "beginDate": "2023-07-20",
          "endDate": "2024-02-20",
          "masterId": 20,
          "subject": 1,
          "createTime": "2023-06-01T17:46:10",
          "updateTime": "2023-06-01T17:46:10"
        }
      ]
  }
  ```

### 5.7 学员管理

#### 5.7.1 学员列表查询

##### 5.7.1.1 基本信息

  请求路径：`/students`

  请求方式：`GET`

  接口描述：该接口用于学员列表数据的条件分页查询

##### 5.7.1.2 请求参数

参数格式：`queryString`

  参数说明：

  | 参数名称 | 是否必须 | 示例 | 备注                                            |
  | -------- | -------- | ---- | ----------------------------------------------- |
  | name     | 否       | 张三 | 学员姓名                                        |
  | degree   | 否       | 1    | 学历(1:初中,2:高中,3:大专,4:本科,5:硕士,6:博士) |
  | clazzId  | 否       | 2    | 班级ID                                          |
  | page     | 是       | 1    | 分页查询的页码，如果未指定，默认为1             |
  | pageSize | 是       | 10   | 分页查询的每页记录数，如果未指定，默认为10      |

  请求数据样例：

  ```
  /students?page=1&pageSize=5
  /students?name=张&page=1&pageSize=5
  /students?name=张&degree=1&clazzId=2&page=1&pageSize=5
  ```

##### 5.7.1.3 响应数据

参数格式：`application/json`

  参数说明：

  | 名称               | 类型      | 是否必须 | 备注                                            |
  | ------------------ | --------- | -------- | ----------------------------------------------- |
  | code               | number    | 必须     | 响应码, 1 成功 , 0 失败                         |
  | msg                | string    | 非必须   | 提示信息                                        |
  | data               | object    | 必须     | 返回的数据                                      |
  | \|- total          | number    | 必须     | 总记录数                                        |
  | \|- rows           | object [] | 必须     | 数据列表                                        |
  | \|- id             | number    | 非必须   | id                                              |
  | \|- name           | string    | 非必须   | 姓名                                            |
  | \|- no             | string    | 非必须   | 学号                                            |
  | \|- gender         | number    | 非必须   | 性别(1: 男 , 2: 女)                             |
  | \|- phone          | string    | 非必须   | 手机号                                          |
  | \|- degree         | number    | 非必须   | 学历(1:初中,2:高中,3:大专,4:本科,5:硕士,6:博士) |
  | \|- idCard         | string    | 非必须   | 身份证号                                        |
  | \|- isCollege      | number    | 非必须   | 是否是院校学生 (1: 是, 0: 否)                   |
  | \|- address        | string    | 非必须   | 联系地址                                        |
  | \|- graduationDate | string    | 非必须   | 毕业时间                                        |
  | \|- violationCount | number    | 非必须   | 违纪次数                                        |
  | \|- violationScore | number    | 非必须   | 违纪扣分                                        |
  | \|- clazzId        | number    | 非必须   | 班级ID                                          |
  | \|- clazzName      | string    | 非必须   | 班级名称                                        |
  | \|- createTime     | string    | 非必须   | 创建时间                                        |
  | \|- updateTime     | string    | 非必须   | 更新时间                                        |

  响应数据样例：

  ```JSON
  {
    "code": 1,
    "msg": "success",
    "data": {
      "total": 5,
      "rows": [
        {
          "id": 3,
          "name": "Lily",
          "no": "2023001003",
          "gender": 2,
          "phone": "13309230912",
          "degree": 4,
          "idCard": "110090110090110090",
          "isCollege": 0,
          "address": "回龙观东大街110号",
          "graduationDate": "2020-07-01",
          "violationCount": 2,
          "violationScore": 5,
          "clazzId": 1,
          "createTime": "2023-06-01T18:35:23",
          "updateTime": "2023-06-01T19:37:42",
          "clazzName": "黄埔班一期"
        },
        {
          "id": 4,
          "name": "Jerry",
          "no": "2023001004",
          "gender": 1,
          "phone": "15309232323",
          "degree": 4,
          "idCard": "110090110090110090",
          "isCollege": 0,
          "address": "回龙观东大街110号",
          "graduationDate": "2020-07-01",
          "violationCount": 1,
          "violationScore": 2,
          "clazzId": 1,
          "createTime": "2023-06-01T18:35:48",
          "updateTime": "2023-06-01T19:37:35",
          "clazzName": "黄埔班一期"
        }
      ]
    }
  }
  ```

#### 5.7.2 删除学员

##### 5.7.2.1 基本信息

  请求路径：`/students/{ids}`

  请求方式：`DELETE`

  接口描述：该接口用于批量删除学员信息

##### 5.7.2.2 请求参数

参数格式：路径参数

  参数说明：

  | 参数名 | 类型 | 示例 | 是否必须 | 备注         |
  | ------ | ---- | ---- | -------- | ------------ |
  | ids    | 数组 | 1    | 必须     | 学员的ID数组 |

  请求参数样例：`/students/1,2,3`

##### 5.7.2.3 响应数据

参数格式：`application/json`

  参数说明：

  | 参数名 | 类型   | 是否必须 | 备注                           |
  | ------ | ------ | -------- | ------------------------------ |
  | code   | number | 必须     | 响应码，1 代表成功，0 代表失败 |
  | msg    | string | 非必须   | 提示信息                       |
  | data   | object | 非必须   | 返回的数据                     |

  响应数据样例：

  ```JSON
  {
      "code":1,
      "msg":"success",
      "data":null
  }
  ```

#### 5.7.3 添加学员

##### 5.7.3.1 基本信息

  请求路径：`/students`

  请求方式：`POST`

  接口描述：该接口用于添加学员信息

##### 5.7.3.2 请求参数

参数格式：`application/json`

  参数说明：

  | 名称           | 类型   | 是否必须 | 备注                                            |
  | -------------- | ------ | -------- | ----------------------------------------------- |
  | name           | string | 必须     | 姓名                                            |
  | no             | string | 必须     | 学号                                            |
  | gender         | number | 必须     | 性别                                            |
  | phone          | string | 必须     | 手机号                                          |
  | degree         | number | 必须     | 学历(1:初中,2:高中,3:大专,4:本科,5:硕士,6:博士) |
  | clazzId        | number | 必须     | 班级ID                                          |
  | idCard         | string | 非必须   | 身份证号                                        |
  | isCollege      | number | 非必须   | 是否是院校学生 (1: 是, 0: 否)                   |
  | address        | string | 非必须   | 联系地址                                        |
  | graduationDate | string | 非必须   | 毕业时间                                        |

  请求数据样例：

  ```JSON
  {
      "name": "阿大",
      "no": "2024010801",
      "gender": 1,
      "phone": "15909091235",
      "idCard": "159090912351590909",
      "isCollege": 1,
      "address": "昌平回龙观",
      "degree": 4,
      "graduationDate": "2024-01-01",
      "clazzId": 9
  }
  ```

##### 5.7.3.3 响应数据

参数格式：`application/json`

  参数说明：

  | 参数名 | 类型   | 是否必须 | 备注                           |
  | ------ | ------ | -------- | ------------------------------ |
  | code   | number | 必须     | 响应码，1 代表成功，0 代表失败 |
  | msg    | string | 非必须   | 提示信息                       |
  | data   | object | 非必须   | 返回的数据                     |

  响应数据样例：

  ```JSON
  {
      "code":1,
      "msg":"success",
      "data":null
  }
  ```

#### 5.7.4 根据ID查询

##### 5.7.4.1 基本信息

  请求路径：`/students/{id}`

  请求方式：`GET`

  接口描述：该接口用于根据主键ID查询学员的信息

##### 5.7.4.2 请求参数

参数格式：路径参数

  参数说明：

  | 参数名 | 类型   | 是否必须 | 备注   |
  | ------ | ------ | -------- | ------ |
  | id     | number | 必须     | 学员ID |

  请求参数样例：`/students/8`

##### 5.7.4.3 响应数据

参数格式：`application/json`

  参数说明：

  | 名称               | 类型   | 是否必须 | 备注                                            |
  | ------------------ | ------ | -------- | ----------------------------------------------- |
  | code               | number | 必须     | 响应码, 1 成功 , 0 失败                         |
  | msg                | string | 非必须   | 提示信息                                        |
  | data               | object | 必须     | 返回的数据                                      |
  | \|- id             | number | 必须     | id                                              |
  | \|- name           | string | 必须     | 姓名                                            |
  | \|- no             | string | 必须     | 学号                                            |
  | \|- phone          | string | 必须     | 手机号                                          |
  | \|- gender         | string | 必须     | 性别(1:男, 2:女)                                |
  | \|- degree         | number | 必须     | 学历(1:初中,2:高中,3:大专,4:本科,5:硕士,6:博士) |
  | \|- idCard         | string | 非必须   | 身份证号                                        |
  | \|- isCollege      | number | 非必须   | 是否是院校学生 (1: 是, 0: 否)                   |
  | \|- address        | string | 非必须   | 联系地址                                        |
  | \|- graduationDate | string | 非必须   | 毕业时间                                        |
  | \|- violationCount | number | 必须     | 违纪次数                                        |
  | \|- violationScore | number | 必须     | 违纪扣分                                        |
  | \|- clazzId        | number | 必须     | 班级ID                                          |
  | \|- createTime     | string | 必须     | 创建时间                                        |
  | \|- updateTime     | string | 必须     | 更新时间                                        |

  响应数据样例：

  ```JSON
  {
    "code": 1,
    "msg": "success",
    "data": {
      "id": 7,
      "name": "Locos",
      "no": "2023001010",
      "gender": 1,
      "phone": "13712345678",
      "degree": 5,
      "idCard": "110090110090110090",
      "isCollege": 0,
      "address": "回龙观东大街110号",
      "graduationDate": "2020-07-01",
      "violationCount": 0,
      "violationScore": 0,
      "clazzId": 2,
      "createTime": "2023-06-04T18:27:27",
      "updateTime": "2023-06-04T18:27:27"
    }
  }
  ```

#### 5.7.5 修改学员

##### 5.7.5.1 基本信息

  请求路径：`/students`

  请求方式：`PUT`

  接口描述：该接口用于修改学员的数据信息

##### 5.7.5.2 请求参数

参数格式：`application/json`

  参数说明：

  | 名称           | 类型   | 是否必须 | 备注                                            |
  | -------------- | ------ | -------- | ----------------------------------------------- |
  | id             | number | 必须     | id                                              |
  | name           | string | 必须     | 姓名                                            |
  | no             | string | 必须     | 学号                                            |
  | phone          | string | 必须     | 手机号                                          |
  | gender         | string | 必须     | 性别(1:男, 2:女)                                |
  | degree         | number | 必须     | 学历(1:初中,2:高中,3:大专,4:本科,5:硕士,6:博士) |
  | idCard         | string | 非必须   | 身份证号                                        |
  | isCollege      | number | 非必须   | 是否是院校学生 (1: 是, 0: 否)                   |
  | address        | string | 非必须   | 联系地址                                        |
  | graduationDate | string | 非必须   | 毕业时间                                        |
  | violationCount | number | 必须     | 违纪次数                                        |
  | violationScore | number | 必须     | 违纪扣分                                        |
  | clazzId        | number | 必须     | 班级ID                                          |

  请求数据样例：

  ```JSON
  {
    "id": 7,
    "name": "Locos",
    "no": "2023001010",
    "gender": 1,
    "phone": "13712345678",
    "degree": 5,
    "idCard": "110090110090110090",
    "isCollege": 0,
    "address": "回龙观东大街110号",
    "graduationDate": "2020-07-01",
    "violationCount": 0,
    "violationScore": 0,
    "clazzId": 2
  }
  ```

##### 5.7.5.3 响应数据

参数格式：`application/json`

  参数说明：

  | 参数名 | 类型   | 是否必须 | 备注                           |
  | ------ | ------ | -------- | ------------------------------ |
  | code   | number | 必须     | 响应码，1 代表成功，0 代表失败 |
  | msg    | string | 非必须   | 提示信息                       |
  | data   | object | 非必须   | 返回的数据                     |

  响应数据样例：

  ```JSON
  {
      "code":1,
      "msg":"success",
      "data":null
  }
  ```

#### 5.7.6 违纪处理

##### 5.7.6.1 基本信息

  请求路径：`/students/violation/{id}/{score}`

  请求方式：`PUT`

  接口描述：该接口用于修改学员的数据信息

##### 5.7.6.2 请求参数

参数格式：路径参数

  参数说明：

  | 名称  | 类型   | 是否必须 | 备注     |
  | ----- | ------ | -------- | -------- |
  | id    | number | 必须     | 学员ID   |
  | score | number | 必须     | 扣除分数 |

##### 5.7.6.3 响应数据

参数格式：`application/json`

  参数说明：

  | 参数名 | 类型   | 是否必须 | 备注                           |
  | ------ | ------ | -------- | ------------------------------ |
  | code   | number | 必须     | 响应码，1 代表成功，0 代表失败 |
  | msg    | string | 非必须   | 提示信息                       |
  | data   | object | 非必须   | 返回的数据                     |

  响应数据样例：

  ```JSON
  {
      "code":1,
      "msg":"success",
      "data":null
  }
  ```

### 5.4 登录认证

#### 5.4.1 员工登录

##### 5.4.1.1 基本信息

  请求路径：`/login`

  请求方式：`POST`

  接口描述：该接口用于员工登录智学云帆-教学管理系统，登录完毕后，系统下发JWT令牌。 

##### 5.4.1.2 请求参数

参数格式：`application/json`

  参数说明：

  | 名称     | 类型   | 是否必须 | 备注   |
  | -------- | ------ | -------- | ------ |
  | username | string | 必须     | 用户名 |
  | password | string | 必须     | 密码   |

  请求数据样例：

  ```JSON
  {
      "username": "songjiang",
      "password": "123456"
  }
  ```

##### 5.4.1.3 响应数据

参数格式：`application/json`

  参数说明：

  | 名称         | 类型   | 是否必须 | 备注                    |
  | ------------ | ------ | -------- | ----------------------- |
  | code         | number | 必须     | 响应码, 1 成功 ; 0 失败 |
  | msg          | string | 非必须   | 提示信息                |
  | data         | object | 必须     | 返回的数据              |
  | \|- id       | number | 必须     | 员工ID                  |
  | \|- username | string | 必须     | 用户名                  |
  | \|- name     | string | 必须     | 姓名                    |
  | \|- token    | string | 必须     | 令牌                    |

  响应数据样例：

  ```JSON
  {
      "code": 1,
      "msg": "success",
      "data": {
          "id": 2,
          "username": "songjiang",
          "name": "宋江",
          "token": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJzb25namlhbmciLCJleHAiOjE2OTg3MDE3NjJ9.w06EkRXTep6SrvMns3w5RKe79nxauDe7fdMhBLK-MKY"
      }
  }
  ```

##### 5.4.1.4 备注说明

> 用户登录成功后，系统会自动下发JWT令牌，然后在后续的每次请求中，都需要在请求头header中携带到服务端，请求头的名称为 `token` ，值为 登录时下发的JWT令牌。 如果检测到用户未登录，则直接响应 **401** 状态码 。

------

### 5.5 文件上传

#### 5.5.1 图片上传

##### 5.5.1.1 基本信息

  请求路径：`/upload`

  请求方式：`POST`

  接口描述：上传图片接口

##### 5.5.1.2 请求参数

参数格式：`multipart/form-data`

  参数说明：

  | 参数名称 | 参数类型 | 是否必须 | 示例 | 备注 |
  | -------- | -------- | -------- | ---- | ---- |
  | file     | file     | 是       |      |      |

##### 5.5.1.3 响应数据

参数格式：`application/json`

  参数说明：

  | 参数名 | 类型   | 是否必须 | 备注                           |
  | ------ | ------ | -------- | ------------------------------ |
  | code   | number | 必须     | 响应码，1 代表成功，0 代表失败 |
  | msg    | string | 非必须   | 提示信息                       |
  | data   | object | 非必须   | 返回的数据，上传图片的访问路径 |

  响应数据样例：

  ```JSON
  {
      "code": 1,
      "msg": "success",
      "data": "https://web-framework.oss-cn-hangzhou.aliyuncs.com/2022-09-02-00-27-0400.jpg"
  }
  ```

------

## 六、服务端开发(Devbox)

<img src="./attachments/image-20251103171836602.png" alt="image-20251103171836602" style="zoom: 80%;" />

------

<img src="./attachments/image-20251103171959123.png" alt="image-20251103171959123" style="zoom: 80%;" />

------

<img src="./attachments/image-20251103172131105.png" alt="image-20251103172131105" style="zoom: 80%;" />

------

<img src="./attachments/image-20251103172149837.png" alt="image-20251103172149837" style="zoom: 80%;" />

------

<img src="./attachments/image-20251103172252075.png" alt="image-20251103172252075" style="zoom: 80%;" />

------

<img src="./attachments/image-20251103172330151.png" alt="image-20251103172330151" style="zoom: 80%;" />

------

## 七、前端项目创建(Devbox)

<img src="./attachments/image-20251103172857292.png" alt="image-20251103172857292" style="zoom: 80%;" />

------

<img src="./attachments/image-20251103173017311.png" alt="image-20251103173017311" style="zoom: 80%;" />

------

<img src="./attachments/image-20251103173101037.png" alt="image-20251103173101037" style="zoom: 80%;" />

------

## 八、AI提示词(Cursor)

### 8.1 后端项目

#### 8.1.1 部门管理

```sql
请根据提供的部门表的表结构和接口文档,基于SpringBoot+Mybatis+PageHelper技术帮我完成部门管理功能的接口开发 (使用JDK1.8之后新语法)。
1. 要操作的表是 dept 部门表, 表结构如下: 
CREATE TABLE dept (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '部门ID（唯一标识，自增主键）',
    name VARCHAR(10) NOT NULL UNIQUE COMMENT '部门名称',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后操作时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='部门信息表';

2. 要操作的数据库的主机地址: test-zxyf-mysql.ns-w6hasfpj.svc, 端口号: 3306, 用户名: root , 密码: 6vqgnq5k, 数据库名: zxyf
3. 部门管理中一共有5个接口, 具体的接口信息如下: 
    3.1 部门列表查询
            请求路径：/depts
            请求方式：GET
            请求参数: 无
            响应数据: 
                    {
                      "code": 1,
                      "msg": "success",
                      "data": [
                        {
                          "id": 1,
                          "name": "学工部",
                          "createTime": "2022-09-01T23:06:29",
                          "updateTime": "2022-09-01T23:06:29"
                        },
                        {
                          "id": 2,
                          "name": "教研部",
                          "createTime": "2022-09-01T23:06:29",
                          "updateTime": "2022-09-01T23:06:29"
                        }
                      ]
                    }
            备注: 响应效果中 code 代表是否操作成功, 1: 成功, 0: 失败; msg: 提示信息; data: 返回的数据

        3.2 删除部门
        请求路径：/depts/{id}
        请求方式：DELETE
        请求参数：id ，为路径参数
        请求样例：/depts/1, /depts/2
        响应数据格式：
                {
                    "code":1,
                    "msg":"success",
                    "data":null
                }

        3.3 添加部门
            请求路径：/depts
            请求方式：POST
            请求样例：{"name": "教研部"}
            响应数据格式：
                    {
                        "code":1,
                        "msg":"success",
                        "data":null
                    }

        3.4 根据ID查询
            请求路径：/depts/{id}
            请求方式：GET
            请求参数：id ，为路径参数
            请求样例：/depts/1, /depts/2
            响应数据格式：
                    {
                      "code": 1,
                      "msg": "success",
                      "data": {
                        "id": 1,
                        "name": "学工部",
                        "createTime": "2022-09-01T23:06:29",
                        "updateTime": "2022-09-01T23:06:29"
                      }
                    }

        3.5 修改部门
            请求路径：/depts
            请求方式：PUT
            请求样例:
                    {
                        "id": 1,
                        "name": "教研部"
                    }
            响应数据格式：
                    {
                        "code":1,
                        "msg":"success",
                        "data":null
                    }
```

#### 8.1.2 员工管理

```sql
请提供的表结构、接口文档 以及页面原型和需求说明，基于 SpringBoot+Mybatis+PageHelper 帮我完成员工管理的功能接口开发（使用JDK1.8之后的新语法）。

1. 要操作的是员工表emp 以及员工的工作经历表 emp_expr，具体的表结构如下：
CREATE TABLE emp (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '员工ID',
    username VARCHAR(20) NOT NULL UNIQUE COMMENT '用户名（2-20位）',
    password VARCHAR(64) DEFAULT '123456' COMMENT '登录密码',
    name VARCHAR(10) NOT NULL COMMENT '姓名（2-10位）',
    gender TINYINT COMMENT '性别, 1: 男, 2: 女',
    phone CHAR(11) NOT NULL UNIQUE COMMENT '手机号（11位）',
    position TINYINT COMMENT '职位, 1: 班主任, 2: 讲师, 3: 学工主管, 4: 教研主管, 5: 咨询师',
    salary INT COMMENT '薪资（整数存储）',
    image VARCHAR(255) COMMENT '头像路径',
    hire_date DATE COMMENT '入职日期',
    dept_id INT COMMENT '所属部门ID',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后操作时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='员工信息表';


CREATE TABLE emp_expr (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '经历ID',
    emp_id INT COMMENT '关联员工的ID',
    company VARCHAR(50) COMMENT '公司名称',
    position VARCHAR(50) COMMENT '担任职位',
    start_date DATE COMMENT '开始日期',
    end_date DATE COMMENT '结束日期'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='员工工作经历表';


2. 员工管理中一共包含6个接口，具体的接口信息如下：
     2.1 员工列表查询
         请求路径：/emps
         请求方式：GET
         请求参数：
             name: 姓名，可选
             gender: 性别，可选
             begin: 入职日期的开始时间，可选
             end: 入职日期的结束时间，可选
             page: 页码，默认1
             pageSize: 每页展示记录数，默认10
         请求样例:
             /emps?page=1&pageSize=10
             /emps?name=张&page=1&pageSize=10
             /emps?gender=1&page=1&pageSize=10
             /emps?name=张&gender=1&page=1&pageSize=10
             /emps?name=张&gender=1&begin=2007-09-01&end=2022-09-01&page=1&pageSize=10
         响应数据格式：
             {
               "code": 1,
               "msg": "success",
               "data": {
                 "total": 2,
                 "rows": [
                    {
                     "id": 1,
                     "username": "jinyong",
                     "name": "金庸",
                     "gender": 1,
                     "image": "https://web-framework.oss-cn-hangzhou.aliyuncs.com/2022-09-02-00-27-53B.jpg",
                     "position": 2,
                     "salary": 8000,
                     "hireDate": "2015-01-01",
                     "deptId": 2,
                     "deptName": "教研部",
                     "createTime": "2022-09-01T23:06:30",
                     "updateTime": "2022-09-02T00:29:04"
                   },
                   {
                     "id": 2,
                     "username": "zhangwuji",
                     "name": "张无忌",
                     "gender": 1,
                     "image": "https://web-framework.oss-cn-hangzhou.aliyuncs.com/2022-09-02-00-27-53B.jpg",
                     "position": 2,
                     "salary": 6000,
                     "hireDate": "2015-01-01",
                     "deptId": 2,
                     "deptName": "教研部",
                     "createTime": "2022-09-01T23:06:30",
                     "updateTime": "2022-09-02T00:29:04"
                   }
                 ]
               }
             }

        2.2 删除员工
            请求路径：/emps
            请求方式：DELETE
            请求参数：ids ，为路径参数
            请求样例：/emps?ids=1,2,3
            响应数据格式：
                {
                    "code":1,
                    "msg":"success",
                    "data":null
                }
    
        2.3 添加员工
            请求路径：/emps
            请求方式：POST
            请求样例：
                {
                  "image": "https://web-framework.oss-cn-hangzhou.aliyuncs.com/2022-09-03-07-37-38222.jpg",
                  "username": "linpingzhi",
                  "name": "林平之",
                  "gender": 1,
                  "position": 1,
                  "hireDate": "2022-09-18",
                  "deptId": 1,
                  "phone": "18809091234",
                  "salary": 8000,
                  "exprList": [
                      {
                         "company": "百度科技股份有限公司",
                         "position": "java开发",
                         "startDate": "2012-07-01",
                         "endDate": "2019-03-03"
                      },
                      {
                         "company": "阿里巴巴科技股份有限公司",
                         "position": "架构师",
                         "startDate": "2019-03-15",
                         "endDate": "2023-03-01"
                      }
                   ]
                }
            响应数据格式：
                {
                    "code":1,
                    "msg":"success",
                    "data":null
                }

        2.4 根据ID查询
            请求路径：/emps/{id}
            请求方式：GET
            请求参数：id ，为路径参数
            请求样例：/emps/1, /emps/2
            响应数据格式：
                {
                  "code": 1,
                  "msg": "success",
                  "data": {
                    "id": 2,
                    "username": "zhangwuji",
                    "name": "张无忌",
                    "gender": 1,
                    "image": "https://web-framework.oss-cn-hangzhou.aliyuncs.com/2022-09-02-00-27-53B.jpg",
                    "position": 2,
                    "salary": 8000,
                    "hireDate": "2015-01-01",
                    "deptId": 2,
                    "createTime": "2022-09-01T23:06:30",
                    "updateTime": "2022-09-02T00:29:04",
                    "exprList": [
                      {
                        "id": 1,
                        "startDate": "2012-07-01",
                        "endDate": "2019-03-03"
                        "company": "百度科技股份有限公司"
                        "position": "java开发",
                        "empId": 2
                      },
                      {
                        "id": 2,
                        "startDate": "2019-3-15",
                        "endDate": "2023-03-01"
                        "company": "阿里巴巴科技股份有限公司"
                        "position": "架构师",
                        "empId": 2
                      }
                    ]
                  }
                }

        2.5 修改员工
            请求路径：/emps
            请求方式：PUT
            请求样例:
                {
                    "id": 2,
                    "username": "zhangwuji",
                    "password": "123456",
                    "name": "张无忌",
                    "gender": 1,
                    "image": "https://web-framework.oss-cn-hangzhou.aliyuncs.com/2022-09-02-00-27-53B.jpg",
                    "position": 2,
                    "salary": 8000,
                    "hireDate": "2015-01-01",
                    "deptId": 2,
                    "createTime": "2022-09-01T23:06:30",
                    "updateTime": "2022-09-02T00:29:04",
                    "exprList": [
                      {
                        "id": 1,
                        "startDate": "2012-07-01",
                        "endDate": "2015-06-20"
                        "company": "中软国际股份有限公司"
                        "position": "java开发",
                        "empId": 2
                      },
                      {
                        "id": 2,
                        "startDate": "2015-07-01",
                        "endDate": "2019-03-03"
                        "company": "百度科技股份有限公司"
                        "position": "java开发",
                        "empId": 2
                      },
                      {
                        "id": 3,
                        "startDate": "2019-3-15",
                        "endDate": "2023-03-01"
                        "company": "阿里巴巴科技股份有限公司"
                        "position": "架构师",
                        "empId": 2
                      }
                    ]
                  }
            响应数据格式：
                {
                    "code":1,
                    "msg":"success",
                    "data":null
                }

        2.6 查询全部员工
            请求路径：/emps/list
            请求方式：GET
            请求参数：无
            响应数据格式：
                {
                  "code": 1,
                  "msg": "success",
                  "data": [
                    {
                      "id": 21,
                      "username": "zcc",
                      "password": "123456",
                      "name": "周星驰",
                      "gender": 1,
                      "image": "https://web-65.oss-cn-beijing.aliyuncs.com/99c143e9-0241-41f3-bc55-dd5e4e0824f4.jpg",
                      "position": 1,
                      "salary": 8000,
                      "hireDate": "2023-04-23",
                      "deptId": 2,
                      "createTime": "2023-05-26T17:25:01",
                      "updateTime": "2023-06-04T19:25:15"
                    },
                    {
                      "id": 6,
                      "username": "xiaozhao",
                      "password": "123456",
                      "name": "小昭",
                      "gender": 2,
                      "image": "https://web-65.oss-cn-beijing.aliyuncs.com/da94dc38-f165-480c-b8b7-0b3f4bcd1602.jpg",
                      "position": 3,
                      "salary": 8000,
                      "hireDate": "2013-09-05",
                      "deptId": 1,
                      "createTime": "2023-04-07T11:16:00",
                      "updateTime": "2023-04-14T08:22:41"
                    }
                  ]
                }
```

#### 8.1.3 文件上传

```bash
根据如下接口信息，完成文件上传的功能。
1. 文件上传的接口信息如下：
     1.1 请求路径: /upload
     1.2 请求方式: POST
     1.3 请求参数名: file
     1.4 响应结果样例(data: 表示文件的访问路径):
         {
           "code": 1,
           "msg": "success",
           "data": "http://aliyun.oss.com/1.jpg"
          }

2. 文件使用对象存储服务存储，对象存储服务的信息:
     Access Key：w6hasfpj
     Secret Key：r674prz8pjjpbbnq
     Internal：object-storage.objectstorage-system.svc.cluster.local
     External：objectstorageapi.hzh.sealos.run

     存储桶名： w6hasfpj-zxyf

对象存储服务操作指南：https://sealos.run/docs/guides/object-storage
```

#### 8.1.4 登录

```json
请根据提供的接口文档，帮我完成员工登录的功能接口开发，员工登录要操作的表结构就是员工表 emp 。
1. 登录接口的基本信息如下：
    1.1 请求路径: /login
    1.2 请求方式: POST
    1.3 接口描述: 该接口用于员工登录智学云帆-教学管理系统，登录完毕后，系统下发JWT令牌。 
    1.4 请求参数样例:
        {
            "username": "songjiang",
            "password": "123456"
        }
    1.5 响应数据样例:
        1.5.1 登录成功
           {
            "code": 1,
            "msg": "success",
            "data": {
                "id": 2,
                "username": "songjiang",
                "name": "宋江",
                "token": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJzb25namlhbmciLCJleHAiOjE2OTg3MDE3NjJ9.w06EkRXTep6SrvMns3w5RKe79nxauDe7fdMhBLK-MKY"
            }
        }
    
         1.5.2 登录失败
           {
            "code": 0,
            "msg": "用户名或密码错误",
            "data": null
           }
      1.6 备注说明: 用户登录成功后，系统会自动下发JWT令牌，然后在后续的每次请求中，都需要在请求头header中携带到服务端，请求头的名称为 token ，值为 登录时下发的JWT令牌。 如果检测到用户未登录，则直接响应 401 状态码 。

请根据上述登录接口的信息，帮我实现登录接口功能的开发。
```

### 8.2 前端项目

#### 8.2.1 页面布局

```json
请根据提供的页面原型的截图，基于Vue3 + ElementPlus帮我制作 “智学云帆-教学管理系统” 的页面，首先先完成页面的基本布局 。 具体要求如下:
1. 页面的顶部，要展示系统的标题，标题内容：“智学云帆-教学管理系统”，字体类型：楷体，字体大小：30，居左对齐。 在顶部标题栏的右侧，要展示 “退出登录【张三】” 的超链接，这里的张三，将来要展示的当前登录员工，目前可以先写死。
2. 左侧的侧边栏，展示出这个管理系统的菜单，具体的菜单结构为：
   1. 首页
   2. 班级学员管理
      2.1 班级管理
      2.2 学员管理
   3. 系统信息管理
      3.1 部门管理
      3.2 员工管理
3. 右侧为核心展示区域，点击左侧菜单，在右侧要展示出对应的页面，比如点击 "首页"，右侧核心展示区域就要展示首页的页面 。
```

生成的页面结构如果不对，可以根据情况编写提示词来进行调整。

#### 8.2.2 部门管理

```bash
请根据提供的部门管理的页面原型图，和接口文档完成部门管理的功能开发，包括：增加、修改、删除、查询部门的功能。
1. 具体的接口信息如下：
 1.1 部门列表查询
     请求路径：/depts
     请求方式：GET
     请求参数：无
     响应数据格式：
         {
           "code": 1,
           "msg": "success",
           "data": [
             {
               "id": 1,
               "name": "学工部",
               "createTime": "2022-09-01T23:06:29",
               "updateTime": "2022-09-01T23:06:29"
             },
             {
               "id": 2,
               "name": "教研部",
               "createTime": "2022-09-01T23:06:29",
               "updateTime": "2022-09-01T23:06:29"
             }
           ]
         }

    1.2 删除部门
        请求路径：/depts/{id}
        请求方式：DELETE
        请求参数：id ，为路径参数
        请求样例：/depts/1, /depts/2
        响应数据格式：
            {
                "code":1,
                "msg":"success",
                "data":null
            }

    1.3 添加部门
        请求路径：/depts
        请求方式：POST
        请求样例：{"name": "教研部"}
        响应数据格式：
            {
                "code":1,
                "msg":"success",
                "data":null
            }

    1.4 根据ID查询
        请求路径：/depts/{id}
        请求方式：GET
        请求参数：id ，为路径参数
        请求样例：/depts/1, /depts/2
        响应数据格式：
            {
              "code": 1,
              "msg": "success",
              "data": {
                "id": 1,
                "name": "学工部",
                "createTime": "2022-09-01T23:06:29",
                "updateTime": "2022-09-01T23:06:29"
              }
            }

    1.5 修改部门
        请求路径：/depts
        请求方式：PUT
        请求样例:
            {
                "id": 1,
                "name": "教研部"
            }
        响应数据格式：
            {
                "code":1,
                "msg":"success",
                "data":null
            }
        
2. 前端要访问的服务端的访问地址为: http://zxyf-management.ns-w6hasfpj.svc.cluster.local:8080
```

#### 8.2.3 员工管理

```bash
请根据提供的员工管理的页面原型图 ，和接口文档完成员工管理的功能开发 ，包括：增加、修改、删除、查询员工的功能。
1. 具体的接口信息如下：
     1.1 员工列表查询
         请求路径：/emps
         请求方式：GET
         请求参数：
             name: 姓名，可选
             gender: 性别，可选
             begin: 入职日期的开始时间，可选
             end: 入职日期的结束时间，可选
             page: 页码，默认1
             pageSize: 每页展示记录数，默认10
         请求样例:
             /emps?page=1&pageSize=10
             /emps?name=张&page=1&pageSize=10
             /emps?gender=1&page=1&pageSize=10
             /emps?name=张&gender=1&page=1&pageSize=10
             /emps?name=张&gender=1&begin=2007-09-01&end=2022-09-01&page=1&pageSize=10
         响应数据格式：
             {
               "code": 1,
               "msg": "success",
               "data": {
                 "total": 2,
                 "rows": [
                    {
                     "id": 1,
                     "username": "jinyong",
                     "name": "金庸",
                     "gender": 1,
                     "image": "https://web-framework.oss-cn-hangzhou.aliyuncs.com/2022-09-02-00-27-53B.jpg",
                     "position": 2,
                     "salary": 8000,
                     "hireDate": "2015-01-01",
                     "deptId": 2,
                     "deptName": "教研部",
                     "createTime": "2022-09-01T23:06:30",
                     "updateTime": "2022-09-02T00:29:04"
                   },
                   {
                     "id": 2,
                     "username": "zhangwuji",
                     "name": "张无忌",
                     "gender": 1,
                     "image": "https://web-framework.oss-cn-hangzhou.aliyuncs.com/2022-09-02-00-27-53B.jpg",
                     "position": 2,
                     "salary": 6000,
                     "hireDate": "2015-01-01",
                     "deptId": 2,
                     "deptName": "教研部",
                     "createTime": "2022-09-01T23:06:30",
                     "updateTime": "2022-09-02T00:29:04"
                   }
                 ]
               }
             }
          响应数据含义: 
            id: 员工ID
            username: 用户名
            name: 姓名
            gender: 性别 , 1 男 ; 2 女
            image: 图像
            position: 职位, 说明: 1 班主任,2 讲师, 3 学工主管, 4 教研主管, 5 咨询师
            salary: 薪资
            hireDate: 入职日期
            deptId: 部门ID
            deptName: 部门名称
            createTime: 创建时间
            updateTime: 更新时间
          

        1.2 删除员工
            请求路径：/emps
            请求方式：DELETE
            请求参数：ids ，为路径参数
            请求样例：
                /emps?ids=1
                /emps?ids=1,2,3
            响应数据格式：
                {
                    "code":1,
                    "msg":"success",
                    "data":null
                }

        1.3 添加员工
            请求路径：/emps
            请求方式：POST
            请求样例：
                {
                  "image": "https://web-framework.oss-cn-hangzhou.aliyuncs.com/2022-09-03-07-37-38222.jpg",
                  "username": "linpingzhi",
                  "name": "林平之",
                  "gender": 1,
                  "position": 1,
                  "hireDate": "2022-09-18",
                  "deptId": 1,
                  "phone": "18809091234",
                  "salary": 8000,
                  "exprList": [
                      {
                         "company": "百度科技股份有限公司",
                         "position": "java开发",
                         "startDate": "2012-07-01",
                         "endDate": "2019-03-03"
                      },
                      {
                         "company": "阿里巴巴科技股份有限公司",
                         "position": "架构师",
                         "startDate": "2019-03-15",
                         "endDate": "2023-03-01"
                      }
                   ]
                }
            请求数据说明: 
                username: 用户名
                name: 姓名
                phone: 手机号
                gender: 性别 , 1 男 ; 2 女
                image: 图像
                position: 职位, 说明: 1 班主任,2 讲师, 3 学工主管, 4 教研主管, 5 咨询师
                salary: 薪资
                hireDate: 入职日期
                deptId: 部门ID
                exprList: 员工工作经历列表
                    company: 公司
                    position: 职位
                    startDate: 工作经历开始时间
                    endDate: 工作经历开始时间
              
            响应数据格式：
                {
                    "code":1,
                    "msg":"success",
                    "data":null
                }

        1.4 根据ID查询
            请求路径：/emps/{id}
            请求方式：GET
            请求参数：id ，为路径参数
            请求样例：/emps/1, /emps/2
            响应数据格式：
                {
                  "code": 1,
                  "msg": "success",
                  "data": {
                    "id": 2,
                    "username": "zhangwuji",
                    "name": "张无忌",
                    "gender": 1,
                    "image": "https://web-framework.oss-cn-hangzhou.aliyuncs.com/2022-09-02-00-27-53B.jpg",
                    "position": 2,
                    "salary": 8000,
                    "hireDate": "2015-01-01",
                    "deptId": 2,
                    "createTime": "2022-09-01T23:06:30",
                    "updateTime": "2022-09-02T00:29:04",
                    "exprList": [
                      {
                        "id": 1,
                        "startDate": "2012-07-01",
                        "endDate": "2019-03-03"
                        "company": "百度科技股份有限公司"
                        "position": "java开发",
                        "empId": 2
                      },
                      {
                        "id": 2,
                        "startDate": "2019-3-15",
                        "endDate": "2023-03-01"
                        "company": "阿里巴巴科技股份有限公司"
                        "position": "架构师",
                        "empId": 2
                      }
                    ]
                  }
                }

        1.5 修改员工
            请求路径：/emps
            请求方式：PUT
            请求样例:
                {
                    "id": 2,
                    "username": "zhangwuji",
                    "password": "123456",
                    "name": "张无忌",
                    "gender": 1,
                    "image": "https://web-framework.oss-cn-hangzhou.aliyuncs.com/2022-09-02-00-27-53B.jpg",
                    "position": 2,
                    "salary": 8000,
                    "hireDate": "2015-01-01",
                    "deptId": 2,
                    "createTime": "2022-09-01T23:06:30",
                    "updateTime": "2022-09-02T00:29:04",
                    "exprList": [
                      {
                        "id": 1,
                        "startDate": "2012-07-01",
                        "endDate": "2015-06-20"
                        "company": "中软国际股份有限公司"
                        "position": "java开发",
                        "empId": 2
                      },
                      {
                        "id": 2,
                        "startDate": "2015-07-01",
                        "endDate": "2019-03-03"
                        "company": "百度科技股份有限公司"
                        "position": "java开发",
                        "empId": 2
                      },
                      {
                        "id": 3,
                        "startDate": "2019-3-15",
                        "endDate": "2023-03-01"
                        "company": "阿里巴巴科技股份有限公司"
                        "position": "架构师",
                        "empId": 2
                      }
                    ]
                  }
            响应数据格式：
                {
                    "code":1,
                    "msg":"success",
                    "data":null
                }

2. 请严格根据员工管理的页面原型 和 接口文档开发 。
员工管理的基本页面布局已经有了，但是新增员工的表单需要调整，表单的宽度调整为800px。然后根据提供的页面原型图，调整新增员工表单的布局，表单的具体要求如下: 
第一行, 展示 用户名 和 姓名。 
第二行，展示 性别 和 手机号。
第三行，展示 职位 和 薪资。
第四行，展示 所属部门 和 入职日期。
第五行，展示 头像，是一个文件上传框。
第六行，展示工作经历，在工作经历这个表单项里展示的是一个 "新增工作经历" 的按钮。 每点击一次 新增工作经历， 就需要增加一条工作经历。 工作经历所有的表单项，设置的小一些，一共三个表单项：时间（包括开始时间和结束时间）、公司、职位，表单项的名字也需要展示出来。在每一个工作经历条目后面都有一个删除按钮，点击删除按钮之后，可以删除掉当前这条工作经历。
```

#### 8.2.4 登录认证

```json
请根据截图中的登录页面的原型 和 提供的接口文档，帮我完成员工登录功能的页面制作。
1. 登录接口的基本信息如下：
     1.1 请求路径: /login
     1.2 请求方式: POST
     1.3 接口描述: 该接口用于员工登录智学云帆-教学管理系统，登录完毕后，系统下发JWT令牌。
     1.4 请求参数样例:
         {
             "username": "songjiang",
             "password": "123456"
         }
     1.5 响应数据样例:
         1.5.1 登录成功
         {
             "code": 1,
             "msg": "success",
             "data": {
                 "id": 2,
                 "username": "songjiang",
                 "name": "宋江",
                 "token": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJzb25namlhbmciLCJleHAiOjE2OTg3MDE3NjJ9.w06EkRXTep6SrvMns3w5RKe79nxauDe7fdMhBLK-MKY"
             }
         }

         1.5.2 登录失败
             {
                "code": 0,
                "msg": "用户名或密码错误",
                "data": null
             }
     1.6 备注说明: 用户登录成功后，系统会自动下发JWT令牌，然后在后续的每次请求中，都需要在请求头header中携带到服务端，请求头的名称为 token ，值为 登录时下发的JWT令牌。 如果服务端检测到用户未登录，则直接响应 401 状态码，如果服务端响应的状态码为 401，前端需要跳转到登录页面。

2. 请根据上述页面原型及接口文档的描述，帮我完成登录页面的开发。
```

## 九、项目部署上线(Devbox)

### 9.1 项目发版

编写项目的entrypoint.sh,该脚本用于启动项目。

在devbox中发版项目。

<img src="./attachments/image-20251103173421140.png" alt="image-20251103173421140" style="zoom: 80%;" />

------

### 9.2 项目上线

<img src="./attachments/image-20251103173514584.png" alt="image-20251103173514584" style="zoom: 80%;" />

------

<img src="./attachments/image-20251103173613107.png" alt="image-20251103173613107" style="zoom: 80%;" />

------

<img src="./attachments/image-20251103173749082.png" alt="image-20251103173749082" style="zoom: 80%;" />

------

### 9.3 查看发布的应用

> 点击应用管理,可以查看刚才发布的上线的项目

<img src="./attachments/image-20251103174023044.png" alt="image-20251103174023044" style="zoom: 80%;" />

------

> 点击详情,可以看到项目配置信息,监控以及日志;

<img src="./attachments/image-20251103174155130.png" alt="image-20251103174155130" style="zoom: 80%;" />

------

<img src="./attachments/image-20251103174241047.png" alt="image-20251103174241047" style="zoom: 80%;" />

------

## 十、总结

通过本教程,我们完整体验了基于AI工具链的全栈项目开发流程:

### 🎯 核心收获

1. **AI赋能开发**: 利用 DeepSeek 进行需求分析和数据库设计
2. **智能编码**: 使用 Cursor 实现代码的快速生成和开发
3. **云原生开发**: 通过 Devbox 实现云端开发环境的一键配置
4. **一键部署**: 借助 Sealos 完成项目的快速上线

### 💡 技术栈总结

**前端技术**:
- Vue 3 + Element Plus
- 响应式布局
- 前后端分离

**后端技术**:
- Spring Boot + MyBatis
- RESTful API设计
- JWT身份认证

**云原生**:
- Sealos 云操作系统
- Devbox 开发环境
- 对象存储服务

### 🚀 未来展望

这套工具链展示了AI时代软件开发的新范式:
- **降低门槛**: 零基础也能完成全栈开发
- **提升效率**: 从需求到上线的完整链路大幅缩短
- **聚焦业务**: 开发者可以更专注于业务逻辑而非基础设施

希望本教程能帮助你快速掌握AI辅助开发的核心技能,开启高效开发之旅!

---

## 结语

AI工具正在重塑软件开发的方式,但技术只是工具,理解业务需求和系统设计才是核心。希望你能在实践中不断探索,找到最适合自己的开发方式。

如果你有任何问题或建议,欢迎在评论区交流!

**标签**: #AI开发 #Cursor #DeepSeek #Sealos #云原生 #全栈开发

---

<div style="text-align: center; margin-top: 40px; padding: 20px; background: var(--bg-color-secondary); border-radius: 10px;">
  <p>📧 联系作者：<a href="mailto:3144253125@qq.com">3144253125@qq.com</a></p>
  <p>🐙 GitHub：<a href="https://github.com/CambridgeFoldingKnife" target="_blank">@CambridgeFoldingKnife</a></p>
</div>
