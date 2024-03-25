#!/bin/bash

# Update package lists
sudo apt-get update

# Install required packages
sudo apt-get install -y nodejs npm curl

# Install Node.js using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_21.x | sudo -E bash -
sudo apt remove libnode-dev
sudo apt-get install -y nodejs

# Install project dependencies
npm install

# Run the project
npm run dev

