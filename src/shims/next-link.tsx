import React from 'react';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  target?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Link({
  href,
  target,
  className,
  children,
  ...props
}: LinkProps) {
  return (
    <a href={href} target={target} className={className} {...props}>
      {children}
    </a>
  );
}
