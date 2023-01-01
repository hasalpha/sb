import { ReactNode } from 'react';

export interface INoteProps {
  styles?: React.CSSProperties;
  children?: ReactNode;
}

export interface INoteItemProps {
  id?: string;
  key?: string;
  children: ReactNode;
}
