'use client';

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card, CardHeader, CardBody } from "@/_components/Card";
import { Badge } from "@/_components/Badge";
import { Button } from "@/_components/Button";
import Link from "next/link";
import { FiArrowLeft, FiEdit2, FiMessageSquare, FiClock, FiUser } from "react-icons/fi";

export default function IssueDetalhePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '1';

  const [issue] = useState<any>({
    id: id,
    chave: "TM-001",
    titulo: "Criar autenticação JWT",
    descricao: "Implementar um sistema de autenticação seguro utilizando JWT tokens. Deve incluir refresh tokens e validação de claims.",
    tipoName: "Feature",
    statusName: "Em Desenvolvimento",
    criadorName: "João Silva",
    criadorEmail: "joao@example.com",
    responsavelName: "Maria Santos",
    responsavelEmail: "maria@example.com",
    prioridade: "Alta",
    estimativaHoras: 24,
    tempoGastoHoras: 12,
    dataCriacao: "2024-03-20",
    dataAtualizacao: "2024-03-26",
    dataVencimento: "2024-04-05",
    labels: ["Backend", "Autenticação", "Segurança"],
  });

  const [comentarios] = useState<any[]>([
    {
      id: 1,
      author: "João Silva",
      email: "joao@example.com",
      conteudo: "Iniciando desenvolvimento da autenticação JWT. Vou usar a biblioteca jsonwebtoken do Node.js",
      data: "2024-03-25 10:30",
    },
    {
      id: 2,
      author: "Maria Santos",
      email: "maria@example.com",
      conteudo: "Aprovado! Por favor, respeite os padrões de segurança definidos no documento. Não esqueça de validar as claims e implementar refresh tokens.",
      data: "2024-03-25 11:15",
    },
    {
      id: 3,
      author: "João Silva",
      email: "joao@example.com",
      conteudo: "Pronto! Implementei a autenticação com suporte a refresh tokens e validação de claims. Favor revisar o PR #123",
      data: "2024-03-26 16:45",
    },
  ]);

  const [novoComentario, setNovoComentario] = useState("");

  const handleAdicionarComentario = () => {
    if (novoComentario.trim()) {
      setNovoComentario("");
      // Aqui você faria a requisição para a API
      console.log("Comentário adicionado:", novoComentario);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/issues">
            <Button variant="ghost">
              <FiArrowLeft /> Voltar
            </Button>
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{issue.chave}</h1>
              <Badge variant="default">{issue.tipoName}</Badge>
            </div>
            <p className="text-gray-600">{issue.titulo}</p>
          </div>
          <Button variant="primary">
            <FiEdit2 /> Editar
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader title="Descrição" />
              <CardBody>
                <p className="text-gray-700 leading-relaxed">{issue.descricao}</p>
              </CardBody>
            </Card>

            {/* Comentários */}
            <Card>
              <CardHeader title={`Comentários (${comentarios.length})`} />
              <CardBody>
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {comentarios.map((comentario) => (
                    <div key={comentario.id} className="border-l-4 border-blue-300 bg-gray-50 p-4 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">{comentario.author}</p>
                          <p className="text-gray-500 text-xs">{comentario.email}</p>
                        </div>
                        <p className="text-gray-500 text-xs">{comentario.data}</p>
                      </div>
                      <p className="text-gray-700">{comentario.conteudo}</p>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="border-t border-gray-200 pt-4">
                  <textarea
                    value={novoComentario}
                    onChange={(e) => setNovoComentario(e.target.value)}
                    placeholder="Adicione um comentário..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                  />
                  <div className="flex gap-2 mt-3">
                    <Button onClick={handleAdicionarComentario} className="flex-1">
                      <FiMessageSquare /> Comentar
                    </Button>
                    <Button variant="secondary">Cancelar</Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Status */}
            <Card>
              <CardHeader title="Status" />
              <CardBody>
                <Badge variant="success" className="block text-center py-2">
                  {issue.statusName}
                </Badge>
              </CardBody>
            </Card>

            {/* Prioridade */}
            <Card>
              <CardHeader title="Prioridade" />
              <CardBody>
                <Badge variant="warning" className="block text-center py-2">
                  {issue.prioridade}
                </Badge>
              </CardBody>
            </Card>

            {/* Responsável */}
            <Card>
              <CardHeader title="Responsável" />
              <CardBody>
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900">{issue.responsavelName}</p>
                  <p className="text-gray-600 text-sm">{issue.responsavelEmail}</p>
                </div>
              </CardBody>
            </Card>

            {/* Criador */}
            <Card>
              <CardHeader title="Criador" />
              <CardBody>
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900">{issue.criadorName}</p>
                  <p className="text-gray-600 text-sm">{issue.criadorEmail}</p>
                </div>
              </CardBody>
            </Card>

            {/* Tempo */}
            <Card>
              <CardHeader title="Tempo" />
              <CardBody>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FiClock className="text-blue-600" />
                    <div>
                      <p className="text-gray-600 text-sm">Estimativa</p>
                      <p className="font-semibold text-gray-900">{issue.estimativaHoras}h</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock className="text-green-600" />
                    <div>
                      <p className="text-gray-600 text-sm">Tempo Gasto</p>
                      <p className="font-semibold text-gray-900">{issue.tempoGastoHoras}h</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Labels */}
            <Card>
              <CardHeader title="Labels" />
              <CardBody>
                <div className="flex flex-wrap gap-2">
                  {issue.labels.map((label: string) => (
                    <Badge key={label} variant="default">
                      {label}
                    </Badge>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Datas */}
            <Card>
              <CardHeader title="Datas" />
              <CardBody>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600">Criada em</p>
                    <p className="font-medium text-gray-900">{issue.dataCriacao}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Atualizada em</p>
                    <p className="font-medium text-gray-900">{issue.dataAtualizacao}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Vence em</p>
                    <p className="font-medium text-gray-900">{issue.dataVencimento}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}