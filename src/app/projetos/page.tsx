'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Card, CardHeader, CardBody } from '@/_components/Card';
import { Button } from '@/_components/Button';
import { Badge } from '@/_components/Badge';
import Link from 'next/link';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function ProjetosPage() {
  const [projetos] = useState([
    { id: 1, nome: 'TaskManager', chave: 'TM', descricao: 'Gerenciador de tarefas', ativo: true },
    { id: 2, nome: 'WebApp', chave: 'WA', descricao: 'Aplicação web principal', ativo: true },
    { id: 3, nome: 'Mobile', chave: 'MB', descricao: 'Aplicativo mobile', ativo: true },
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projetos</h1>
            <p className="text-gray-600 text-sm mt-1">Gerencie e organize seus projetos</p>
          </div>
          <Link href="/projetos/novo">
            <Button>
              <FiPlus /> Novo Projeto
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projetos.map((projeto) => (
            <Card key={projeto.id} hoverable>
              <CardHeader title={projeto.nome} subtitle={projeto.chave} />
              <CardBody>
                <p className="text-gray-600 text-sm">{projeto.descricao}</p>
                <div className="flex items-center gap-2 mt-4">
                  <Badge variant={projeto.ativo ? 'success' : 'danger'}>
                    {projeto.ativo ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
                <div className="flex gap-2 mt-4">
                  <Link href={`/projetos/${projeto.id}`} className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full">
                      Ver Detalhes
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm">
                    <FiEdit2 />
                  </Button>
                  <Button variant="danger" size="sm">
                    <FiTrash2 />
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
