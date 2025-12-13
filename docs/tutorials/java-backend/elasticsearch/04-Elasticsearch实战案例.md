---
title: Elasticsearch实战案例
---

# 04 - Elasticsearch实战案例

## 🎯 学习目标

- 掌握电商搜索系统实现
- 学会MySQL数据同步到ES
- 了解ELK日志分析系统
- 掌握搜索推荐功能实现

## 🛒 案例一：电商搜索系统

### 业务需求

- 商品全文搜索
- 多条件筛选（分类、品牌、价格区间）
- 搜索结果排序（销量、评分、价格）
- 搜索词高亮
- 相关推荐

### 索引设计

```json
PUT /shop_products
{
  "settings": {
    "number_of_shards": 3,
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
        "search_analyzer": "ik_smart",
        "fields": {
          "keyword": {"type": "keyword"}
        }
      },
      "categoryId": {"type": "long"},
      "categoryName": {"type": "keyword"},
      "brandId": {"type": "long"},
      "brandName": {"type": "keyword"},
      "price": {"type": "double"},
      "originalPrice": {"type": "double"},
      "sales": {"type": "long"},
      "stock": {"type": "integer"},
      "rating": {"type": "double"},
      "commentCount": {"type": "long"},
      "description": {
        "type": "text",
        "analyzer": "ik_max_word"
      },
      "tags": {"type": "keyword"},
      "images": {"type": "keyword"},
      "onSale": {"type": "boolean"},
      "isHot": {"type": "boolean"},
      "isNew": {"type": "boolean"},
      "createTime": {"type": "date"},
      "updateTime": {"type": "date"}
    }
  }
}
```

### 搜索实现

```java
@Service
@Slf4j
public class ProductSearchService {
    
    @Autowired
    private RestHighLevelClient client;
    
    public SearchResult search(SearchParam param) throws IOException {
        SearchRequest request = new SearchRequest("shop_products");
        SearchSourceBuilder builder = new SearchSourceBuilder();
        
        // 1. 构建查询条件
        BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();
        
        // 关键词搜索
        if (StringUtils.hasText(param.getKeyword())) {
            boolQuery.must(QueryBuilders.multiMatchQuery(
                param.getKeyword(),
                "title^3", "description"
            ));
        }
        
        // 分类筛选
        if (param.getCategoryId() != null) {
            boolQuery.filter(QueryBuilders.termQuery("categoryId", param.getCategoryId()));
        }
        
        // 品牌筛选
        if (CollectionUtils.isNotEmpty(param.getBrandIds())) {
            boolQuery.filter(QueryBuilders.termsQuery("brandId", param.getBrandIds()));
        }
        
        // 价格区间
        if (param.getMinPrice() != null || param.getMaxPrice() != null) {
            RangeQueryBuilder rangeQuery = QueryBuilders.rangeQuery("price");
            if (param.getMinPrice() != null) rangeQuery.gte(param.getMinPrice());
            if (param.getMaxPrice() != null) rangeQuery.lte(param.getMaxPrice());
            boolQuery.filter(rangeQuery);
        }
        
        // 标签筛选
        if (param.getIsHot() != null && param.getIsHot()) {
            boolQuery.filter(QueryBuilders.termQuery("isHot", true));
        }
        
        // 只查在售商品
        boolQuery.filter(QueryBuilders.termQuery("onSale", true));
        
        builder.query(boolQuery);
        
        // 2. 排序
        if ("sales".equals(param.getSortField())) {
            builder.sort("sales", SortOrder.DESC);
        } else if ("price".equals(param.getSortField())) {
            builder.sort("price", "asc".equals(param.getSortOrder()) ? 
                        SortOrder.ASC : SortOrder.DESC);
        } else if ("rating".equals(param.getSortField())) {
            builder.sort("rating", SortOrder.DESC);
        } else {
            builder.sort("_score", SortOrder.DESC);
            builder.sort("sales", SortOrder.DESC);
        }
        
        // 3. 分页
        int from = (param.getPageNum() - 1) * param.getPageSize();
        builder.from(from);
        builder.size(param.getPageSize());
        
        // 4. 高亮
        if (StringUtils.hasText(param.getKeyword())) {
            HighlightBuilder highlightBuilder = new HighlightBuilder();
            highlightBuilder.field("title");
            highlightBuilder.preTags("<span class='highlight'>");
            highlightBuilder.postTags("</span>");
            builder.highlighter(highlightBuilder);
        }
        
        // 5. 聚合（品牌、分类、价格区间）
        builder.aggregation(AggregationBuilders
            .terms("brands")
            .field("brandId")
            .size(20));
        
        builder.aggregation(AggregationBuilders
            .terms("categories")
            .field("categoryId")
            .size(20));
        
        builder.aggregation(AggregationBuilders
            .range("price_ranges")
            .field("price")
            .addRange(0, 1000)
            .addRange(1000, 3000)
            .addRange(3000, 5000)
            .addRange(5000, 10000)
            .addUnboundedFrom(10000));
        
        request.source(builder);
        SearchResponse response = client.search(request, RequestOptions.DEFAULT);
        
        return buildSearchResult(response, param);
    }
    
    private SearchResult buildSearchResult(SearchResponse response, SearchParam param) {
        SearchResult result = new SearchResult();
        
        // 商品列表
        List<Product> products = new ArrayList<>();
        for (SearchHit hit : response.getHits().getHits()) {
            Product product = JSON.parseObject(hit.getSourceAsString(), Product.class);
            
            // 处理高亮
            Map<String, HighlightField> highlightFields = hit.getHighlightFields();
            if (highlightFields.containsKey("title")) {
                product.setTitle(highlightFields.get("title").fragments()[0].string());
            }
            
            products.add(product);
        }
        result.setProducts(products);
        
        // 分页信息
        result.setTotal(response.getHits().getTotalHits().value);
        result.setPageNum(param.getPageNum());
        result.setPageSize(param.getPageSize());
        
        // 聚合结果
        result.setFilters(parseAggregations(response));
        
        return result;
    }
}
```

### 搜索建议（自动补全）

```java
@Service
public class SuggestService {
    
    @Autowired
    private RestHighLevelClient client;
    
    public List<String> suggest(String prefix) throws IOException {
        SearchRequest request = new SearchRequest("shop_products");
        SearchSourceBuilder builder = new SearchSourceBuilder();
        
        SuggestBuilder suggestBuilder = new SuggestBuilder();
        suggestBuilder.addSuggestion("product_suggest",
            SuggestBuilders.completionSuggestion("title.suggest")
                .prefix(prefix)
                .skipDuplicates(true)
                .size(10));
        
        builder.suggest(suggestBuilder);
        request.source(builder);
        
        SearchResponse response = client.search(request, RequestOptions.DEFAULT);
        
        Suggest suggest = response.getSuggest();
        CompletionSuggestion suggestion = suggest.getSuggestion("product_suggest");
        
        return suggestion.getOptions().stream()
            .map(CompletionSuggestion.Entry.Option::getText)
            .map(Text::string)
            .collect(Collectors.toList());
    }
}
```

## 🔄 案例二：MySQL数据同步到ES

### 方案一：定时同步

```java
@Component
@Slf4j
public class ProductSyncJob {
    
    @Autowired
    private ProductMapper productMapper;
    
    @Autowired
    private ProductDocumentService documentService;
    
    // 每小时全量同步
    @Scheduled(cron = "0 0 * * * ?")
    public void fullSync() {
        log.info("开始全量同步商品数据...");
        
        int pageNum = 1;
        int pageSize = 1000;
        
        while (true) {
            // 分页查询MySQL
            Page<Product> page = productMapper.selectPage(
                new Page<>(pageNum, pageSize),
                Wrappers.<Product>lambdaQuery()
                    .eq(Product::getIsDeleted, 0)
            );
            
            if (page.getRecords().isEmpty()) {
                break;
            }
            
            // 批量写入ES
            try {
                documentService.batchAdd(page.getRecords());
                log.info("同步第{}页，共{}条", pageNum, page.getRecords().size());
            } catch (IOException e) {
                log.error("同步失败", e);
            }
            
            if (page.getCurrent() >= page.getPages()) {
                break;
            }
            
            pageNum++;
        }
        
        log.info("全量同步完成");
    }
    
    // 每分钟增量同步
    @Scheduled(cron = "0 * * * * ?")
    public void incrementalSync() {
        log.info("开始增量同步...");
        
        // 查询最近1分钟更新的数据
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime oneMinuteAgo = now.minusMinutes(1);
        
        List<Product> products = productMapper.selectList(
            Wrappers.<Product>lambdaQuery()
                .ge(Product::getUpdateTime, oneMinuteAgo)
                .eq(Product::getIsDeleted, 0)
        );
        
        if (!products.isEmpty()) {
            try {
                documentService.batchAdd(products);
                log.info("增量同步{}条数据", products.size());
            } catch (IOException e) {
                log.error("增量同步失败", e);
            }
        }
    }
}
```

### 方案二：Canal监听MySQL Binlog

```java
@Component
@Slf4j
public class CanalClient {
    
    @Autowired
    private ProductDocumentService documentService;
    
    @PostConstruct
    public void start() {
        CanalConnector connector = CanalConnectors.newSingleConnector(
            new InetSocketAddress("localhost", 11111),
            "example",
            "",
            ""
        );
        
        try {
            connector.connect();
            connector.subscribe("shop\\.product");
            connector.rollback();
            
            while (true) {
                Message message = connector.getWithoutAck(100);
                long batchId = message.getId();
                
                if (batchId == -1 || message.getEntries().isEmpty()) {
                    Thread.sleep(1000);
                    continue;
                }
                
                handleMessage(message);
                connector.ack(batchId);
            }
        } catch (Exception e) {
            log.error("Canal监听失败", e);
        } finally {
            connector.disconnect();
        }
    }
    
    private void handleMessage(Message message) {
        for (CanalEntry.Entry entry : message.getEntries()) {
            if (entry.getEntryType() != CanalEntry.EntryType.ROWDATA) {
                continue;
            }
            
            CanalEntry.RowChange rowChange = CanalEntry.RowChange.parseFrom(entry.getStoreValue());
            CanalEntry.EventType eventType = rowChange.getEventType();
            
            for (CanalEntry.RowData rowData : rowChange.getRowDatasList()) {
                if (eventType == CanalEntry.EventType.INSERT ||
                    eventType == CanalEntry.EventType.UPDATE) {
                    Product product = parseRowData(rowData.getAfterColumnsList());
                    syncToES(product);
                } else if (eventType == CanalEntry.EventType.DELETE) {
                    Long id = Long.parseLong(getColumnValue(rowData.getBeforeColumnsList(), "id"));
                    deleteFromES(id);
                }
            }
        }
    }
}
```

## 📊 案例三：ELK日志分析系统

### Logback配置

```xml
<!-- logback-spring.xml -->
<configuration>
    <appender name="LOGSTASH" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
        <destination>localhost:5000</destination>
        <encoder charset="UTF-8" class="net.logstash.logback.encoder.LogstashEncoder">
            <customFields>{"app_name":"shop-service"}</customFields>
        </encoder>
    </appender>
    
    <root level="INFO">
        <appender-ref ref="LOGSTASH"/>
    </root>
</configuration>
```

### Logstash配置

```conf
input {
  tcp {
    port => 5000
    codec => json_lines
  }
}

filter {
  # 解析日志级别
  if [level] {
    mutate {
      add_field => { "log_level" => "%{level}" }
    }
  }
  
  # 添加时间戳
  date {
    match => ["timestamp", "ISO8601"]
    target => "@timestamp"
  }
}

output {
  elasticsearch {
    hosts => ["localhost:9200"]
    index => "app-logs-%{+YYYY.MM.dd}"
  }
  
  stdout {
    codec => rubydebug
  }
}
```

### 日志查询

```java
@Service
public class LogAnalysisService {
    
    @Autowired
    private RestHighLevelClient client;
    
    // 查询错误日志
    public List<LogEntry> searchErrorLogs(String appName, LocalDateTime start, LocalDateTime end) 
            throws IOException {
        SearchRequest request = new SearchRequest("app-logs-*");
        SearchSourceBuilder builder = new SearchSourceBuilder();
        
        BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();
        boolQuery.must(QueryBuilders.termQuery("app_name", appName));
        boolQuery.must(QueryBuilders.termQuery("log_level", "ERROR"));
        boolQuery.filter(QueryBuilders.rangeQuery("@timestamp")
            .gte(start)
            .lte(end));
        
        builder.query(boolQuery);
        builder.sort("@timestamp", SortOrder.DESC);
        builder.size(100);
        
        request.source(builder);
        SearchResponse response = client.search(request, RequestOptions.DEFAULT);
        
        return parseLogEntries(response);
    }
    
    // 日志统计
    public Map<String, Long> logStatistics(String appName, LocalDateTime start, LocalDateTime end) 
            throws IOException {
        SearchRequest request = new SearchRequest("app-logs-*");
        SearchSourceBuilder builder = new SearchSourceBuilder();
        builder.size(0);
        
        BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();
        boolQuery.must(QueryBuilders.termQuery("app_name", appName));
        boolQuery.filter(QueryBuilders.rangeQuery("@timestamp")
            .gte(start)
            .lte(end));
        
        builder.query(boolQuery);
        
        // 按日志级别统计
        builder.aggregation(AggregationBuilders
            .terms("level_count")
            .field("log_level"));
        
        // 按时间统计
        builder.aggregation(AggregationBuilders
            .dateHistogram("time_distribution")
            .field("@timestamp")
            .calendarInterval(DateHistogramInterval.HOUR));
        
        request.source(builder);
        SearchResponse response = client.search(request, RequestOptions.DEFAULT);
        
        return parseStatistics(response);
    }
}
```

## 🎯 案例四：智能推荐

### 基于协同过滤的推荐

```java
@Service
public class RecommendService {
    
    @Autowired
    private RestHighLevelClient client;
    
    // 相似商品推荐
    public List<Product> recommendSimilar(Long productId) throws IOException {
        // 1. 获取商品信息
        Product product = getProduct(productId);
        
        // 2. 构建查询
        SearchRequest request = new SearchRequest("shop_products");
        SearchSourceBuilder builder = new SearchSourceBuilder();
        
        BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();
        
        // 相同分类
        boolQuery.should(QueryBuilders.termQuery("categoryId", product.getCategoryId()));
        
        // 相同品牌
        boolQuery.should(QueryBuilders.termQuery("brandId", product.getBrandId()));
        
        // 相似价格
        boolQuery.should(QueryBuilders.rangeQuery("price")
            .gte(product.getPrice() * 0.8)
            .lte(product.getPrice() * 1.2));
        
        // 排除自己
        boolQuery.mustNot(QueryBuilders.termQuery("id", productId));
        
        builder.query(boolQuery);
        builder.size(10);
        
        request.source(builder);
        SearchResponse response = client.search(request, RequestOptions.DEFAULT);
        
        return parseProducts(response);
    }
    
    // 基于用户浏览历史推荐
    public List<Product> recommendByHistory(Long userId) throws IOException {
        // 1. 获取用户浏览历史
        List<Long> viewedProductIds = getUserViewHistory(userId);
        
        // 2. 获取浏览过的商品的分类和品牌
        SearchRequest request = new SearchRequest("shop_products");
        SearchSourceBuilder builder = new SearchSourceBuilder();
        builder.size(0);
        
        builder.query(QueryBuilders.termsQuery("id", viewedProductIds));
        
        builder.aggregation(AggregationBuilders.terms("categories").field("categoryId"));
        builder.aggregation(AggregationBuilders.terms("brands").field("brandId"));
        
        request.source(builder);
        SearchResponse response = client.search(request, RequestOptions.DEFAULT);
        
        // 3. 推荐相似商品
        return recommendByPreference(response);
    }
}
```

## 💡 最佳实践

1. **索引设计** - 合理设置分片和副本
2. **数据同步** - 选择合适的同步策略
3. **查询优化** - 使用filter代替must
4. **监控告警** - 实时监控ES状态
5. **日志分析** - 定期清理历史日志

## 🎯 小结

本节学习了Elasticsearch的实战应用：
- ✅ 电商搜索系统实现
- ✅ MySQL数据同步方案
- ✅ ELK日志分析系统
- ✅ 智能推荐功能

---

**下一节：** [05-Elasticsearch集群与优化](05-Elasticsearch集群与优化.md)
