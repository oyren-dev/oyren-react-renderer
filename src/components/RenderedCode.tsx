import React from 'react';
import { Runner } from 'react-runner';

interface RenderedCodeProps {
  codes: Record<string, string>;
  scope: any;
  onRenderedHandler: (error: any) => void;
  importsError: string | null;
  isLoading: boolean;
  renderError: string | null;
}

export default function RenderedCode({
  codes,
  scope,
  onRenderedHandler,
  importsError,
  isLoading,
  renderError
}: RenderedCodeProps) {
  // Get the main App component code
  const appCode = codes['App.tsx'] || codes['App.ts'] || codes['App.jsx'] || codes['App.js'] || '';

  const styles = {
    container: {
      height: '100%',
      width: '100%'
    },
    errorContainer: {
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    },
    errorContent: {
      textAlign: 'center' as const,
      maxWidth: '400px'
    },
    errorIcon: {
      fontSize: '48px',
      marginBottom: '16px'
    },
    errorTitle: {
      fontSize: '18px',
      fontWeight: 600,
      color: 'hsl(213 31% 91%)',
      marginBottom: '8px'
    },
    errorMessage: {
      fontSize: '14px',
      color: '#ef4444',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      padding: '16px',
      borderRadius: '8px',
      border: '1px solid rgba(239, 68, 68, 0.2)',
      fontFamily: 'monospace',
      whiteSpace: 'pre-wrap' as const,
      textAlign: 'left' as const
    },
    loadingContainer: {
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    loadingContent: {
      textAlign: 'center' as const
    },
    spinner: {
      width: '32px',
      height: '32px',
      border: '4px solid hsl(216 34% 17%)',
      borderTop: '4px solid hsl(217 91% 60%)',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 16px'
    },
    previewWrapper: {
      height: '100%',
      overflow: 'auto'
    }
  };

  if (importsError) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorContent}>
          <div style={styles.errorIcon}>🐛</div>
          <h3 style={styles.errorTitle}>Import Error</h3>
          <div style={styles.errorMessage}>
            {importsError}
          </div>
        </div>
      </div>
    );
  }

  if (renderError) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorContent}>
          <div style={styles.errorIcon}>⚠️</div>
          <h3 style={styles.errorTitle}>Runtime Error</h3>
          <div style={styles.errorMessage}>
            {renderError}
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingContent}>
          <div style={styles.spinner}></div>
          <p style={{ color: 'hsl(215.4 16.3% 56.9%)' }}>Rendering code...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={styles.previewWrapper}>
        {scope && appCode && (
          <Runner
            code={appCode}
            scope={scope}
            onRendered={onRenderedHandler}
          />
        )}
      </div>
    </div>
  );
} 