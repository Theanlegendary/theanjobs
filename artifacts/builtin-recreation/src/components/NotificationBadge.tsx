import React from 'react';

interface NotificationBadgeProps {
  count: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'red' | 'blue' | 'green' | 'yellow';
  pulse?: boolean;
}

export function NotificationBadge({
  count,
  max = 99,
  size = 'md',
  color = 'red',
  pulse = false,
}: NotificationBadgeProps) {
  if (count <= 0) return null;

  const displayCount = count > max ? `${max}+` : count.toString();

  const sizeClasses = {
    sm: 'min-w-4 h-4 text-[10px] px-1',
    md: 'min-w-5 h-5 text-xs px-1.5',
    lg: 'min-w-6 h-6 text-sm px-2',
  };

  const colorClasses = {
    red: 'bg-red-500 text-white',
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white',
    yellow: 'bg-yellow-500 text-white',
  };

  return (
    <span className="relative inline-flex">
      <span
        className={`inline-flex items-center justify-center rounded-full font-bold ${sizeClasses[size]} ${colorClasses[color]}`}
      >
        {displayCount}
      </span>
      
      {pulse && (
        <span className="absolute inset-0 rounded-full animate-ping opacity-75 bg-red-400" />
      )}
    </span>
  );
}

export function DotBadge({ color = 'red', pulse = false }: { color?: string; pulse?: boolean }) {
  return (
    <span className="relative flex h-3 w-3">
      {pulse && (
        <span
          className={`absolute inline-flex h-full w-full rounded-full bg-${color}-400 opacity-75 animate-ping`}
        />
      )}
      <span className={`relative inline-flex rounded-full h-3 w-3 bg-${color}-500`} />
    </span>
  );
}
