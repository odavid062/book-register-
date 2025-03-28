FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app

# Copia apenas o pom.xml primeiro para baixar dependências e aproveitar o cache
COPY backend/pom.xml .

# Baixa as dependências do Maven para otimizar o cache do Docker
RUN mvn dependency:go-offline

# Agora copia todo o código-fonte do projeto Spring Boot
COPY backend /app

# Executa o build do projeto
RUN mvn clean package -DskipTests

# Cria a imagem final para execução da aplicação
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copia o JAR gerado do estágio de build
COPY --from=build /app/target/*.jar app.jar

# Define o comando de inicialização do contêiner
ENTRYPOINT ["java", "-jar", "app.jar"]
