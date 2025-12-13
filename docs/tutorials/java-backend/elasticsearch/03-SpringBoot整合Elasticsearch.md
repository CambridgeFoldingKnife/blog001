---
title: Spring Boot整合Elasticsearch
---

# 03 - Spring Boot整合Elasticsearch

## 🎯 学习目标

- 掌握Spring Boot整合Elasticsearch
- 学会使用RestHighLevelClient
- 理解Spring Data Elasticsearch
- 掌握Repository接口使用
- 学会实现复杂查询

## 🚀 快速开始

### 1. 添加依赖

```xml
<dependencies>
    <!-- Spring Boot Starter -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- Elasticsearch -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-elasticsearch</artifactId>
    </dependency>
    
    <!-- Lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
    
    <!-- JSON -->
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>fastjson</artifactId>
        <version>1.2.83</version>
    </dependency>
</dependencies>
```

### 2. 配置文件

```yaml
spring:
  elasticsearch:
    uris: http://localhost:9200
    username: elastic
    password: 
    connection-timeout: 3s
    socket-timeout: 30s
    
  data:
    elasticsearch:
      repositories:
        enabled: true

# 日志配置
logging:
  level:
    org.elasticsearch: DEBUG
```

## 💻 RestHighLevelClient方式

### 配置类

```java
@Configuration
public class ElasticsearchConfig {
    
    @Value("${spring.elasticsearch.uris}")
    private String uris;
    
    @Bean
    public RestHighLevelClient restHighLevelClient() {
        String[] uriArray = uris.split(",");
        HttpHost[] httpHosts = Arrays.stream(uriArray)
            .map(HttpHost::create)
            .toArray(HttpHost[]::new);
            
        return new RestHighLevelClient(
            RestClient.builder(httpHosts)
        );
    }
}
```

### 实体类

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    private Long id;
    private String name;
    private String category;
    private String brand;
    private Double price;
    private String description;
    private Integer stock;
    private Long sales;
    private Double rating;
    private Boolean onSale;
    private Date createTime;
}
```

### 索引操作

```java
@Service
@Slf4j
public class ProductIndexService {
    
    @Autowired
    private RestHighLevelClient client;
    
    // 创建索引
    public boolean createIndex() throws IOException {
        CreateIndexRequest request = new CreateIndexRequest("products");
        
        // 设置分片和副本
        request.settings(Settings.builder()
            .put("number_of_shards", 3)
            .put("number_of_replicas", 2)
        );
        
        // 设置映射
        XContentBuilder mapping = XContentFactory.jsonBuilder()
            .startObject()
                .startObject("properties")
                    .startObject("id")
                        .field("type", "long")
                    .endObject()
                    .startObject("name")
                        .field("type", "text")
                        .field("analyzer", "ik_max_word")
                        .field("search_analyzer", "ik_smart")
                    .endObject()
                    .startObject("category")
                        .field("type", "keyword")
                    .endObject()
                    .startObject("brand")
                        .field("type", "keyword")
                    .endObject()
                    .startObject("price")
                        .field("type", "double")
                    .endObject()
                    .startObject("description")
                        .field("type", "text")
                        .field("analyzer", "ik_max_word")
                    .endObject()
                    .startObject("stock")
                        .field("type", "integer")
                    .endObject()
                    .startObject("sales")
                        .field("type", "long")
                    .endObject()
                    .startObject("rating")
                        .field("type", "double")
                    .endObject()
                    .startObject("onSale")
                        .field("type", "boolean")
                    .endObject()
                    .startObject("createTime")
                        .field("type", "date")
                        .field("format", "yyyy-MM-dd HH:mm:ss||epoch_millis")
                    .endObject()
                .endObject()
            .endObject();
            
        request.mapping(mapping);
        
        CreateIndexResponse response = client.indices()
            .create(request, RequestOptions.DEFAULT);
        
        log.info("创建索引: {}", response.isAcknowledged());
        return response.isAcknowledged();
    }
    
    // 删除索引
    public boolean deleteIndex() throws IOException {
        DeleteIndexRequest request = new DeleteIndexRequest("products");
        AcknowledgedResponse response = client.indices()
            .delete(request, RequestOptions.DEFAULT);
        
        log.info("删除索引: {}", response.isAcknowledged());
        return response.isAcknowledged();
    }
    
    // 判断索引是否存在
    public boolean existsIndex() throws IOException {
        GetIndexRequest request = new GetIndexRequest("products");
        return client.indices().exists(request, RequestOptions.DEFAULT);
    }
}
```

### 文档操作

```java
@Service
@Slf4j
public class ProductDocumentService {
    
    @Autowired
    private RestHighLevelClient client;
    
    // 添加文档
    public String addDocument(Product product) throws IOException {
        IndexRequest request = new IndexRequest("products");
        request.id(product.getId().toString());
        request.source(JSON.toJSONString(product), XContentType.JSON);
        
        IndexResponse response = client.index(request, RequestOptions.DEFAULT);
        log.info("添加文档: {}", response.getId());
        return response.getId();
    }
    
    // 批量添加
    public void batchAdd(List<Product> products) throws IOException {
        BulkRequest bulkRequest = new BulkRequest();
        
        for (Product product : products) {
            IndexRequest request = new IndexRequest("products");
            request.id(product.getId().toString());
            request.source(JSON.toJSONString(product), XContentType.JSON);
            bulkRequest.add(request);
        }
        
        BulkResponse response = client.bulk(bulkRequest, RequestOptions.DEFAULT);
        log.info("批量添加: 成功={}, 失败={}", 
            products.size() - response.getItems().length,
            response.getItems().length);
    }
    
    // 获取文档
    public Product getDocument(Long id) throws IOException {
        GetRequest request = new GetRequest("products", id.toString());
        GetResponse response = client.get(request, RequestOptions.DEFAULT);
        
        if (response.isExists()) {
            String source = response.getSourceAsString();
            return JSON.parseObject(source, Product.class);
        }
        return null;
    }
    
    // 更新文档
    public void updateDocument(Long id, Product product) throws IOException {
        UpdateRequest request = new UpdateRequest("products", id.toString());
        request.doc(JSON.toJSONString(product), XContentType.JSON);
        
        UpdateResponse response = client.update(request, RequestOptions.DEFAULT);
        log.info("更新文档: {}", response.getResult());
    }
    
    // 删除文档
    public void deleteDocument(Long id) throws IOException {
        DeleteRequest request = new DeleteRequest("products", id.toString());
        DeleteResponse response = client.delete(request, RequestOptions.DEFAULT);
        log.info("删除文档: {}", response.getResult());
    }
}
```

### 搜索操作

```java
@Service
@Slf4j
public class ProductSearchService {
    
    @Autowired
    private RestHighLevelClient client;
    
    // 搜索商品
    public List<Product> search(String keyword) throws IOException {
        SearchRequest request = new SearchRequest("products");
        SearchSourceBuilder builder = new SearchSourceBuilder();
        
        // 构建查询
        builder.query(QueryBuilders.multiMatchQuery(keyword, "name", "description"));
        builder.from(0);
        builder.size(10);
        
        request.source(builder);
        SearchResponse response = client.search(request, RequestOptions.DEFAULT);
        
        return parseResponse(response);
    }
    
    // 复杂搜索
    public List<Product> advancedSearch(String keyword, String category, 
                                       Double minPrice, Double maxPrice) throws IOException {
        SearchRequest request = new SearchRequest("products");
        SearchSourceBuilder builder = new SearchSourceBuilder();
        
        // 布尔查询
        BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();
        
        // 关键词搜索
        if (StringUtils.hasText(keyword)) {
            boolQuery.must(QueryBuilders.multiMatchQuery(keyword, "name", "description"));
        }
        
        // 分类过滤
        if (StringUtils.hasText(category)) {
            boolQuery.filter(QueryBuilders.termQuery("category", category));
        }
        
        // 价格范围
        if (minPrice != null || maxPrice != null) {
            RangeQueryBuilder rangeQuery = QueryBuilders.rangeQuery("price");
            if (minPrice != null) rangeQuery.gte(minPrice);
            if (maxPrice != null) rangeQuery.lte(maxPrice);
            boolQuery.filter(rangeQuery);
        }
        
        // 只查在售商品
        boolQuery.filter(QueryBuilders.termQuery("onSale", true));
        
        builder.query(boolQuery);
        
        // 排序
        builder.sort("sales", SortOrder.DESC);
        builder.sort("rating", SortOrder.DESC);
        
        // 高亮
        HighlightBuilder highlightBuilder = new HighlightBuilder();
        highlightBuilder.field("name");
        highlightBuilder.field("description");
        highlightBuilder.preTags("<em class='highlight'>");
        highlightBuilder.postTags("</em>");
        builder.highlighter(highlightBuilder);
        
        request.source(builder);
        SearchResponse response = client.search(request, RequestOptions.DEFAULT);
        
        return parseResponseWithHighlight(response);
    }
    
    // 聚合查询
    public Map<String, Object> aggregate() throws IOException {
        SearchRequest request = new SearchRequest("products");
        SearchSourceBuilder builder = new SearchSourceBuilder();
        builder.size(0);
        
        // 按分类统计
        builder.aggregation(AggregationBuilders
            .terms("category_count")
            .field("category")
            .size(10));
        
        // 按品牌统计
        builder.aggregation(AggregationBuilders
            .terms("brand_count")
            .field("brand")
            .size(10));
        
        // 价格统计
        builder.aggregation(AggregationBuilders
            .stats("price_stats")
            .field("price"));
        
        request.source(builder);
        SearchResponse response = client.search(request, RequestOptions.DEFAULT);
        
        return parseAggregations(response);
    }
    
    // 解析响应
    private List<Product> parseResponse(SearchResponse response) {
        List<Product> products = new ArrayList<>();
        for (SearchHit hit : response.getHits().getHits()) {
            Product product = JSON.parseObject(hit.getSourceAsString(), Product.class);
            products.add(product);
        }
        return products;
    }
    
    // 解析带高亮的响应
    private List<Product> parseResponseWithHighlight(SearchResponse response) {
        List<Product> products = new ArrayList<>();
        for (SearchHit hit : response.getHits().getHits()) {
            Product product = JSON.parseObject(hit.getSourceAsString(), Product.class);
            
            // 处理高亮
            Map<String, HighlightField> highlightFields = hit.getHighlightFields();
            if (highlightFields.containsKey("name")) {
                product.setName(highlightFields.get("name").fragments()[0].string());
            }
            
            products.add(product);
        }
        return products;
    }
    
    // 解析聚合结果
    private Map<String, Object> parseAggregations(SearchResponse response) {
        Map<String, Object> result = new HashMap<>();
        
        // 分类统计
        Terms categoryAgg = response.getAggregations().get("category_count");
        List<Map<String, Object>> categories = new ArrayList<>();
        for (Terms.Bucket bucket : categoryAgg.getBuckets()) {
            Map<String, Object> category = new HashMap<>();
            category.put("name", bucket.getKeyAsString());
            category.put("count", bucket.getDocCount());
            categories.add(category);
        }
        result.put("categories", categories);
        
        // 价格统计
        Stats priceStats = response.getAggregations().get("price_stats");
        Map<String, Object> priceInfo = new HashMap<>();
        priceInfo.put("avg", priceStats.getAvg());
        priceInfo.put("max", priceStats.getMax());
        priceInfo.put("min", priceStats.getMin());
        result.put("priceStats", priceInfo);
        
        return result;
    }
}
```

## 🍃 Spring Data Elasticsearch方式

### 实体类

```java
@Data
@Document(indexName = "products")
public class ProductEntity {
    
    @Id
    private Long id;
    
    @Field(type = FieldType.Text, analyzer = "ik_max_word", searchAnalyzer = "ik_smart")
    private String name;
    
    @Field(type = FieldType.Keyword)
    private String category;
    
    @Field(type = FieldType.Keyword)
    private String brand;
    
    @Field(type = FieldType.Double)
    private Double price;
    
    @Field(type = FieldType.Text, analyzer = "ik_max_word")
    private String description;
    
    @Field(type = FieldType.Integer)
    private Integer stock;
    
    @Field(type = FieldType.Long)
    private Long sales;
    
    @Field(type = FieldType.Double)
    private Double rating;
    
    @Field(type = FieldType.Boolean)
    private Boolean onSale;
    
    @Field(type = FieldType.Date, format = DateFormat.custom, 
           pattern = "yyyy-MM-dd HH:mm:ss||epoch_millis")
    private Date createTime;
}
```

### Repository接口

```java
public interface ProductRepository extends ElasticsearchRepository<ProductEntity, Long> {
    
    // 根据名称搜索
    List<ProductEntity> findByName(String name);
    
    // 根据分类查询
    List<ProductEntity> findByCategory(String category);
    
    // 根据品牌和分类查询
    List<ProductEntity> findByBrandAndCategory(String brand, String category);
    
    // 价格范围查询
    List<ProductEntity> findByPriceBetween(Double min, Double max);
    
    // 查询在售商品
    List<ProductEntity> findByOnSaleTrue();
    
    // 复杂查询
    @Query("{\"bool\": {\"must\": [{\"match\": {\"name\": \"?0\"}}], \"filter\": [{\"range\": {\"price\": {\"gte\": ?1, \"lte\": ?2}}}]}}")
    List<ProductEntity> searchByNameAndPriceRange(String name, Double minPrice, Double maxPrice);
}
```

### Service层

```java
@Service
@Slf4j
public class ProductService {
    
    @Autowired
    private ProductRepository repository;
    
    @Autowired
    private ElasticsearchRestTemplate elasticsearchTemplate;
    
    // 保存
    public ProductEntity save(ProductEntity product) {
        return repository.save(product);
    }
    
    // 批量保存
    public void saveAll(List<ProductEntity> products) {
        repository.saveAll(products);
    }
    
    // 查询
    public Optional<ProductEntity> findById(Long id) {
        return repository.findById(id);
    }
    
    // 搜索
    public List<ProductEntity> search(String keyword) {
        return repository.findByName(keyword);
    }
    
    // 复杂搜索
    public List<ProductEntity> advancedSearch(String keyword, String category, 
                                             Double minPrice, Double maxPrice) {
        // 构建查询条件
        Criteria criteria = new Criteria();
        
        if (StringUtils.hasText(keyword)) {
            criteria.and(new Criteria("name").matches(keyword));
        }
        
        if (StringUtils.hasText(category)) {
            criteria.and(new Criteria("category").is(category));
        }
        
        if (minPrice != null && maxPrice != null) {
            criteria.and(new Criteria("price").between(minPrice, maxPrice));
        }
        
        Query query = new CriteriaQuery(criteria);
        query.setPageable(PageRequest.of(0, 20));
        query.addSort(Sort.by(Sort.Direction.DESC, "sales"));
        
        SearchHits<ProductEntity> hits = elasticsearchTemplate.search(query, ProductEntity.class);
        return hits.stream()
            .map(SearchHit::getContent)
            .collect(Collectors.toList());
    }
    
    // 删除
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
```

## 🎯 Controller层

```java
@RestController
@RequestMapping("/api/products")
@Slf4j
public class ProductController {
    
    @Autowired
    private ProductSearchService searchService;
    
    @Autowired
    private ProductDocumentService documentService;
    
    // 搜索商品
    @GetMapping("/search")
    public Result<List<Product>> search(@RequestParam String keyword) {
        try {
            List<Product> products = searchService.search(keyword);
            return Result.success(products);
        } catch (IOException e) {
            log.error("搜索失败", e);
            return Result.fail("搜索失败");
        }
    }
    
    // 高级搜索
    @GetMapping("/advanced-search")
    public Result<List<Product>> advancedSearch(
        @RequestParam(required = false) String keyword,
        @RequestParam(required = false) String category,
        @RequestParam(required = false) Double minPrice,
        @RequestParam(required = false) Double maxPrice
    ) {
        try {
            List<Product> products = searchService.advancedSearch(
                keyword, category, minPrice, maxPrice);
            return Result.success(products);
        } catch (IOException e) {
            log.error("搜索失败", e);
            return Result.fail("搜索失败");
        }
    }
    
    // 聚合统计
    @GetMapping("/aggregate")
    public Result<Map<String, Object>> aggregate() {
        try {
            Map<String, Object> result = searchService.aggregate();
            return Result.success(result);
        } catch (IOException e) {
            log.error("聚合失败", e);
            return Result.fail("聚合失败");
        }
    }
    
    // 添加商品
    @PostMapping
    public Result<String> add(@RequestBody Product product) {
        try {
            String id = documentService.addDocument(product);
            return Result.success(id);
        } catch (IOException e) {
            log.error("添加失败", e);
            return Result.fail("添加失败");
        }
    }
}
```

## 💡 最佳实践

1. **使用连接池** - 提高性能
2. **合理设置超时时间** - 避免长时间等待
3. **批量操作** - 使用bulk API
4. **异常处理** - 捕获并处理IOException
5. **日志记录** - 记录关键操作
6. **索引别名** - 方便索引切换

## 🎯 小结

本节学习了Spring Boot整合Elasticsearch：
- ✅ RestHighLevelClient使用
- ✅ Spring Data Elasticsearch
- ✅ Repository接口定义
- ✅ 复杂查询实现
- ✅ 完整的CRUD操作

---

**下一节：** [04-Elasticsearch实战案例](04-Elasticsearch实战案例.md)
