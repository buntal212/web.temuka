#!/bin/sh
set -e

# If node_modules or quasar binary is missing, install dependencies inside container
if [ ! -d "/app/node_modules" ] || [ ! -f "/app/node_modules/.bin/quasar" ]; then
    echo "node_modules not found, running npm install inside container..."
    npm install
fi

exec "$@"
