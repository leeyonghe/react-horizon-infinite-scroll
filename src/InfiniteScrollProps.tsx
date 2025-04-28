export interface InfiniteScrollProps {
    data: Item[];
    isHorizontal?: boolean;
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