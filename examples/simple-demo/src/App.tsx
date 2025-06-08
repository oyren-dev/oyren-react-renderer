import React, { useState } from 'react';
import { OyrenReactRenderer } from 'oyren-react-renderer';

const initialCodes = {
  'App.tsx': `import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: '#f0f9ff',
      minHeight: '100vh' 
    }}>
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '32px',
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          textAlign: 'center',
          marginBottom: '32px',
          color: '#1f2937'
        }}>
          🚀 React Counter Demo
        </h1>
        
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold', 
            color: '#2563eb',
            marginBottom: '24px'
          }}>
            {count}
          </div>
          
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button 
              onClick={() => setCount(count - 1)}
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#ef4444',
                color: 'white',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Decrease
            </button>
            
            <button 
              onClick={() => setCount(count + 1)}
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#3b82f6',
                color: 'white',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Increase
            </button>
          </div>
        </div>
        
        <button 
          onClick={() => setCount(0)}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '2px solid #6b7280',
            backgroundColor: 'transparent',
            color: '#6b7280',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Reset to Zero
        </button>
        
        <p style={{ 
          marginTop: '24px', 
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '14px'
        }}>
          Try editing the code on the left! Changes appear instantly.
        </p>
      </div>
    </div>
  );
}`,


};

function App() {
  const [codes, setCodes] = useState<Record<string, string>>(initialCodes);

  return (
    <div style={{ padding: '20px', minHeight: '100vh' }}>
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '30px',
        color: 'white'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          marginBottom: '10px',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          🚀 Oyren React Renderer Demo
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          opacity: 0.9,
          textShadow: '0 1px 2px rgba(0,0,0,0.3)'
        }}>
          Edit the code on the left and see the changes instantly!
        </p>
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '20px',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        <OyrenReactRenderer
          codes={codes}
          onCodeChange={setCodes}
          height="70vh"
          showHeader={true}
          defaultLayout="horizontal"
          theme="dark"
          fontSize={14}
        />
      </div>

      <div style={{
        marginTop: '20px',
        textAlign: 'center',
        color: 'white',
        opacity: 0.8
      }}>
        <p>Try editing the code above - changes appear instantly! 🎨</p>
        <p style={{ fontSize: '0.9rem', marginTop: '5px' }}>
          Use Cmd/Ctrl + Click to navigate between components
        </p>
      </div>
    </div>
  );
}

export default App; 