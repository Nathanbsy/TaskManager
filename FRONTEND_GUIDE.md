# 📖 Guia de Uso - Frontend TaskManager

## 🔐 Autenticação

### Usar o hook de autenticação
```typescript
import { useAuth } from '@/hooks/useAuth';

export default function MyComponent() {
  const auth = useAuth();
  
  return (
    <div>
      {auth.isAuthenticated ? (
        <p>Bem-vindo, {auth.usuario?.username}</p>
      ) : (
        <p>Não autenticado</p>
      )}
    </div>
  );
}
```

## 🧩 Componentes

### Button
```typescript
import { Button } from '@/components/Button';

<Button variant="primary" size="md" onClick={() => console.log('Clicado')}>
  Clique aqui
</Button>

// Variantes: primary, secondary, danger, ghost
// Tamanhos: sm, md, lg
```

### Card
```typescript
import { Card, CardHeader, CardBody } from '@/components/Card';

<Card hoverable>
  <CardHeader title="Título" subtitle="Subtítulo" />
  <CardBody>Conteúdo do card</CardBody>
</Card>
```

### Formulários
```typescript
import { Input, Textarea, Select } from '@/components/Form';

<Input 
  label="Email" 
  type="email" 
  error={erro}
  helperText="Seu email pessoal"
/>

<Textarea 
  label="Descrição" 
  rows={5}
/>

<Select
  label="Status"
  options={[
    { value: 'aberto', label: 'Aberto' },
    { value: 'fechado', label: 'Fechado' }
  ]}
/>
```

### Badge e Avatar
```typescript
import { Badge, Avatar, Tag } from '@/components/Badge';

<Badge variant="success">Ativo</Badge>
<Avatar name="João Silva" />
<Tag label="Bug" color="#FF0000" onRemove={() => {}} />
```

### Layout
```typescript
import { Sidebar, Header, Main, Layout, NavItem } from '@/components/Layout';

<Layout>
  <Sidebar>
    <NavItem href="/dashboard" label="Dashboard" />
  </Sidebar>
  <div className="flex-1 flex flex-col">
    <Header title="Minha Página" />
    <Main>Conteúdo</Main>
  </div>
</Layout>
```

## 🔌 Serviços de API

### Autenticação
```typescript
import { authService } from '@/services/api';

// Login
const response = await authService.login('email@test.com', 'senha123');

// Registro
const response = await authService.register('user', 'email@test.com', 'senha123');

// Obter usuário atual
const response = await authService.getCurrentUser();
```

### Projetos
```typescript
import { projetoService } from '@/services/api';

// Criar projeto
await projetoService.create({
  nome: 'Novo Projeto',
  chave: 'NP',
  descricao: 'Descrição',
  idEmpresa: 1
});

// Listar projetos
const projetos = await projetoService.getByEmpresa(idEmpresa);

// Detalhes
const projeto = await projetoService.getById(id);

// Atualizar
await projetoService.update(id, { nome: 'Novo nome' });

// Deletar
await projetoService.delete(id);

// Adicionar membro
await projetoService.addMembro(idProjeto, {
  idUsuario: 1,
  papel: 'Desenvolvedor'
});

// Listar membros
const membros = await projetoService.getMembros(idProjeto);
```

### Issues
```typescript
import { issueService } from '@/services/api';

// Criar issue
await issueService.create(idProjeto, {
  titulo: 'Nova issue',
  descricao: 'Descrição',
  idTipoIssue: 1,
  idPrioridade: 3,
  idStatus: 1
});

// Listar com filtros
const issues = await issueService.getByProjeto(idProjeto, {
  idStatus: 1,
  idResponsavel: 5
});

// Detalhes (incrementa visualizações)
const issue = await issueService.getById(id);

// Atualizar
await issueService.update(id, {
  titulo: 'Novo título',
  idStatus: 2
});

// Deletar
await issueService.delete(id);
```

### Comentários
```typescript
import { comentarioService } from '@/services/api';

// Criar
await comentarioService.create(idIssue, 'Texto do comentário');

// Listar
const comentarios = await comentarioService.getByIssue(idIssue);

// Atualizar próprio comentário
await comentarioService.update(id, 'Novo texto');

// Deletar (soft delete)
await comentarioService.delete(id);
```

### Labels
```typescript
import { labelService } from '@/services/api';

// Criar label
await labelService.create(idProjeto, {
  nome: 'Bug',
  cor: '#FF0000'
});

// Listar
const labels = await labelService.getByProjeto(idProjeto);

// Adicionar a issue
await labelService.addToIssue(idIssue, idLabel);

// Remover de issue
await labelService.removeFromIssue(idIssue, idLabel);
```

## 🎯 Stores (Zustand)

### Auth Store
```typescript
import { useAuthStore } from '@/stores/authStore';

const auth = useAuthStore();

// Propriedades
auth.usuario         // Usuário logado
auth.token          // JWT token
auth.isAuthenticated // Boolean

// Métodos
auth.login(usuario, token, refreshToken);
auth.logout();
auth.setUsuario(usuario);
auth.setToken(token);
```

### Projeto Store
```typescript
import { useProjetoStore } from '@/stores/projetoStore';

const projeto = useProjetoStore();

// Propriedades
projeto.projetoAtual  // Projeto selecionado
projeto.filtros       // Filtros aplicados

// Métodos
projeto.setProjetoAtual(projeto);
projeto.setFiltros({ search: 'texto' });
projeto.resetFiltros();
```

## 📅 Utilitários

### Formatadores
```typescript
import { getInitials, formatDate, formatDateTime, getColorByPriority, getCategoryColor } from '@/utils/formatters';

getInitials('João Silva');           // 'JS'
formatDate('2024-01-01');            // '01/01/2024'
formatDateTime('2024-01-01');        // '01/01/2024 12:30'
getColorByPriority(5);               // '#D0021B'
getCategoryColor('IN_PROGRESS');     // '#F5A623'
```

## 💡 Padrões de Componentes

### Loading State
```typescript
const [loading, setLoading] = useState(false);

<Button loading={loading}>Salvar</Button>
```

### Tratamento de Erros
```typescript
const [error, setError] = useState('');

{error && (
  <div className="p-4 bg-red-50 border border-red-200 rounded text-red-600">
    {error}
  </div>
)}
```

### Proteção de Rotas
```typescript
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function ProtectedPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    router.push('/autenticacao');
    return null;
  }

  return <div>Conteúdo protegido</div>;
}
```

## 🔄 Data Fetching com TanStack Query

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { issueService } from '@/services/api';

// GET com cache automático
const { data, isLoading, error } = useQuery({
  queryKey: ['issues', projetoId],
  queryFn: () => issueService.getByProjeto(projetoId)
});

// POST/PUT/DELETE
const mutation = useMutation({
  mutationFn: (data) => issueService.create(projetoId, data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['issues'] });
  }
});

mutation.mutate({ titulo: 'Nova issue' });
```

## 📱 Responsividade

Use classes Tailwind:
```typescript
// Grid responsivo
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Displays
<div className="hidden md:block">Visível apenas em md e acima</div>

// Padding responsivo
<div className="p-4 md:p-6 lg:p-8">
```

## 🎨 Tema e Cores

Cores disponíveis no Tailwind:
- `blue-*` - Principal
- `gray-*` - Neutro
- `red-*` - Erro/Perigo
- `green-*` - Sucesso
- `yellow-*` - Aviso
- `purple-*` - Secundário

## ❓ Troubleshooting

### Token expirado
O interceptor de axios automaticamente redireciona para login se receber 401.

### Query não atualiza
Invalide a query:
```typescript
queryClient.invalidateQueries({ queryKey: ['issues'] });
```

### Componente não renderiza
Certifique-se de adicionar `'use client'` no topo do arquivo.

---

Para mais informações, consulte [FRONTEND_STRUCTURE.md](./FRONTEND_STRUCTURE.md)
