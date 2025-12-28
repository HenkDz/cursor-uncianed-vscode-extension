# Changelog

All notable changes to the Cursor Unchained VS Code extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial version of Cursor Unchained VS Code extension
- Inline completion provider for real-time code suggestions
- Integration with Cursor's StreamCpp API
- Configuration panel for easy API credential setup
- Support for multiple programming languages
- Configurable model selection (fast/slow)
- Adjustable debounce delay for efficient API calls
- Manual completion trigger command
- Configuration info display command

### Features
- Real-time streaming completions from Cursor API
- Protobuf encoding/decoding for API communication
- Multi-language support (JavaScript, TypeScript, Python, Go, etc.)
- VS Code Settings integration
- Webview-based credentials configuration
- Error handling and user feedback
- Comprehensive documentation

### Documentation
- README.md - Overview and quick start guide
- INSTALL.md - Detailed installation and setup instructions
- DEVELOPMENT.md - Development and contribution guide
- VS_CODE_EXTENSION_USAGE.md - Complete usage documentation
- CHANGELOG.md - This file

### Build System
- TypeScript compilation with tsconfig.extension.json
- Build script (scripts/buildExtension.cjs)
- Packaging with vsce
- Automated protobuf file handling

### Configuration Options
- `cursorUnchained.cursorBearerToken` - API authentication
- `cursorUnchained.cursorClientVersion` - Cursor client version
- `cursorUnchained.requestId` - Request ID header
- `cursorUnchained.sessionId` - Session ID header
- `cursorUnchained.modelName` - Model selection (fast/slow)
- `cursorUnchained.debounceDelay` - Debounce delay (ms)

### Commands
- `cursorUnchained.authenticate` - Configure API credentials
- `cursorUnchained.showConfig` - Show current configuration
- `cursorUnchained.triggerCompletion` - Manually trigger completion

## [0.0.3] - 2025-12-28

### Fixed
- Cleaned repository - removed built files from git tracking
- Added proper .gitignore to prevent tracking build artifacts and .vsix files
- Added package.json with proper metadata and build scripts
- Initial git repository setup with main branch

### Documentation
- Added comprehensive README with quick start and feature overview
- Added detailed DEVELOPMENT guide for contributors
- Added MIT License

### Repository Setup
- Initialized git repository
- Created main branch
- Clean repository structure without build artifacts
- Proper documentation structure

## [0.0.1] - Initial Release

### Initial Release
- Basic inline completion implementation
- Cursor API integration
- Protobuf encoding/decoding
- Configuration panel
- Essential commands and settings

---

## Version Schema

The project follows semantic versioning: `MAJOR.MINOR.PATCH`

- **MAJOR**: Incompatible API changes
- **MINOR**: New functionality (backwards compatible)
- **PATCH**: Bug fixes (backwards compatible)
