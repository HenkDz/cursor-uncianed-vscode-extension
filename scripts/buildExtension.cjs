const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building Cursor Unchained VS Code Extension...');

// Get the project root directory
const projectRoot = path.join(__dirname, '..');

// Ensure dist directory exists
const distDir = path.join(projectRoot, 'dist');
if (!fs.existsSync(distDir)) {
	fs.mkdirSync(distDir, { recursive: true });
}

// Copy protobuf files to dist
const protoDir = path.join(projectRoot, 'protobuf');
const distProtoDir = path.join(distDir, 'protobuf');

if (!fs.existsSync(distProtoDir)) {
	fs.mkdirSync(distProtoDir, { recursive: true });
}

// Copy all .proto files
const protoFiles = fs.readdirSync(protoDir).filter(file => file.endsWith('.proto'));
protoFiles.forEach(file => {
	const srcPath = path.join(protoDir, file);
	const destPath = path.join(distProtoDir, file);
	fs.copyFileSync(srcPath, destPath);
	console.log(`Copied ${file} to dist/protobuf/`);
});

// Copy .desc files if they exist
const descFiles = fs.readdirSync(protoDir).filter(file => file.endsWith('.desc'));
descFiles.forEach(file => {
	const srcPath = path.join(protoDir, file);
	const destPath = path.join(distProtoDir, file);
	fs.copyFileSync(srcPath, destPath);
	console.log(`Copied ${file} to dist/protobuf/`);
});

// Compile TypeScript using tsconfig.extension.json
console.log('Compiling TypeScript...');
try {
	execSync('npx tsc -p tsconfig.extension.json', {
		cwd: projectRoot,
		stdio: 'inherit'
	});
	console.log('TypeScript compilation complete!');
} catch (error) {
	console.error('TypeScript compilation failed:', error.message);
	process.exit(1);
}

// Check if extension.js was created
const extensionJs = path.join(distDir, 'extension', 'extension.js');
if (fs.existsSync(extensionJs)) {
	console.log('✓ Extension compiled successfully!');
	console.log(`✓ Extension file: ${extensionJs}`);
} else {
	console.error('✗ Extension file not found!');
	process.exit(1);
}

// Ensure a CommonJS entrypoint exists even when package.json has "type": "module"
// Node treats .cjs as CommonJS regardless of package type.
const extensionCjs = path.join(distDir, 'extension', 'extension.cjs');
fs.copyFileSync(extensionJs, extensionCjs);
console.log(`✓ CommonJS entrypoint: ${extensionCjs}`);

// Copy needed dependencies for the extension (protobufjs is needed)
console.log('\nCopying protobufjs library...');

// Copy the protobufjs library files to dist
const nodeModulesPath = path.join(projectRoot, 'node_modules', 'protobufjs', 'dist');

if (fs.existsSync(nodeModulesPath)) {
	const protobufMinJsPath = path.join(nodeModulesPath, 'protobuf.min.js');
	const protobufJsPath = path.join(nodeModulesPath, 'protobuf.js');
	const lightPath = path.join(nodeModulesPath, 'protobuf-light.min.js');

	if (fs.existsSync(protobufMinJsPath)) {
		fs.copyFileSync(protobufMinJsPath, path.join(distDir, 'protobuf.min.js'));
		console.log('Copied protobuf.min.js to dist/');
	}
	if (fs.existsSync(lightPath)) {
		fs.copyFileSync(lightPath, path.join(distDir, 'protobuf-light.min.js'));
		console.log('Copied protobuf-light.min.js to dist/');
	}
}

// Copy the lib files that are needed
const srcLibDir = path.join(projectRoot, 'src', 'lib');
const distLibDir = path.join(distDir, 'lib');

if (fs.existsSync(srcLibDir)) {
	// We need to copy TypeScript source files and let them be compiled
	// But for now, let's copy them as-is since we reference them
	console.log('Copying lib files...');
	copyDirectory(srcLibDir, distLibDir);
}

console.log('\n=================================');
console.log('Build complete!');
console.log('=================================');
console.log('\nTo package the extension:');
console.log('  npm run vscode:package');
console.log('\nTo install the extension for development:');
console.log('  code --install-extension cursor-unchained-<version>.vsix --force');

function copyDirectory(src, dest) {
	if (!fs.existsSync(dest)) {
		fs.mkdirSync(dest, { recursive: true });
	}

	const entries = fs.readdirSync(src, { withFileTypes: true });

	for (const entry of entries) {
		const srcPath = path.join(src, entry.name);
		const destPath = path.join(dest, entry.name);

		if (entry.isDirectory()) {
			copyDirectory(srcPath, destPath);
		} else {
			fs.copyFileSync(srcPath, destPath);
		}
	}
}
