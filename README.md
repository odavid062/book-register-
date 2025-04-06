# 📚 Book Register

Aplicação fullstack para cadastro e gerenciamento de livros. Este projeto foi desenvolvido como prática de estudos utilizando as tecnologias Java com Spring Boot no backend e Angular no frontend. A aplicação está preparada para rodar com Docker e Docker Compose.

---

## 🧰 Tecnologias utilizadas

### Backend
- Java 17
- Spring Boot
- Maven
- Docker

### Frontend
- Angular
- TypeScript
- HTML/CSS
- Node.js / npm

### Outros
- Docker Compose

---

## 📁 Estrutura do Projeto

```bash
book-register/
├── book-backend/               # Projeto Spring Boot (API REST)
│   └── backend/
│       └── (código fonte)
│       └── Dockerfile
├── book-frontend/             # Aplicação Angular (SPA)
│   └── spa-book-register/
│       └── (código fonte)
├── docker-compose.yml         # Orquestração dos containers
├── LICENSE                     # Licença do projeto
├── README.md                   # Este arquivo
└── .gitignore
```

---

## 🚀 Como executar o projeto

### ✅ Pré-requisitos
- Docker e Docker Compose instalados

---

### 🐳 Usando Docker (recomendado)

Com o terminal aberto na raiz do projeto, execute:

```bash
docker-compose up --build
```

- Acesse o frontend em: http://localhost:4200
- A API estará rodando em: http://localhost:8080

---

### 🔨 Execução manual (modo desenvolvedor)

#### Backend

```bash
cd book-backend/backend
./mvnw spring-boot:run
```

#### Frontend

```bash
cd book-frontend/spa-book-register
npm install
ng serve
```

---

## 📝 Licença

Este projeto está licenciado sob os termos da [MIT License](LICENSE).

## 🤝 Contribuindo
Sinta-se à vontade para abrir issues ou enviar pull requests. Qualquer tipo de feedback ou contribuição é bem-vindo!

---

## ✨ Autor
**David Rodrigues  (odavid062)**  
📂 GitHub: [github.com/odavid062](https://github.com/odavid062)

> _"A sabedoria começa na dúvida."_ — Sócrates
