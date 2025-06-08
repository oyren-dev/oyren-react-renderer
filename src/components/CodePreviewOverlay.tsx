import React from 'react';

interface CodePreviewOverlayProps {
  onClick: () => void;
  overlayText?: string;
}

export default function CodePreviewOverlay({ 
  onClick, 
  overlayText = "Click to render code" 
}: CodePreviewOverlayProps) {
  const styles = {
    container: {
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'hsla(223, 47%, 11%, 0.2)'
    },
    content: {
      textAlign: 'center' as const
    },
    iconContainer: {
      marginBottom: '24px'
    },
    icon: {
      width: '96px',
      height: '96px',
      margin: '0 auto 16px',
      background: 'linear-gradient(135deg, hsl(217 91% 60%), hsl(271 91% 65%))',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '36px'
    },
    title: {
      fontSize: '18px',
      fontWeight: 600,
      color: 'hsl(213 31% 91%)',
      marginBottom: '8px'
    },
    description: {
      color: 'hsl(215.4 16.3% 56.9%)',
      marginBottom: '24px',
      maxWidth: '320px'
    },
    button: {
      padding: '12px 24px',
      fontSize: '16px',
      fontWeight: 600,
      border: 'none',
      borderRadius: '8px',
      background: 'linear-gradient(135deg, hsl(217 91% 60%), hsl(271 91% 65%))',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.iconContainer}>
          <div style={styles.icon}>
            ▶️
          </div>
        </div>
        <h3 style={styles.title}>
          Ready to Preview
        </h3>
        <p style={styles.description}>
          {overlayText}
        </p>
        <button
          style={styles.button}
          onClick={onClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(37, 99, 235, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <span>▶️</span>
          Render Code
        </button>
      </div>
    </div>
  );
} 