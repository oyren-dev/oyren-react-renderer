import React, { useState } from 'react';

interface CodeFilesProps {
  contextValue: any;
}

export default function CodeFiles({ contextValue }: CodeFilesProps) {
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  const { codes, selectedFile, setSelectedFile, createCodeFile, deleteCodeFile } = contextValue;

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      let fileName = newFileName.trim();
      
      // Add .tsx extension if no extension provided
      if (!fileName.includes('.')) {
        fileName += '.tsx';
      }
      
      createCodeFile(fileName);
      setSelectedFile(fileName);
      setNewFileName('');
      setIsCreatingFile(false);
    }
  };

  const handleDeleteFile = (fileName: string) => {
    if (Object.keys(codes).length > 1) {
      deleteCodeFile(fileName);
    }
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'tsx':
      case 'jsx':
        return '⚛️';
      case 'ts':
      case 'js':
        return '📜';
      case 'css':
        return '🎨';
      case 'json':
        return '⚙️';
      default:
        return '📄';
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '4px'
    },
    fileItem: (isSelected: boolean) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      backgroundColor: isSelected 
        ? 'rgba(147, 51, 234, 0.2)' 
        : 'transparent',
      border: isSelected 
        ? '1px solid rgba(147, 51, 234, 0.3)' 
        : '1px solid transparent',
      color: isSelected 
        ? 'hsl(217 91% 60%)' 
        : 'hsl(215.4 16.3% 56.9%)',
    }),
    fileName: {
      flex: 1,
      fontSize: '14px',
      fontWeight: 500,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap' as const
    },
    deleteButton: {
      background: 'transparent',
      border: 'none',
      color: 'hsl(215.4 16.3% 56.9%)',
      cursor: 'pointer',
      padding: '2px',
      fontSize: '12px',
      opacity: 0,
      transition: 'opacity 0.2s'
    },
    createFileForm: {
      padding: '8px',
      backgroundColor: 'hsla(223, 47%, 11%, 0.5)',
      borderRadius: '6px',
      border: '1px solid hsl(216 34% 17%)',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '8px'
    },
    input: {
      padding: '6px 8px',
      fontSize: '14px',
      backgroundColor: 'hsl(223 47% 11%)',
      border: '1px solid hsl(216 34% 17%)',
      borderRadius: '4px',
      color: 'hsl(213 31% 91%)',
      outline: 'none'
    },
    buttonGroup: {
      display: 'flex',
      gap: '4px'
    },
    button: (isPrimary: boolean = false) => ({
      flex: 1,
      padding: '6px 12px',
      fontSize: '12px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      backgroundColor: isPrimary 
        ? 'hsl(217 91% 60%)' 
        : 'transparent',
      color: isPrimary 
        ? 'white' 
        : 'hsl(215.4 16.3% 56.9%)'
    }),
    newFileButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '8px',
      fontSize: '14px',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '6px',
      color: 'hsl(215.4 16.3% 56.9%)',
      cursor: 'pointer',
      transition: 'all 0.2s',
      width: '100%',
      justifyContent: 'flex-start'
    }
  };

  return (
    <div style={styles.container}>
      {/* File List */}
      {Object.keys(codes).map((fileName) => (
        <div
          key={fileName}
          style={{
            ...styles.fileItem(selectedFile === fileName),
            position: 'relative'
          }}
          onClick={() => setSelectedFile(fileName)}
          onMouseEnter={(e) => {
            const deleteBtn = e.currentTarget.querySelector('.delete-btn') as HTMLElement;
            if (deleteBtn) deleteBtn.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            const deleteBtn = e.currentTarget.querySelector('.delete-btn') as HTMLElement;
            if (deleteBtn) deleteBtn.style.opacity = '0';
          }}
        >
          <span style={{ fontSize: '14px' }}>
            {getFileIcon(fileName)}
          </span>
          <span style={styles.fileName}>
            {fileName}
          </span>
          {Object.keys(codes).length > 1 && (
            <button
              className="delete-btn"
              style={styles.deleteButton}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteFile(fileName);
              }}
              title="Delete file"
            >
              🗑️
            </button>
          )}
        </div>
      ))}

      {/* Create New File */}
      {isCreatingFile ? (
        <div style={styles.createFileForm}>
          <input
            style={styles.input}
            placeholder="filename.tsx"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCreateFile();
              } else if (e.key === 'Escape') {
                setIsCreatingFile(false);
                setNewFileName('');
              }
            }}
            autoFocus
          />
          <div style={styles.buttonGroup}>
            <button
              style={styles.button(true)}
              onClick={handleCreateFile}
              disabled={!newFileName.trim()}
            >
              Create
            </button>
            <button
              style={styles.button(false)}
              onClick={() => {
                setIsCreatingFile(false);
                setNewFileName('');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          style={styles.newFileButton}
          onClick={() => setIsCreatingFile(true)}
        >
          <span style={{ fontSize: '14px' }}>➕</span>
          New File
        </button>
      )}
    </div>
  );
} 