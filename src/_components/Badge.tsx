'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info';
  className?: string;
}

export const Badge = ({ children, variant = 'default', className }: BadgeProps) => {
  const variants = {
    default: 'bg-gray-200 text-gray-800',
    success: 'bg-green-200 text-green-800',
    danger: 'bg-red-200 text-red-800',
    warning: 'bg-yellow-200 text-yellow-800',
    info: 'bg-blue-200 text-blue-800',
  };

  return (
    <span className={clsx('inline-block px-3 py-1 rounded-full text-sm font-medium', variants[variant], className)}>
      {children}
    </span>
  );
};

interface AvatarProps {
  name?: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar = ({ name, src, size = 'md' }: AvatarProps) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  if (src) {
    return <img src={src} alt={name} className={clsx('rounded-full', sizes[size])} />;
  }

  const initials = name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || '?';

  return (
    <div className={clsx('rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold', sizes[size])}>
      {initials}
    </div>
  );
};

interface TagProps {
  label: string;
  color?: string;
  onRemove?: () => void;
}

export const Tag = ({ label, color = '#999', onRemove }: TagProps) => {
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium text-white"
      style={{ backgroundColor: color }}
    >
      {label}
      {onRemove && (
        <button onClick={onRemove} className="hover:opacity-80">
          ✕
        </button>
      )}
    </span>
  );
};
