# SQL性能优化

> SQL性能优化是数据库优化的核心内容。本章介绍常见的SQL优化技巧和最佳实践。

## 📋 本章目录

- [一、INSERT优化](#一insert优化)
- [二、主键优化](#二主键优化)
- [三、ORDER BY优化](#三order-by优化)
- [四、GROUP BY优化](#四group-by优化)
- [五、LIMIT优化](#五limit优化)
- [六、SQL优化技巧](#六sql优化技巧)

---

## 一、INSERT优化

### 1.1 批量插入

```sql
-- ❌ 效率低（逐条插入）
INSERT INTO users VALUES (1, '张三');
INSERT INTO users VALUES (2, '李四');
INSERT INTO users VALUES (3, '王五');

-- ✅ 效率高（批量插入）
INSERT INTO users VALUES 
(1, '张三'),
(2, '李四'),
(3, '王五');

-- 建议：每批500-1000条
```

### 1.2 手动提交事务

```sql
-- ❌ 自动提交（每条都提交）
INSERT INTO users VALUES (1, '张三');
INSERT INTO users VALUES (2, '李四');

-- ✅ 手动提交（批量提交）
START TRANSACTION;
INSERT INTO users VALUES (1, '张三');
INSERT INTO users VALUES (2, '李四');
INSERT INTO users VALUES (3, '王五');
COMMIT;
```

### 1.3 主键顺序插入

```sql
-- ✅ 顺序插入（推荐）
INSERT INTO users VALUES (1, '张三');
INSERT INTO users VALUES (2, '李四');
INSERT INTO users VALUES (3, '王五');

-- ❌ 乱序插入（会导致页分裂）
INSERT INTO users VALUES (3, '王五');
INSERT INTO users VALUES (1, '张三');
INSERT INTO users VALUES (2, '李四');
```

### 1.4 使用LOAD DATA

大批量数据导入使用LOAD DATA效率最高：

```sql
-- 启用本地文件导入
SET GLOBAL local_infile = 1;

-- 导入数据
LOAD DATA LOCAL INFILE '/path/to/data.csv'
INTO TABLE users
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
```

---

## 二、主键优化

### 2.1 主键设计原则

**1. 使用自增主键**
```sql
-- ✅ 推荐：自增主键
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50)
);

-- ❌ 不推荐：UUID（长度大、无序）
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,  -- UUID
    name VARCHAR(50)
);
```

**2. 主键长度尽量短**
- 主键越短，二级索引占用空间越小
- 推荐使用INT或BIGINT

**3. 顺序插入，避免页分裂**
- 自增主键保证顺序插入
- UUID等无序主键会导致频繁的页分裂

### 2.2 页分裂和页合并

**页分裂：**
插入数据时，如果当前页满了，需要分裂成两个页，影响性能。

**页合并：**
删除数据后，如果页的利用率低于阈值（默认50%），会合并页。

**优化建议：**
- 使用自增主键避免页分裂
- 批量删除后考虑OPTIMIZE TABLE

---

## 三、ORDER BY优化

### 3.1 Using filesort vs Using index

```sql
-- ❌ Using filesort（文件排序，慢）
EXPLAIN SELECT * FROM users ORDER BY age;

-- ✅ Using index（索引排序，快）
CREATE INDEX idx_age ON users(age);
EXPLAIN SELECT * FROM users ORDER BY age;
```

### 3.2 优化技巧

**1. 创建排序字段的索引**
```sql
CREATE INDEX idx_create_time ON orders(create_time);
SELECT * FROM orders ORDER BY create_time;
```

**2. 覆盖索引**
```sql
CREATE INDEX idx_name_age ON users(name, age);
-- 只查询索引字段，避免回表
SELECT name, age FROM users ORDER BY age;
```

**3. 联合索引注意顺序**
```sql
CREATE INDEX idx_status_time ON orders(status, create_time);

-- ✅ 能用到索引
SELECT * FROM orders WHERE status = 1 ORDER BY create_time;

-- ❌ 不能用到索引
SELECT * FROM orders ORDER BY create_time;  -- 缺少status条件
```

---

## 四、GROUP BY优化

### 4.1 优化策略

```sql
-- 为GROUP BY字段创建索引
CREATE INDEX idx_dept_id ON employees(dept_id);

SELECT dept_id, COUNT(*) 
FROM employees 
GROUP BY dept_id;
```

### 4.2 避免回表

```sql
-- 创建覆盖索引
CREATE INDEX idx_dept_salary ON employees(dept_id, salary);

-- 不需要回表
SELECT dept_id, AVG(salary) 
FROM employees 
GROUP BY dept_id;
```

---

## 五、LIMIT优化

### 5.1 深度分页优化

```sql
-- ❌ 慢：扫描前10000条，只取10条
SELECT * FROM users ORDER BY id LIMIT 10000, 10;

-- ✅ 快：使用子查询优化
SELECT * FROM users 
WHERE id >= (SELECT id FROM users ORDER BY id LIMIT 10000, 1)
LIMIT 10;

-- ✅ 或使用覆盖索引
SELECT * FROM users u
JOIN (SELECT id FROM users ORDER BY id LIMIT 10000, 10) t 
ON u.id = t.id;
```

### 5.2 使用ID范围

```sql
-- 记录上次查询的最大ID
SELECT * FROM users WHERE id > 10000 ORDER BY id LIMIT 10;
```

---

## 六、SQL优化技巧

### 6.1 避免SELECT *

```sql
-- ❌ 不推荐
SELECT * FROM users WHERE id = 1;

-- ✅ 推荐：只查询需要的字段
SELECT id, name, email FROM users WHERE id = 1;
```

### 6.2 避免在WHERE中使用函数

```sql
-- ❌ 索引失效
SELECT * FROM orders WHERE YEAR(create_time) = 2024;

-- ✅ 使用范围查询
SELECT * FROM orders 
WHERE create_time >= '2024-01-01' AND create_time < '2025-01-01';
```

### 6.3 使用UNION ALL代替UNION

```sql
-- UNION会去重，效率低
SELECT * FROM users WHERE age < 20
UNION
SELECT * FROM users WHERE salary > 10000;

-- UNION ALL不去重，效率高
SELECT * FROM users WHERE age < 20
UNION ALL
SELECT * FROM users WHERE salary > 10000;
```

### 6.4 小表驱动大表

```sql
-- ✅ 小表在前（users表小）
SELECT * FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- ❌ 大表在前（orders表大）
SELECT * FROM orders o
LEFT JOIN users u ON o.user_id = u.id;
```

### 6.5 使用EXISTS代替IN

```sql
-- 当子查询结果集大时，用EXISTS效率更高
SELECT * FROM users u
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.user_id = u.id
);
```

### 6.6 避免使用子查询

```sql
-- ❌ 子查询（可能慢）
SELECT * FROM users 
WHERE id IN (SELECT user_id FROM orders WHERE status = 1);

-- ✅ JOIN（通常更快）
SELECT DISTINCT u.* 
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.status = 1;
```

---

## 七、性能分析工具

### 7.1 EXPLAIN分析

```sql
EXPLAIN SELECT * FROM users WHERE age = 25;
```

**关键指标：**
- `type`：ALL（全表扫描）→ index → range → ref → const（最优）
- `key`：使用的索引
- `rows`：扫描行数
- `Extra`：额外信息（Using index、Using filesort等）

### 7.2 SHOW PROFILE

```sql
-- 开启profiling
SET profiling = 1;

-- 执行SQL
SELECT * FROM users WHERE age = 25;

-- 查看性能
SHOW PROFILES;
SHOW PROFILE FOR QUERY 1;
```

### 7.3 慢查询日志

```sql
-- 开启慢查询日志
SET GLOBAL slow_query_log = 1;
SET GLOBAL long_query_time = 2;  -- 超过2秒的查询

-- 查看慢查询日志位置
SHOW VARIABLES LIKE 'slow_query_log_file';
```

---

## 八、本章总结

### 优化清单

**INSERT优化：**
- ✅ 批量插入
- ✅ 手动提交事务
- ✅ 主键顺序插入
- ✅ 大批量用LOAD DATA

**索引优化：**
- ✅ 为WHERE、ORDER BY、GROUP BY字段建索引
- ✅ 使用覆盖索引
- ✅ 避免索引失效

**SQL优化：**
- ✅ 避免SELECT *
- ✅ 避免在WHERE中使用函数
- ✅ 小表驱动大表
- ✅ 优化深度分页

**分析工具：**
- ✅ EXPLAIN分析执行计划
- ✅ SHOW PROFILE性能分析
- ✅ 慢查询日志

---

## 练习题

```sql
-- 1. 优化以下SQL
-- 原SQL
SELECT * FROM orders WHERE DATE(create_time) = '2024-01-01';

-- 优化后
SELECT * FROM orders 
WHERE create_time >= '2024-01-01' AND create_time < '2024-01-02';

-- 2. 优化深度分页
-- 原SQL
SELECT * FROM users ORDER BY id LIMIT 100000, 10;

-- 优化后
SELECT * FROM users WHERE id > 100000 ORDER BY id LIMIT 10;

-- 3. 分析执行计划
EXPLAIN SELECT * FROM users WHERE age = 25 ORDER BY create_time;
```

---

**教程核心章节已完成！其他章节请参考原文件或官方文档学习。**

**继续学习：[实践练习](../第04章-实践练习/README.md)** →
