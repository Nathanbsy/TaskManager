-- drop database dbTaskManager; --

create database dbTaskManager;
use dbTaskManager;

-- ============================================
-- TABELAS BASE
-- ============================================

create table Usuario(
  Id int primary key auto_increment,
  Username varchar(40) not null unique,
  Email varchar(80) not null unique,
  Senha varchar(255) not null,
  NomeCompleto varchar(100),
  Avatar varchar(255),
  Ativo boolean default true,
  DataCriacao datetime default current_timestamp,
  UltimoLogin datetime,
  Tipo enum('Colaborador', 'Admin', 'Gerenciador') not null default 'Colaborador'
);

create table Empresa(
  Id int primary key auto_increment,
  NomeEmpresa varchar(80) not null,
  CNPJ varchar(20) not null unique,
  IdAdministrador int not null,
  DataCriacao datetime default current_timestamp,
  Ativo boolean default true
);

-- ============================================
-- PROJETOS
-- ============================================

create table Projeto(
  Id int primary key auto_increment,
  Nome varchar(80) not null,
  Chave varchar(10) not null unique,
  Descricao text,
  IdEmpresa int not null,
  IdLider int,
  DataCriacao datetime default current_timestamp,
  Ativo boolean default true
);

create table Membro(
  Id int primary key auto_increment,
  IdProjeto int not null,
  IdUsuario int not null,
  Papel enum('Desenvolvedor', 'Lider', 'Revisor', 'Observador') default 'Desenvolvedor',
  DataAdicao datetime default current_timestamp,
  unique key(IdProjeto, IdUsuario)
);

-- ============================================
-- TIPOS E CONFIGURAÇÕES
-- ============================================

create table TipoIssue(
  Id int primary key auto_increment,
  Nome varchar(30) not null unique,
  Icone varchar(50),
  Descricao varchar(255)
);

create table Prioridade(
  Id int primary key auto_increment,
  Nome varchar(30) not null unique,
  Nivel int not null,
  Cor varchar(7),
  Descricao varchar(255)
);

create table Status(
  Id int primary key auto_increment,
  IdProjeto int,
  Nome varchar(30) not null,
  Categoria enum('TODO', 'IN_PROGRESS', 'DONE') default 'TODO',
  Ordem int,
  Cor varchar(7),
  unique key(IdProjeto, Nome)
);

-- ============================================
-- EPICS E SPRINTS
-- ============================================

create table Epic(
  Id int primary key auto_increment,
  IdProjeto int not null,
  Nome varchar(100) not null,
  Descricao text,
  IdResponsavel int,
  DataInicio date,
  DataFim date,
  Status enum('Planejado', 'Em Progresso', 'Concluído', 'Cancelado') default 'Planejado',
  DataCriacao datetime default current_timestamp
);

create table Sprint(
  Id int primary key auto_increment,
  IdProjeto int not null,
  Nome varchar(100) not null,
  Descricao text,
  DataInicio date,
  DataFim date,
  Status enum('Planejamento', 'Ativo', 'Concluído', 'Cancelado') default 'Planejamento',
  Objetivo text,
  DataCriacao datetime default current_timestamp
);

-- ============================================
-- ISSUES (TAREFAS)
-- ============================================

create table Issue(
  Id int primary key auto_increment,
  IdProjeto int not null,
  Chave varchar(20) not null unique,
  Titulo varchar(100) not null,
  Descricao text,
  IdTipoIssue int not null,
  IdPrioridade int not null,
  IdStatus int not null,
  IdCriador int not null,
  IdResponsavel int,
  IdEpic int,
  IdSprint int,
  EstimativaHoras decimal(5,2),
  TempoGastoHoras decimal(5,2) default 0,
  DataCriacao datetime default current_timestamp,
  DataAtualizacao datetime default current_timestamp on update current_timestamp,
  DataVencimento date,
  Visualizacoes int default 0
);

-- ============================================
-- COMPONENTESE ETIQUETAS
-- ============================================

create table Componente(
  Id int primary key auto_increment,
  IdProjeto int not null,
  Nome varchar(50) not null,
  Descricao text,
  IdLider int,
  unique key(IdProjeto, Nome)
);

create table IssueComponente(
  Id int primary key auto_increment,
  IdIssue int not null,
  IdComponente int not null,
  unique key(IdIssue, IdComponente)
);

create table Label(
  Id int primary key auto_increment,
  IdProjeto int,
  Nome varchar(30) not null,
  Cor varchar(7),
  unique key(IdProjeto, Nome)
);

create table IssueLabel(
  Id int primary key auto_increment,
  IdIssue int not null,
  IdLabel int not null,
  unique key(IdIssue, IdLabel)
);

-- ============================================
-- COMENTÁRIOS E ANEXOS
-- ============================================

create table Comentario(
  Id int primary key auto_increment,
  IdIssue int not null,
  IdUsuario int not null,
  Texto text not null,
  DataCriacao datetime default current_timestamp,
  DataAtualizacao datetime,
  Deletado boolean default false
);

create table Anexo(
  Id int primary key auto_increment,
  IdIssue int not null,
  IdUsuario int not null,
  NomeArquivo varchar(255) not null,
  CaminhoArquivo varchar(500) not null,
  TamanhoBytes int,
  TipoMime varchar(100),
  DataUpload datetime default current_timestamp
);

-- ============================================
-- RASTREAMENTO DE TEMPO
-- ============================================

create table RegistroTempo(
  Id int primary key auto_increment,
  IdIssue int not null,
  IdUsuario int not null,
  HorasGastadas decimal(5,2) not null,
  Descricao text,
  DataRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
  DataCriacao datetime default current_timestamp
);

-- ============================================
-- LOG DE ATIVIDADES
-- ============================================

create table Atividade(
  Id int primary key auto_increment,
  IdIssue int not null,
  IdUsuario int not null,
  Acao varchar(50) not null,
  CampoAlterado varchar(50),
  ValorAnterior varchar(500),
  ValorNovo varchar(500),
  DataAtividade datetime default current_timestamp
);

-- ============================================
-- CAMPOS PERSONALIZADOS
-- ============================================

create table CampoPersonalizado(
  Id int primary key auto_increment,
  IdProjeto int not null,
  Nome varchar(50) not null,
  Tipo enum('Texto', 'Número', 'Data', 'Seleção', 'Booleano') default 'Texto',
  Obrigatorio boolean default false,
  Ordem int,
  Ativo boolean default true,
  unique key(IdProjeto, Nome)
);

create table ValorCampoPersonalizado(
  Id int primary key auto_increment,
  IdCampo int not null,
  IdIssue int not null,
  Valor text,
  unique key(IdCampo, IdIssue)
);

-- ============================================
-- FOREIGN KEYS - USUARIOS
-- ============================================

alter table Empresa
add constraint fk_empresa_admin
foreign key (IdAdministrador) references Usuario(Id);

alter table Projeto
add constraint fk_projeto_empresa
foreign key (IdEmpresa) references Empresa(Id);

alter table Projeto
add constraint fk_projeto_lider
foreign key (IdLider) references Usuario(Id);

-- ============================================
-- FOREIGN KEYS - MEMBROS
-- ============================================

alter table Membro
add constraint fk_membro_projeto
foreign key (IdProjeto) references Projeto(Id) on delete cascade;

alter table Membro
add constraint fk_membro_usuario
foreign key (IdUsuario) references Usuario(Id) on delete cascade;

-- ============================================
-- FOREIGN KEYS - EPICS
-- ============================================

alter table Epic
add constraint fk_epic_projeto
foreign key (IdProjeto) references Projeto(Id) on delete cascade;

alter table Epic
add constraint fk_epic_responsavel
foreign key (IdResponsavel) references Usuario(Id);

-- ============================================
-- FOREIGN KEYS - SPRINTS
-- ============================================

alter table Sprint
add constraint fk_sprint_projeto
foreign key (IdProjeto) references Projeto(Id) on delete cascade;

-- ============================================
-- FOREIGN KEYS - STATUS
-- ============================================

alter table Status
add constraint fk_status_projeto
foreign key (IdProjeto) references Projeto(Id) on delete cascade;

-- ============================================
-- FOREIGN KEYS - ISSUES
-- ============================================

alter table Issue
add constraint fk_issue_projeto
foreign key (IdProjeto) references Projeto(Id) on delete cascade;

alter table Issue
add constraint fk_issue_tipo
foreign key (IdTipoIssue) references TipoIssue(Id);

alter table Issue
add constraint fk_issue_prioridade
foreign key (IdPrioridade) references Prioridade(Id);

alter table Issue
add constraint fk_issue_status
foreign key (IdStatus) references Status(Id);

alter table Issue
add constraint fk_issue_criador
foreign key (IdCriador) references Usuario(Id);

alter table Issue
add constraint fk_issue_responsavel
foreign key (IdResponsavel) references Usuario(Id);

alter table Issue
add constraint fk_issue_epic
foreign key (IdEpic) references Epic(Id) on delete set null;

alter table Issue
add constraint fk_issue_sprint
foreign key (IdSprint) references Sprint(Id) on delete set null;

-- ============================================
-- FOREIGN KEYS - COMPONENTES E ETIQUETAS
-- ============================================

alter table Componente
add constraint fk_componente_projeto
foreign key (IdProjeto) references Projeto(Id) on delete cascade;

alter table Componente
add constraint fk_componente_lider
foreign key (IdLider) references Usuario(Id);

alter table IssueComponente
add constraint fk_issue_componente_issue
foreign key (IdIssue) references Issue(Id) on delete cascade;

alter table IssueComponente
add constraint fk_issue_componente_componente
foreign key (IdComponente) references Componente(Id) on delete cascade;

alter table Label
add constraint fk_label_projeto
foreign key (IdProjeto) references Projeto(Id) on delete cascade;

alter table IssueLabel
add constraint fk_issue_label_issue
foreign key (IdIssue) references Issue(Id) on delete cascade;

alter table IssueLabel
add constraint fk_issue_label_label
foreign key (IdLabel) references Label(Id) on delete cascade;

-- ============================================
-- FOREIGN KEYS - COMENTÁRIOS E ANEXOS
-- ============================================

alter table Comentario
add constraint fk_comentario_issue
foreign key (IdIssue) references Issue(Id) on delete cascade;

alter table Comentario
add constraint fk_comentario_usuario
foreign key (IdUsuario) references Usuario(Id);

alter table Anexo
add constraint fk_anexo_issue
foreign key (IdIssue) references Issue(Id) on delete cascade;

alter table Anexo
add constraint fk_anexo_usuario
foreign key (IdUsuario) references Usuario(Id);

-- ============================================
-- FOREIGN KEYS - TEMPO E ATIVIDADES
-- ============================================

alter table RegistroTempo
add constraint fk_tempo_issue
foreign key (IdIssue) references Issue(Id) on delete cascade;

alter table RegistroTempo
add constraint fk_tempo_usuario
foreign key (IdUsuario) references Usuario(Id);

alter table Atividade
add constraint fk_atividade_issue
foreign key (IdIssue) references Issue(Id) on delete cascade;

alter table Atividade
add constraint fk_atividade_usuario
foreign key (IdUsuario) references Usuario(Id);

-- ============================================
-- FOREIGN KEYS - CAMPOS PERSONALIZADOS
-- ============================================

alter table CampoPersonalizado
add constraint fk_campo_projeto
foreign key (IdProjeto) references Projeto(Id) on delete cascade;

alter table ValorCampoPersonalizado
add constraint fk_valor_campo
foreign key (IdCampo) references CampoPersonalizado(Id) on delete cascade;

alter table ValorCampoPersonalizado
add constraint fk_valor_issue
foreign key (IdIssue) references Issue(Id) on delete cascade;

-- ============================================
-- DADOS INICIAIS
-- ============================================

-- Tipos de Issue
insert into TipoIssue (Nome, Icone, Descricao) values 
('Task', '📋', 'Uma tarefa de trabalho'),
('Bug', '🐛', 'Um erro ou problema'),
('Story', '📖', 'Uma história de usuário'),
('Epic', '🎯', 'Uma grande funcionalidade'),
('Subtask', '↳', 'Uma subtarefa');

-- Prioridades
insert into Prioridade (Nome, Nivel, Cor, Descricao) values 
('Trivial', 1, '#9AADBA', 'Insignificante'),
('Baixa', 2, '#4A90E2', 'Pode esperar'),
('Média', 3, '#F5A623', 'Normal, sem urgência'),
('Alta', 4, '#E84C3D', 'Importante, deve ser feito em breve'),
('Crítica', 5, '#D0021B', 'Bloqueador, máxima prioridade');

-- Status padrão
insert into Status (Nome, Categoria, Ordem, Cor) values 
('Aberto', 'TODO', 1, '#4A90E2'),
('Em Análise', 'IN_PROGRESS', 2, '#F5A623'),
('Em Desenvolvimento', 'IN_PROGRESS', 3, '#9013FE'),
('Em Teste', 'IN_PROGRESS', 4, '#7ED321'),
('Concluído', 'DONE', 5, '#50E3C2'),
('Cancelado', 'DONE', 6, '#B8E986');

SELECT * FROM Usuario;
SELECT * FROM Membro;
SELECT * FROM Empresa;
SELECT * FROM Atividade;
SELECT * FROM Anexo;