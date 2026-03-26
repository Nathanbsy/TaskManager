// Autenticação
export interface Usuario {
  id: number;
  username: string;
  email: string;
  nomeCompleto?: string;
  avatar?: string;
  tipo: 'Colaborador' | 'Admin' | 'Gerenciador';
  ativo: boolean;
  dataCriacao: string;
}

export interface LoginResponse {
  message: string;
  usuario: Usuario;
  token: string;
  refreshToken: string;
}

// Empresa
export interface Empresa {
  Id: number;
  NomeEmpresa: string;
  CNPJ: string;
  IdAdministrador: number;
  DataCriacao: string;
  Ativo: boolean;
  AdministradorName: string;
}

// Projeto
export interface Projeto {
  Id: number;
  Nome: string;
  Chave: string;
  Descricao?: string;
  IdEmpresa: number;
  IdLider?: number;
  DataCriacao: string;
  Ativo: boolean;
  LiderNome?: string;
  NomeEmpresa?: string;
}

export interface Membro {
  Id: number;
  IdProjeto: number;
  IdUsuario: number;
  Papel: 'Desenvolvedor' | 'Lider' | 'Revisor' | 'Observador';
  DataAdicao: string;
  Username: string;
  Email: string;
}

// Issues
export interface TipoIssue {
  Id: number;
  Nome: string;
  Icone: string;
  Descricao?: string;
}

export interface Prioridade {
  Id: number;
  Nome: string;
  Nivel: number;
  Cor: string;
}

export interface Status {
  Id: number;
  IdProjeto?: number;
  Nome: string;
  Categoria: 'TODO' | 'IN_PROGRESS' | 'DONE';
  Ordem: number;
  Cor: string;
}

export interface Issue {
  Id: number;
  IdProjeto: number;
  Chave: string;
  Titulo: string;
  Descricao?: string;
  IdTipoIssue: number;
  IdPrioridade: number;
  IdStatus: number;
  IdCriador: number;
  IdResponsavel?: number;
  IdEpic?: number;
  IdSprint?: number;
  EstimativaHoras?: number;
  TempoGastoHoras: number;
  DataCriacao: string;
  DataAtualizacao: string;
  DataVencimento?: string;
  Visualizacoes: number;
  TipoName: string;
  PrioridadeName: string;
  StatusName: string;
  CriadorName: string;
  ResponsavelName?: string;
}

// Epic
export interface Epic {
  Id: number;
  IdProjeto: number;
  Nome: string;
  Descricao?: string;
  IdResponsavel?: number;
  DataInicio?: string;
  DataFim?: string;
  Status: 'Planejado' | 'Em Progresso' | 'Concluído' | 'Cancelado';
  DataCriacao: string;
  ResponsavelName?: string;
  TotalIssues: number;
}

// Sprint
export interface Sprint {
  Id: number;
  IdProjeto: number;
  Nome: string;
  Descricao?: string;
  DataInicio: string;
  DataFim: string;
  Status: 'Planejamento' | 'Ativo' | 'Concluído' | 'Cancelado';
  Objetivo?: string;
  DataCriacao: string;
  TotalIssues: number;
  TotalHoras?: number;
}

// Label
export interface Label {
  Id: number;
  IdProjeto?: number;
  Nome: string;
  Cor: string;
}

// Componente
export interface Componente {
  Id: number;
  IdProjeto: number;
  Nome: string;
  Descricao?: string;
  IdLider?: number;
  LiderName?: string;
  TotalIssues: number;
}

// Comentário
export interface Comentario {
  Id: number;
  IdIssue: number;
  IdUsuario: number;
  Texto: string;
  DataCriacao: string;
  DataAtualizacao?: string;
  Deletado: boolean;
  Username: string;
  Avatar?: string;
}

// Respostas genéricas
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}
