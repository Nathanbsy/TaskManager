# Estrutura do Frontend - TaskManager

## 📁 Estrutura de Pastas

```
src/
├── app/                              # App Router do Next.js
│   ├── autenticacao/                # Rotas de autenticação
│   │   ├── page.tsx                 # Página de login
│   │   └── registro/
│   │       └── page.tsx             # Página de registro
│   ├── dashboard/
│   │   └── page.tsx                 # Dashboard principal
│   ├── projetos/
│   │   ├── page.tsx                 # Lista de projetos
│   │   ├── [id]/
│   │   │   └── page.tsx             # Detalhes do projeto
│   │   └── novo/
│   │       └── page.tsx             # Criar novo projeto
│   ├── issues/
│   │   ├── page.tsx                 # Lista de issues
│   │   ├── [id]/
│   │   │   └── page.tsx             # Detalhes da issue
│   │   └── novo/
│   │       └── page.tsx             # Criar nova issue
│   ├── css/
│   │   └── globals.css              # Estilos globais
│   └── layout.tsx                   # Layout raiz
│
├── components/                       # Componentes reutilizáveis
│   ├── Button.tsx                   # Componente botão
│   ├── Card.tsx                     # Componente card
│   ├── Form.tsx                     # Componentes de formulário
│   ├── Badge.tsx                    # Componentes de badge/avatar/tag
│   └── Layout.tsx                   # Componentes de layout
│
├── layouts/                         # Layouts principais
│   └── DashboardLayout.tsx          # Layout do dashboard com sidebar
│
├── services/                        # Serviços de API
│   └── api.ts                       # Cliente Axios com endpoints
│
├── stores/                          # Stores de estado (Zustand)
│   ├── authStore.ts                 # Store de autenticação
│   └── projetoStore.ts              # Store de projetos
│
├── hooks/                           # Custom Hooks
│   └── useAuth.ts                   # Hook de autenticação
│
├── types/                           # Tipos TypeScript
│   └── index.ts                     # Tipos da aplicação
│
└── utils/                           # Utilitários
    └── formatters.ts                # Funções de formatação
```

## 🚀 Principais Funcionalidades

### 🔐 Autenticação
- Login com JWT
- Registro de novos usuários
- Refresh de token automático
- Proteção de rotas

### 📊 Dashboard
- Visão geral de projetos e issues
- Estatísticas rápidas
- Acesso rápido a funcionalidades principais

### 📁 Projetos
- CRUD completo de projetos
- Gestão de membros
- Configuração de status customizados
- Epics e Sprints

### 📋 Issues
- CRUD completo de issues
- Filtros avançados (status, prioridade, responsável)
- Atribuição de responsáveis
- Estimativas de tempo
- Histórico de atividades

### 🏷️ Labels e Componentes
- Criar e gerenciar etiquetas
- Criar e gerenciar componentes
- Associar a issues

### 💬 Comentários
- Adicionar comentários em issues
- Editar comentários próprios
- Deletar comentários (soft delete)

## 🛠️ Dependências Principais

- **Next.js 16+** - Framework React com SSR
- **React 19** - Biblioteca UI
- **Zustand** - State management
- **TanStack Query** - Data fetching e caching
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Estilos utilitários
- **react-icons** - Ícones

## 📝 Conventions

### Nomenclatura de Componentes
- Componentes em PascalCase: `Button.tsx`, `Card.tsx`
- Props interfaces sufixadas com `Props`: `ButtonProps`

### Nomenclatura de Páginas
- Rotas dinâmicas em `[brackets]`: `[id].tsx`
- Páginas especiais: `layout.tsx`, `error.tsx`, `loading.tsx`

### Tipos TypeScript
- Todos os tipos em `src/types/index.ts`
- Reutilizar tipos ao máximo
- Usar `interface` para tipos de objetos

### Stores Zustand
- Um store por feature/domínio
- Usar `set` para mutations
- Incluir lógica de persistência quando necessário

## 🎨 Sistema de Cores

- **Primary**: Blue (#3B82F6)
- **Secondary**: Gray (#F3F4F6)
- **Success**: Green (#10B981)
- **Danger**: Red (#EF4444)
- **Warning**: Yellow (#F59E0B)
- **Info**: Blue (#3B82F6)

## 🚦 Como Iniciar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Configure o `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse `http://localhost:3000` no navegador

## 📚 Estrutura de Requisições API

Todos os endpoints usam o padrão:

```
GET    /recurso              # Listar
GET    /recurso/:id          # Obter um
POST   /recurso              # Criar
PUT    /recurso/:id          # Atualizar
DELETE /recurso/:id          # Deletar
```

## 🔒 Autenticação

O token JWT é armazenado em cookies e enviado automaticamente em todas as requisições.

```typescript
const token = Cookie.get('token');
// Enviado em: Authorization: Bearer {token}
```

## 🎯 Próximos Passos

- [ ] Implementar paginação em listas
- [ ] Adicionar filtros avançados
- [ ] Implementar notificações
- [ ] Adicionar modo escuro
- [ ] Testes automatizados
