#!/bin/sh
echo "=== ENV VARS AVAILABLE ==="
env | grep -i database || echo "No DATABASE* vars found"
env | grep -i railway || echo "No RAILWAY* vars found"
echo "========================="
cd Backend
exec node src/server.js
