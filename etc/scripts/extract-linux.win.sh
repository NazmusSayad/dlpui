#!/bin/bash

set -e

export MSYS_NO_PATHCONV=1

cd "$(dirname "$0")/../.."
echo "Current directory: $(pwd)"

IMAGE_NAME="oiper-linux-builder"
CONTAINER_NAME="oiper-linux-build"
BUILD_DIR="./build"

mkdir -p "$BUILD_DIR"

if ! docker info >/dev/null 2>&1; then
	echo "Error: Docker is not running or not installed"
	exit 1
fi

docker build \
	-t "$IMAGE_NAME" \
	-f- . <<'EOF'
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV RUSTUP_HOME=/usr/local/rustup
ENV CARGO_HOME=/usr/local/cargo
ENV PATH=/usr/local/cargo/bin:$PATH
ENV LIBCLANG_PATH=/usr/lib/llvm-14/lib

RUN apt-get update -qq && apt-get install -y -qq \
    curl \
    wget \
    git \
    build-essential \
    cmake \
    make \
    pkg-config \
    libssl-dev \
    libwebkit2gtk-4.1-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev \
    libasound2-dev \
    libudev-dev \
    libxdo-dev \
    xdotool \
    xdg-utils \
    clang \
    libclang-dev \
    file \
    fakeroot \
    rpm \
    libarchive-tools \
    && rm -rf /var/lib/apt/lists/*

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain stable 2>&1 | tail -5
RUN rustup target add x86_64-unknown-linux-gnu 2>&1 | tail -3

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - 2>&1 | tail -3 \
    && apt-get install -y -qq nodejs \
    && rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare pnpm@latest --activate 2>&1 | tail -3

WORKDIR /app

CMD ["bash"]
EOF

docker rm -f "$CONTAINER_NAME" 2>/dev/null || true

docker create \
	--name "$CONTAINER_NAME" \
	"$IMAGE_NAME" \
	bash -c '
        set -e
        cd /app
        make install
        make build-linux-win
						'

tar -czf - \
	--exclude='.git' \
	--exclude='.docker-cache' \
	--exclude='target' \
	--exclude='node_modules' \
	--exclude='dist' \
	--exclude='build' \
	--exclude='etc' \
	--exclude='scripts' \
	. 2>/dev/null | docker cp - "$CONTAINER_NAME:/app" 2>/dev/null

docker start -a "$CONTAINER_NAME"
docker cp "$CONTAINER_NAME:/app/src-tauri/target/x86_64-unknown-linux-gnu/release/bundle/" "$BUILD_DIR/bundle_temp/"

/usr/bin/find "$BUILD_DIR/bundle_temp" -type f \( -name "*.AppImage" -o -name "*.deb" -o -name "*.rpm" \) | while read -r file; do
	filename=$(basename "$file")
	echo "  $filename"
	mv "$file" "$BUILD_DIR/"
done

rm -rf "$BUILD_DIR/bundle_temp"
docker rm -f "$CONTAINER_NAME" 2>/dev/null || true
