# Contributing to Cursor Unchained

Thank you for your interest in contributing to Cursor Unchained! This document provides guidelines and instructions for contributing to the project.

---

## 🙏 How to Contribute

We welcome all types of contributions, including:
- Bug fixes
- New features
- Documentation improvements
- Performance improvements
- Bug reports
- Feature requests
- Translations

---

## 🚀 Getting Started

### 1. Fork the Repository

1. Visit the repository at https://github.com/HenkDz/cursor-uncianed-vscode-extension
2. Click the "Fork" button in the top-right corner
3. Clone your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/cursor-uncianed-vscode-extension.git
cd cursor-uncianed-vscode-extension
```

### 2. Set Up Development Environment

Follow the development setup instructions in [DEVELOPMENT.md](DEVELOPMENT.md):

```bash
# Install dependencies
npm install

# Build the extension
npm run vscode:build
```

### 3. Create a Branch

Create a new branch for your contribution:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

---

## 📝 Development Workflow

### 1. Make Your Changes

- Write clean, readable code following the existing style
- Add comments for complex logic
- Ensure all tests pass (if tests are added)
- Update documentation as needed

### 2. Test Your Changes

- Build the extension: `npm run vscode:build`
- Press `F5` in VS Code to launch Extension Development Host
- Test your changes thoroughly
- Ensure existing functionality is not broken

### 3. Commit Your Changes

Follow our commit message format:

```
type(scope): brief description

Detailed description if needed
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Build process, maintenance, dependencies

**Examples:**
```
feat(completion): add support for Rust language
fix(api): handle expired bearer tokens gracefully
docs(readme): update installation instructions
```

### 4. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 5. Create a Pull Request

1. Visit your fork on GitHub
2. Click "New Pull Request"
3. Select your branch
4. Fill out the PR template
5. Submit the PR

---

## 📋 Pull Request Guidelines

### PR Title

Use a clear, descriptive title:

- ✅ Good: "feat: add support for inline completion in Python"
- ❌ Bad: "update code" or "fix bug"

### PR Description

Include:
- **What** changes you made
- **Why** you made these changes
- **How** to test the changes
- **Screenshots** for UI changes
- **Related issues** (fixes #123)

### Screenshots

For UI changes, include:
- Before screenshots
- After screenshots
- GIF/video for complex interactions

### Testing Checklist

Your PR should ideally include:
- [ ] Code compiles without errors
- [ ] Extension activates correctly
- [ ] New functionality works as expected
- [ ] Existing functionality is not broken
- [ ] Documentation is updated
- [ ] Commits follow the commit message format

---

## 🐛 Reporting Bugs

### Before Reporting

- Check if the issue already exists in [GitHub Issues](https://github.com/HenkDz/cursor-uncianed-vscode-extension/issues)
- Check if it's fixed in the latest version
- Include VS Code version and extension version

### Bug Report Template

```markdown
**Description**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
- OS: [e.g. Windows 10, macOS 14, Ubuntu 22.04]
- VS Code Version: [e.g. 1.85.0]
- Extension Version: [e.g. 0.0.3]
- Node.js Version: [e.g. 18.19.0]

**Additional Context**
Add any other context about the problem here.
```

---

## 💡 Feature Requests

### Feature Request Template

```markdown
**Description**
A clear and concise description of the feature you'd like to see.

**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

---

## 🎯 Areas for Contribution

### Easy (Good for First-Time Contributors)

- [ ] Improve documentation
- [ ] Add more examples
- [ ] Fix typos
- [ ] Add more supported languages
- [ ] Improve error messages
- [ ] Add command palette enhancements

### Medium

- [ ] Add new configuration options
- [ ] Improve completion provider logic
- [ ] Add more API features
- [ ] Improve performance
- [ ] Add keyboard shortcuts

### Advanced

- [ ] Multi-file context awareness
- [ ] Project/workspace indexing
- [ ] Custom prompts/templates
- [ ] Local model fallback
- [ ] Telemetry and analytics
- [ ] Security improvements

---

## 📐 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Try to follow existing code style
- Add JSDoc comments for public functions
- Use interface/type annotations
- Avoid `any` type when possible

### File Organization

- Keep files focused on a single responsibility
- Use descriptive filenames
- Group related functionality
- Keep files reasonably sized (< 500 lines if possible)

### Code Style

- Use meaningful variable/function names
- Keep functions short and focused
- Add comments for complex logic
- Follow existing formatting (use Prettier if available)
- Remove dead code before committing

### Error Handling

- Always handle errors gracefully
- Provide user-friendly error messages
- Log errors appropriately
- Never expose sensitive information in error messages

---

## 🧪 Testing

### Before Pushing

- Build the extension: `npm run vscode:build`
- Test in Extension Development Host (F5)
- Test on a clean VS Code installation

### Test Checklist

- [ ] Extension loads without errors
- [ ] Core functionality works
- [ ] New features work as expected
- [ ] No regressions in existing features
- [ ] Configuration options work
- [ ] Commands work correctly
- [ ] Error handling works

---

## 📚 Documentation

### When to Update Documentation

Update documentation when you:
- Add a new feature
- Change existing functionality
- Modify configuration options
- Fix a bug that affects user experience
- Add a new command
- Change the build process

### Documentation Files

- `README.md` - Main documentation (overview, features, quick start)
- `INSTALL.md` - Installation and setup instructions
- `DEVELOPMENT.md` - Development and contribution guide
- `VS_CODE_EXTENSION_USAGE.md` - Complete usage documentation
- `CHANGELOG.md` - Version history and changes

---

## 🤝 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment. Please:

- Be respectful and considerate
- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

Harassment, whether in code, issues, or any form of community interaction is not acceptable. This includes:

- Offensive comments
- Trolling or insulting remarks
- Personal or political attacks
- Public or private harassment
- Publishing others' private information without permission

### Reporting Issues

If you witness or experience unacceptable behavior, please contact the project maintainers privately by opening a sensitive issue.

---

## 📧 Getting Help

### Resources

- Check existing [GitHub Issues](https://github.com/HenkDz/cursor-uncianed-vscode-extension/issues)
- Read the [DEVELOPMENT.md](DEVELOPMENT.md)
- Read VS Code Extension API docs: https://code.visualstudio.com/api
- Join our community discussions (if available)

### How to Ask for Help

1. Search existing issues and discussions
2. Provide clear context:
   - What you're trying to do
   - What you've tried
   - Expected vs actual behavior
   - Environment details (OS, VS Code version, extension version)
3. Include relevant code snippets or error messages
4. Be patient and respectful

---

## 🏆 Recognition

Contributors will be acknowledged in:
- The contributors section of README.md
- The CHANGELOG.md for significant contributions
- Release notes for major contributions

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License, which is the same license as the project.

---

## 🤔 Questions?

If you have any questions about contributing:

1. Check existing issues
2. Open a new issue with the "question" label
3. We'll do our best to help!

---

**Thank you for contributing to Cursor Unchained! 🎉**
