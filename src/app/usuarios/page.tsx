'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Card, CardHeader, CardBody } from '@/_components/Card';
import { Button } from '@/_components/Button';
import { Badge } from '@/_components/Badge';
import Link from 'next/link';
import { FiPlus, FiEdit2, FiTrash2, FiUser } from 'react-icons/fi';

export default function UsuariosPage() {
  const [usuarios] = useState([
    {
      id: 1,
      nome: 'João Silva',
      email: 'joao@example.com',
      cargo: 'Desenvolvedor',
      status: 'Ativo',
      projetos: 3,
    },
    {
      id: 2,
      nome: 'Maria Santos',
      email: 'maria@example.com',
      cargo: 'Project Manager',
      status: 'Ativo',
      projetos: 5,
    },
    {
      id: 3,
      nome: 'Carlos Costa',
      email: 'carlos@example.com',
      cargo: 'Designer',
      status: 'Ativo',
      projetos: 2,
    },
    {
      id: 4,
      nome: 'Ana Silva',
      email: 'ana@example.com',
      cargo: 'QA',
      status: 'Ativo',
      projetos: 4,
    },
    {
      id: 5,
      nome: 'Pedro Oliveira',
      email: 'pedro@example.com',
      cargo: 'Desenvolvedor',
      status: 'Inativo',
      projetos: 1,
    },
  ]);

  const getStatusVariant = (status: string) => {
    return status === 'Ativo' ? 'success' : 'danger';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Usuários</h1>
            <p className="text-gray-600 text-sm mt-1">Gerencie os usuários da plataforma</p>
          </div>
          <Link href="/usuarios/novo">
            <Button>
              <FiPlus /> Novo Usuário
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <div className="space-y-3">
            {usuarios.map((usuario) => (
              <Card key={usuario.id} hoverable>
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <FiUser className="text-blue-600 text-xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{usuario.nome}</h3>
                        <p className="text-gray-600 text-sm">{usuario.email}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge variant="default">{usuario.cargo}</Badge>
                          <Badge variant={getStatusVariant(usuario.status)}>
                            {usuario.status}
                          </Badge>
                          <span className="text-xs text-gray-500">{usuario.projetos} projetos</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/usuarios/${usuario.id}`}>
                        <Button variant="secondary" size="sm">
                          Ver Detalhes
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm">
                        <FiEdit2 />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FiTrash2 className="text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
