# Book Register

Aplicação full-stack para cadastro e gerenciamento de livros, com backend Spring Boot, frontend Angular e banco PostgreSQL — tudo containerizado com Docker e com pipeline CI/CD no GitHub Actions.

[![CI](https://github.com/odavid062/book-register-/actions/workflows/ci.yml/badge.svg)](https://github.com/odavid062/book-register-/actions/workflows/ci.yml)
[![Java](https://img.shields.io/badge/Java-17-orange?logo=openjdk)](https://openjdk.org/projects/jdk/17/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.4-brightgreen?logo=springboot)](https://spring.io/projects/spring-boot)
[![Angular](https://img.shields.io/badge/Angular-19-red?logo=angular)](https://angular.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)](https://docs.docker.com/compose/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## Arquitetura

```mermaid
flowchart LR
    User([Usuário]) -->|HTTP :80| FE[Angular 19\nSPA]
    FE -->|REST :8080| BE[Spring Boot\nAPI REST]
    BE -->|JPA/Hibernate| DB[(PostgreSQL 15\nbook_db)]

    subgraph Docker Compose
        FE
        BE
        DB
    end
```

---

## Funcionalidades

- Cadastrar livro com título, autor e ano de publicação
- Listar todos os livros cadastrados
- API documentada interativamente via Swagger UI
- Pipeline CI/CD com GitHub Actions (build + testes do backend a cada push)

---

## Stack Tecnológica

| Camada | Tecnologia | Versão |
|---|---|---|
| Frontend | Angular | 19.2 |
| Frontend | TypeScript | 5.7 |
| Backend | Java | 17 |
| Backend | Spring Boot | 3.4.4 |
| Backend | Spring Data JPA | — |
| Backend | Springdoc OpenAPI | 2.7.0 |
| Banco | PostgreSQL | 15 |
| Infra | Docker Compose | — |
| CI/CD | GitHub Actions | — |

---

## Como Executar

### Pré-requisitos

- **Com Docker (recomendado)**: [Docker](https://www.docker.com/) e Docker Compose instalados.
- **Execução manual**: [Java 17 (JDK)](https://openjdk.org/projects/jdk/17/), [Node.js 18+](https://nodejs.org/) (com npm) e [PostgreSQL 15](https://www.postgresql.org/) em execução.

### Com Docker (recomendado)

```bash
git clone https://github.com/odavid062/book-register-.git
cd book-register-
docker compose up --build
```

| Serviço | URL |
|---|---|
| Frontend | http://localhost |
| Backend (API) | http://localhost:8080 |
| Swagger UI | http://localhost:8080/swagger-ui.html |
| PostgreSQL | localhost:5432 |

### Manualmente

**1. Banco de Dados:**
Certifique-se de que o PostgreSQL esteja em execução (porta 5432) com um banco de dados criado (padrão: `book_db`).

**2. Backend:**
```bash
cd book-backend/backend
# Linux / macOS:
./mvnw spring-boot:run
# Windows:
.\mvnw.cmd spring-boot:run
```
*Nota: Ao rodar fora do Docker, se o banco não estiver no host `db`, configure a variável `SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/book_db` (ou conforme sua instância).*

**3. Frontend:**
```bash
cd book-frontend/spa-book-register
npm install
npm start   # ou: ng serve
```
Acesse em http://localhost:4200

---

## Variáveis de Ambiente

O projeto suporta configuração via variáveis de ambiente para a inicialização dos contêineres e conexão com o banco de dados. Um modelo está disponível no arquivo [.env.example](file:///.env.example):

| Variável | Descrição | Padrão no Código |
|---|---|---|
| `DB_USER` | Usuário administrador do PostgreSQL | `admin` |
| `DB_PASSWORD` | Senha do PostgreSQL | `changeme` |
| `DB_NAME` | Nome da base de dados PostgreSQL | `book_db` |
| `SPRING_DATASOURCE_URL` | URL JDBC de conexão do backend | `jdbc:postgresql://db:5432/book_db` |
| `SPRING_DATASOURCE_USERNAME` | Usuário para conexão JDBC do Spring Boot | `admin` |
| `SPRING_DATASOURCE_PASSWORD` | Senha para conexão JDBC do Spring Boot | `changeme` |

Para customizar as credenciais com o Docker Compose, copie `.env.example` para `.env`:
```bash
cp .env.example .env
```

---

## Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/books` | Lista todos os livros |
| `POST` | `/api/books` | Cadastra novo livro |

### Exemplos

```bash
# Listar livros
curl http://localhost:8080/api/books

# Cadastrar livro
curl -X POST http://localhost:8080/api/books \
  -H "Content-Type: application/json" \
  -d '{"title": "Clean Code", "author": "Robert C. Martin", "publicationYear": 2008}'
```

---

## Estrutura do Projeto

```
book-register-/
├── .github/workflows/
│   └── ci.yml                          # Pipeline CI: build + testes Maven
├── book-backend/
│   ├── Dockerfile                      # Build multi-stage Maven + OpenJDK 17
│   └── backend/
│       ├── pom.xml                     # Configuração Maven e dependências (Spring Boot 3.4.4)
│       └── src/
│           ├── main/
│           │   ├── java/book/backend/
│           │   │   ├── controller/
│           │   │   │   └── BookController.java  # GET e POST /api/books
│           │   │   ├── model/
│           │   │   │   └── BookModel.java       # Entidade JPA (id, title, author, publicationYear)
│           │   │   ├── repository/
│           │   │   │   └── BookRepository.java  # Spring Data JPA
│           │   │   └── CorsConfig.java          # Configuração de CORS para o frontend
│           │   └── resources/
│           │       └── application.properties   # Configuração do datasource e JPA
│           └── test/
│               └── java/book/backend/
│                   └── BackendApplicationTests.java # Testes de contexto Spring Boot
├── book-frontend/spa-book-register/
│   ├── Dockerfile                      # Build multi-stage Node 18 + Nginx
│   ├── package.json                    # Dependências e scripts Angular 19
│   └── src/app/
│       ├── app.component.html           # Formulário + listagem de livros
│       ├── app.component.ts             # Lógica e integração com BookService
│       ├── book.service.ts              # HttpClient para /api/books
│       └── book.ts                      # Interface TypeScript Book
├── .env.example                        # Variáveis de ambiente de exemplo
├── docker-compose.yml                  # Configuração dos serviços Docker (db, backend, frontend)
└── README.md
```

---

## Testes

### Backend
Para rodar os testes automatizados do Spring Boot (JUnit 5):
```bash
cd book-backend/backend
# Linux / macOS:
./mvnw clean verify
# Windows:
.\mvnw.cmd clean verify
```

### Frontend
Para rodar os testes unitários da aplicação Angular com Karma:
```bash
cd book-frontend/spa-book-register
npm test
```

---

## CI/CD

O pipeline no GitHub Actions executa automaticamente a cada push ou pull request na branch `main`:

1. Checkout do código
2. Configura JDK 17 (Temurin)
3. Compila o backend e roda os testes com Maven (`./mvnw clean verify`)

---

## Autor

**David Rodrigues**
[![GitHub](https://img.shields.io/badge/GitHub-odavid062-181717?logo=github)](https://github.com/odavid062)

---

## Licença

[MIT](LICENSE)
