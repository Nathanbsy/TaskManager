-- drop database dbTaskManager; --

create database dbTaskManager;
use dbTaskManager;

create table Empresa(
  Id int primary key auto_increment,
  NomeEmpresa varchar(80) not null,
  CNPJ varchar(20) not null,
  IdUsuario int not null,
  unique (CNPJ),
  unique (IdUsuario)
);

create table Usuario(
  Id int primary key auto_increment,
  Username varchar(40) not null,
  Email varchar(80) not null,
  Senha varchar(80) not null,
  Tipo enum('Colaborador', 'Empresa') not null default 'Colaborador',
  IdEmpresa int null
);

create table StatusTask(
  Id int primary key auto_increment,
  NomeStatus varchar(30) not null
);

create table Task(
  Id int primary key auto_increment,
  TituloTask varchar(75) not null,
  DescricaoTask varchar(255),
  DataCriacao datetime not null default current_timestamp,
  DataEntrega datetime,
  IdStatus int not null,
  IdEmpresa int,
  IdResponsavel int,
  IdCriador int
);

create table Comentario(
  Id int primary key auto_increment,
  Texto varchar(255) not null,
  DataComentario datetime not null default current_timestamp,
  IdUsuario int not null,
  IdTask int not null
);

-- FKs Usuario 
alter table Usuario
add constraint fk_usuario_empresa
foreign key (IdEmpresa) references Empresa(Id);

-- FKs Empresa
alter table Empresa
add constraint fk_empresa_usuario
foreign key (IdUsuario) references Usuario(Id);

-- FKs Task
alter table Task
add constraint fk_task_status
foreign key (IdStatus) references StatusTask(Id);

alter table Task
add constraint fk_task_empresa
foreign key (IdEmpresa) references Empresa(Id);

alter table Task
add constraint fk_task_responsavel
foreign key (IdResponsavel) references Usuario(Id);

alter table Task
add constraint fk_task_criador
foreign key (IdCriador) references Usuario(Id);

-- FKs Comentario
alter table Comentario
add constraint fk_comentario_usuario
foreign key (IdUsuario) references Usuario(Id);

alter table Comentario
add constraint fk_comentario_task
foreign key (IdTask) references Task(Id);

-- Inserindo os status basicos --
insert into StatusTask (NomeStatus) values ('Solicitado');
insert into StatusTask (NomeStatus) values ('Em análise');
insert into StatusTask (NomeStatus) values ('Analisado');
insert into StatusTask (NomeStatus) values ('Em desenvolvimento');
insert into StatusTask (NomeStatus) values ('Concluido');