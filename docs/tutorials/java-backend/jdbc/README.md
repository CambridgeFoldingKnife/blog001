---
title: JDBC 数据库连接
---

# 💾 JDBC - Java数据库连接

> JDBC (Java Database Connectivity) 是Java访问数据库的标准接口

## 📖 学习目标

- 理解JDBC的核心概念和工作原理
- 掌握JDBC的基本操作（增删改查）
- 学会使用PreparedStatement防止SQL注入
- 理解数据库连接池的重要性
- 掌握事务处理机制

## 🎯 核心概念

### JDBC是什么？

JDBC是Java提供的一套用于执行SQL语句的API，可以为多种关系型数据库提供统一访问。

### JDBC架构

```
Java应用程序
    ↓
JDBC API
    ↓
JDBC驱动管理器
    ↓
JDBC驱动程序
    ↓
数据库
```

## 🔧 JDBC核心接口

### 1. DriverManager（驱动管理器）
```java
// 注册驱动
Class.forName("com.mysql.cj.jdbc.Driver");

// 获取数据库连接
Connection conn = DriverManager.getConnection(
    "jdbc:mysql://localhost:3306/mydb",
    "username",
    "password"
);
```

### 2. Connection（数据库连接）
```java
// 创建Statement
Statement stmt = conn.createStatement();

// 创建PreparedStatement
PreparedStatement pstmt = conn.prepareStatement(sql);

// 事务管理
conn.setAutoCommit(false);  // 开启事务
conn.commit();              // 提交事务
conn.rollback();            // 回滚事务
```

### 3. Statement（SQL语句执行器）
```java
// 执行查询
ResultSet rs = stmt.executeQuery("SELECT * FROM users");

// 执行更新
int rows = stmt.executeUpdate("DELETE FROM users WHERE id = 1");

// 执行任意SQL
boolean hasResult = stmt.execute(sql);
```

### 4. PreparedStatement（预编译语句）
```java
String sql = "SELECT * FROM users WHERE id = ? AND name = ?";
PreparedStatement pstmt = conn.prepareStatement(sql);
pstmt.setInt(1, 1);
pstmt.setString(2, "张三");
ResultSet rs = pstmt.executeQuery();
```

### 5. ResultSet（结果集）
```java
while (rs.next()) {
    int id = rs.getInt("id");
    String name = rs.getString("name");
    int age = rs.getInt("age");
    System.out.println(id + " - " + name + " - " + age);
}
```

## 💻 基础操作

### 查询操作（SELECT）
```java
public List<User> queryUsers() {
    List<User> users = new ArrayList<>();
    String sql = "SELECT * FROM users";
    
    try (Connection conn = getConnection();
         Statement stmt = conn.createStatement();
         ResultSet rs = stmt.executeQuery(sql)) {
        
        while (rs.next()) {
            User user = new User();
            user.setId(rs.getInt("id"));
            user.setName(rs.getString("name"));
            user.setAge(rs.getInt("age"));
            users.add(user);
        }
    } catch (SQLException e) {
        e.printStackTrace();
    }
    return users;
}
```

### 插入操作（INSERT）
```java
public int insertUser(User user) {
    String sql = "INSERT INTO users(name, age) VALUES(?, ?)";
    
    try (Connection conn = getConnection();
         PreparedStatement pstmt = conn.prepareStatement(sql)) {
        
        pstmt.setString(1, user.getName());
        pstmt.setInt(2, user.getAge());
        
        return pstmt.executeUpdate();
    } catch (SQLException e) {
        e.printStackTrace();
        return 0;
    }
}
```

### 更新操作（UPDATE）
```java
public int updateUser(User user) {
    String sql = "UPDATE users SET name = ?, age = ? WHERE id = ?";
    
    try (Connection conn = getConnection();
         PreparedStatement pstmt = conn.prepareStatement(sql)) {
        
        pstmt.setString(1, user.getName());
        pstmt.setInt(2, user.getAge());
        pstmt.setInt(3, user.getId());
        
        return pstmt.executeUpdate();
    } catch (SQLException e) {
        e.printStackTrace();
        return 0;
    }
}
```

### 删除操作（DELETE）
```java
public int deleteUser(int id) {
    String sql = "DELETE FROM users WHERE id = ?";
    
    try (Connection conn = getConnection();
         PreparedStatement pstmt = conn.prepareStatement(sql)) {
        
        pstmt.setInt(1, id);
        return pstmt.executeUpdate();
    } catch (SQLException e) {
        e.printStackTrace();
        return 0;
    }
}
```

## 🔐 事务处理

### 基本事务
```java
public void transferMoney(int fromId, int toId, double amount) {
    Connection conn = null;
    try {
        conn = getConnection();
        // 关闭自动提交
        conn.setAutoCommit(false);
        
        // 扣款
        String sql1 = "UPDATE accounts SET balance = balance - ? WHERE id = ?";
        PreparedStatement pstmt1 = conn.prepareStatement(sql1);
        pstmt1.setDouble(1, amount);
        pstmt1.setInt(2, fromId);
        pstmt1.executeUpdate();
        
        // 加款
        String sql2 = "UPDATE accounts SET balance = balance + ? WHERE id = ?";
        PreparedStatement pstmt2 = conn.prepareStatement(sql2);
        pstmt2.setDouble(1, amount);
        pstmt2.setInt(2, toId);
        pstmt2.executeUpdate();
        
        // 提交事务
        conn.commit();
    } catch (SQLException e) {
        // 回滚事务
        if (conn != null) {
            try {
                conn.rollback();
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        }
        e.printStackTrace();
    } finally {
        if (conn != null) {
            try {
                conn.setAutoCommit(true);
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
```

## 🏊 数据库连接池

### 为什么需要连接池？
- 创建和销毁数据库连接开销大
- 频繁创建连接影响性能
- 连接池可以复用连接，提高效率

### Druid连接池配置
```java
public class DruidUtil {
    private static DataSource dataSource;
    
    static {
        Properties prop = new Properties();
        try {
            prop.load(DruidUtil.class.getClassLoader()
                .getResourceAsStream("druid.properties"));
            dataSource = DruidDataSourceFactory.createDataSource(prop);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public static Connection getConnection() throws SQLException {
        return dataSource.getConnection();
    }
    
    public static DataSource getDataSource() {
        return dataSource;
    }
}
```

### druid.properties配置文件
```properties
driverClassName=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://localhost:3306/mydb?useSSL=false&serverTimezone=UTC
username=root
password=root
# 初始化连接数
initialSize=5
# 最大连接数
maxActive=20
# 最大等待时间
maxWait=3000
```

## 📋 工具类封装

### JDBC工具类
```java
public class JDBCUtil {
    private static final String URL = "jdbc:mysql://localhost:3306/mydb";
    private static final String USER = "root";
    private static final String PASSWORD = "root";
    
    static {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
    
    // 获取连接
    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
    
    // 释放资源
    public static void close(Connection conn, Statement stmt, ResultSet rs) {
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (stmt != null) {
            try {
                stmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
```

## ⚠️ 常见问题

### 1. SQL注入问题
**错误示例：**
```java
String sql = "SELECT * FROM users WHERE name = '" + name + "'";
```

**正确做法：**
```java
String sql = "SELECT * FROM users WHERE name = ?";
PreparedStatement pstmt = conn.prepareStatement(sql);
pstmt.setString(1, name);
```

### 2. 资源未关闭
**推荐使用try-with-resources：**
```java
try (Connection conn = getConnection();
     PreparedStatement pstmt = conn.prepareStatement(sql);
     ResultSet rs = pstmt.executeQuery()) {
    // 使用资源
}
```

### 3. 事务管理不当
- 忘记提交事务
- 异常时未回滚
- 未恢复自动提交模式

## 🎯 最佳实践

1. **使用PreparedStatement** - 防止SQL注入，提高性能
2. **使用连接池** - 提高数据库访问效率
3. **及时释放资源** - 使用try-with-resources或finally块
4. **合理使用事务** - 保证数据一致性
5. **异常处理** - 捕获并处理SQLException
6. **参数校验** - 输入参数进行校验

## 📚 相关资源

- [JDBC官方文档](https://docs.oracle.com/javase/tutorial/jdbc/)
- [MySQL JDBC驱动](https://dev.mysql.com/downloads/connector/j/)
- [Druid连接池](https://github.com/alibaba/druid)

## 🔗 相关主题

- [MySQL数据库](../mysql/) - 数据库基础
- [MyBatis框架](../mybatis/) - ORM框架
- [Spring JDBC](../spring/) - Spring的JDBC支持

---

**下一步学习：** [MyBatis框架](../mybatis/) - 更强大的持久层框架
