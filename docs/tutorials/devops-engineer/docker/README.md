---
title: Docker容器化
autoGroup: false
autoSort: false
sidebarDepth: 0
---

# Docker 容器化

> 轻量级容器技术，实现应用快速部署

## 📚 教程目录

### [01-Docker基础](01-Docker基础/)
- [安装与配置](01-Docker基础/01-安装配置.md)
- [镜像操作](01-Docker基础/02-镜像操作.md)
- [容器操作](01-Docker基础/03-容器操作.md)

### [02-Dockerfile](02-Dockerfile/)
- [Dockerfile编写规范](02-Dockerfile/01-编写规范.md)
- [最佳实践](02-Dockerfile/02-最佳实践.md)
- [多阶段构建](02-Dockerfile/03-多阶段构建.md)

### [03-Docker实战](03-Docker实战/)
- [Docker Compose](03-Docker实战/01-Compose.md)
- [Spring Boot项目容器化](03-Docker实战/02-项目容器化.md)
- [常用容器部署](03-Docker实战/03-常用容器.md)

## 🎯 学习目标

- ✅ 理解Docker核心概念
- ✅ 掌握Docker常用命令
- ✅ 能够编写Dockerfile
- ✅ 掌握Docker Compose
- ✅ 实现项目容器化部署

## 🚀 快速开始

### 安装Docker

**Windows:**
```bash
# 下载Docker Desktop
https://www.docker.com/products/docker-desktop

# 启动Docker Desktop
# 验证安装
docker --version
docker run hello-world
```

### 基本命令

```bash
# 镜像操作
docker pull nginx               # 拉取镜像
docker images                   # 查看镜像
docker rmi nginx                # 删除镜像

# 容器操作
docker run -d -p 80:80 nginx    # 运行容器
docker ps                       # 查看运行中的容器
docker ps -a                    # 查看所有容器
docker stop container_id        # 停止容器
docker rm container_id          # 删除容器

# 进入容器
docker exec -it container_id /bin/bash
```

## 💡 Dockerfile示例

### Spring Boot应用

```dockerfile
# 多阶段构建
FROM maven:3.8.6-openjdk-8 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:8-jre-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### 构建运行

```bash
# 构建镜像
docker build -t myapp:1.0 .

# 运行容器
docker run -d -p 8080:8080 --name myapp myapp:1.0
```

## 🔥 Docker Compose

### docker-compose.yml

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: demo
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql

  redis:
    image: redis:6.2
    container_name: redis
    ports:
      - "6379:6379"

  app:
    build: .
    container_name: myapp
    ports:
      - "8080:8080"
    depends_on:
      - mysql
      - redis
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/demo

volumes:
  mysql-data:
```

### 运行命令

```bash
docker-compose up -d      # 启动所有服务
docker-compose down       # 停止并删除
docker-compose ps         # 查看服务状态
docker-compose logs -f    # 查看日志
```

## 💡 最佳实践

1. **使用官方镜像作为基础**
2. **减小镜像体积**
   - 使用精简版镜像（alpine）
   - 多阶段构建
   - 清理不必要文件
3. **合理使用缓存**
   - 分层构建
   - COPY顺序优化
4. **安全性**
   - 不使用root用户
   - 扫描镜像漏洞
5. **数据持久化**
   - 使用Volume
   - 外部存储

## 🔥 面试重点

1. Docker的原理和优势
2. 镜像与容器的区别
3. Dockerfile常用指令
4. Docker网络模式
5. Volume数据持久化
6. Docker Compose的作用
7. 容器编排vs虚拟机

## 📚 推荐资源

- 《Docker实战》
- 《Docker从入门到实践》
- [Docker官方文档](https://docs.docker.com/)

---

**开始学习** → [01-Docker基础](01-Docker基础/)
