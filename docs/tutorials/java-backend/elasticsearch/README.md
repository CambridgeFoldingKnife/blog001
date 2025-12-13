---
title: Elasticsearch 搜索引擎
autoGroup: false
autoSort: false
sidebarDepth: 0
---

# 🔍 Elasticsearch 搜索引擎

> 分布式搜索与分析引擎，近实时搜索的最佳选择

## 📚 教程目录

### [01 - Elasticsearch基础入门](01-Elasticsearch基础入门.md)
- Elasticsearch简介与安装
- 核心概念详解
- 索引、文档、映射
- RESTful API基础操作
- 中文分词器

### [02 - Elasticsearch查询DSL](02-Elasticsearch查询DSL.md)
- DSL查询语法
- 全文搜索查询
- 精确查询与Term查询
- 布尔组合查询
- 聚合分析
- 高亮、分页、排序

### [03 - Spring Boot整合Elasticsearch](03-SpringBoot整合Elasticsearch.md)
- 快速整合配置
- RestHighLevelClient使用
- Spring Data Elasticsearch
- Repository接口定义
- 复杂查询实现

### [04 - Elasticsearch实战案例](04-Elasticsearch实战案例.md)
- 电商搜索系统
- 日志分析系统（ELK）
- 搜索推荐系统
- MySQL数据同步

### [05 - Elasticsearch集群与优化](05-Elasticsearch集群与优化.md)
- 集群架构与搭建
- 分片与副本配置
- 性能优化策略
- 监控与调优

### [06 - Elasticsearch面试题](06-Elasticsearch面试题.md)
- 高频面试题汇总
- 查询优化经验
- 实战问题解答

## 🎯 学习目标

完成本教程后，你将掌握：
- ✅ Elasticsearch核心概念和分布式原理
- ✅ DSL查询语法和聚合分析
- ✅ Java客户端操作ES
- ✅ Spring Boot整合最佳实践
- ✅ 生产环境集群部署
- ✅ 性能调优和问题排查

## 🚀 快速开始

### Docker快速启动

```bash
docker run -d \
  --name elasticsearch \
  -p 9200:9200 \
  -p 9300:9300 \
  -e "discovery.type=single-node" \
  -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \
  elasticsearch:7.17.0
```

访问：http://localhost:9200

## 📊 学习路线

```
基础入门 → 查询DSL → Spring Boot整合 → 实战案例 → 集群部署 → 面试准备
```

## 💡 什么是Elasticsearch？

Elasticsearch（简称ES）是基于Lucene构建的分布式搜索和分析引擎，能够实现近实时的搜索和分析。

### 核心特点

- ⚡ **近实时搜索** - 毫秒级响应
- 🌐 **分布式架构** - 自动分片和复制
- 📊 **RESTful API** - HTTP接口简单易用
- 🔄 **高可用性** - 自动故障转移
- 📈 **可扩展** - 水平扩展

## 🏗️ 核心概念

### 基本概念对比

| Elasticsearch | MySQL | 说明 |
|--------------|-------|------|
| Index（索引） | Database（数据库） | 数据存储的最高层 |
| Type（类型，已废弃） | Table（表） | ES 7.x后废弃 |
| Document（文档） | Row（行） | 一条数据记录 |
| Field（字段） | Column（列） | 数据字段 |
| Mapping（映射） | Schema（模式） | 字段定义 |
| DSL | SQL | 查询语言 |

### 节点类型

- **Master Node（主节点）：** 集群管理
- **Data Node（数据节点）：** 存储数据，执行查询
- **Coordinating Node（协调节点）：** 路由请求，合并结果
- **Ingest Node（预处理节点）：** 数据预处理

### 分片与副本

```
Index
  ├─ Primary Shard 0  (主分片0)
  │   ├─ Replica 0-1  (副本1)
  │   └─ Replica 0-2  (副本2)
  ├─ Primary Shard 1
  │   ├─ Replica 1-1
  │   └─ Replica 1-2
  └─ Primary Shard 2
      ├─ Replica 2-1
      └─ Replica 2-2
```

## 🚀 快速入门

### 安装与启动

```bash
# 下载Elasticsearch
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-8.x.x.tar.gz

# 解压
tar -xzf elasticsearch-8.x.x.tar.gz

# 启动
cd elasticsearch-8.x.x/bin
./elasticsearch
```

### 基本操作

#### 1. 创建索引
```json
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
      "description": {
        "type": "text",
        "analyzer": "ik_smart"
      },
      "createTime": {
        "type": "date"
      }
    }
  }
}
```

#### 2. 添加文档
```json
POST /products/_doc/1
{
  "name": "小米手机",
  "price": 2999,
  "description": "性价比之王，骁龙处理器",
  "createTime": "2024-01-01"
}
```

#### 3. 查询文档
```json
GET /products/_doc/1
```

#### 4. 搜索文档
```json
GET /products/_search
{
  "query": {
    "match": {
      "name": "小米"
    }
  }
}
```

#### 5. 更新文档
```json
POST /products/_update/1
{
  "doc": {
    "price": 2799
  }
}
```

#### 6. 删除文档
```json
DELETE /products/_doc/1
```

## 🔍 查询DSL

### 1. 全量查询
```json
GET /products/_search
{
  "query": {
    "match_all": {}
  }
}
```

### 2. 匹配查询
```json
GET /products/_search
{
  "query": {
    "match": {
      "name": "小米手机"
    }
  }
}
```

### 3. 精确查询
```json
GET /products/_search
{
  "query": {
    "term": {
      "price": 2999
    }
  }
}
```

### 4. 范围查询
```json
GET /products/_search
{
  "query": {
    "range": {
      "price": {
        "gte": 2000,
        "lte": 5000
      }
    }
  }
}
```

### 5. 布尔查询
```json
GET /products/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "name": "手机" } }
      ],
      "filter": [
        { "range": { "price": { "gte": 2000 } } }
      ],
      "should": [
        { "match": { "description": "骁龙" } }
      ],
      "must_not": [
        { "match": { "name": "华为" } }
      ]
    }
  }
}
```

### 6. 高亮查询
```json
GET /products/_search
{
  "query": {
    "match": { "name": "小米" }
  },
  "highlight": {
    "fields": {
      "name": {}
    }
  }
}
```

### 7. 分页查询
```json
GET /products/_search
{
  "query": { "match_all": {} },
  "from": 0,
  "size": 10
}
```

### 8. 排序
```json
GET /products/_search
{
  "query": { "match_all": {} },
  "sort": [
    { "price": { "order": "desc" } }
  ]
}
```

## 💻 Java客户端

### RestHighLevelClient（推荐）

**依赖配置：**
```xml
<dependency>
    <groupId>org.elasticsearch.client</groupId>
    <artifactId>elasticsearch-rest-high-level-client</artifactId>
    <version>7.17.0</version>
</dependency>
```

**创建客户端：**
```java
@Configuration
public class ElasticsearchConfig {
    
    @Bean
    public RestHighLevelClient client() {
        return new RestHighLevelClient(
            RestClient.builder(
                new HttpHost("localhost", 9200, "http")
            )
        );
    }
}
```

**索引操作：**
```java
@Service
public class ProductService {
    
    @Autowired
    private RestHighLevelClient client;
    
    // 创建索引
    public void createIndex() throws IOException {
        CreateIndexRequest request = new CreateIndexRequest("products");
        
        request.settings(Settings.builder()
            .put("number_of_shards", 3)
            .put("number_of_replicas", 2)
        );
        
        XContentBuilder mapping = XContentFactory.jsonBuilder()
            .startObject()
                .startObject("properties")
                    .startObject("name")
                        .field("type", "text")
                        .field("analyzer", "ik_max_word")
                    .endObject()
                    .startObject("price")
                        .field("type", "double")
                    .endObject()
                .endObject()
            .endObject();
        
        request.mapping(mapping);
        
        CreateIndexResponse response = client.indices().create(request, RequestOptions.DEFAULT);
        System.out.println("创建索引: " + response.isAcknowledged());
    }
    
    // 添加文档
    public void addDocument(Product product) throws IOException {
        IndexRequest request = new IndexRequest("products");
        request.id(product.getId().toString());
        request.source(JSON.toJSONString(product), XContentType.JSON);
        
        IndexResponse response = client.index(request, RequestOptions.DEFAULT);
        System.out.println("添加文档: " + response.getResult());
    }
    
    // 查询文档
    public Product getDocument(String id) throws IOException {
        GetRequest request = new GetRequest("products", id);
        GetResponse response = client.get(request, RequestOptions.DEFAULT);
        
        if (response.isExists()) {
            String source = response.getSourceAsString();
            return JSON.parseObject(source, Product.class);
        }
        return null;
    }
    
    // 搜索文档
    public List<Product> search(String keyword) throws IOException {
        SearchRequest request = new SearchRequest("products");
        SearchSourceBuilder builder = new SearchSourceBuilder();
        
        builder.query(QueryBuilders.matchQuery("name", keyword));
        builder.from(0);
        builder.size(10);
        
        request.source(builder);
        SearchResponse response = client.search(request, RequestOptions.DEFAULT);
        
        List<Product> products = new ArrayList<>();
        for (SearchHit hit : response.getHits().getHits()) {
            Product product = JSON.parseObject(hit.getSourceAsString(), Product.class);
            products.add(product);
        }
        return products;
    }
}
```

## 🍃 Spring Boot 整合

### Spring Data Elasticsearch

**依赖配置：**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-elasticsearch</artifactId>
</dependency>
```

**配置文件：**
```yaml
spring:
  elasticsearch:
    uris: http://localhost:9200
    username: elastic
    password: password
```

**实体类：**
```java
@Document(indexName = "products")
public class Product {
    
    @Id
    private Long id;
    
    @Field(type = FieldType.Text, analyzer = "ik_max_word")
    private String name;
    
    @Field(type = FieldType.Double)
    private Double price;
    
    @Field(type = FieldType.Text, analyzer = "ik_smart")
    private String description;
    
    @Field(type = FieldType.Date)
    private Date createTime;
    
    // getters and setters
}
```

**Repository接口：**
```java
public interface ProductRepository extends ElasticsearchRepository<Product, Long> {
    
    // 根据名称搜索
    List<Product> findByName(String name);
    
    // 根据价格范围搜索
    List<Product> findByPriceBetween(Double min, Double max);
    
    // 自定义查询
    @Query("{\"match\": {\"name\": \"?0\"}}")
    List<Product> searchByName(String name);
}
```

**Service层：**
```java
@Service
public class ProductService {
    
    @Autowired
    private ProductRepository repository;
    
    // 保存
    public Product save(Product product) {
        return repository.save(product);
    }
    
    // 查询
    public Optional<Product> findById(Long id) {
        return repository.findById(id);
    }
    
    // 搜索
    public List<Product> search(String keyword) {
        return repository.findByName(keyword);
    }
    
    // 删除
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
```

## 📊 聚合分析

### 1. 统计聚合
```json
GET /products/_search
{
  "size": 0,
  "aggs": {
    "avg_price": {
      "avg": { "field": "price" }
    },
    "max_price": {
      "max": { "field": "price" }
    },
    "min_price": {
      "min": { "field": "price" }
    }
  }
}
```

### 2. 分组聚合
```json
GET /products/_search
{
  "size": 0,
  "aggs": {
    "price_ranges": {
      "range": {
        "field": "price",
        "ranges": [
          { "to": 2000 },
          { "from": 2000, "to": 5000 },
          { "from": 5000 }
        ]
      }
    }
  }
}
```

## 🎯 应用场景

### 1. 全文搜索
- 电商商品搜索
- 内容管理系统
- 日志搜索

### 2. 数据分析
- 日志分析（ELK）
- 业务指标统计
- 用户行为分析

### 3. 实时监控
- 应用性能监控
- 安全事件监控
- 业务实时大屏

### 4. 推荐系统
- 相关商品推荐
- 内容推荐
- 搜索建议

## ⚠️ 最佳实践

### 1. 索引设计
- 合理设置分片数（建议3-5个）
- 副本数根据需求设置
- 选择合适的字段类型

### 2. 查询优化
- 避免深分页（from + size < 10000）
- 使用scroll API处理大数据量
- 合理使用filter减少评分计算

### 3. 性能优化
- 批量操作使用Bulk API
- 控制返回字段（_source）
- 使用routing提高查询效率

### 4. 中文分词
```bash
# 安装IK分词器
./bin/elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.17.0/elasticsearch-analysis-ik-7.17.0.zip
```

## 🔧 ELK技术栈

```
Beats/Logstash → Elasticsearch → Kibana
   (采集)          (存储+搜索)      (可视化)
```

- **Elasticsearch：** 存储和搜索
- **Logstash：** 日志采集和处理
- **Kibana：** 数据可视化
- **Beats：** 轻量级数据采集

## 📚 学习资源

### 官方文档
- [Elasticsearch官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)
- [Elasticsearch中文文档](https://www.elastic.co/guide/cn/elasticsearch/guide/current/index.html)

### 推荐书籍
- 《Elasticsearch权威指南》
- 《Elasticsearch实战》
- 《深入理解Elasticsearch》

### 在线资源
- Elastic官方博客
- Elasticsearch中文社区

## 🔗 相关主题

- [Spring Boot](../springboot/) - 快速整合ES
- [MySQL](../mysql/) - 数据同步到ES
- [消息队列](../mq/) - 异步同步数据

---

**下一步学习：** [Spring Cloud](../springcloud/) - 构建微服务架构
