---
title: Elasticsearch基础入门
---

# 01 - Elasticsearch基础入门

## 🎯 学习目标

- 了解Elasticsearch的基本概念和特点
- 掌握Elasticsearch的安装和配置
- 理解ES的核心概念（索引、文档、映射）
- 学会使用RESTful API操作ES
- 掌握中文分词器的使用

## 📖 Elasticsearch简介

### 什么是Elasticsearch？

Elasticsearch（简称ES）是一个基于Lucene的分布式、RESTful风格的搜索和数据分析引擎。

### 核心特点

- ⚡ **近实时搜索** - 文档从索引到可搜索，延迟通常在1秒内
- 🌐 **分布式** - 自动分片、副本，支持PB级数据
- 📊 **高性能** - 倒排索引，毫秒级响应
- 🔄 **高可用** - 自动发现节点、故障转移
- 📈 **RESTful API** - HTTP接口，简单易用
- 🔍 **全文检索** - 强大的文本分析和搜索能力

### 应用场景

- 🛒 **电商搜索** - 商品搜索、智能推荐
- 📊 **日志分析** - ELK日志分析系统
- 📈 **数据分析** - 实时数据统计、可视化
- 🔍 **全文检索** - 文档、内容搜索
- 📱 **APM监控** - 应用性能监控

## 🔧 安装Elasticsearch

### Docker安装（推荐）

```bash
# 1. 拉取镜像
docker pull elasticsearch:7.17.0

# 2. 创建网络
docker network create elastic

# 3. 运行Elasticsearch
docker run -d \
  --name elasticsearch \
  --net elastic \
  -p 9200:9200 \
  -p 9300:9300 \
  -e "discovery.type=single-node" \
  -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \
  elasticsearch:7.17.0

# 4. 验证安装
curl http://localhost:9200

# 输出示例：
{
  "name" : "node-1",
  "cluster_name" : "elasticsearch",
  "version" : {
    "number" : "7.17.0"
  }
}
```

### Docker Compose安装

```yaml
version: '3.8'

services:
  elasticsearch:
    image: elasticsearch:7.17.0
    container_name: elasticsearch
    environment:
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ports:
      - "9200:9200"
      - "9300:9300"
    volumes:
      - es-data:/usr/share/elasticsearch/data
    networks:
      - elastic

  kibana:
    image: kibana:7.17.0
    container_name: kibana
    ports:
      - "5601:5601"
    environment:
      ELASTICSEARCH_HOSTS: http://elasticsearch:9200
    networks:
      - elastic
    depends_on:
      - elasticsearch

volumes:
  es-data:

networks:
  elastic:
```

### Linux安装

```bash
# 1. 下载
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.17.0-linux-x86_64.tar.gz

# 2. 解压
tar -xzf elasticsearch-7.17.0-linux-x86_64.tar.gz
cd elasticsearch-7.17.0

# 3. 修改配置（config/elasticsearch.yml）
cluster.name: my-cluster
node.name: node-1
network.host: 0.0.0.0
http.port: 9200

# 4. 启动
./bin/elasticsearch

# 5. 后台启动
./bin/elasticsearch -d
```

## 🏗️ 核心概念

### 基本概念对比

| Elasticsearch | MySQL | 说明 |
|--------------|-------|------|
| Index（索引） | Database | 数据库 |
| Type（类型，已废弃） | Table | 表（ES 7.x后废弃） |
| Document（文档） | Row | 一条记录 |
| Field（字段） | Column | 字段 |
| Mapping（映射） | Schema | 表结构 |

### Index（索引）

索引是文档的容器，类似于MySQL中的数据库。

**索引命名规则：**
- 必须小写
- 不能以`_`、`-`、`+`开头
- 不能包含空格、逗号等特殊字符

### Document（文档）

文档是可以被索引的基本信息单元，以JSON格式表示。

```json
{
  "id": 1,
  "name": "iPhone 14 Pro",
  "price": 7999,
  "category": "手机",
  "brand": "Apple",
  "stock": 100
}
```

### Mapping（映射）

映射定义了文档及其字段的存储和索引方式。

**常用字段类型：**

| 类型 | 说明 | 示例 |
|------|------|------|
| text | 全文检索 | 商品描述 |
| keyword | 精确匹配 | 商品分类 |
| long | 长整型 | ID |
| integer | 整型 | 库存 |
| double | 浮点型 | 价格 |
| boolean | 布尔型 | 是否上架 |
| date | 日期 | 创建时间 |
| object | 对象 | 嵌套对象 |
| nested | 嵌套对象数组 | 评论列表 |

## 📦 RESTful API操作

### 索引操作

#### 创建索引

```bash
# 简单创建
PUT /products

# 指定配置创建
PUT /products
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 2
  },
  "mappings": {
    "properties": {
      "name": {
        "type": "text",
        "analyzer": "ik_max_word"
      },
      "price": {
        "type": "double"
      },
      "category": {
        "type": "keyword"
      },
      "description": {
        "type": "text",
        "analyzer": "ik_smart"
      },
      "stock": {
        "type": "integer"
      },
      "on_sale": {
        "type": "boolean"
      },
      "create_time": {
        "type": "date",
        "format": "yyyy-MM-dd HH:mm:ss||epoch_millis"
      }
    }
  }
}
```

#### 查看索引

```bash
# 查看所有索引
GET /_cat/indices?v

# 查看特定索引
GET /products

# 查看索引映射
GET /products/_mapping

# 查看索引设置
GET /products/_settings
```

#### 删除索引

```bash
DELETE /products
```

### 文档操作

#### 添加文档

```bash
# 指定ID
PUT /products/_doc/1
{
  "name": "iPhone 14 Pro",
  "price": 7999,
  "category": "手机",
  "brand": "Apple",
  "description": "A16仿生芯片，4800万主摄，灵动岛",
  "stock": 100,
  "on_sale": true,
  "create_time": "2024-01-01 10:00:00"
}

# 自动生成ID
POST /products/_doc
{
  "name": "小米13 Pro",
  "price": 4999,
  "category": "手机",
  "brand": "小米",
  "description": "骁龙8 Gen2，徕卡光学镜头",
  "stock": 200,
  "on_sale": true,
  "create_time": "2024-01-01 11:00:00"
}
```

#### 查询文档

```bash
# 根据ID查询
GET /products/_doc/1

# 检查文档是否存在
HEAD /products/_doc/1
```

#### 更新文档

```bash
# 全量更新（覆盖）
PUT /products/_doc/1
{
  "name": "iPhone 14 Pro Max",
  "price": 8999,
  "category": "手机"
}

# 部分更新
POST /products/_update/1
{
  "doc": {
    "price": 7499,
    "stock": 80
  }
}

# 脚本更新
POST /products/_update/1
{
  "script": {
    "source": "ctx._source.stock -= params.count",
    "params": {
      "count": 10
    }
  }
}
```

#### 删除文档

```bash
# 删除单个文档
DELETE /products/_doc/1

# 按查询删除
POST /products/_delete_by_query
{
  "query": {
    "term": {
      "on_sale": false
    }
  }
}
```

### 批量操作

```bash
# bulk批量操作
POST /_bulk
{"index":{"_index":"products","_id":"1"}}
{"name":"iPhone 14 Pro","price":7999,"category":"手机"}
{"index":{"_index":"products","_id":"2"}}
{"name":"小米13 Pro","price":4999,"category":"手机"}
{"update":{"_index":"products","_id":"1"}}
{"doc":{"price":7499}}
{"delete":{"_index":"products","_id":"3"}}
```

## 🔍 基础查询

### 查询所有文档

```bash
GET /products/_search
{
  "query": {
    "match_all": {}
  }
}
```

### 匹配查询

```bash
GET /products/_search
{
  "query": {
    "match": {
      "name": "iPhone"
    }
  }
}
```

### 精确查询

```bash
GET /products/_search
{
  "query": {
    "term": {
      "category": "手机"
    }
  }
}
```

### 分页查询

```bash
GET /products/_search
{
  "query": {
    "match_all": {}
  },
  "from": 0,
  "size": 10
}
```

### 排序

```bash
GET /products/_search
{
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "price": {
        "order": "desc"
      }
    }
  ]
}
```

## 🇨🇳 中文分词器

### 安装IK分词器

```bash
# 方式1：在线安装
./bin/elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.17.0/elasticsearch-analysis-ik-7.17.0.zip

# 方式2：离线安装
# 下载插件到plugins/ik目录
# 重启Elasticsearch

# 验证安装
GET /_cat/plugins
```

### IK分词器类型

**ik_max_word：** 最细粒度拆分
```bash
POST /_analyze
{
  "analyzer": "ik_max_word",
  "text": "中华人民共和国国歌"
}

# 结果：中华人民共和国、中华人民、中华、华人、人民共和国、人民、共和国、共和、国国、国歌
```

**ik_smart：** 最粗粒度拆分
```bash
POST /_analyze
{
  "analyzer": "ik_smart",
  "text": "中华人民共和国国歌"
}

# 结果：中华人民共和国、国歌
```

### 自定义词典

**config/analysis-ik/IKAnalyzer.cfg.xml：**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
    <comment>IK Analyzer 扩展配置</comment>
    <entry key="ext_dict">custom.dic</entry>
    <entry key="ext_stopwords">stopword.dic</entry>
</properties>
```

**config/analysis-ik/custom.dic：**
```
奥力给
yyds
绝绝子
```

## 💻 实战示例：商品搜索

### 创建商品索引

```bash
PUT /products
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 1,
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
      "name": {
        "type": "text",
        "analyzer": "ik_max_word",
        "search_analyzer": "ik_smart"
      },
      "category": {"type": "keyword"},
      "brand": {"type": "keyword"},
      "price": {"type": "double"},
      "description": {
        "type": "text",
        "analyzer": "ik_max_word"
      },
      "stock": {"type": "integer"},
      "sales": {"type": "long"},
      "rating": {"type": "double"},
      "on_sale": {"type": "boolean"},
      "create_time": {
        "type": "date",
        "format": "yyyy-MM-dd HH:mm:ss"
      }
    }
  }
}
```

### 批量导入数据

```bash
POST /_bulk
{"index":{"_index":"products","_id":"1"}}
{"id":1,"name":"iPhone 14 Pro 256G 深空黑","category":"手机","brand":"Apple","price":7999,"description":"A16仿生芯片，4800万主摄，灵动岛设计","stock":100,"sales":5000,"rating":4.8,"on_sale":true,"create_time":"2024-01-01 10:00:00"}
{"index":{"_index":"products","_id":"2"}}
{"id":2,"name":"小米13 Pro 12+256G 陶瓷黑","category":"手机","brand":"小米","price":4999,"description":"骁龙8 Gen2，徕卡光学镜头，2K屏","stock":200,"sales":8000,"rating":4.7,"on_sale":true,"create_time":"2024-01-02 10:00:00"}
{"index":{"_index":"products","_id":"3"}}
{"id":3,"name":"华为Mate 50 Pro 8+256G","category":"手机","brand":"华为","price":5999,"description":"北斗卫星消息，超光变XMAGE影像","stock":150,"sales":3000,"rating":4.6,"on_sale":true,"create_time":"2024-01-03 10:00:00"}
{"index":{"_index":"products","_id":"4"}}
{"id":4,"name":"MacBook Pro 14英寸 M2芯片","category":"笔记本","brand":"Apple","price":14999,"description":"M2芯片，16GB内存，512GB SSD","stock":50,"sales":1000,"rating":4.9,"on_sale":true,"create_time":"2024-01-04 10:00:00"}
```

### 搜索商品

```bash
# 搜索手机
GET /products/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "name": "手机"
          }
        }
      ],
      "filter": [
        {
          "term": {
            "on_sale": true
          }
        },
        {
          "range": {
            "price": {
              "gte": 4000,
              "lte": 8000
            }
          }
        }
      ]
    }
  },
  "sort": [
    {
      "sales": {
        "order": "desc"
      }
    }
  ]
}
```

## 💡 最佳实践

1. **合理设置分片数** - 单分片大小建议20-50GB
2. **使用别名** - 方便索引切换和零停机迁移
3. **批量操作** - 使用bulk API提高性能
4. **合理选择分词器** - 搜索用ik_smart，索引用ik_max_word
5. **避免深分页** - from + size < 10000

## 🎯 小结

本节学习了Elasticsearch的基础知识：
- ✅ ES的安装和配置
- ✅ 核心概念（索引、文档、映射）
- ✅ RESTful API基本操作
- ✅ 中文分词器的使用
- ✅ 商品搜索实战示例

---

**下一节：** [02-Elasticsearch查询DSL](02-Elasticsearch查询DSL.md)
