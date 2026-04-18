#!/bin/bash

set -e

cd "$(dirname "$0")/../.."
echo "Current directory: $(pwd)"

if [[ "$OSTYPE" != "msys" && "$OSTYPE" != "cygwin" && "$OSTYPE" != "win32" ]]; then
	echo "Error: This script must be run on Windows"
	exit 1
fi

BUILD_DIR="./build"
TARGET="x86_64-pc-windows-msvc"

mkdir -p "$BUILD_DIR"

echo "Installing dependencies..."
make install

echo "Building for Windows..."
make build-win-win

echo "Copying bundles to $BUILD_DIR..."

/usr/bin/find "./src-tauri/target/$TARGET/release" -maxdepth 1 -type f -name "*.exe" 2>/dev/null | while read -r file; do
	filename=$(basename "$file")
	version=$(cargo pkgid -p oiper --manifest-path src-tauri/Cargo.toml | sed 's/.*@//')

	echo "  $filename"
	cp "$file" "$BUILD_DIR/OiPer_${version}_x64-portable.exe"
done

/usr/bin/find "./src-tauri/target/$TARGET/release/bundle" -type f \( -name "*.msi" -o -name "*.exe" \) 2>/dev/null | while read -r file; do
	filename=$(basename "$file")
	echo "  $filename"
	cp "$file" "$BUILD_DIR/"
done

echo "Build complete! Bundles available in $BUILD_DIR/"
