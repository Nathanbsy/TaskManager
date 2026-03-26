'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card = ({ children, className, hoverable = false }: CardProps) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg border border-gray-200 p-4',
        hoverable && 'hover:shadow-lg transition-shadow cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const CardHeader = ({ title, subtitle, className }: CardHeaderProps) => {
  return (
    <div className={clsx('mb-4 border-b border-gray-100 pb-4', className)}>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
    </div>
  );
};

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export const CardBody = ({ children, className }: CardBodyProps) => {
  return <div className={clsx('space-y-3', className)}>{children}</div>;
};
