'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody } from '@/_components/Card';
import { Input } from '@/_components/Form';
import { Button } from '@/_components/Button';
import { useAuth } from '@/hooks/useAuth';
import { authService } from '@/services/api';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(email, senha);
      const { usuario, token, refreshToken } = response.data;
      
      login(usuario, token, refreshToken);
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Erro de login:', err);
      setError(err.response?.data?.error || 'Erro ao fazer login. Verifique suas credenciais.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader title="Bem-vindo" subtitle="Faça login na sua conta" />
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-medium">
                ⚠️ {error}
              </div>
            )}

            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              autoComplete="email"
              required
            />

            <Input
              label="Senha"
              type="password"
              placeholder="Sua senha"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
              required
            />

            <Button 
              type="submit" 
              loading={loading} 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-4">
            Não tem conta?{' '}
            <Link href="/autenticacao/registro" className="text-blue-600 hover:text-blue-700 font-medium">
              Registre-se
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}