import React, { useState, useRef, useCallback } from 'react';
import { Editor } from '@monaco-editor/react';
import CodeFiles from './CodeFiles';
import { useMonacoEditorActions } from '../hooks/useMonacoEditorActions';

interface OyrenCodeEditorProps {
  contextValue: any;
  theme?: 'light' | 'dark';
}

export default function OyrenCodeEditor({ contextValue, theme = 'dark' }: OyrenCodeEditorProps) {
  const [showFileManager, setShowFileManager] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [isResizing, setIsResizing] = useState(false);

  const {
    editorConfig,
    handleEditorWillMount,
    handleEditorDidMount,
    handleEditorChange,
    handleBlur
  } = useMonacoEditorActions(contextValue);

  const selectedFileContent = contextValue.codes[contextValue.selectedFile] || '';

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const startX = e.clientX;
    const startWidth = sidebarWidth;
    
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      const diff = e.clientX - startX;
      const newWidth = Math.max(200, Math.min(600, startWidth + diff));
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      setIsResizing(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    setIsResizing(true);
  }, [sidebarWidth]);

  const styles = {
    container: {
      height: '100%',
      display: 'flex',
      backgroundColor: 'hsl(223 47% 11%)',
      borderRight: '1px solid hsl(216 34% 17%)',
      overflow: 'hidden'
    },
    sidebar: {
      width: `${sidebarWidth}px`,
      minWidth: '200px',
      maxWidth: '600px',
      borderRight: '1px solid hsl(216 34% 17%)',
      backgroundColor: 'hsla(223, 47%, 11%, 0.5)',
      display: 'flex',
      flexDirection: 'column' as const,
      position: 'relative' as const
    },
    sidebarHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px',
      borderBottom: '1px solid hsl(216 34% 17%)'
    },
    sidebarContent: {
      flex: 1,
      overflowY: 'auto' as const,
      padding: '8px'
    },
    resizeHandle: {
      position: 'absolute' as const,
      top: 0,
      right: '-1px',
      width: '8px',
      height: '100%',
      cursor: 'col-resize',
      zIndex: 10,
      backgroundColor: isResizing ? 'rgba(147, 51, 234, 0.3)' : 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    resizeIndicator: {
      width: '2px',
      height: '48px',
      backgroundColor: isResizing ? 'hsl(217 91% 60%)' : 'hsl(216 34% 17%)',
      borderRadius: '1px',
      transition: 'background-color 0.2s'
    },
    editorArea: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column' as const
    },
    editorHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px',
      borderBottom: '1px solid hsl(216 34% 17%)',
      backgroundColor: 'hsla(0, 0%, 100%, 0.05)'
    },
    editorWrapper: {
      flex: 1
    },
    button: {
      background: 'transparent',
      border: 'none',
      color: 'hsl(215.4 16.3% 56.9%)',
      cursor: 'pointer',
      padding: '4px',
      borderRadius: '4px',
      fontSize: '16px'
    }
  };

  return (
    <div style={styles.container}>
      {/* File Manager Sidebar */}
      {showFileManager && (
        <div style={styles.sidebar}>
          {/* File Manager Header */}
          <div style={styles.sidebarHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px' }}>📁</span>
              <span style={{ 
                fontWeight: 500, 
                color: 'hsl(213 31% 91%)', 
                fontSize: '14px' 
              }}>
                Files
              </span>
            </div>
            <button
              style={styles.button}
              onClick={() => setShowFileManager(false)}
              title="Hide file manager"
            >
              ⚏
            </button>
          </div>
          
          {/* File Manager Content */}
          <div style={styles.sidebarContent}>
            <CodeFiles contextValue={contextValue} />
          </div>
          
          {/* Resize Handle */}
          <div 
            style={styles.resizeHandle}
            onMouseDown={handleMouseDown}
            title="Drag to resize file manager"
          >
            <div style={styles.resizeIndicator} />
          </div>
        </div>
      )}

      {/* Main Editor Area */}
      <div style={styles.editorArea}>
        {/* Editor Header */}
        <div style={styles.editorHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {!showFileManager && (
              <button
                style={styles.button}
                onClick={() => setShowFileManager(true)}
                title="Show file manager"
              >
                ⚏
              </button>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px' }}>📄</span>
              <span style={{ 
                fontSize: '14px', 
                fontWeight: 500, 
                color: 'hsl(213 31% 91%)' 
              }}>
                {contextValue.selectedFile}
              </span>
            </div>
          </div>
          
          <div style={{ fontSize: '12px', color: 'hsl(215.4 16.3% 56.9%)' }}>
            TypeScript
          </div>
        </div>

        {/* Editor */}
        <div style={styles.editorWrapper} onBlur={handleBlur} tabIndex={-1}>
          <Editor
            options={{
              ...editorConfig,
              padding: { top: 16, bottom: 16 },
              lineNumbers: 'on',
              minimap: { enabled: true },
              scrollBeyondLastLine: false,
              lineHeight: Math.round(editorConfig.fontSize! * 1.5),
            }}
            theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
            loading={<div style={{ 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'hsl(215.4 16.3% 56.9%)'
            }}>Loading editor...</div>}
            language="typescript"
            beforeMount={handleEditorWillMount}
            onMount={handleEditorDidMount}
            width="100%"
            height="100%"
            value={selectedFileContent}
            onChange={handleEditorChange}
          />
        </div>
      </div>
    </div>
  );
} 