'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Card, CardHeader, CardBody } from '@/_components/Card';
import { Button } from '@/_components/Button';
import { Select } from '@/_components/Form';
import { Badge } from '@/_components/Badge';
import { ModalIssue } from './_components/ModalIssue';
import Link from 'next/link';
import { FiPlus, FiFilter } from 'react-icons/fi';

export default function IssuesPage() {
  const [issues] = useState([
    {
      id: 1,
      chave: 'TM-001',
      titulo: 'Criar autenticação JWT',
      prioridade: 'Alta',
      status: 'Em Desenvolvimento',
      responsavel: 'João Silva',
    },
    {
      id: 2,
      chave: 'TM-002',
      titulo: 'Implementar dashboard',
      prioridade: 'Média',
      status: 'Em Análise',
      responsavel: 'Maria Silva',
    },
    {
      id: 3,
      chave: 'TM-003',
      titulo: 'Bug: Logout não funciona',
      prioridade: 'Crítica',
      status: 'Aberto',
      responsavel: 'Carlos Santos',
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIssueId, setSelectedIssueId] = useState<number | undefined>();

  const handleOpenModal = (issueId: number) => {
    setSelectedIssueId(issueId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedIssueId(undefined);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Issues</h1>
            <p className="text-gray-600 text-sm mt-1">Acompanhe todas as tarefas do projeto</p>
          </div>
          <Link href="/issues/novo">
            <Button>
              <FiPlus /> Nova Issue
            </Button>
          </Link>
        </div>

        <Card>
          <CardBody>
            <div className="flex gap-4 items-end">
              <Select
                label="Status"
                options={[
                  { value: 'aberto', label: 'Aberto' },
                  { value: 'em-analise', label: 'Em Análise' },
                  { value: 'em-desenvolvimento', label: 'Em Desenvolvimento' },
                  { value: 'concluido', label: 'Concluído' },
                ]}
              />
              <Select
                label="Prioridade"
                options={[
                  { value: 'baixa', label: 'Baixa' },
                  { value: 'media', label: 'Média' },
                  { value: 'alta', label: 'Alta' },
                  { value: 'critica', label: 'Crítica' },
                ]}
              />
              <Button variant="secondary">
                <FiFilter /> Filtrar
              </Button>
            </div>
          </CardBody>
        </Card>

        <div className="space-y-2">
          {issues.map((issue) => (
            <div key={issue.id} onClick={() => handleOpenModal(issue.id)}>
              <Card hoverable className="cursor-pointer">
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-mono text-gray-600">{issue.chave}</p>
                      <h3 className="font-semibold text-gray-900">{issue.titulo}</h3>
                      <p className="text-sm text-gray-600 mt-1">Responsável: {issue.responsavel}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Badge variant="warning">{issue.prioridade}</Badge>
                      <Badge variant="info">{issue.status}</Badge>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <ModalIssue isOpen={modalOpen} issueId={selectedIssueId} onClose={handleCloseModal} />
    </DashboardLayout>
  );
}
