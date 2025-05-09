#!/bin/bash

# Script to manually sync documentation from component repositories
# Usage: ./sync-docs.sh [repository-name]

REPOS=("vv-chain-services" "vv-infra" "vv-gamification" "vv-frontend")
BASE_DIR="/workspace"
TEMP_DIR="/tmp/vv-docs-sync"

if [ ! -d "$BASE_DIR/docs" ]; then
  echo "Error: docs directory not found. Please run from the project root."
  exit 1
fi

# If a specific repository is provided, only sync that one
if [ ! -z "$1" ]; then
  if [[ " ${REPOS[@]} " =~ " $1 " ]]; then
    REPOS=("$1")
  else
    echo "Error: Unknown repository $1"
    echo "Available repositories: ${REPOS[@]}"
    exit 1
  fi
fi

mkdir -p "$TEMP_DIR"

for REPO in "${REPOS[@]}"; do
  echo "Syncing documentation from $REPO..."
  
  # Clone the repository if it doesn't exist
  if [ ! -d "$TEMP_DIR/$REPO" ]; then
    git clone "https://github.com/veritasvault/$REPO.git" "$TEMP_DIR/$REPO"
  else
    # Update the repository
    cd "$TEMP_DIR/$REPO"
    git pull
  fi
  
  # Copy documentation to the appropriate directory
  TARGET_DIR="$BASE_DIR/docs/$(echo $REPO | sed 's/vv-//')"
  
  if [ -d "$TEMP_DIR/$REPO/docs" ]; then
    mkdir -p "$TARGET_DIR"
    cp -r "$TEMP_DIR/$REPO/docs/"* "$TARGET_DIR/"
    echo "Documentation copied to $TARGET_DIR"
  else
    echo "No docs directory found in $REPO"
  fi
done

echo "Documentation sync complete!"
