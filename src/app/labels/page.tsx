'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Card, CardHeader, CardBody } from '@/_components/Card';
import { Button } from '@/_components/Button';
import { Badge } from '@/_components/Badge';
import Link from 'next/link';
import { FiPlus, FiEdit2, FiTrash2, FiTag } from 'react-icons/fi';

export default function LabelsPage() {
  const [labels] = useState([
    {
      id: 1,
      nome: 'Bug',
      cor: '#FF6B6B',
      descricao: 'Problema ou erro a ser corrigido',
      issuesCount: 5,
    },
    {
      id: 2,
      nome: 'Feature',
      cor: '#4ECDC4',
      descricao: 'Nova funcionalidade a desenvolver',
      issuesCount: 8,
    },
    {
      id: 3,
      nome: 'Documentation',
      cor: '#45B7D1',
      descricao: 'Melhorias em documentação',
      issuesCount: 3,
    },
    {
      id: 4,
      nome: 'Enhancement',
      cor: '#95E1D3',
      descricao: 'Melhoria em funcionalidade existente',
      issuesCount: 4,
    },
    {
      id: 5,
      nome: 'High Priority',
      cor: '#F38181',
      descricao: 'Tarefas de alta prioridade',
      issuesCount: 6,
    },
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Labels</h1>
            <p className="text-gray-600 text-sm mt-1">Organize suas issues com tags</p>
          </div>
          <Link href="/labels/novo">
            <Button>
              <FiPlus /> Nova Label
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {labels.map((label) => (
            <Card key={label.id} hoverable>
              <CardBody>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-8 h-8 rounded-full border-2 border-gray-200"
                        style={{ backgroundColor: label.cor }}
                      />
                      <h3 className="font-semibold text-gray-900">{label.nome}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{label.descricao}</p>
                    <Badge variant="danger">{label.issuesCount} issues</Badge>
                  </div>
                  <div className="flex gap-2">
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
    </DashboardLayout>
  );
}
