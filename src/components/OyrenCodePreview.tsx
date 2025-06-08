import React, { useEffect, useMemo, useState } from 'react';
import CodePreviewOverlay from './CodePreviewOverlay';
import RenderedCode from './RenderedCode';
import { withFiles } from '../utils/withFiles';
import PropTypes from "prop-types";

const baseScope = {
  import: {
    react: React,
    "prop-types": PropTypes,
  },
};

interface OyrenCodePreviewProps {
  codes: Record<string, string>;
  isCodeRendered: boolean;
  setIsCodeRendered: (isCodeRendered: boolean) => void;
  renderError: string | null;
  setRenderError: (error: string | null) => void;
  overlayText?: string;
}

export default function OyrenCodePreview({
  codes,
  isCodeRendered,
  setIsCodeRendered,
  renderError,
  setRenderError,
  overlayText = "Click to render code"
}: OyrenCodePreviewProps) {
  const [importsError, setImportsError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {'App.js': _, ...nonAppFilesRecord} = codes;

  const nonAppFiles = Object.entries(nonAppFilesRecord).reduce((acc, [fileName, content]) => {
    if (fileName !== 'App.js'
        && fileName !== 'App.jsx'
        && fileName !== 'App.ts'
        && fileName !== 'App.tsx'
        && fileName !== 'index.html'
        && fileName !== 'ignore.js') {
      acc[`./${fileName}`] = content;
    }
    return acc;
  }, {} as Record<string, string>);

  const scope = useMemo(() => {
    try {
      const scope = withFiles(baseScope, nonAppFiles);
      if (importsError) setImportsError(null);
      return scope;
    } catch (error: any) {
      setImportsError(
        `${error.filename ? `[${error.filename}] ` : ''}${error.toString()}`
      );
    }
  }, [codes, importsError]);

  const onRenderedHandler = (error: any) => {
    if (error) {
      setRenderError(error.toString());
    } else if (renderError) {
      setRenderError(null);
    }
    setIsLoading(false);
  };

  const styles = {
    container: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column' as const,
      backgroundColor: 'hsl(223 47% 11%)'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px',
      borderBottom: '1px solid hsl(216 34% 17%)',
      backgroundColor: 'hsla(0, 0%, 100%, 0.05)'
    },
    content: {
      flex: 1,
      overflow: 'hidden'
    },
    button: {
      background: 'transparent',
      border: 'none',
      color: 'hsl(215.4 16.3% 56.9%)',
      cursor: 'pointer',
      padding: '4px',
      borderRadius: '4px',
      fontSize: '16px',
      marginLeft: '4px'
    }
  };

  return (
    <div style={styles.container}>
      {/* Preview Header */}
      <div style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>👁️</span>
          <span style={{ 
            fontWeight: 500, 
            color: 'hsl(213 31% 91%)', 
            fontSize: '14px' 
          }}>
            Preview
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {isCodeRendered && (
            <button
              style={styles.button}
              onClick={() => setIsCodeRendered(false)}
              title="Stop preview"
            >
              ⏹️
            </button>
          )}
          <button
            style={styles.button}
            onClick={() => {
              setIsCodeRendered(false);
              setTimeout(() => setIsCodeRendered(true), 100);
            }}
            title="Refresh preview"
          >
            🔄
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div style={styles.content}>
        {isCodeRendered ? (
          <RenderedCode
            importsError={importsError}
            isLoading={isLoading}
            codes={codes}
            scope={scope!}
            onRenderedHandler={onRenderedHandler}
            renderError={renderError}
          />
        ) : (
          <CodePreviewOverlay
            onClick={() => setIsCodeRendered(true)}
            overlayText={overlayText}
          />
        )}
      </div>
    </div>
  );
} 