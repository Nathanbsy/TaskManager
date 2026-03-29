'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Card, CardHeader, CardBody } from '@/_components/Card';
import { Button } from '@/_components/Button';
import { Badge } from '@/_components/Badge';
import Link from 'next/link';
import { FiPlus, FiEdit2, FiTrash2, FiCheckCircle } from 'react-icons/fi';

export default function StatusPage() {
  const [statuses] = useState([
    {
      id: 1,
      nome: 'Aberto',
      cor: '#FF6B6B',
      descricao: 'Issue recém criada, pendente de análise',
      issuesCount: 12,
      ordem: 1,
    },
    {
      id: 2,
      nome: 'Em Análise',
      cor: '#FFD93D',
      descricao: 'Issue em análise pela equipe',
      issuesCount: 8,
      ordem: 2,
    },
    {
      id: 3,
      nome: 'Em Desenvolvimento',
      cor: '#6BCB77',
      descricao: 'Issue em desenvolvimento',
      issuesCount: 15,
      ordem: 3,
    },
    {
      id: 4,
      nome: 'Em Teste',
      cor: '#4D96FF',
      descricao: 'Issue aguardando testes',
      issuesCount: 6,
      ordem: 4,
    },
    {
      id: 5,
      nome: 'Resolvido',
      cor: '#A8E6CF',
      descricao: 'Issue foi resolvida',
      issuesCount: 45,
      ordem: 5,
    },
    {
      id: 6,
      nome: 'Fechado',
      cor: '#666666',
      descricao: 'Issue foi fechada',
      issuesCount: 23,
      ordem: 6,
    },
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Status</h1>
            <p className="text-gray-600 text-sm mt-1">Configure os status das issues</p>
          </div>
          <Link href="/status/novo">
            <Button>
              <FiPlus /> Novo Status
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {statuses.map((status) => (
            <Card key={status.id} hoverable>
              <CardBody>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: status.cor }}
                    />
                    <h3 className="font-semibold text-gray-900">{status.nome}</h3>
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded"># {status.ordem}</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{status.descricao}</p>
                <div className="mb-4">
                  <Badge variant="default">{status.issuesCount} issues</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="flex-1">
                    Ver Issues
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

        <Card>
          <CardHeader title="Dica" />
          <CardBody>
            <p className="text-gray-600 text-sm">
              A ordem dos status determina o fluxo padrão de uma issue. Organize-os de acordo com seu processo de desenvolvimento.
            </p>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}
