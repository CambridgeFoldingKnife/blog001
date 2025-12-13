# SQL基础语法

> 本章将系统学习SQL的四大语言：DDL（数据定义）、DML（数据操作）、DQL（数据查询）、DCL（数据控制）

## 📋 本章目录

- [一、SQL语言概述](#一sql语言概述)
- [二、DDL数据定义语言](#二ddl数据定义语言)
- [三、MySQL数据类型](#三mysql数据类型)
- [四、DML数据操作语言](#四dml数据操作语言)
- [五、DQL数据查询语言](#五dql数据查询语言)
- [六、DCL数据控制语言](#六dcl数据控制语言)

---

## 一、SQL语言概述

### 1.1 SQL的分类

| 分类 | 说明 | 主要语句 |
|------|------|----------|
| **DDL** | 数据定义语言 | CREATE、ALTER、DROP |
| **DML** | 数据操作语言 | INSERT、UPDATE、DELETE |
| **DQL** | 数据查询语言 | SELECT |
| **DCL** | 数据控制语言 | GRANT、REVOKE |

### 1.2 SQL语法规范

```sql
-- 单行注释
# 这也是注释
/* 多行注释 */
```

---

## 二、DDL数据定义语言

### 2.1 数据库操作

```sql
-- 查询所有数据库
SHOW DATABASES;

-- 查询当前数据库
SELECT DATABASE();

-- 创建数据库
CREATE DATABASE IF NOT EXISTS test01 DEFAULT CHARSET utf8mb4;

-- 删除数据库
DROP DATABASE IF EXISTS test01;

-- 使用数据库
USE test01;
```

### 2.2 表操作

#### 创建表

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '员工ID',
    name VARCHAR(50) NOT NULL COMMENT '姓名',
    age INT COMMENT '年龄',
    department VARCHAR(50) COMMENT '部门',
    salary DECIMAL(10, 2) COMMENT '薪资',
    hire_date DATE COMMENT '入职日期'
) COMMENT '员工表';
```

#### 查看表

```sql
-- 查看所有表
SHOW TABLES;

-- 查看表结构
DESC employees;

-- 查看建表语句
SHOW CREATE TABLE employees;
```

#### 修改表

```sql
-- 添加字段
ALTER TABLE employees ADD email VARCHAR(100) COMMENT '邮箱';

-- 修改字段类型
ALTER TABLE employees MODIFY age TINYINT;

-- 修改字段名
ALTER TABLE employees CHANGE age emp_age INT;

-- 删除字段
ALTER TABLE employees DROP email;

-- 修改表名
ALTER TABLE employees RENAME TO emp;

-- 删除表
DROP TABLE IF EXISTS employees;

-- 清空表数据
TRUNCATE TABLE employees;
```

---

## 三、MySQL数据类型

### 3.1 数值类型

| 类型 | 字节 | 范围 | 用途 |
|------|------|------|------|
| TINYINT | 1 | -128~127 | 年龄、状态 |
| INT | 4 | -2^31~2^31-1 | 主键、数量 |
| BIGINT | 8 | -2^63~2^63-1 | 大数值 |
| DECIMAL(M,D) | - | 精确小数 | 金额 |
| DOUBLE | 8 | 浮点数 | 科学计算 |

### 3.2 字符串类型

| 类型 | 长度 | 说明 |
|------|------|------|
| CHAR(n) | 固定 | 定长字符串 |
| VARCHAR(n) | 可变 | 变长字符串 |
| TEXT | 65535 | 长文本 |

**使用建议：**
- 固定长度用CHAR（如性别、省份）
- 可变长度用VARCHAR（如姓名、地址）

### 3.3 日期时间类型

| 类型 | 格式 | 说明 |
|------|------|------|
| DATE | YYYY-MM-DD | 日期 |
| TIME | HH:MM:SS | 时间 |
| DATETIME | YYYY-MM-DD HH:MM:SS | 日期时间 |
| TIMESTAMP | YYYY-MM-DD HH:MM:SS | 时间戳 |

---

## 四、DML数据操作语言

### 4.1 插入数据

```sql
-- 插入单条
INSERT INTO employees (name, age, department) VALUES ('张三', 28, '技术部');

-- 批量插入
INSERT INTO employees (name, age, department) VALUES
('张三', 28, '技术部'),
('李四', 32, '销售部'),
('王五', 25, '技术部');
```

### 4.2 修改数据

```sql
-- 修改单条
UPDATE employees SET salary = 10000 WHERE id = 1;

-- 修改多条
UPDATE employees SET salary = salary * 1.1 WHERE department = '技术部';
```

⚠️ **警告**：UPDATE不加WHERE会修改所有记录！

### 4.3 删除数据

```sql
-- 删除指定记录
DELETE FROM employees WHERE id = 10;

-- 删除满足条件的记录
DELETE FROM employees WHERE age > 60;
```

⚠️ **警告**：DELETE不加WHERE会删除所有记录！

---

## 五、DQL数据查询语言

### 5.1 基础查询

```sql
-- 查询所有字段
SELECT * FROM employees;

-- 查询指定字段
SELECT name, age, department FROM employees;

-- 字段别名
SELECT name AS '姓名', age AS '年龄' FROM employees;

-- 去重
SELECT DISTINCT department FROM employees;
```

### 5.2 条件查询

```sql
-- 比较运算
SELECT * FROM employees WHERE age = 28;
SELECT * FROM employees WHERE age BETWEEN 25 AND 35;
SELECT * FROM employees WHERE department IN ('技术部', '销售部');

-- 模糊查询
SELECT * FROM employees WHERE name LIKE '张%';    -- 张开头
SELECT * FROM employees WHERE name LIKE '%明%';  -- 包含明
SELECT * FROM employees WHERE name LIKE '张_';   -- 张+1个字

-- NULL查询
SELECT * FROM employees WHERE email IS NULL;

-- 逻辑运算
SELECT * FROM employees 
WHERE department = '技术部' AND age > 25;
```

### 5.3 聚合函数

```sql
-- 统计数量
SELECT COUNT(*) FROM employees;

-- 平均值
SELECT AVG(age) FROM employees;

-- 求和
SELECT SUM(salary) FROM employees;

-- 最大值和最小值
SELECT MAX(salary), MIN(salary) FROM employees;
```

### 5.4 分组查询

```sql
-- 按部门分组统计人数
SELECT department, COUNT(*) 
FROM employees 
GROUP BY department;

-- 分组后过滤
SELECT department, COUNT(*) AS cnt
FROM employees 
GROUP BY department 
HAVING cnt > 5;

-- WHERE vs HAVING
SELECT department, AVG(age) AS avg_age
FROM employees 
WHERE age > 20                    -- 分组前过滤
GROUP BY department 
HAVING avg_age > 30;              -- 分组后过滤
```

### 5.5 排序查询

```sql
-- 升序（默认）
SELECT * FROM employees ORDER BY age ASC;

-- 降序
SELECT * FROM employees ORDER BY salary DESC;

-- 多字段排序
SELECT * FROM employees ORDER BY department ASC, salary DESC;
```

### 5.6 分页查询

```sql
-- 第1页（每页10条）
SELECT * FROM employees LIMIT 0, 10;
SELECT * FROM employees LIMIT 10;      -- 起始为0可省略

-- 第2页
SELECT * FROM employees LIMIT 10, 10;

-- 第3页
SELECT * FROM employees LIMIT 20, 10;
```

**计算公式**：起始索引 = (页码 - 1) × 每页记录数

---

## 六、DCL数据控制语言

### 6.1 用户管理

```sql
-- 创建用户（只能本地访问）
CREATE USER 'user1'@'localhost' IDENTIFIED BY '123456';

-- 创建用户（任意主机访问）
CREATE USER 'user2'@'%' IDENTIFIED BY '123456';

-- 修改密码
ALTER USER 'user1'@'localhost' IDENTIFIED BY '新密码';

-- 删除用户
DROP USER 'user1'@'localhost';
```

### 6.2 权限管理

```sql
-- 查询权限
SHOW GRANTS FOR 'user1'@'localhost';

-- 授予权限
GRANT SELECT, INSERT ON test01.* TO 'user1'@'localhost';
GRANT ALL ON test01.* TO 'user1'@'localhost';

-- 撤销权限
REVOKE SELECT, INSERT ON test01.* FROM 'user1'@'localhost';
```

**常用权限**：SELECT、INSERT、UPDATE、DELETE、ALTER、DROP、CREATE

---

## 七、本章总结

### 核心要点

1. **DDL**：定义数据库和表结构
2. **DML**：增删改数据
3. **DQL**：查询数据（最重要）
4. **DCL**：用户和权限管理

### DQL执行顺序

```
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
```

### 学习建议

1. ✅ 熟练掌握增删改查基本操作
2. ✅ 理解聚合函数和分组查询
3. ✅ 掌握条件查询和模糊匹配
4. ✅ 多练习实际案例

---

## 练习题

### 基础练习

```sql
-- 1. 创建学生表
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    age INT,
    class VARCHAR(20),
    score DECIMAL(5,2)
);

-- 2. 插入数据
INSERT INTO students (name, age, class, score) VALUES
('张三', 20, '一班', 85.5),
('李四', 21, '二班', 92.0),
('王五', 20, '一班', 78.5),
('赵六', 22, '一班', 88.0);

-- 3. 查询所有学生
SELECT * FROM students;

-- 4. 查询一班学生
SELECT * FROM students WHERE class = '一班';

-- 5. 查询年龄大于20的学生
SELECT * FROM students WHERE age > 20;

-- 6. 按班级分组统计人数
SELECT class, COUNT(*) FROM students GROUP BY class;

-- 7. 查询平均分大于80的班级
SELECT class, AVG(score) AS avg_score
FROM students 
GROUP BY class 
HAVING avg_score > 80;

-- 8. 按分数降序排列
SELECT * FROM students ORDER BY score DESC;
```

---

**下一章：[第03章 - 函数详解](../第02章-进阶篇/03-函数详解.md)** →
