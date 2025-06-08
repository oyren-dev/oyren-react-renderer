# Oyren React Renderer

A powerful React code editor and live preview component that renders React + Tailwind CSS code in the browser with real-time editing capabilities and intelligent code navigation.

[![npm version](https://badge.fury.io/js/oyren-react-renderer.svg)](https://badge.fury.io/js/oyren-react-renderer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Support This Project

If you find Oyren React Renderer useful, consider supporting its development!

<a href="https://buymeacoffee.com/vorashil" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 50px !important;width: 174px !important;" >
</a>

Or, use the direct link: [https://buymeacoffee.com/vorashil](https://buymeacoffee.com/vorashil)


## ✨ Features

- 🔥 **Live Code Editor** - Monaco Editor with TypeScript support, syntax highlighting, and intelligent autocomplete
- 👁️ **Real-time Preview** - Instant preview of React components with Tailwind CSS styling in the browser
- 🧠 **Smart Navigation** - Cmd/Ctrl+Click to navigate to component definitions and file references
- 📁 **File Manager** - Built-in file explorer with drag-and-drop support and file operations
- 📱 **Resizable Layout** - Flexible layout with resizable panels and responsive design for all screen sizes
- ⚡ **Hot Reload** - Instant updates and error handling with beautiful error overlays and recovery
- 🎨 **Customizable** - Support for light/dark themes, custom font sizes, and layout options

## 🚀 Live Demo

Try it yourself at [oyren.dev/oyren-react-renderer](https://oyren.dev/oyren-react-renderer)

## 📦 Installation

```bash
npm install oyren-react-renderer
```

## 🎮 Try the Demo

Want to see Oyren React Renderer in action? Check out our interactive demo:

### Quick Start (One Command)

```bash
# Clone the repository
git clone https://github.com/your-username/oyren-react-renderer.git
cd oyren-react-renderer

# Option 1: Use npm script (cross-platform)
npm run demo:install && npm run demo:dev

# Option 2: Use platform-specific script
./scripts/run-demo.sh       # On macOS/Linux
# or
scripts\run-demo.bat        # On Windows
```

### Manual Setup

```bash
# Build the package
npm install
npm run build

# Run the demo
cd examples/simple-demo
npm install
npm run dev
```

The demo will open at `http://localhost:3000` and showcase:
- Live code editing with syntax highlighting
- Real-time React component preview
- Multiple file management
- TypeScript support
- Tailwind CSS integration

**See the [examples/](./examples/) directory for more demos and tutorials.**

## 🔧 Usage

### Basic Example

```tsx
import React, { useState } from 'react';
import { OyrenReactRenderer } from 'oyren-react-renderer';

function App() {
  const [codes, setCodes] = useState({
    'App.tsx': `import React from 'react';

export default function App() {
  return (
    <div className="p-8 bg-gradient-to-r from-blue-500 to-purple-600">
      <h1 className="text-4xl font-bold text-white text-center">
        Hello, Oyren React Renderer! 🚀
      </h1>
      <p className="text-xl text-white/80 text-center mt-4">
        Edit this code and see the changes instantly!
      </p>
    </div>
  );
}`,
    'components/Button.tsx': `import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export default function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-all';
  const variantClasses = variant === 'primary' 
    ? 'bg-blue-600 hover:bg-blue-700 text-white'
    : 'bg-gray-200 hover:bg-gray-300 text-gray-800';

  return (
    <button 
      onClick={onClick} 
      className={\`\${baseClasses} \${variantClasses}\`}
    >
      {children}
    </button>
  );
}`
  });

  return (
    <div style={{ height: '100vh', padding: '20px' }}>
      <OyrenReactRenderer
        codes={codes}
        onCodeChange={setCodes}
        height="80vh"
        showHeader={true}
        defaultLayout="horizontal"
      />
    </div>
  );
}
```

### Advanced Configuration

```tsx
import { OyrenReactRenderer, OyrenReactRendererProps } from 'oyren-react-renderer';

const config: OyrenReactRendererProps = {
  codes: initialCode,
  onCodeChange: (newCodes) => {
    console.log('Code changed:', newCodes);
    setCodes(newCodes);
  },
  height: '600px',
  showHeader: true,
  defaultLayout: 'vertical', // 'horizontal' | 'vertical'
  readOnly: false,
  theme: 'dark', // 'light' | 'dark'
  fontSize: 16,
  className: 'my-custom-renderer'
};

return <OyrenReactRenderer {...config} />;
```

## 📖 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `codes` | `Record<string, string>` | - | **Required.** Object with filename as key and code content as value |
| `onCodeChange` | `(codes: Record<string, string>) => void` | - | Callback fired when code changes |
| `height` | `string \| number` | `'600px'` | Height of the component |
| `showHeader` | `boolean` | `true` | Whether to show the header with controls |
| `defaultLayout` | `'horizontal' \| 'vertical'` | `'horizontal'` | Default layout orientation |
| `readOnly` | `boolean` | `false` | Whether the editor is read-only |
| `theme` | `'light' \| 'dark'` | `'dark'` | Editor theme |
| `fontSize` | `number` | `14` | Font size for the editor |
| `className` | `string` | `''` | Additional CSS class for the container |

### Code Structure

The `codes` object should contain your React component files:

```tsx
const codes = {
  'App.tsx': '// Your main component code',
  'components/Header.tsx': '// Header component code',
  'components/Button.tsx': '// Button component code',
  'utils/helpers.ts': '// Utility functions',
  // ... more files
};
```

**Important:** The component will automatically render the file named `App.tsx`, `App.ts`, `App.jsx`, or `App.js` as the main component.

## 🎯 Key Features

### Smart Navigation

Use **Cmd+Click** (Mac) or **Ctrl+Click** (Windows/Linux) on any component name in the editor to quickly navigate to its definition file.

### File Management

- ➕ Create new files with the "New File" button
- 🗑️ Delete files (except when only one file remains)
- 📝 Rename files by clicking on the filename
- 🎯 Auto-completion for imports

### Error Handling

The component provides comprehensive error handling:

- **Syntax Errors**: Displayed inline in the editor
- **Runtime Errors**: Shown in the preview panel with stack traces
- **Import Errors**: Clear messages about missing dependencies

### Responsive Design

- Automatically switches to vertical layout on mobile devices
- Resizable panels with drag handles
- Collapsible file manager sidebar

## 🛠️ Development

### For Package Development

To contribute to this project:

```bash
# Clone the repository
git clone https://github.com/your-username/oyren-react-renderer.git
cd oyren-react-renderer

# Install dependencies
npm install

# Start development mode (watches for changes)
npm run dev

# Build for production
npm run build
```

### Testing Your Changes

1. **Build the package**:
   ```bash
   npm run build
   ```

2. **Test with the demo**:
   ```bash
   cd examples/simple-demo
   npm install
   npm run dev
   ```

3. **Test in your own project**:
   ```bash
   # In your project directory
   npm install /path/to/oyren-react-renderer
   ```

### Project Structure

```
oyren-react-renderer/
├── src/                      # Source code
│   ├── components/           # React components
│   ├── hooks/               # Custom hooks
│   ├── utils/               # Utility functions
│   └── index.ts             # Main export
├── examples/                # Example applications
│   └── simple-demo/         # Basic demo
├── dist/                    # Built package (generated)
├── package.json             # Package configuration
└── README.md               # Documentation
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for detailed instructions.

**Quick start for contributors:**

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Test your changes with the demo: `npm run demo:install && npm run demo:dev`
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

**Ways to contribute:**
- 🐛 Report bugs or suggest features
- 📝 Improve documentation
- 🎯 Add new examples
- 🔧 Fix issues or add features
- 🎨 Improve UI/UX

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Live Demo](https://oyren.dev/oyren-react-renderer)
- [Documentation](https://oyren.dev/oyren-react-renderer)
- [GitHub Repository](https://github.com/your-username/oyren-react-renderer)
- [NPM Package](https://www.npmjs.com/package/oyren-react-renderer)
- [Report Issues](https://github.com/your-username/oyren-react-renderer/issues)

## 🙏 Acknowledgments

- Built with [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- Uses [React Live Runner](https://github.com/nihgwu/react-live-runner) for live code execution
- Inspired by modern code playground tools

---

Made with ❤️ by [Oyren.dev](https://oyren.dev) 