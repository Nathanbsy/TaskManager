'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody } from "@/_components/Card";
import { Badge } from "@/_components/Badge";
import { Button } from "@/_components/Button";
import Link from "next/link";
import { FiX, FiExternalLink, FiMessageSquare } from "react-icons/fi";

interface ModalIssueProps {
  isOpen: boolean;
  issueId?: number;
  onClose: () => void;
}

export function ModalIssue({ isOpen, issueId, onClose }: ModalIssueProps) {
  const [issue, setIssue] = useState<any>(null);
  const [comentarios, setComentarios] = useState<any[]>([
    {
      id: 1,
      author: "João Silva",
      conteudo: "Iniciando desenvolvimento",
      data: "2024-03-25 10:30",
    },
    {
      id: 2,
      author: "Maria Santos",
      conteudo: "Aprovado! Favor seguir padrões",
      data: "2024-03-25 11:15",
    },
  ]);

  useEffect(() => {
    if (isOpen && issueId) {
      // Aqui você faria a chamada para a API
      setIssue({
        id: issueId,
        chave: "TM-001",
        titulo: "Criar autenticação JWT",
        descricao: "Implementar sistema de autenticação com JWT tokens",
        tipoName: "Feature",
        statusName: "Em Desenvolvimento",
        criadorName: "João Silva",
        responsavelName: "Maria Santos",
        prioridade: "Alta",
        estimativaHoras: 24,
        tempoGastoHoras: 12,
        dataCriacao: "2024-03-20",
      });
    }
  }, [isOpen, issueId]);

  if (!isOpen || !issue) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{issue.chave}</h2>
              <Badge variant="default">{issue.tipoName}</Badge>
            </div>
            <p className="text-gray-600">{issue.titulo}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX className="text-2xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 text-sm font-medium">Status</p>
              <Badge variant="success">{issue.statusName}</Badge>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">Prioridade</p>
              <Badge variant="warning">{issue.prioridade}</Badge>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">Responsável</p>
              <p className="text-gray-900 font-medium">{issue.responsavelName}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">Criador</p>
              <p className="text-gray-900 font-medium">{issue.criadorName}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">Estimativa</p>
              <p className="text-gray-900 font-medium">{issue.estimativaHoras}h</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium">Tempo Gasto</p>
              <p className="text-gray-900 font-medium">{issue.tempoGastoHoras}h</p>
            </div>
          </div>

          {/* Descrição */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Descrição</h3>
            <p className="text-gray-700">{issue.descricao}</p>
          </div>

          {/* Comentários Preview */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FiMessageSquare /> Comentários ({comentarios.length})
            </h3>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {comentarios.map((comentario) => (
                <div key={comentario.id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-gray-900 text-sm">{comentario.author}</p>
                    <p className="text-gray-500 text-xs">{comentario.data}</p>
                  </div>
                  <p className="text-gray-700 text-sm">{comentario.conteudo}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200">
          <Link href={`/issues/detalhes?id=${issue.id}`} className="flex-1">
            <Button variant="primary" className="w-full">
              <FiExternalLink /> Ver Detalhes Completos
            </Button>
          </Link>
          <Button variant="secondary" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
}
