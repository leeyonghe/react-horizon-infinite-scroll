import React from 'react';
import InfiniteScroll from './InfiniteScroll';

export interface InfiniteScrollProps {
  children: React.ReactNode;
  onLoadMore: () => Promise<void>;
  hasMore: boolean;
  loader?: React.ReactNode;
  threshold?: number;
  scrollContainer?: 'window' | 'parent';
  className?: string;
  style?: React.CSSProperties;
  direction?: 'horizontal' | 'vertical';
}

export default InfiniteScroll; 