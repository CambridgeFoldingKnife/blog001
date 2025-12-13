---
title: MyBatis-Plus 教程
---

# MyBatis-Plus 教程

> 从入门到精通，掌握 MyBatis-Plus 增强工具

## 📚 教程简介

本教程将带你系统学习 MyBatis-Plus 框架，从基础入门到高级特性，涵盖 CRUD 接口、条件构造器、代码生成器、分页插件等核心功能。MyBatis-Plus 是 MyBatis 的增强工具，在不改变 MyBatis 原有功能的基础上，提供了更加强大和便捷的功能。

## 🎯 学习目标

- ✅ 掌握 MyBatis-Plus 核心概念
- ✅ 熟练使用 CRUD 接口
- ✅ 掌握条件构造器（Wrapper）
- ✅ 使用代码生成器快速开发
- ✅ 熟练使用分页插件
- ✅ 掌握乐观锁、逻辑删除等高级功能
- ✅ 具备解决实际开发问题的能力
- ✅ 应对 MyBatis-Plus 面试

## 📖 教程目录

### [第一章：MyBatis-Plus 基础入门](1.MyBatis-Plus基础入门.md) ⭐⭐⭐⭐⭐
**学习内容：**
- MyBatis-Plus 是什么？
- MyBatis-Plus vs MyBatis
- 快速开始
- 核心概念
- 常用注解
- 基本配置

### [第二章：CRUD 接口](2.CRUD接口.md) ⭐⭐⭐⭐⭐
**学习内容：**
- Service CRUD 接口
- Mapper CRUD 接口
- 批量操作
- 链式调用
- 常用方法详解

### [第三章：条件构造器](3.条件构造器.md) ⭐⭐⭐⭐⭐
**学习内容：**
- QueryWrapper
- UpdateWrapper
- LambdaQueryWrapper
- LambdaUpdateWrapper
- 条件构造方法
- 实战案例

### [第四章：代码生成器](4.代码生成器.md) ⭐⭐⭐⭐⭐
**学习内容：**
- AutoGenerator 配置
- 全局配置
- 数据源配置
- 包配置
- 策略配置
- 模板引擎

### [第五章：分页插件](5.分页插件.md) ⭐⭐⭐⭐⭐
**学习内容：**
- 分页插件配置
- 基本分页
- 自定义分页
- XML 分页
- 性能优化

### [第六章：高级功能](6.高级功能.md) ⭐⭐⭐⭐
**学习内容：**
- 逻辑删除
- 自动填充
- 乐观锁
- 多租户
- 动态表名
- SQL 注入器

### [第七章：MyBatis-Plus 面试题集](7.MyBatis-Plus面试题集.md) ⭐⭐⭐⭐⭐
**学习内容：**
- 基础概念面试题
- CRUD 接口面试题
- 条件构造器面试题
- 高级功能面试题
- 高频面试题 20+

## 🚀 快速开始

### 环境准备

**前置要求：**
- JDK 8 或更高版本
- Maven 3.5+
- MySQL 5.7+
- Spring Boot 2.x
- IDE（推荐 IntelliJ IDEA）

### 创建第一个 MyBatis-Plus 项目

**1. 添加依赖**
```xml
<dependencies>
    <!-- Spring Boot -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter</artifactId>
    </dependency>
    
    <!-- MyBatis-Plus -->
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
        <version>3.5.4.1</version>
    </dependency>
    
    <!-- MySQL Driver -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.33</version>
    </dependency>
    
    <!-- Lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
</dependencies>
```

**2. 配置文件（application.yml）**
```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/mybatis_plus?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai
    username: root
    password: 123456

mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
    map-underscore-to-camel-case: true
  global-config:
    db-config:
      id-type: auto
      logic-delete-field: deleted
      logic-delete-value: 1
      logic-not-delete-value: 0
```

**3. 创建实体类**
```java
@Data
@TableName("user")
public class User {
    @TableId(type = IdType.AUTO)
    private Long id;
    
    private String username;
    private String email;
    private Integer age;
    
    @TableField(fill = FieldFill.INSERT)
    private Date createTime;
    
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Date updateTime;
    
    @TableLogic
    private Integer deleted;
}
```

**4. 创建 Mapper 接口**
```java
@Mapper
public interface UserMapper extends BaseMapper<User> {
    // 继承 BaseMapper，拥有基础 CRUD 方法
}
```

**5. 启动类**
```java
@SpringBootApplication
@MapperScan("com.example.mapper")
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

**6. 使用**
```java
@SpringBootTest
public class UserMapperTest {
    
    @Autowired
    private UserMapper userMapper;
    
    @Test
    public void testSelect() {
        // 查询所有用户
        List<User> users = userMapper.selectList(null);
        users.forEach(System.out::println);
    }
    
    @Test
    public void testInsert() {
        User user = new User();
        user.setUsername("张三");
        user.setEmail("zhangsan@example.com");
        user.setAge(20);
        
        userMapper.insert(user);
        System.out.println("插入成功，ID：" + user.getId());
    }
}
```

## 💡 学习建议

1. **先学 MyBatis** - MyBatis-Plus 是基于 MyBatis 的增强
2. **循序渐进** - 按照章节顺序学习
3. **动手实践** - 每学完一章，必须动手编码
4. **理解原理** - 了解底层实现原理
5. **项目实战** - 通过实际项目巩固知识

## 🌟 MyBatis-Plus 核心特性

### 1. 零配置

**MyBatis：**
```xml
<!-- 需要编写大量 XML -->
<mapper namespace="com.example.mapper.UserMapper">
    <select id="selectById" resultType="User">
        SELECT * FROM user WHERE id = #{id}
    </select>
    <insert id="insert">
        INSERT INTO user (username, email) VALUES (#{username}, #{email})
    </insert>
</mapper>
```

**MyBatis-Plus：**
```java
// 继承 BaseMapper，无需编写 XML
@Mapper
public interface UserMapper extends BaseMapper<User> {
}

// 直接使用
User user = userMapper.selectById(1L);
```

### 2. 强大的 CRUD

```java
// 查询
User user = userMapper.selectById(1L);
List<User> users = userMapper.selectList(null);

// 插入
userMapper.insert(user);

// 更新
userMapper.updateById(user);

// 删除
userMapper.deleteById(1L);
```

### 3. 条件构造器

```java
// 查询年龄大于 20 的用户
QueryWrapper<User> wrapper = new QueryWrapper<>();
wrapper.gt("age", 20);
List<User> users = userMapper.selectList(wrapper);

// Lambda 方式
LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
wrapper.gt(User::getAge, 20)
       .like(User::getUsername, "张");
List<User> users = userMapper.selectList(wrapper);
```

### 4. 分页插件

```java
// 配置分页插件
@Bean
public MybatisPlusInterceptor mybatisPlusInterceptor() {
    MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
    interceptor.addInnerInterceptor(new PaginationInnerInterceptor());
    return interceptor;
}

// 使用分页
Page<User> page = new Page<>(1, 10);
userMapper.selectPage(page, null);
System.out.println("总记录数：" + page.getTotal());
System.out.println("当前页：" + page.getCurrent());
```

### 5. 代码生成器

```java
// 一键生成 Entity、Mapper、Service、Controller
AutoGenerator generator = new AutoGenerator(dataSource);
generator.execute();
```

## 📊 MyBatis-Plus vs MyBatis

| 特性 | MyBatis | MyBatis-Plus |
|------|---------|--------------|
| **配置量** | 多 | 少 |
| **XML 文件** | 必需 | 可选 |
| **CRUD 方法** | 需编写 | 自动提供 |
| **条件构造** | 手写 SQL | Wrapper |
| **分页** | 需插件 | 内置插件 |
| **代码生成** | 需配置 | 一键生成 |
| **学习曲线** | 平缓 | 平缓 |
| **开发效率** | 中 | 高 |

## 🏗️ MyBatis-Plus 架构

```
应用层
  ↓
Service 层（IService、ServiceImpl）
  ↓
Mapper 层（BaseMapper）
  ↓
MyBatis-Plus 核心
  ├── 条件构造器（Wrapper）
  ├── 分页插件（PaginationInnerInterceptor）
  ├── 乐观锁插件（OptimisticLockerInnerInterceptor）
  └── SQL 注入器（ISqlInjector）
  ↓
MyBatis
  ↓
JDBC
  ↓
数据库
```

## 🎯 学习路线图

```
第 1 周：基础入门
  ├── MyBatis-Plus 概述
  ├── 快速开始
  ├── 常用注解
  └── 基本配置

第 2 周：CRUD 接口
  ├── Mapper CRUD
  ├── Service CRUD
  ├── 批量操作
  └── 链式调用

第 3 周：条件构造器
  ├── QueryWrapper
  ├── UpdateWrapper
  ├── Lambda 方式
  └── 复杂查询

第 4 周：代码生成器
  ├── 全局配置
  ├── 策略配置
  ├── 模板引擎
  └── 自定义模板

第 5 周：分页插件
  ├── 基本分页
  ├── 自定义分页
  ├── XML 分页
  └── 性能优化

第 6 周：高级功能
  ├── 逻辑删除
  ├── 自动填充
  ├── 乐观锁
  └── 多租户

第 7 周：项目实战
  ├── 整合 Spring Boot
  ├── 完整 CRUD
  ├── 复杂业务
  └── 性能优化
```

## 🔥 核心功能

### 1. 通用 CRUD

```java
// Mapper CRUD
userMapper.insert(user);           // 插入
userMapper.deleteById(id);         // 删除
userMapper.updateById(user);       // 更新
userMapper.selectById(id);         // 查询

// Service CRUD
userService.save(user);            // 保存
userService.removeById(id);        // 删除
userService.updateById(user);      // 更新
userService.getById(id);           // 查询
```

### 2. 条件构造器

```java
// 普通方式
QueryWrapper<User> wrapper = new QueryWrapper<>();
wrapper.eq("username", "张三")
       .gt("age", 20)
       .orderByDesc("create_time");

// Lambda 方式（推荐）
LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
wrapper.eq(User::getUsername, "张三")
       .gt(User::getAge, 20)
       .orderByDesc(User::getCreateTime);
```

### 3. 分页查询

```java
Page<User> page = new Page<>(1, 10);
userMapper.selectPage(page, wrapper);
```

### 4. 逻辑删除

```java
@TableLogic
private Integer deleted;  // 0-未删除 1-已删除

userMapper.deleteById(1L);  // 实际执行 UPDATE user SET deleted=1
```

## 📚 推荐资源

### 官方资源
- [MyBatis-Plus 官方文档](https://baomidou.com/)
- [MyBatis-Plus GitHub](https://github.com/baomidou/mybatis-plus)
- [示例代码](https://github.com/baomidou/mybatis-plus-samples)

### 推荐插件
- MyBatisX（IDEA 插件）- 快速生成代码
- MybatisCodeHelperPro（收费）- 增强功能

## ⚠️ 常见问题

### 1. MyBatis-Plus 会侵入 MyBatis 吗？

**不会。** MyBatis-Plus 只是增强工具，不修改 MyBatis 核心功能。

### 2. 可以和 MyBatis 混用吗？

**可以。** MyBatis-Plus 完全兼容 MyBatis，可以自由混用。

### 3. 复杂 SQL 怎么写？

**两种方式：**
1. 使用 Wrapper 构造复杂条件
2. 自定义 XML 写原生 SQL

## 💪 进阶学习

**掌握 MyBatis-Plus 后，可以学习：**
1. **分库分表** - ShardingSphere
2. **读写分离** - 主从配置
3. **性能优化** - SQL 优化、缓存
4. **微服务** - Spring Cloud

## 📄 版权说明

本教程仅供学习使用，欢迎分享传播。

---

**准备好了吗？让我们开始 MyBatis-Plus 学习之旅！🚀**

**建议从 [第一章：MyBatis-Plus 基础入门](1.MyBatis-Plus基础入门.md) 开始学习**
