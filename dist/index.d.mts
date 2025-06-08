import * as react_jsx_runtime from 'react/jsx-runtime';

interface OyrenReactRendererProps {
    codes: Record<string, string>;
    onCodeChange?: (codes: Record<string, string>) => void;
    height?: string | number;
    showHeader?: boolean;
    defaultLayout?: 'horizontal' | 'vertical';
    readOnly?: boolean;
    theme?: 'light' | 'dark';
    fontSize?: number;
    className?: string;
}
declare function OyrenReactRenderer({ codes: initialCodes, onCodeChange, height, showHeader, defaultLayout, readOnly, theme, fontSize, className }: OyrenReactRendererProps): react_jsx_runtime.JSX.Element;

export { OyrenReactRenderer, type OyrenReactRendererProps };
