export interface InfiniteScrollProps {
    data: Item[];
    isHorizontal?: boolean;
    onLoadMore?: () => Promise<void>;
    renderItem?: (item: Item, index: number) => React.ReactNode;
    leftButton?: string;
    rightButton?: string;
    leftButtonCSS?: React.CSSProperties;
    rightButtonCSS?: React.CSSProperties;
    height: number;
}

export interface Item {
    id: number;
    color?: string;
    backgroundImage?: string;
    backgroundVideo?: string;
    explainHtml?: React.ReactNode;
    explainCSS?: React.CSSProperties;
}