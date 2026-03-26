import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Providers } from './providers';
import './css/globals.css';

export const metadata: Metadata = {
  title: 'TaskManager - Gerenciador de Projetos',
  description: 'Plataforma moderna para gerenciamento de projetos e tarefas',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
