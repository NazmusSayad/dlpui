#!/bin/bash

set -e

cd "$(dirname "$0")/../.."
echo "Current directory: $(pwd)"

SCRIPT_DIR="$(dirname "$0")"
VERSION=$(grep '^version' src-tauri/Cargo.toml | head -1 | cut -d'"' -f2)

echo "=== OiPer Release Script ==="
echo "Version: $VERSION"
echo ""

echo "Step 1: Building Windows binaries..."
source "$SCRIPT_DIR/extract-win.win.sh"

# echo ""
# echo "Step 2: Building Linux binaries (via Docker)..."
# source "$SCRIPT_DIR/extract-linux.win.sh"

echo ""
echo "Step 3: Verifying build artifacts..."
if [ ! -d "./build" ]; then
	echo "Error: Build directory not found"
	exit 1
fi

echo "Build artifacts:"
ls -lh ./build/

echo ""
echo "Step 4: Creating GitHub release..."

if ! command -v gh &>/dev/null; then
	echo "Error: GitHub CLI (gh) is not installed"
	exit 1
fi

RELEASE_TAG="v$VERSION"

echo "Checking if release $RELEASE_TAG exists..."
if gh release view "$RELEASE_TAG" --repo oiper/desktop &>/dev/null; then
	echo "Release $RELEASE_TAG already exists. Deleting..."
	gh release delete "$RELEASE_TAG" --repo oiper/desktop --yes
fi

echo "Creating release $RELEASE_TAG..."
gh release create "$RELEASE_TAG" \
	--repo oiper/desktop \
	--title "Release $RELEASE_TAG" \
	--notes "OiPer Desktop $RELEASE_TAG" \
	./build/*

echo ""
echo "=== Release Complete ==="
echo "Release URL: https://github.com/oiper/desktop/releases/tag/$RELEASE_TAG"
