'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Sidebar, Header, Main, Layout, NavItem } from '@/_components/Layout';
import { Button } from '@/_components/Button';
import { FiHome, FiFolder, FiCheckSquare, FiLogOut } from 'react-icons/fi';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.push('/autenticacao');
    }
  }, [auth.isAuthenticated, router]);

  const handleLogout = () => {
    auth.logout();
    router.push('/autenticacao');
  };

  if (!auth.isAuthenticated) {
    return null;
  }

  return (
    <Layout>
        
      <Sidebar>
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900">TaskManager</h2>
        </div>
        <nav className="space-y-2">
          <NavItem href="/dashboard" label="Dashboard" icon={<FiHome />} />
          <NavItem href="/projetos" label="Projetos" icon={<FiFolder />} />
          <NavItem href="/issues" label="Issues" icon={<FiCheckSquare />} />
        </nav>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="mb-4 p-3 bg-gray-100 rounded-lg">
            <p className="text-sm font-medium text-gray-900">{auth.usuario?.username}</p>
            <p className="text-xs text-gray-600">{auth.usuario?.email}</p>
          </div>
          <Button variant="danger" size="sm" className="w-full" onClick={handleLogout}>
            <FiLogOut /> Sair
          </Button>
        </div>
      </Sidebar>
      <div className="flex-1 flex flex-col">
        <Header children="teste" title="Dashboard" />
        <Main>{children}</Main>
      </div>
    </Layout>
  );
};
