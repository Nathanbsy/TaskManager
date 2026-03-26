'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

interface NavItemProps {
  href: string;
  label: string;
  icon?: ReactNode;
}

export const NavItem = ({ href, label, icon }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
        isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
      )}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span>{label}</span>
    </Link>
  );
};

interface SidebarProps {
  children: ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-4 space-y-2">{children}</div>
    </aside>
  );
};

interface HeaderProps {
  children: ReactNode;
  title?: string;
}

export const Header = ({ children, title }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      {title && <h1 className="text-2xl font-bold text-gray-900">{title}</h1>}
      {children}
    </header>
  );
};

interface MainProps {
  children: ReactNode;
}

export const Main = ({ children }: MainProps) => {
  return <main className="flex-1 overflow-y-auto px-6 py-4">{children}</main>;
};

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {children}
    </div>
  );
};
