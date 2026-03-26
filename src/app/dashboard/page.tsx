'use client';

import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Card, CardHeader, CardBody } from '@/_components/Card';
import { Button } from '@/_components/Button';
import { Badge } from '@/_components/Badge';
import Link from 'next/link';
import { FiPlus, FiFolder, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo!</h1>
          <p className="text-gray-600">Gerencie seus projetos e tarefas com eficiência</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card hoverable>
            <CardBody>
              <Link
                href="/projetos/novo"
                className="flex items-center gap-3 text-blue-600 hover:text-blue-700 font-medium"
              >
                <FiPlus className="text-2xl" />
                Novo Projeto
              </Link>
            </CardBody>
          </Card>
          <Card hoverable>
            <CardBody>
              <Link
                href="/issues/novo"
                className="flex items-center gap-3 text-blue-600 hover:text-blue-700 font-medium"
              >
                <FiCheckCircle className="text-2xl" />
                Nova Issue
              </Link>
            </CardBody>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardBody>
              <div className="text-3xl font-bold text-blue-600">5</div>
              <p className="text-gray-600 text-sm">Projetos Ativos</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="text-3xl font-bold text-yellow-600">12</div>
              <p className="text-gray-600 text-sm">Issues em Progresso</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="text-3xl font-bold text-green-600">34</div>
              <p className="text-gray-600 text-sm">Issues Concluídas</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="text-3xl font-bold text-red-600">3</div>
              <p className="text-gray-600 text-sm">Issues Atrasadas</p>
            </CardBody>
          </Card>
        </div>

        {/* Recent Projects */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Projetos Recentes</h2>
            <Link href="/projetos" className="text-blue-600 hover:text-blue-700 font-medium">
              Ver todos
            </Link>
          </div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <Card key={i} hoverable>
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">Projeto {i}</h3>
                      <p className="text-sm text-gray-600">PROJ-{i}</p>
                    </div>
                    <Badge variant="info">{i * 4} issues</Badge>
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
