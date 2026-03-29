'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Card, CardHeader, CardBody } from '@/_components/Card';
import { Button } from '@/_components/Button';
import { Badge } from '@/_components/Badge';
import Link from 'next/link';
import { FiPlus, FiEdit2, FiTrash2, FiCode } from 'react-icons/fi';

export default function ComponentesPage() {
  const [componentes] = useState([
    {
      id: 1,
      nome: 'Button',
      versao: '1.0.0',
      status: 'Pronto',
      descricao: 'Componente de botão reutilizável',
    },
    {
      id: 2,
      nome: 'Card',
      versao: '1.0.0',
      status: 'Pronto',
      descricao: 'Componente de card para exibição de conteúdo',
    },
    {
      id: 3,
      nome: 'Form',
      versao: '0.9.0',
      status: 'Em Desenvolvimento',
      descricao: 'Componente de formulário com validação',
    },
    {
      id: 4,
      nome: 'Modal',
      versao: '1.0.0',
      status: 'Pronto',
      descricao: 'Componente de modal para diálogos',
    },
    {
      id: 5,
      nome: 'Table',
      versao: '0.8.0',
      status: 'Em Desenvolvimento',
      descricao: 'Componente de tabela com paginação',
    },
  ]);

  const getStatusVariant = (status: string) => {
    return status === 'Pronto' ? 'success' : 'warning';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Componentes</h1>
            <p className="text-gray-600 text-sm mt-1">Biblioteca de componentes reutilizáveis</p>
          </div>
          <Link href="/componentes/novo">
            <Button>
              <FiPlus /> Novo Componente
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {componentes.map((componente) => (
            <Card key={componente.id} hoverable>
              <CardHeader title={componente.nome} subtitle={`v${componente.versao}`} />
              <CardBody>
                <div className="flex items-center gap-2 mb-3">
                  <FiCode className="text-purple-600" />
                  <p className="text-gray-600 text-sm">{componente.descricao}</p>
                </div>
                <div className="mb-4">
                  <Badge variant={getStatusVariant(componente.status)}>
                    {componente.status}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="flex-1">
                    Ver Detalhes
                  </Button>
                  <Button variant="ghost" size="sm">
                    <FiEdit2 />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <FiTrash2 className="text-red-600" />
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
