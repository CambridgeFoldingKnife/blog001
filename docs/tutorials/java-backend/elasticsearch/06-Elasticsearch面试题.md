---
title: Elasticsearch面试题
---

# 06 - Elasticsearch面试题

## 🎯 基础知识

### 1. 什么是Elasticsearch？有什么特点？

**答案：**
Elasticsearch是一个基于Lucene的分布式搜索和分析引擎。

**特点：**
- 近实时搜索（延迟通常在1秒内）
- 分布式架构，水平扩展
- RESTful API，简单易用
- 全文检索能力强
- 支持结构化和非结构化数据

### 2. Elasticsearch的核心概念有哪些？

**答案：**

| 概念 | 说明 |
|------|------|
| Index | 索引，类似数据库 |
| Document | 文档，类似数据库的行 |
| Field | 字段，类似数据库的列 |
| Mapping | 映射，类似数据库的Schema |
| Shard | 分片，数据分片存储 |
| Replica | 副本，数据备份 |

### 3. Elasticsearch和MySQL的区别？

**答案：**

| 特性 | Elasticsearch | MySQL |
|------|--------------|-------|
| 数据模型 | 文档型 | 关系型 |
| 查询语言 | DSL | SQL |
| 事务 | 不支持 | 支持 |
| 全文检索 | 强 | 弱 |
| 聚合分析 | 强 | 一般 |
| 应用场景 | 搜索、日志分析 | OLTP |

### 4. text和keyword的区别？

**答案：**

**text：**
- 会被分词
- 用于全文检索
- 不能用于排序和聚合
- 示例：商品描述

**keyword：**
- 不分词，精确匹配
- 可以排序和聚合
- 示例：商品分类、标签

```json
{
  "mappings": {
    "properties": {
      "title": {"type": "text"},
      "category": {"type": "keyword"}
    }
  }
}
```

### 5. Elasticsearch的倒排索引是什么？

**答案：**

倒排索引是一种索引结构，存储了词项到文档的映射关系。

**示例：**
```
文档1: "快速的棕色狐狸"
文档2: "懒惰的狗"
文档3: "快速的狗"

倒排索引：
快速 → [1, 3]
棕色 → [1]
狐狸 → [1]
懒惰 → [2]
狗   → [2, 3]
```

**优势：**
- 快速查找包含某个词的文档
- 支持全文检索
- 支持相关性评分

## 🔥 进阶问题

### 6. Elasticsearch的写入流程？

**答案：**

```
1. 客户端请求 → 协调节点
2. 协调节点计算分片 → 主分片
3. 主分片写入 → 内存buffer
4. refresh（默认1秒） → segment（可搜索）
5. translog持久化 → 磁盘
6. 主分片同步 → 副本分片
7. 返回响应
```

**关键点：**
- refresh使数据可搜索（近实时）
- translog保证数据不丢失
- 副本同步保证高可用

### 7. Elasticsearch的查询流程？

**答案：**

**Query Then Fetch（默认）：**

```
1. 客户端请求 → 协调节点
2. 协调节点广播查询 → 所有分片
3. 各分片返回 → 文档ID和评分
4. 协调节点排序 → 选出Top N
5. 协调节点fetch → 获取完整文档
6. 返回结果给客户端
```

### 8. 如何优化Elasticsearch查询性能？

**答案：**

**1. 使用filter代替query**
```json
{
  "query": {
    "bool": {
      "filter": [
        {"term": {"category": "手机"}}
      ]
    }
  }
}
```

**2. 控制返回字段**
```json
{
  "_source": ["name", "price"]
}
```

**3. 避免深分页**
```json
// 使用search_after
{
  "search_after": [1000, "12345"],
  "sort": [{"sales": "desc"}, {"_id": "asc"}]
}
```

**4. 合理设置分片数**
- 单分片大小：20-50GB
- 分片数 = 数据量 / 50GB

**5. 使用路由**
```json
{
  "index": {
    "_routing": "user123"
  }
}
```

### 9. Elasticsearch如何保证数据不丢失？

**答案：**

**1. translog机制**
- 写入时同步写translog
- 定期flush到磁盘

**2. 副本机制**
- 设置多个副本
- 主分片和副本分布在不同节点

**3. 持久化配置**
```yaml
index.translog.durability: request  # 每次请求都持久化
index.translog.sync_interval: 5s
```

### 10. Elasticsearch的分片策略？

**答案：**

**主分片数：**
- 创建后不可修改
- 计算公式：数据量 / 50GB
- 建议：3-5个

**副本数：**
- 可动态调整
- 建议：至少1个
- 提高查询性能和可用性

**示例：**
```json
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 2
  }
}
```

### 11. match和term查询的区别？

**答案：**

**match查询：**
- 全文检索
- 会分词
- 计算相关性评分
- 用于text字段

```json
{
  "query": {
    "match": {
      "description": "iPhone 手机"
    }
  }
}
```

**term查询：**
- 精确匹配
- 不分词
- 不计算评分（在filter中）
- 用于keyword字段

```json
{
  "query": {
    "term": {
      "category": "手机"
    }
  }
}
```

### 12. 如何实现MySQL数据同步到ES？

**答案：**

**方案1：定时同步**
- 优点：实现简单
- 缺点：有延迟
- 适用：对实时性要求不高

**方案2：Logstash**
- 使用JDBC Input插件
- 定时全量/增量同步

**方案3：Canal（推荐）**
- 监听MySQL binlog
- 实时同步
- 无侵入

**方案4：应用双写**
- 写MySQL同时写ES
- 保证强一致性
- 代码侵入性高

### 13. Elasticsearch集群如何实现高可用？

**答案：**

**1. 主节点高可用**
- 至少3个主节点
- 避免脑裂

**2. 数据节点高可用**
- 设置副本
- 分布在不同节点

**3. 负载均衡**
- 使用协调节点
- Nginx/HAProxy

**4. 监控告警**
- 实时监控集群状态
- 及时处理异常

## 💼 实战问题

### 14. 如何设计电商搜索系统的索引？

**答案：**

```json
PUT /shop_products
{
  "settings": {
    "number_of_shards": 5,
    "number_of_replicas": 2,
    "analysis": {
      "analyzer": {
        "ik_analyzer": {
          "type": "custom",
          "tokenizer": "ik_max_word"
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "id": {"type": "long"},
      "title": {
        "type": "text",
        "analyzer": "ik_max_word",
        "fields": {
          "keyword": {"type": "keyword"}
        }
      },
      "category": {"type": "keyword"},
      "brand": {"type": "keyword"},
      "price": {"type": "double"},
      "sales": {"type": "long"},
      "rating": {"type": "double"}
    }
  }
}
```

**关键点：**
- title使用text+keyword多字段
- 分类、品牌用keyword
- 设置合理的分片和副本

### 15. 如何处理Elasticsearch集群Yellow状态？

**答案：**

**原因：** 部分副本未分配

**排查步骤：**
```bash
# 1. 查看集群健康
GET /_cluster/health

# 2. 查看未分配的分片
GET /_cat/shards?h=index,shard,prirep,state,unassigned.reason

# 3. 查看分片分配失败原因
GET /_cluster/allocation/explain
```

**解决方案：**
```bash
# 1. 增加节点
# 2. 调整副本数
PUT /index_name/_settings
{
  "number_of_replicas": 1
}

# 3. 手动分配分片
POST /_cluster/reroute
```

### 16. Elasticsearch如何实现搜索建议（自动补全）？

**答案：**

**使用Completion Suggester：**

```json
// 1. 定义mapping
{
  "mappings": {
    "properties": {
      "suggest": {
        "type": "completion"
      }
    }
  }
}

// 2. 索引数据
POST /products/_doc/1
{
  "suggest": {
    "input": ["iPhone 14", "iPhone 14 Pro"],
    "weight": 100
  }
}

// 3. 搜索建议
POST /products/_search
{
  "suggest": {
    "product_suggest": {
      "prefix": "iPh",
      "completion": {
        "field": "suggest",
        "size": 5
      }
    }
  }
}
```

### 17. 如何优化Elasticsearch的写入性能？

**答案：**

**1. 批量写入**
```java
BulkRequest bulkRequest = new BulkRequest();
// 建议每批1000-5000条
```

**2. 调整refresh_interval**
```json
{
  "settings": {
    "refresh_interval": "30s"
  }
}
```

**3. 增加bulk线程池**
```yaml
thread_pool.bulk.queue_size: 1000
```

**4. 使用自动生成ID**
- 避免检查ID是否存在

**5. 禁用_source**
- 如果不需要返回原文

## 💡 总结

**高频考点：**
- ✅ 倒排索引原理
- ✅ 写入和查询流程
- ✅ 性能优化方法
- ✅ 集群高可用方案
- ✅ 分片和副本策略
- ✅ 数据同步方案

**面试建议：**
- 理解底层原理
- 结合实际项目经验
- 掌握常见问题解决方案
- 了解最新版本特性

---

**Elasticsearch教程完结！** 🎉

继续学习 → [返回Java后端开发](../README.md)
