'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody } from '@/_components/Card';
import { Input } from '@/_components/Form';
import { Button } from '@/_components/Button';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/api';
import Link from 'next/link';

export default function RegistroPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [ user, setUser ] = useState({
    username: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function escrever(evento: any) {
    setUser((prev) => ({
      ...prev,
      [evento.target.name]: evento.target.value,
    }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (user.senha !== user.confirmarSenha) {
      setError('As senhas não coincidem');
      return;
    }

    setLoading(true);

    try {
      const response = await authService.register(user.username, user.email, user.senha);
      const { usuario, token, refreshToken } = response.data;
      
      login(usuario, token, refreshToken);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader title="Criar Conta" subtitle="Registre-se para começar" />
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <Input
              label="Nome de usuário"
              type="text"
              placeholder="seu_usuario"
              name="username"
              onChange={escrever}
              required
            />

            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              name="email"
              onChange={escrever}
              required
            />

            <Input
              label="Senha"
              type="password"
              placeholder="Mínimo 6 caracteres"
              name="senha"
              onChange={escrever}
              required
            />

            <Input
              label="Confirmar Senha"
              type="password"
              placeholder="Confirme sua senha"
              name="confirmarSenha"
              onChange={escrever}
              required
            />

            <Button type="submit" loading={loading} className="w-full">
              Registrar
            </Button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-4">
            Já tem conta?{' '}
            <Link href="/autenticacao" className="text-blue-600 hover:text-blue-700 font-medium">
              Faça login
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
