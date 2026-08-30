import React from 'react';
import * as SiIcons from 'react-icons/si';
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';
import * as HiIcons from 'react-icons/hi2';

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ name, className = '', size }) => {
  if (name.startsWith('Si') && name in SiIcons) {
    const Icon = (SiIcons as any)[name];
    return <Icon className={className} size={size} />;
  }

  if (name.startsWith('Fa') && name in FaIcons) {
    const Icon = (FaIcons as any)[name];
    return <Icon className={className} size={size} />;
  }

  if (name.startsWith('Fi') && name in FiIcons) {
    const Icon = (FiIcons as any)[name];
    return <Icon className={className} size={size} />;
  }

  if (name.startsWith('Hi') && name in HiIcons) {
    const Icon = (HiIcons as any)[name];
    return <Icon className={className} size={size} />;
  }

  return <FiIcons.FiTerminal className={className} size={size} />;
};
