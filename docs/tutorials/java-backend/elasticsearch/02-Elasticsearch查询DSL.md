---
title: Elasticsearch查询DSL
---

# 02 - Elasticsearch查询DSL

## 🎯 学习目标

- 掌握DSL查询语法
- 理解全文检索和精确查询的区别
- 学会使用布尔组合查询
- 掌握聚合分析操作
- 学会使用高亮、分页、排序

## 📖 DSL查询语法

DSL（Domain Specific Language）是Elasticsearch提供的JSON风格的查询语言。

### 查询结构

```json
GET /index_name/_search
{
  "query": { ... },      // 查询条件
  "from": 0,             // 分页起始位置
  "size": 10,            // 返回文档数量
  "sort": [ ... ],       // 排序
  "_source": [ ... ],    // 返回字段
  "highlight": { ... },  // 高亮
  "aggs": { ... }        // 聚合
}
```

## 🔍 全文检索查询

### 1. match查询（标准全文检索）

```bash
# 单字段匹配
GET /products/_search
{
  "query": {
    "match": {
      "name": "小米手机"
    }
  }
}

# 指定操作符（AND/OR）
GET /products/_search
{
  "query": {
    "match": {
      "description": {
        "query": "骁龙 处理器",
        "operator": "and"
      }
    }
  }
}

# 最小匹配度
GET /products/_search
{
  "query": {
    "match": {
      "description": {
        "query": "骁龙8 Gen2 处理器",
        "minimum_should_match": "75%"
      }
    }
  }
}
```

### 2. match_phrase（短语匹配）

```bash
# 精确短语匹配
GET /products/_search
{
  "query": {
    "match_phrase": {
      "description": "骁龙8 Gen2"
    }
  }
}

# 允许词项间有间隔
GET /products/_search
{
  "query": {
    "match_phrase": {
      "description": {
        "query": "骁龙 处理器",
        "slop": 2
      }
    }
  }
}
```

### 3. multi_match（多字段匹配）

```bash
# 在多个字段中搜索
GET /products/_search
{
  "query": {
    "multi_match": {
      "query": "iPhone",
      "fields": ["name", "description", "brand"]
    }
  }
}

# 字段权重
GET /products/_search
{
  "query": {
    "multi_match": {
      "query": "手机",
      "fields": ["name^3", "description"],
      "type": "best_fields"
    }
  }
}
```

### 4. query_string（复杂查询字符串）

```bash
GET /products/_search
{
  "query": {
    "query_string": {
      "query": "(iPhone OR 小米) AND 手机",
      "fields": ["name", "description"]
    }
  }
}
```

## 🎯 精确查询

### 1. term查询（精确匹配）

```bash
# 单值匹配
GET /products/_search
{
  "query": {
    "term": {
      "category": "手机"
    }
  }
}

# 多值匹配（类似SQL的IN）
GET /products/_search
{
  "query": {
    "terms": {
      "brand": ["Apple", "小米", "华为"]
    }
  }
}
```

### 2. range查询（范围查询）

```bash
GET /products/_search
{
  "query": {
    "range": {
      "price": {
        "gte": 4000,
        "lte": 8000
      }
    }
  }
}

# 日期范围
GET /products/_search
{
  "query": {
    "range": {
      "create_time": {
        "gte": "2024-01-01",
        "lte": "2024-12-31",
        "format": "yyyy-MM-dd"
      }
    }
  }
}

# 相对时间
GET /products/_search
{
  "query": {
    "range": {
      "create_time": {
        "gte": "now-7d/d",
        "lte": "now/d"
      }
    }
  }
}
```

### 3. exists查询（字段存在）

```bash
GET /products/_search
{
  "query": {
    "exists": {
      "field": "discount"
    }
  }
}
```

### 4. prefix查询（前缀匹配）

```bash
GET /products/_search
{
  "query": {
    "prefix": {
      "name": "iPhone"
    }
  }
}
```

### 5. wildcard查询（通配符）

```bash
GET /products/_search
{
  "query": {
    "wildcard": {
      "name": "*Pro*"
    }
  }
}
```

### 6. fuzzy查询（模糊查询）

```bash
# 允许拼写错误
GET /products/_search
{
  "query": {
    "fuzzy": {
      "name": {
        "value": "iPone",
        "fuzziness": 2
      }
    }
  }
}
```

## 🔗 布尔组合查询

### bool查询

```bash
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
            "brand": "Apple"
          }
        },
        {
          "range": {
            "price": {
              "gte": 5000,
              "lte": 10000
            }
          }
        }
      ],
      "should": [
        {
          "match": {
            "description": "Pro"
          }
        }
      ],
      "must_not": [
        {
          "term": {
            "on_sale": false
          }
        }
      ],
      "minimum_should_match": 1
    }
  }
}
```

**bool查询子句：**

| 子句 | 说明 | 影响评分 |
|------|------|----------|
| must | 必须匹配，AND关系 | 是 |
| filter | 必须匹配，不参与评分 | 否 |
| should | 应该匹配，OR关系 | 是 |
| must_not | 必须不匹配，NOT关系 | 否 |

## 📊 聚合分析

### 1. 桶聚合（Bucket Aggregations）

#### 按分类统计

```bash
GET /products/_search
{
  "size": 0,
  "aggs": {
    "category_count": {
      "terms": {
        "field": "category",
        "size": 10
      }
    }
  }
}
```

#### 价格区间统计

```bash
GET /products/_search
{
  "size": 0,
  "aggs": {
    "price_ranges": {
      "range": {
        "field": "price",
        "ranges": [
          { "key": "低价", "to": 3000 },
          { "key": "中价", "from": 3000, "to": 6000 },
          { "key": "高价", "from": 6000 }
        ]
      }
    }
  }
}
```

#### 日期直方图

```bash
GET /products/_search
{
  "size": 0,
  "aggs": {
    "sales_over_time": {
      "date_histogram": {
        "field": "create_time",
        "calendar_interval": "month",
        "format": "yyyy-MM"
      }
    }
  }
}
```

### 2. 指标聚合（Metric Aggregations）

```bash
GET /products/_search
{
  "size": 0,
  "aggs": {
    "avg_price": {
      "avg": {
        "field": "price"
      }
    },
    "max_price": {
      "max": {
        "field": "price"
      }
    },
    "min_price": {
      "min": {
        "field": "price"
      }
    },
    "sum_sales": {
      "sum": {
        "field": "sales"
      }
    },
    "stats_price": {
      "stats": {
        "field": "price"
      }
    }
  }
}
```

### 3. 嵌套聚合

```bash
GET /products/_search
{
  "size": 0,
  "aggs": {
    "by_category": {
      "terms": {
        "field": "category"
      },
      "aggs": {
        "avg_price": {
          "avg": {
            "field": "price"
          }
        },
        "by_brand": {
          "terms": {
            "field": "brand"
          }
        }
      }
    }
  }
}
```

## 🎨 高亮显示

```bash
GET /products/_search
{
  "query": {
    "match": {
      "name": "iPhone Pro"
    }
  },
  "highlight": {
    "fields": {
      "name": {
        "pre_tags": ["<em class='highlight'>"],
        "post_tags": ["</em>"],
        "fragment_size": 100,
        "number_of_fragments": 3
      },
      "description": {}
    }
  }
}
```

## 📄 分页

### 1. from/size分页（浅分页）

```bash
# 适用于少量数据
GET /products/_search
{
  "query": {
    "match_all": {}
  },
  "from": 0,
  "size": 10
}

# 限制：from + size <= 10000
```

### 2. scroll分页（深分页）

```bash
# 第一次请求
POST /products/_search?scroll=1m
{
  "size": 1000,
  "query": {
    "match_all": {}
  }
}

# 后续请求
POST /_search/scroll
{
  "scroll": "1m",
  "scroll_id": "DXF1ZXJ5QW5kRmV0Y2gBAAAAAAAAAD4WYm9laVYtZndUQlNsdDcwakFMNjU1QQ=="
}

# 清除scroll
DELETE /_search/scroll
{
  "scroll_id": "DXF1ZXJ5QW5kRmV0Y2gBAAAAAAAAAD4WYm9laVYtZndUQlNsdDcwakFMNjU1QQ=="
}
```

### 3. search_after分页（推荐）

```bash
# 第一次请求
GET /products/_search
{
  "size": 10,
  "query": {
    "match_all": {}
  },
  "sort": [
    {"price": "asc"},
    {"_id": "asc"}
  ]
}

# 后续请求（使用上一次最后一条的sort值）
GET /products/_search
{
  "size": 10,
  "query": {
    "match_all": {}
  },
  "search_after": [7999, "1"],
  "sort": [
    {"price": "asc"},
    {"_id": "asc"}
  ]
}
```

## 🔢 排序

```bash
GET /products/_search
{
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "sales": {
        "order": "desc"
      }
    },
    {
      "rating": {
        "order": "desc"
      }
    },
    {
      "price": {
        "order": "asc"
      }
    },
    "_score"
  ]
}
```

## 🎯 指定返回字段

```bash
GET /products/_search
{
  "query": {
    "match_all": {}
  },
  "_source": ["name", "price", "brand"]
}

# 排除字段
GET /products/_search
{
  "query": {
    "match_all": {}
  },
  "_source": {
    "excludes": ["description", "create_time"]
  }
}
```

## 💻 实战案例：电商搜索

### 综合搜索

```bash
GET /products/_search
{
  "query": {
    "function_score": {
      "query": {
        "bool": {
          "must": [
            {
              "multi_match": {
                "query": "手机",
                "fields": ["name^3", "description"],
                "type": "best_fields"
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
                  "gte": 3000,
                  "lte": 8000
                }
              }
            }
          ],
          "should": [
            {
              "term": {
                "brand": "Apple"
              }
            }
          ]
        }
      },
      "functions": [
        {
          "filter": {
            "range": {
              "sales": {
                "gte": 5000
              }
            }
          },
          "weight": 2
        },
        {
          "field_value_factor": {
            "field": "rating",
            "factor": 1.2
          }
        }
      ],
      "score_mode": "sum",
      "boost_mode": "multiply"
    }
  },
  "sort": [
    "_score",
    {
      "sales": "desc"
    }
  ],
  "from": 0,
  "size": 20,
  "highlight": {
    "fields": {
      "name": {},
      "description": {}
    }
  },
  "aggs": {
    "brand_count": {
      "terms": {
        "field": "brand",
        "size": 10
      }
    },
    "price_range": {
      "range": {
        "field": "price",
        "ranges": [
          {"key": "0-3000", "to": 3000},
          {"key": "3000-6000", "from": 3000, "to": 6000},
          {"key": "6000+", "from": 6000}
        ]
      }
    },
    "avg_price": {
      "avg": {
        "field": "price"
      }
    }
  }
}
```

## 💡 最佳实践

1. **使用filter代替must** - filter不计算评分，性能更好
2. **避免深分页** - 使用search_after代替from/size
3. **合理使用分词器** - 搜索用ik_smart，索引用ik_max_word
4. **聚合使用keyword** - text字段无法聚合
5. **控制返回字段** - 减少网络传输

## 🎯 小结

本节学习了Elasticsearch查询DSL：
- ✅ 全文检索查询（match、match_phrase、multi_match）
- ✅ 精确查询（term、range、exists）
- ✅ 布尔组合查询（bool）
- ✅ 聚合分析（桶聚合、指标聚合）
- ✅ 高亮、分页、排序

---

**下一节：** [03-Spring Boot整合Elasticsearch](03-SpringBoot整合Elasticsearch.md)
