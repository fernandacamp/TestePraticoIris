# 📝 Teste Prático – Desenvolvedor Front-End Angular
**Empresa:** Sistema IRIS

Este projeto foi desenvolvido como parte do processo seletivo para a vaga de **Desenvolvedor Front-End Angular**.
A aplicação permite gerenciar uma lista de usuários (CRUD completo) consumindo uma **API simulada via JSON Server**.

---

## 🚀 Tecnologias Utilizadas

- [Angular](https://angular.io/) 17+
- [JSON Server](https://github.com/typicode/json-server) (API Fake)
- [TypeScript](https://www.typescriptlang.org/)

---

## ⚙️ Funcionalidades

- Listagem de usuários em tabela (Nome, E-mail, Ações).
- Filtro de pesquisa por nome.
- Adição e edição de usuários com formulário reativo.
- Edição e exclusão diretamente pela tabela.
- Validações de formulário:
  - Nome obrigatório (mínimo 3 caracteres).
  - E-mail obrigatório e no formato válido.
  - Idade opcional (≥ 18 anos).
- Mensagens de erro em campos inválidos.
- Botão de envio desabilitado enquanto o formulário não é válido.

---

## 📂 Estrutura de Pastas

```
src/
├── app/
│   ├── services/
│   │   ├── snackbar/
│   │   └── users/
│   ├── shared/components/
│   │   ├── button/
│   │   ├── input/
│   │   ├── loader/
│   │   ├── modal/
│   │   ├── search-bar/
│   │   ├── snackbar/
│   │   ├── table/
│   │   └── tooltip/
│   ├── users/modais/
│   │   ├── confirm-delete-modal/
│   │   └── modal-user-create/
│   ├── users/pages/
│   │   └── user-list/
│   ├── app.component.ts / .html / .css
│   ├── app.config.ts / app.routes.ts
├── assets/images/
├── mock/db.json
├── styles/
├── custom-theme.scss
└── index.html
```

---

## ▶️ Como Rodar o Projeto

### Pré-requisitos
Antes de rodar a aplicação, certifique-se de ter instalados:

- **Node.js**  
- **Angular CLI 17**: `npm install -g @angular/cli@17`  
- **JSON Server**: `npm install -g json-server`

### Passo 1: Clonar o repositório

```bash
git clone https://github.com/fernandacamp/TestePraticoIris.git
cd nome-do-repositorio
```

### Passo 2: Instalar as dependências

```bash
npm install
```

### Passo 3: Instalar o JSON Server

```bash
npm install -g json-server
```

### Passo 4: Instalar o JSON Server

```bash
npm install -g json-server
```

### Passo 5: Instalar o Concurrently para rodas ambos simultaneamente

```bash
npm install concurrently
```

### Passo 6: Rodar a aplicação Angular

```bash
npm start
```
> A aplicação ficará disponível em `http://localhost:4200/`.
> O servidor será iniciado em `http://localhost:3000/usuarios`.

---

## 📖 Endpoints da API

- `GET /usuarios` → Lista todos os usuários  
- `POST /usuarios` → Cria um novo usuário  
- `PUT /usuarios/:id` → Atualiza um usuário existente  
- `DELETE /usuarios/:id` → Remove um usuário
---

## 👩🏻‍💻 Autora

**Fernanda Campolin**  
🔗 [LinkedIn](https://linkedin.com/in/fernandacampolin) | [GitHub](https://github.com/fernandacampolin)
