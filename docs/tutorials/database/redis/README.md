---
title: Redis 缓存数据库教程
autoGroup: false
autoSort: false
sidebarDepth: 0
---

# Redis 缓存数据库教程

> 掌握高性能缓存技术，提升系统性能与架构能力

## 📚 教程简介

本教程将带你系统学习 Redis 缓存数据库，从基础概念到企业级应用，涵盖高性能缓存、分布式架构、集群部署等核心技术。Redis 是目前最流行的 NoSQL 数据库之一，也是互联网公司必备的技术栈，掌握 Redis 是每个后端开发者的必备技能。

## 🎯 学习目标

- ✅ 理解 Redis 的核心原理和应用场景
- ✅ 熟练掌握 Redis 五大数据类型及操作命令
- ✅ 掌握 Redis 持久化机制和数据安全
- ✅ 熟悉 Spring Boot 整合 Redis 开发
- ✅ 能够解决缓存穿透、击穿、雪崩等问题
- ✅ 掌握 Redis 集群部署和高可用方案
- ✅ 应对常见的 Redis 面试题

## 📖 教程目录

### [第一章：Redis 基础](01-Redis基础.md)
- Redis 是什么？为什么选择 Redis？
- Redis 的特性与优势
- Redis 安装与环境配置
- Redis 数据类型概述
- 基本命令与客户端使用
- Redis 配置文件详解

### [第二章：五大数据类型](02-五大数据类型.md)
- String（字符串）- 最基础的数据类型
- List（列表）- 消息队列与时间轴
- Set（集合）- 去重与集合运算
- Hash（哈希）- 对象存储的最佳选择
- Zset（有序集合）- 排行榜与延时队列
- 各类型的应用场景与最佳实践

### [第三章：持久化机制](03-持久化机制.md)
- RDB 持久化 - 快照存储
- AOF 持久化 - 日志记录
- 混合持久化 - 最佳方案
- 持久化策略选择与对比
- 数据恢复与备份
- 持久化性能优化

### [第四章：Spring Boot 整合 Redis](04-SpringBoot整合Redis.md)
- Spring Data Redis 简介
- RedisTemplate 使用详解
- 序列化配置与优化
- 缓存注解（@Cacheable、@CacheEvict 等）
- 实战案例：用户缓存系统
- 分布式锁实现

### [第五章：缓存策略与实战](05-缓存策略与实战.md)
- 缓存穿透 - 布隆过滤器解决方案
- 缓存击穿 - 热点数据保护
- 缓存雪崩 - 过期时间策略
- 缓存更新策略 - Cache Aside Pattern
- 双写一致性问题
- 缓存最佳实践

### [第六章：Redis 集群与高可用](06-Redis集群与高可用.md)
- 主从复制 - 读写分离
- 哨兵模式 - 自动故障转移
- Redis Cluster - 分布式集群
- 集群方案对比与选择
- 高可用架构设计
- 监控与运维

## 🚀 快速开始

### 安装 Redis

**前置要求：**
- 支持的操作系统（Linux、macOS、Windows）

**Windows：**
```bash
# 1. 下载 Redis for Windows
https://github.com/microsoftarchive/redis/releases

# 2. 解压到指定目录（如：C:\Program Files\Redis）

# 3. 启动 Redis 服务
redis-server.exe redis.windows.conf

# 4. 启动客户端测试
redis-cli.exe
```

**Linux：**
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install redis-server

# CentOS/RHEL
sudo yum install redis

# 或者编译安装
wget http://download.redis.io/releases/redis-7.0.0.tar.gz
tar xzf redis-7.0.0.tar.gz
cd redis-7.0.0
make
sudo make install

# 启动 Redis
redis-server

# 客户端连接
redis-cli
```

**macOS：**
```bash
# 使用 Homebrew
brew install redis

# 启动 Redis
brew services start redis

# 客户端连接
redis-cli
```

### 基本操作

```bash
# 连接 Redis
redis-cli

# 字符串操作
SET name "John"
GET name
INCR counter
EXPIRE name 60
TTL name

# 列表操作
LPUSH mylist "item1"
RPUSH mylist "item2"
LRANGE mylist 0 -1
LPOP mylist

# 哈希操作
HSET user:1 name "John"
HSET user:1 age 30
HGETALL user:1
HGET user:1 name

# 集合操作
SADD myset "member1"
SADD myset "member2"
SMEMBERS myset

# 有序集合操作
ZADD rank 100 "user1"
ZADD rank 200 "user2"
ZRANGE rank 0 -1 WITHSCORES
```

## 💡 学习建议

1. **理论与实践结合** - 先理解 Redis 的工作原理，再动手操作
2. **命令多练习** - 熟练掌握各种数据类型的命令
3. **关注性能** - 学会分析 Redis 性能指标
4. **场景驱动** - 结合实际业务场景学习
5. **深入源码** - 有能力的同学可以研究 Redis 源码

## 🌟 Redis 常用命令速查

### 连接与管理
```bash
redis-cli              # 连接本地 Redis
redis-cli -h 127.0.0.1 -p 6379   # 连接指定 Redis
AUTH password          # 认证
PING                   # 测试连接
INFO                   # 查看服务器信息
CONFIG GET *           # 查看配置
```

### 键操作
```bash
KEYS pattern           # 查找键（生产环境慎用）
EXISTS key             # 检查键是否存在
DEL key                # 删除键
EXPIRE key seconds     # 设置过期时间
TTL key                # 查看剩余时间
RENAME key newkey      # 重命名
TYPE key               # 查看类型
```

### 数据库操作
```bash
SELECT index           # 切换数据库
DBSIZE                # 查看键数量
FLUSHDB               # 清空当前数据库
FLUSHALL              # 清空所有数据库
```

## 💡 Spring Boot 整合 Redis

### 1. 添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<!-- 如果使用 JSON 序列化 -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
</dependency>
```

### 2. 配置文件

```yaml
spring:
  redis:
    host: localhost
    port: 6379
    password: 
    database: 0
    timeout: 3000ms
    lettuce:
      pool:
        max-active: 8      # 连接池最大连接数
        max-idle: 8        # 连接池最大空闲连接数
        min-idle: 0        # 连接池最小空闲连接数
        max-wait: -1ms     # 连接池最大阻塞等待时间
```

### 3. 配置类

```java
@Configuration
public class RedisConfig {
    
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);
        
        // 使用 Jackson2JsonRedisSerializer 来序列化和反序列化
        Jackson2JsonRedisSerializer<Object> serializer = new Jackson2JsonRedisSerializer<>(Object.class);
        ObjectMapper mapper = new ObjectMapper();
        mapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        mapper.activateDefaultTyping(LazyLoadingJavaTypeValidator.instance, 
                                     ObjectMapper.DefaultTyping.NON_FINAL);
        serializer.setObjectMapper(mapper);
        
        // 设置 key 和 value 的序列化规则
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(serializer);
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setHashValueSerializer(serializer);
        template.afterPropertiesSet();
        
        return template;
    }
}
```

### 4. 使用示例

```java
@Service
public class UserService {
    
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    
    // 字符串操作
    public void setUser(String key, User user) {
        redisTemplate.opsForValue().set(key, user, 60, TimeUnit.SECONDS);
    }
    
    public User getUser(String key) {
        return (User) redisTemplate.opsForValue().get(key);
    }
    
    // 哈希操作
    public void setUserField(String key, String field, Object value) {
        redisTemplate.opsForHash().put(key, field, value);
    }
    
    // 列表操作
    public void pushToList(String key, Object value) {
        redisTemplate.opsForList().rightPush(key, value);
    }
}
```

### 5. 缓存注解

```java
@Service
@CacheConfig(cacheNames = "users")
public class UserService {
    
    @Cacheable(key = "#id")
    public User getUserById(Long id) {
        // 从数据库查询
        return userRepository.findById(id);
    }
    
    @CachePut(key = "#user.id")
    public User updateUser(User user) {
        // 更新数据库
        return userRepository.save(user);
    }
    
    @CacheEvict(key = "#id")
    public void deleteUser(Long id) {
        // 删除数据库记录
        userRepository.deleteById(id);
    }
}
```

## 🔥 常见应用场景

1. **缓存** - 热点数据缓存
2. **Session共享** - 分布式Session
3. **分布式锁** - 保证原子性
4. **排行榜** - Zset实现
5. **消息队列** - List/Stream
6. **限流** - 令牌桶算法

## 📊 数据类型选择

| 场景 | 数据类型 | 说明 |
|------|----------|------|
| 缓存对象 | String | 序列化存储 |
| 购物车 | Hash | 商品ID为field |
| 消息队列 | List | LPUSH/RPOP |
| 点赞/关注 | Set | 去重 |
| 排行榜 | Zset | 自动排序 |

## 💡 最佳实践

1. **合理设置过期时间** - 避免内存溢出
2. **避免大key** - 拆分为多个小key
3. **使用Pipeline** - 批量操作减少网络开销
4. **选择合适的数据类型** - 提升性能
5. **监控Redis状态** - 及时发现问题

## 🔥 面试重点

1. Redis为什么这么快？
2. Redis的数据类型及应用场景
3. Redis持久化机制对比
4. 缓存穿透、击穿、雪崩的解决方案
5. Redis如何实现分布式锁？
6. Redis主从复制原理
7. Redis集群方案对比

## 📚 推荐资源

- 《Redis设计与实现》
- 《Redis实战》
- [Redis官方文档](https://redis.io/documentation)
- [Redis命令参考](http://redisdoc.com/)

---

**开始学习** → [01-Redis基础](01-Redis基础.md)
