import React, { useState, useRef, useCallback } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './ui/Resizable';
import OyrenCodeEditor from './OyrenCodeEditor';
import OyrenCodePreview from './OyrenCodePreview';

export interface OyrenReactRendererProps {
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

export function OyrenReactRenderer({
  codes: initialCodes,
  onCodeChange,
  height = '600px',
  showHeader = true,
  defaultLayout = 'horizontal',
  readOnly = false,
  theme = 'dark',
  fontSize = 14,
  className = ''
}: OyrenReactRendererProps) {
  const [codes, setCodes] = useState(initialCodes);
  const [selectedFile, setSelectedFile] = useState(Object.keys(initialCodes)[0] || '');
  const [isCodeRendered, setIsCodeRendered] = useState(false);
  const [renderError, setRenderError] = useState<string | null>(null);
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>(defaultLayout);
  
  const codesRef = useRef(codes);
  codesRef.current = codes;

  const handleCodeChange = useCallback((newCodes: Record<string, string>) => {
    setCodes(newCodes);
    onCodeChange?.(newCodes);
  }, [onCodeChange]);

  const contextValue = {
    codes,
    setCodes: handleCodeChange,
    selectedFile,
    setSelectedFile,
    isReadOnly: readOnly,
    renderError,
    setRenderError,
    codesStateRef: codesRef,
    fontSize,
    uuid: 'renderer-demo',
    loadingCodePage: false,
    updateCodePage: async () => {},
    authorUuid: '',
    unsavedChanges: [],
    setUnsavedChanges: () => {},
    setIsReadOnly: () => {},
    createCodeFile: (fileName: string) => {
      handleCodeChange({
        ...codes,
        [fileName]: ''
      });
    },
    deleteCodeFile: (fileName: string) => {
      const { [fileName]: _, ...rest } = codes;
      handleCodeChange(rest);
      if (selectedFile === fileName) {
        setSelectedFile(Object.keys(rest)[0] || '');
      }
    }
  };

  const toggleLayout = () => {
    setLayout(prev => prev === 'horizontal' ? 'vertical' : 'horizontal');
  };

  return (
    <div 
      className={`oyren-react-renderer ${className}`}
      style={{ 
        height,
        width: '100%',
        backgroundColor: 'hsl(223 47% 11%)',
        border: '1px solid hsl(216 34% 17%)',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {showHeader && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px',
          borderBottom: '1px solid hsl(216 34% 17%)',
          backgroundColor: 'hsla(0, 0%, 100%, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>⚡</span>
            <span style={{ 
              fontWeight: 500, 
              color: 'hsl(213 31% 91%)', 
              fontSize: '14px' 
            }}>
              React Renderer
            </span>
          </div>
          <button
            onClick={toggleLayout}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'hsl(215.4 16.3% 56.9%)',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              fontSize: '16px'
            }}
            title={`Switch to ${layout === 'horizontal' ? 'vertical' : 'horizontal'} layout`}
          >
            {layout === 'horizontal' ? '⚏' : '⚊'}
          </button>
        </div>
      )}

      <div style={{ flex: 1, minHeight: 0 }}>
        <ResizablePanelGroup
          direction={layout}
          style={{ height: '100%' }}
        >
          <ResizablePanel defaultSize={50} minSize={30}>
            <div style={{ height: '100%' }}>
              <OyrenCodeEditor 
                contextValue={contextValue}
                theme={theme}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={50} minSize={30}>
            <div style={{ height: '100%' }}>
              <OyrenCodePreview
                codes={codes}
                isCodeRendered={isCodeRendered}
                setIsCodeRendered={setIsCodeRendered}
                renderError={renderError}
                setRenderError={setRenderError}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
} 