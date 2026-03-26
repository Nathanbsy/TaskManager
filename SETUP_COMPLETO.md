# 🚀 Setup Completo - TaskManager

## 📋 O que foi implementado

### Backend (Express + MySQL)
✅ Autenticação JWT com bcryptjs
✅ CRUD de Usuários
✅ CRUD de Empresas  
✅ CRUD de Projetos com Membros
✅ CRUD de Issues (subtituindo Tasks)
✅ Epics e Sprints
✅ Labels e Componentes
✅ Comentários com soft delete
✅ Status customizáveis por projeto
✅ Middleware de autenticação

### Frontend (Next.js 16 + React 19)
✅ Estrutura profissional de pastas
✅ Sistema de autenticação completo
✅ Gerenciamento de estado com Zustand
✅ Componentes reutilizáveis (Button, Card, Form, Badge)
✅ Layouts com Sidebar e Dashboard
✅ Página de Login e Registro
✅ Dashboard com estatísticas
✅ Listagem de Projetos
✅ Listagem de Issues com filtros
✅ Cliente API com interceptadores
✅ Tipos TypeScript completos

## 🔧 Setup Inicial

### 1️⃣ Preparar Banco de Dados

```bash
# Acesse o MySQL
mysql -u root -p

# Execute o script
source dbTaskManager.sql
```

### 2️⃣ Iniciar Backend

```bash
cd backend

# Certifique-se de ter configurado db/db.js com suas credenciais
node index.js

# Ou com nodemon (desenvolvimento)
npx nodemon backend/index.js
```

Backend rodando em: `http://localhost:8080`

### 3️⃣ Iniciar Frontend

```bash
# Instalar dependências (já feito)
npm install

# Arquivo .env.local já configurado
# NEXT_PUBLIC_API_URL=http://localhost:8080

# Iniciar servidor de desenvolvimento
npm run dev
```

Frontend rodando em: `http://localhost:3000`

## 📡 Testando a Aplicação

### 1. Registrar um novo usuário

1. Acesse `http://localhost:3000/autenticacao/registro`
2. Preencha os dados:
   - Nome de usuário
   - Email
   - Senha (mín. 6 caracteres)
3. Clique em "Registrar"
4. Será redirecionado para o dashboard

### 2. Fazer login

1. Acesse `http://localhost:3000/autenticacao`
2. Preencha email e senha
3. Clique em "Entrar"

### 3. Criar um projeto

1. Clique em "Projetos" na sidebar
2. Clique em "Novo Projeto"
3. Preencha:
   - Nome
   - Chave (ex: TM para TaskManager)
   - Descrição (opcional)
4. Salve

### 4. Criar uma issue

1. Clique em "Issues" na sidebar
2. Clique em "Nova Issue"
3. Preencha os dados
4. Salve

## 📁 Estrutura da Base de Dados

```
Usuario (Autenticação e perfil)
├── Empresa (Organização)
│   └── Projeto (Alinha com empresa)
│       ├── Membro (Usuários no projeto)
│       ├── Issue (Tarefas/Bugs/Stories)
│       │   ├── Comentario
│       │   ├── IssueLabel
│       │   ├── IssueComponente
│       │   ├── RegistroTempo
│       │   └── Atividade
│       ├── Epic (Grande funcionalidade)
│       ├── Sprint (Iteração)
│       ├── Status (Customizável)
│       ├── Label (Etiqueta)
│       └── Componente (Módulo)
```

## 🔐 Endpoints Principais

### Autenticação
```
POST   /auth/register      - Registrar novo usuário
POST   /auth/login         - Fazer login
POST   /auth/refresh-token - Renovar token
GET    /auth/me           - Usuário atual (requer token)
```

### Projetos
```
POST   /projetos                    - Criar projeto
GET    /empresas/:id/projetos      - Listar por empresa
GET    /projetos/:id               - Obter detalhes
PUT    /projetos/:id               - Atualizar
DELETE /projetos/:id               - Deletar
```

### Issues
```
POST   /projetos/:id/issues        - Criar issue
GET    /projetos/:id/issues        - Listar com filtros
GET    /issues/:id                 - Obter detalhes
PUT    /issues/:id                 - Atualizar
DELETE /issues/:id                 - Deletar
```

### Comentários
```
POST   /issues/:id/comentarios     - Criar
GET    /issues/:id/comentarios     - Listar
PUT    /comentarios/:id            - Editar próprio
DELETE /comentarios/:id            - Deletar próprio
```

## 🛡️ Segurança

- Senhas são hash com bcryptjs (10 salt rounds)
- JWTs expiram em 24h
- Refresh tokens expiram em 7d
- Cookies HttpOnly (em produção)
- Validação de entrada em todas as rotas
- Proteção contra SQL Injection via prepared statements

## 📚 Documentações

- [Backend Structure](./BACKEND_STRUCTURE.md) - Estrutura do backend
- [Frontend Structure](./FRONTEND_STRUCTURE.md) - Estrutura do frontend
- [Frontend Guide](./FRONTEND_GUIDE.md) - Guia de uso dos componentes
- [Database Schema](./dbTaskManager.sql) - Schema completo

## 🐛 Troubleshooting

### Erro de conexão Backend/Frontend
- Verifique se o backend está rodando em `localhost:8080`
- Verifique se `NEXT_PUBLIC_API_URL` está correto em `.env.local`

### Erro de autenticação
- Limpe os cookies do navegador
- Verifique se o JWT_SECRET está configurado
- Verifique logs de erro no console do Terminal

### Erro no banco de dados
- Verifique credenciais do MySQL em `backend/db/db.js`
- Verifique se a database `dbTaskManager` foi criada
- Execute novamente: `mysql -u root -p < dbTaskManager.sql`

## 🚢 Deploy

### Frontend (Vercel)
```bash
npm run build
vercel deploy
```

### Backend (Heroku, Railway, etc)
```bash
git push heroku main
```

Certifique-se de configurar as variáveis de ambiente:
- `JWT_SECRET` - Chave secreta para JWT
- `DATABASE_URL` - URL da base de dados (se na nuvem)
- `NODE_ENV` - production

## 📊 Fluxo de Autenticação

1. Usuário faz login
2. Backend valida e retorna JWT + RefreshToken
3. Frontend armazena em cookies
4. Cookie é enviado automaticamente em cada request
5. Middleware verifica token
6. Se expirado, faz refresh automático
7. Se inválido, redireciona para login

## 🔄 Próximas Funcionalidades (Roadmap)

- [ ] Notificações em tempo real (WebSocket)
- [ ] Relatórios e analytics
- [ ] Integrações externas (GitHub, GitLab)
- [ ] API GraphQL
- [ ] Móvel app (React Native)
- [ ] Automações de workflow
- [ ] Gestor de permissões completo
- [ ] Testes automatizados

## 📞 Suporte

- Backend Port: `8080`
- Frontend Port: `3000`
- Database: `MySQL 5.7+`

Qualquer dúvida, consulte os READMEs específicos ou os comentários no código.

---

**Boa sorte com seu projeto TaskManager! 🚀**
