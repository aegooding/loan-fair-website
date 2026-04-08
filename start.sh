#!/bin/sh
echo "DATABASE_URL set: ${DATABASE_URL:+true}"
echo "DATABASE_URL set: ${DATABASE_URL:-false}"
cd Backend
exec node src/server.js
