---
title: Spring Boot整合Redis
---

# 04 - Spring Boot整合Redis

## 🎯 学习目标

- 掌握Spring Boot整合Redis
- 学会使用RedisTemplate操作Redis
- 理解序列化配置
- 掌握缓存注解的使用

## 🔧 快速开始

### 1. 添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>

<!-- Lettuce连接池 -->
<dependency>
    <groupId>org.apache.commons.pool2</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>

<!-- JSON序列化 -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
</dependency>
```

### 2. 配置文件

```yaml
spring:
  redis:
    host: localhost
    port: 6379
    password: 
    database: 0
    timeout: 3000ms
    lettuce:
      pool:
        max-active: 8
        max-idle: 8
        min-idle: 0
        max-wait: -1ms
```

### 3. Redis配置类

```java
@Configuration
public class RedisConfig {
    
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);
        
        // JSON序列化配置
        Jackson2JsonRedisSerializer<Object> serializer = new Jackson2JsonRedisSerializer<>(Object.class);
        ObjectMapper mapper = new ObjectMapper();
        mapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        mapper.activateDefaultTyping(LaissezFaireSubTypeValidator.instance,
            ObjectMapper.DefaultTyping.NON_FINAL, JsonTypeInfo.As.PROPERTY);
        serializer.setObjectMapper(mapper);
        
        // String序列化
        StringRedisSerializer stringSerializer = new StringRedisSerializer();
        
        // key采用String序列化
        template.setKeySerializer(stringSerializer);
        template.setHashKeySerializer(stringSerializer);
        
        // value采用JSON序列化
        template.setValueSerializer(serializer);
        template.setHashValueSerializer(serializer);
        
        template.afterPropertiesSet();
        return template;
    }
}
```

## 💻 RedisTemplate使用

### String操作

```java
@Service
public class RedisService {
    
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    
    // 设置值
    public void set(String key, Object value) {
        redisTemplate.opsForValue().set(key, value);
    }
    
    // 设置值并设置过期时间
    public void set(String key, Object value, long timeout, TimeUnit unit) {
        redisTemplate.opsForValue().set(key, value, timeout, unit);
    }
    
    // 获取值
    public Object get(String key) {
        return redisTemplate.opsForValue().get(key);
    }
    
    // 删除
    public Boolean delete(String key) {
        return redisTemplate.delete(key);
    }
    
    // 自增
    public Long increment(String key) {
        return redisTemplate.opsForValue().increment(key);
    }
}
```

### Hash操作

```java
// 设置Hash字段
public void hSet(String key, String field, Object value) {
    redisTemplate.opsForHash().put(key, field, value);
}

// 获取Hash字段
public Object hGet(String key, String field) {
    return redisTemplate.opsForHash().get(key, field);
}

// 获取所有字段
public Map<Object, Object> hGetAll(String key) {
    return redisTemplate.opsForHash().entries(key);
}
```

### List操作

```java
// 左侧推入
public Long lPush(String key, Object value) {
    return redisTemplate.opsForList().leftPush(key, value);
}

// 右侧弹出
public Object rPop(String key) {
    return redisTemplate.opsForList().rightPop(key);
}

// 获取列表
public List<Object> lRange(String key, long start, long end) {
    return redisTemplate.opsForList().range(key, start, end);
}
```

## 🎯 缓存注解

### 1. 开启缓存

```java
@SpringBootApplication
@EnableCaching
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

### 2. @Cacheable（查询缓存）

```java
@Service
public class UserService {
    
    @Cacheable(value = "user", key = "#id")
    public User getUserById(Long id) {
        // 查询数据库
        return userMapper.selectById(id);
    }
}
```

### 3. @CachePut（更新缓存）

```java
@CachePut(value = "user", key = "#user.id")
public User updateUser(User user) {
    userMapper.updateById(user);
    return user;
}
```

### 4. @CacheEvict（删除缓存）

```java
@CacheEvict(value = "user", key = "#id")
public void deleteUser(Long id) {
    userMapper.deleteById(id);
}
```

## 📚 实战案例

### 用户信息缓存

```java
@Service
public class UserService {
    
    @Autowired
    private UserMapper userMapper;
    
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    
    public User getUserById(Long id) {
        String key = "user:" + id;
        
        // 从缓存获取
        User user = (User) redisTemplate.opsForValue().get(key);
        if (user != null) {
            return user;
        }
        
        // 查询数据库
        user = userMapper.selectById(id);
        if (user != null) {
            // 存入缓存，30分钟过期
            redisTemplate.opsForValue().set(key, user, 30, TimeUnit.MINUTES);
        }
        
        return user;
    }
}
```

### 计数器实现

```java
@Service
public class CounterService {
    
    @Autowired
    private StringRedisTemplate stringRedisTemplate;
    
    // 增加浏览量
    public Long incrementViews(Long articleId) {
        String key = "article:views:" + articleId;
        return stringRedisTemplate.opsForValue().increment(key);
    }
    
    // 获取浏览量
    public Long getViews(Long articleId) {
        String key = "article:views:" + articleId;
        String value = stringRedisTemplate.opsForValue().get(key);
        return value != null ? Long.parseLong(value) : 0L;
    }
}
```

---

**下一节：** [05-缓存策略与实战](05-缓存策略与实战.md)
