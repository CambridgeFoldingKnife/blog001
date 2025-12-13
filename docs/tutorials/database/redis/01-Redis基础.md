---
title: Redis基础
---

# 01 - Redis基础

## 🎯 学习目标

- 了解Redis是什么及其特点
- 掌握Redis的安装与配置
- 理解Redis的基本数据结构
- 学会使用Redis客户端

## 📖 Redis简介

### 什么是Redis？

Redis（Remote Dictionary Server）是一个开源的、基于内存的高性能键值对（Key-Value）数据库。

### 核心特点

- ⚡ **高性能** - 所有数据存储在内存中，读写速度极快（10万+QPS）
- 💾 **持久化** - 支持RDB和AOF两种持久化方式
- 🔄 **多数据类型** - 支持String、List、Set、Hash、Zset等
- 🌐 **分布式** - 支持主从复制、哨兵、集群模式
- ⏰ **过期策略** - 支持键的过期时间设置
- 🔒 **原子操作** - 所有操作都是原子性的

### Redis vs 其他数据库

| 特性 | Redis | MySQL | Memcached |
|------|-------|-------|-----------|
| 数据存储 | 内存 | 磁盘 | 内存 |
| 数据类型 | 丰富 | 表结构 | 字符串 |
| 持久化 | 支持 | 支持 | 不支持 |
| 主从复制 | 支持 | 支持 | 不支持 |
| 性能 | 极高 | 较低 | 极高 |
| 应用场景 | 缓存、队列 | 关系数据 | 纯缓存 |

## 🔧 安装Redis

### Windows安装

```bash
# 1. 下载Redis for Windows
https://github.com/tporadowski/redis/releases

# 2. 解压到目录，如 C:\Redis

# 3. 启动Redis服务器
redis-server.exe redis.windows.conf

# 4. 启动Redis客户端
redis-cli.exe
```

### Linux安装

```bash
# 1. 下载Redis
wget https://download.redis.io/releases/redis-7.0.0.tar.gz

# 2. 解压
tar -xzf redis-7.0.0.tar.gz
cd redis-7.0.0

# 3. 编译
make

# 4. 安装（可选）
sudo make install

# 5. 启动Redis服务器
src/redis-server

# 6. 后台启动
src/redis-server --daemonize yes

# 7. 启动客户端
src/redis-cli
```

### Docker安装

```bash
# 1. 拉取Redis镜像
docker pull redis:latest

# 2. 运行Redis容器
docker run -d \
  --name redis \
  -p 6379:6379 \
  redis:latest

# 3. 进入Redis客户端
docker exec -it redis redis-cli
```

## ⚙️ Redis配置

### 核心配置项

**redis.conf主要配置：**

```conf
# 绑定IP
bind 127.0.0.1

# 端口
port 6379

# 后台运行
daemonize yes

# 日志文件
logfile "/var/log/redis/redis.log"

# 数据库数量（0-15）
databases 16

# 密码设置
requirepass yourpassword

# 最大内存
maxmemory 2gb

# 内存淘汰策略
maxmemory-policy allkeys-lru

# RDB持久化
save 900 1        # 900秒内至少1个key变化
save 300 10       # 300秒内至少10个key变化
save 60 10000     # 60秒内至少10000个key变化

# AOF持久化
appendonly yes
appendfilename "appendonly.aof"
```

### 启动配置文件

```bash
# 使用指定配置文件启动
redis-server /path/to/redis.conf

# 查看配置
redis-cli CONFIG GET *

# 修改配置（临时）
redis-cli CONFIG SET maxmemory 1gb
```

## 🎮 Redis客户端

### redis-cli命令行客户端

```bash
# 连接本地Redis
redis-cli

# 连接远程Redis
redis-cli -h 192.168.1.100 -p 6379

# 使用密码连接
redis-cli -h localhost -p 6379 -a yourpassword

# 选择数据库
redis-cli -n 1

# 执行单个命令
redis-cli SET name "John"

# 批量执行命令
cat commands.txt | redis-cli

# 监控模式
redis-cli --stat

# 实时查看命令
redis-cli MONITOR
```

### 基本命令

```bash
# 测试连接
PING
# 返回：PONG

# 切换数据库（0-15）
SELECT 1

# 查看所有key
KEYS *

# 删除key
DEL key1 key2

# 检查key是否存在
EXISTS key

# 设置key过期时间（秒）
EXPIRE key 60

# 查看剩余时间
TTL key

# 查看key类型
TYPE key

# 重命名key
RENAME oldkey newkey

# 查看数据库大小
DBSIZE

# 清空当前数据库
FLUSHDB

# 清空所有数据库
FLUSHALL

# 保存数据到磁盘
SAVE

# 后台保存
BGSAVE

# 关闭服务器
SHUTDOWN
```

## 📊 Redis数据结构

### 1. String（字符串）

```bash
# 设置值
SET name "Redis"

# 获取值
GET name

# 设置并返回旧值
GETSET name "New Redis"

# 批量设置
MSET key1 "value1" key2 "value2"

# 批量获取
MGET key1 key2

# 追加字符串
APPEND name " Database"

# 获取字符串长度
STRLEN name

# 数字操作
SET counter 10
INCR counter        # 加1
DECR counter        # 减1
INCRBY counter 5    # 加5
DECRBY counter 3    # 减3
```

### 2. List（列表）

```bash
# 左侧插入
LPUSH list "item1" "item2"

# 右侧插入
RPUSH list "item3"

# 获取列表
LRANGE list 0 -1

# 获取长度
LLEN list

# 左侧弹出
LPOP list

# 右侧弹出
RPOP list
```

### 3. Set（集合）

```bash
# 添加元素
SADD myset "member1" "member2"

# 查看所有元素
SMEMBERS myset

# 判断是否存在
SISMEMBER myset "member1"

# 删除元素
SREM myset "member1"

# 集合大小
SCARD myset
```

### 4. Hash（哈希）

```bash
# 设置字段
HSET user:1 name "John"
HSET user:1 age 30

# 获取字段
HGET user:1 name

# 获取所有字段和值
HGETALL user:1

# 批量设置
HMSET user:2 name "Alice" age 25

# 删除字段
HDEL user:1 age
```

### 5. Zset（有序集合）

```bash
# 添加成员（分数）
ZADD ranking 100 "user1"
ZADD ranking 95 "user2"
ZADD ranking 90 "user3"

# 按分数范围查询
ZRANGE ranking 0 -1 WITHSCORES

# 获取成员排名
ZRANK ranking "user1"

# 获取成员分数
ZSCORE ranking "user1"
```

## 🔍 常用操作示例

### 缓存用户信息

```bash
# 设置用户信息，30分钟过期
SET user:1001 '{"id":1001,"name":"John","age":30}' EX 1800

# 获取用户信息
GET user:1001
```

### 计数器

```bash
# 文章浏览量
INCR article:1001:views

# 获取浏览量
GET article:1001:views
```

### 消息队列

```bash
# 生产者推送消息
LPUSH queue:tasks "task1"
LPUSH queue:tasks "task2"

# 消费者获取消息
RPOP queue:tasks
```

### 排行榜

```bash
# 添加用户分数
ZADD leaderboard 1000 "player1"
ZADD leaderboard 950 "player2"
ZADD leaderboard 900 "player3"

# 查看前10名
ZREVRANGE leaderboard 0 9 WITHSCORES

# 查看用户排名
ZREVRANK leaderboard "player1"
```

## 📈 性能测试

### redis-benchmark工具

```bash
# 测试100000个SET请求
redis-benchmark -t set -n 100000

# 测试GET和SET
redis-benchmark -t get,set -n 100000

# 指定并发数
redis-benchmark -t get -n 100000 -c 50

# 测试指定key大小
redis-benchmark -t set -n 100000 -d 1024
```

## 💡 最佳实践

1. **合理使用数据库** - 0号库用于生产，其他库用于测试
2. **设置密码** - 生产环境必须设置密码
3. **绑定IP** - 只允许特定IP访问
4. **合理设置过期时间** - 避免内存溢出
5. **监控Redis状态** - 使用INFO命令查看运行状态
6. **避免使用KEYS命令** - 生产环境使用SCAN代替

## 🔗 相关命令

```bash
# 查看服务器信息
INFO

# 查看内存使用
INFO memory

# 查看客户端连接
CLIENT LIST

# 慢查询日志
SLOWLOG GET 10

# 实时监控
MONITOR
```

---

**下一节：** [02-五大数据类型](02-五大数据类型.md)
