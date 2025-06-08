# Contributing to Oyren React Renderer

Thank you for your interest in contributing to Oyren React Renderer! 🎉

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/oyren-react-renderer.git
   cd oyren-react-renderer
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🛠️ Development Workflow

### Building and Testing

1. **Build the package**:
   ```bash
   npm run build
   ```

2. **Start development mode** (watches for changes):
   ```bash
   npm run dev
   ```

3. **Test your changes** with the demo:
   ```bash
   npm run demo:install
   npm run demo:dev
   ```

### Testing with Examples

We have examples in the `examples/` directory that serve as both documentation and integration tests:

- **Simple Demo** (`examples/simple-demo/`): Basic usage demonstration
- **More examples coming soon!**

To test your changes:

1. Build the main package: `npm run build`
2. Run the examples: `npm run demo:dev`
3. Verify that your changes work as expected

## 📝 Code Style

- Use **TypeScript** for all new code
- Follow the existing **ESLint** configuration
- Write **clear, descriptive commit messages**
- Add **JSDoc comments** for public APIs
- Keep **file sizes reasonable** and split large components

### Commit Message Format

```
type(scope): description

Examples:
feat(editor): add syntax highlighting for JSX
fix(preview): resolve component rendering issue
docs(readme): update installation instructions
```

## 🧪 Testing

Before submitting a pull request:

1. **Test the main package builds**:
   ```bash
   npm run build
   ```

2. **Test examples build and run**:
   ```bash
   npm run demo:install
   npm run demo:dev
   ```

3. **Test in a real project** (optional but recommended):
   ```bash
   # In your test project
   npm install /path/to/your/oyren-react-renderer
   ```

## 📚 Contributing Examples

We welcome new examples! To add an example:

1. **Create a new directory** in `examples/`:
   ```bash
   mkdir examples/your-example-name
   ```

2. **Set up a basic React app** structure with:
   - `package.json` with dependencies
   - `src/App.tsx` demonstrating specific features
   - `README.md` explaining what the example shows
   - Build configuration (Vite recommended)

3. **Document what it demonstrates**:
   - What specific features it showcases
   - How to run it
   - Key concepts being taught

4. **Test the example**:
   ```bash
   cd examples/your-example-name
   npm install
   npm run dev
   ```

### Example Ideas

- Advanced component patterns
- Integration with state management (Redux, Zustand)
- Custom themes and editor configurations
- Server-side rendering
- Mobile-responsive layouts
- Integration with design systems

## 🐛 Bug Reports

When reporting bugs:

1. **Check existing issues** first
2. **Use the issue template** if available
3. **Include**:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/OS information
   - Code examples or screenshots

## 💡 Feature Requests

For feature requests:

1. **Check existing issues** and discussions
2. **Describe the use case** clearly
3. **Explain why** this feature would be valuable
4. **Consider backwards compatibility**
5. **Provide examples** of how it would be used

## 📖 Documentation

Documentation improvements are always welcome:

- **README.md** improvements
- **Example applications**
- **API documentation**
- **Tutorials and guides**
- **Code comments**

## 🚀 Release Process

For maintainers:

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create a new release on GitHub
4. Publish to npm: `npm publish`

## 🤝 Code of Conduct

Be respectful, inclusive, and constructive in all interactions. We're all here to build something great together!

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and community chat
- **Email**: [your-email@oyren.dev](mailto:your-email@oyren.dev)

---

Thank you for contributing to Oyren React Renderer! Every contribution, no matter how small, helps make this project better for everyone. 🎉 