# Oyren React Renderer - Simple Demo

This is a simple demo application that showcases the capabilities of the Oyren React Renderer component.

## 🚀 What this demo shows

- **Live Code Editing**: Edit React components in real-time with Monaco Editor
- **Instant Preview**: See your changes rendered immediately
- **Multiple Files**: Work with multiple component files and utilities
- **TypeScript Support**: Full TypeScript support with intelligent autocomplete
- **Tailwind CSS**: Pre-configured with Tailwind CSS for beautiful styling
- **Smart Navigation**: Use Cmd/Ctrl+Click to navigate between component files

## 📦 Getting Started

### Prerequisites

- Node.js 16+ installed on your system
- npm or yarn package manager

### Installation

1. **Build the main package** (from the project root):
   ```bash
   cd ../..
   npm install
   npm run build
   ```

2. **Install demo dependencies**:
   ```bash
   cd examples/simple-demo
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** to `http://localhost:3000`

## 🎯 Try These Features

Once the demo is running, try:

1. **Edit the counter logic** in `App.tsx` - change the increment/decrement values
2. **Modify the styling** - change Tailwind classes to see instant updates
3. **Add new components** - create new files using the file manager
4. **Navigate between files** - Cmd/Ctrl+Click on component imports
5. **Try error handling** - introduce syntax errors to see error overlays

## 📁 Demo Structure

```
examples/simple-demo/
├── src/
│   ├── App.tsx          # Main demo application
│   └── main.tsx         # React entry point
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
└── README.md           # This file
```

The demo includes several pre-loaded files in the code editor:
- `App.tsx` - Main application with interactive examples
- `components/Button.tsx` - Reusable button component
- `components/Card.tsx` - Card layout component
- `utils/helpers.ts` - Utility functions

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📝 Next Steps

After trying the demo, you can:

1. **Install in your project**:
   ```bash
   npm install oyren-react-renderer
   ```

2. **Use in your application**:
   ```tsx
   import { OyrenReactRenderer } from 'oyren-react-renderer';
   
   function MyApp() {
     const [codes, setCodes] = useState({
       'App.tsx': 'export default function App() { return <div>Hello!</div>; }'
     });

     return (
       <OyrenReactRenderer
         codes={codes}
         onCodeChange={setCodes}
         height="600px"
       />
     );
   }
   ```

3. **Explore the documentation** in the main README.md

## 🤝 Contributing

Found an issue or want to improve the demo? Feel free to open an issue or submit a pull request!

---

Made with ❤️ using [Oyren React Renderer](https://github.com/your-username/oyren-react-renderer) 