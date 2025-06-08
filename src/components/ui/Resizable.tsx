import React, { useState, useRef, useCallback, ReactNode } from 'react';

interface ResizablePanelGroupProps {
  direction: 'horizontal' | 'vertical';
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

interface ResizablePanelProps {
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  children: ReactNode;
}

interface ResizableHandleProps {
  className?: string;
}

export function ResizablePanelGroup({ 
  direction, 
  children, 
  style = {},
  className = '' 
}: ResizablePanelGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sizes, setSizes] = useState<number[]>([50, 50]);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    e.preventDefault();
    setIsResizing(true);
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const startPos = direction === 'horizontal' ? e.clientX : e.clientY;
    const containerSize = direction === 'horizontal' ? containerRect.width : containerRect.height;
    
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      const currentPos = direction === 'horizontal' ? e.clientX : e.clientY;
      const containerStart = direction === 'horizontal' ? containerRect.left : containerRect.top;
      const percentage = ((currentPos - containerStart) / containerSize) * 100;
      
      const clampedPercentage = Math.max(20, Math.min(80, percentage));
      setSizes([clampedPercentage, 100 - clampedPercentage]);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize';
    document.body.style.userSelect = 'none';
  }, [direction]);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction === 'horizontal' ? 'row' : 'column',
    height: '100%',
    width: '100%',
    ...style
  };

  const childrenArray = React.Children.toArray(children);
  
  return (
    <div 
      ref={containerRef}
      className={`resizable-panel-group ${className}`}
      style={containerStyle}
    >
      {childrenArray.map((child, index) => {
        if (React.isValidElement(child)) {
          if (child.type === ResizablePanel) {
            return React.cloneElement(child as React.ReactElement<ResizablePanelProps>, {
              key: index,
              style: {
                flex: index < 2 ? `0 0 ${sizes[index]}%` : '1',
                minHeight: 0,
                minWidth: 0,
                ...((child.props as any).style || {})
              }
            });
          } else if (child.type === ResizableHandle) {
            return React.cloneElement(child as React.ReactElement<ResizableHandleProps>, {
              key: index,
              onMouseDown: handleMouseDown,
              style: {
                cursor: direction === 'horizontal' ? 'col-resize' : 'row-resize',
                flexShrink: 0,
                backgroundColor: isResizing ? 'rgba(147, 51, 234, 0.3)' : 'rgba(147, 51, 234, 0.1)',
                transition: 'background-color 0.2s ease',
                ...(direction === 'horizontal' ? { width: '4px' } : { height: '4px' })
              }
            });
          }
        }
        return child;
      })}
    </div>
  );
}

export function ResizablePanel({ 
  children, 
  defaultSize, 
  minSize, 
  maxSize, 
  ...props 
}: ResizablePanelProps & any) {
  return (
    <div {...props}>
      {children}
    </div>
  );
}

export function ResizableHandle({ 
  className = '',
  onMouseDown,
  style = {},
  ...props 
}: ResizableHandleProps & any) {
  return (
    <div
      className={`resizable-handle ${className}`}
      onMouseDown={onMouseDown}
      style={{
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        ...style
      }}
      {...props}
    />
  );
} 