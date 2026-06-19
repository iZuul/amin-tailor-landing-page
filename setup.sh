#!/bin/bash
# Setup script for amin-tailor-landing-page refactor
# Run this from the amin-tailor-landing-page directory

set -e

echo "=== Amin Tailor Landing Page Setup ==="

# 1. Copy assets from Kimi Agent design
echo "Copying assets from Kimi Agent design..."
KIMI_ASSETS="../Kimi_Agent_Elegant Minimalist Tailor Landing Page/app/public/assets"

if [ -d "$KIMI_ASSETS" ]; then
  mkdir -p public/assets
  cp "$KIMI_ASSETS"/*.jpg public/assets/ 2>/dev/null || true
  cp "$KIMI_ASSETS"/*.mp4 public/assets/ 2>/dev/null || true
  echo "Assets copied successfully!"
  ls -la public/assets/
else
  echo "WARNING: Kimi Agent assets directory not found at: $KIMI_ASSETS"
  echo "Please manually copy the assets."
fi

# 2. Install dependencies
echo ""
echo "Installing dependencies..."
npm install

echo ""
echo "=== Setup complete! Run 'npm run dev' to start the dev server. ==="
