#!/usr/bin/env bash

# Exit on error, undefined variable, and pipe failures
set -euo pipefail

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Variables
WORKING_DIR="$(pwd)"
PROJECT_NAME="$(basename "$WORKING_DIR")"
BRANCH="main"
USER="$(whoami)"

# Check for bun
if command_exists bun; then
    BUN="$(command -v bun)"
else
    echo "Error: 'bun' is not installed or not in PATH"
    exit 1
fi

# Run prod-setup
echo "Running production setup..."
"$BUN" prod-setup

# Create post-receive hook
echo "Creating post-receive hook..."
WORKING_DIR="$WORKING_DIR" PROJECT_NAME="$PROJECT_NAME" BRANCH="$BRANCH" \
    envsubst < scripts/templates/post-receive > .git/hooks/post-receive
chmod +x .git/hooks/post-receive

# Create systemd service file
echo "Creating systemd service file..."
mkdir tmp
WORKING_DIR="$WORKING_DIR" PROJECT_NAME="$PROJECT_NAME" BUN="$BUN" USER="$USER" \
    envsubst < scripts/templates/template.service > "/tmp/$PROJECT_NAME.service"

# Move service file to systemd directory
sudo mv "/tmp/$PROJECT_NAME.service" "/etc/systemd/system/$PROJECT_NAME.service"
rm -r tmp

# Reload systemd, enable and start the service
echo "Configuring and starting the service..."
sudo systemctl daemon-reload
sudo systemctl enable "$PROJECT_NAME"
sudo systemctl start "$PROJECT_NAME"

echo "Setup completed successfully!"
