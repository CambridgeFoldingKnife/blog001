---
title: Elasticsearch集群与优化
---

# 05 - Elasticsearch集群与优化

## 🎯 学习目标

- 理解Elasticsearch集群架构
- 掌握集群搭建方法
- 学会分片和副本配置
- 掌握性能优化策略
- 了解监控和调优

## 🏗️ 集群架构

### 节点类型

| 节点类型 | 说明 | 配置 |
|---------|------|------|
| Master Node | 集群管理、索引创建删除 | node.master: true<br>node.data: false |
| Data Node | 存储数据、执行查询 | node.master: false<br>node.data: true |
| Coordinating Node | 路由请求、合并结果 | node.master: false<br>node.data: false |
| Ingest Node | 数据预处理 | node.ingest: true |

### 集群结构

```
Master Node (x3)
    ↓
Data Node (x5)
    ↓
Coordinating Node (x2)
```

## 🔧 集群搭建

### Docker Compose搭建

```yaml
version: '3.8'

services:
  es-master-1:
    image: elasticsearch:7.17.0
    container_name: es-master-1
    environment:
      - cluster.name=es-cluster
      - node.name=master-1
      - node.master=true
      - node.data=false
      - discovery.seed_hosts=es-master-2,es-master-3
      - cluster.initial_master_nodes=master-1,master-2,master-3
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ports:
      - "9200:9200"
    networks:
      - elastic

  es-master-2:
    image: elasticsearch:7.17.0
    container_name: es-master-2
    environment:
      - cluster.name=es-cluster
      - node.name=master-2
      - node.master=true
      - node.data=false
      - discovery.seed_hosts=es-master-1,es-master-3
      - cluster.initial_master_nodes=master-1,master-2,master-3
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    networks:
      - elastic

  es-data-1:
    image: elasticsearch:7.17.0
    container_name: es-data-1
    environment:
      - cluster.name=es-cluster
      - node.name=data-1
      - node.master=false
      - node.data=true
      - discovery.seed_hosts=es-master-1,es-master-2,es-master-3
      - "ES_JAVA_OPTS=-Xms1g -Xmx1g"
    networks:
      - elastic

networks:
  elastic:
```

### 配置文件（elasticsearch.yml）

```yaml
# 集群名称
cluster.name: es-cluster

# 节点名称
node.name: node-1

# 节点角色
node.master: true
node.data: true
node.ingest: true

# 网络配置
network.host: 0.0.0.0
http.port: 9200
transport.port: 9300

# 集群发现
discovery.seed_hosts:
  - 192.168.1.101:9300
  - 192.168.1.102:9300
  - 192.168.1.103:9300

# 初始主节点
cluster.initial_master_nodes:
  - node-1
  - node-2
  - node-3

# JVM配置
-Xms2g
-Xmx2g
```

## 📊 分片与副本

### 分片策略

**分片数计算公式：**
```
分片数 = 数据总量 / 单分片大小（建议20-50GB）
```

**示例：**
```bash
# 创建索引，设置3个主分片，2个副本
PUT /products
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 2,
    "refresh_interval": "30s"
  }
}

# 动态调整副本数
PUT /products/_settings
{
  "number_of_replicas": 1
}
```

### 分片分配

```bash
# 查看分片分配
GET /_cat/shards/products?v

# 手动分配分片
POST /_cluster/reroute
{
  "commands": [
    {
      "move": {
        "index": "products",
        "shard": 0,
        "from_node": "node-1",
        "to_node": "node-2"
      }
    }
  ]
}
```

## 🚀 性能优化

### 1. 索引优化

```bash
# 批量写入时关闭refresh
PUT /products/_settings
{
  "refresh_interval": "-1"
}

# 写入完成后恢复
PUT /products/_settings
{
  "refresh_interval": "1s"
}

# 合并段
POST /products/_forcemerge?max_num_segments=1
```

### 2. 查询优化

```java
// 使用filter代替must（不计算评分）
{
  "query": {
    "bool": {
      "filter": [
        {"term": {"category": "手机"}},
        {"range": {"price": {"gte": 3000}}}
      ]
    }
  }
}

// 控制返回字段
{
  "_source": ["name", "price"],
  "query": {...}
}

// 避免深分页，使用search_after
{
  "size": 10,
  "query": {...},
  "search_after": [1000, "12345"],
  "sort": [
    {"sales": "desc"},
    {"_id": "asc"}
  ]
}
```

### 3. 硬件优化

**推荐配置：**
- CPU：16核+
- 内存：64GB+（JVM堆内存不超过32GB）
- 磁盘：SSD
- 网络：万兆网卡

**JVM配置：**
```bash
# jvm.options
-Xms16g
-Xmx16g
-XX:+UseG1GC
-XX:MaxGCPauseMillis=200
```

### 4. 系统优化

```bash
# 增加文件描述符
ulimit -n 65536

# 增加虚拟内存
sysctl -w vm.max_map_count=262144

# 禁用交换分区
swapoff -a
```

## 📈 监控方案

### 1. _cat API监控

```bash
# 集群健康
GET /_cat/health?v

# 节点信息
GET /_cat/nodes?v

# 索引信息
GET /_cat/indices?v

# 分片信息
GET /_cat/shards?v

# 线程池
GET /_cat/thread_pool?v
```

### 2. _cluster API

```bash
# 集群状态
GET /_cluster/health

# 集群统计
GET /_cluster/stats

# 节点统计
GET /_nodes/stats
```

### 3. Kibana监控

访问：`http://localhost:5601`

**监控指标：**
- 集群健康状态
- 索引性能
- 查询性能
- JVM堆内存使用
- 磁盘使用率

### 4. Prometheus + Grafana

**elasticsearch_exporter：**
```bash
docker run -d \
  --name elasticsearch-exporter \
  -p 9114:9114 \
  prometheuscommunity/elasticsearch-exporter:latest \
  --es.uri=http://elasticsearch:9200
```

**Prometheus配置：**
```yaml
scrape_configs:
  - job_name: 'elasticsearch'
    static_configs:
      - targets: ['localhost:9114']
```

## 🔍 常见问题排查

### 1. 集群状态为Yellow

**原因：** 部分副本未分配

**解决：**
```bash
# 查看未分配的分片
GET /_cat/shards?h=index,shard,prirep,state,unassigned.reason

# 手动分配
POST /_cluster/reroute
```

### 2. 查询慢

**排查步骤：**
```bash
# 查看慢查询日志
GET /_cat/indices?v&h=index,search.query_time_in_millis

# 分析查询
GET /products/_search
{
  "profile": true,
  "query": {...}
}
```

**优化方案：**
- 使用filter代替query
- 减少返回字段
- 合理设置分片数
- 使用路由

### 3. 内存溢出

**解决方案：**
```bash
# 调整JVM堆内存
-Xms8g
-Xmx8g

# 清理缓存
POST /_cache/clear

# 设置断路器
indices.breaker.total.limit: 70%
```

## ⚙️ 调优建议

### 索引层面

1. **合理设置分片数** - 避免过多或过少
2. **使用索引模板** - 统一管理索引配置
3. **定期删除过期索引** - 释放存储空间
4. **使用索引生命周期管理（ILM）**

### 查询层面

1. **使用bool filter** - 代替must，不计算评分
2. **避免通配符开头** - 如 `*abc`
3. **避免script查询** - 性能差
4. **合理使用聚合** - 限制聚合数量

### 集群层面

1. **主节点高可用** - 至少3个
2. **数据节点扩容** - 水平扩展
3. **冷热数据分离** - 热数据SSD，冷数据HDD
4. **负载均衡** - 使用协调节点

## 💡 最佳实践

1. **集群规划** - 根据数据量合理规划
2. **监控告警** - 实时监控集群状态
3. **定期备份** - 使用快照备份数据
4. **版本升级** - 保持版本更新
5. **压力测试** - 上线前充分测试

## 🎯 小结

本节学习了Elasticsearch集群与优化：
- ✅ 集群架构和搭建
- ✅ 分片和副本策略
- ✅ 性能优化方法
- ✅ 监控和调优
- ✅ 常见问题排查

---

**下一节：** [06-Elasticsearch面试题](06-Elasticsearch面试题.md)
