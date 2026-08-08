#!/bin/bash
# =================================================================
# AURA TEXTILES B2B EXPORT — 1-CLICK PRODUCTION DEPLOYMENT SCRIPT
# Node.js v22 + Vite + MongoDB + PM2 + Nginx Reverse Proxy
# =================================================================

set -e

echo "🚀 Starting Production Build & Server Deployment..."

# 1. Build Frontend Production Bundle
echo "📦 Building Web Frontend (Vite + React 19)..."
cd web
npm install
npm run build
cd ..

echo "✅ Web Frontend compiled into web/dist/"

# 2. Check Server SSH Credentials Parameter
if [ -z "$1" ]; then
  echo ""
  echo "================================================================="
  echo "📌 USAGE: ./deploy.sh user@your-server-ip your-subdomain.com"
  echo "Example: ./deploy.sh root@192.168.1.100 b2b.auratextiles.in"
  echo "================================================================="
  exit 1
fi

SERVER_HOST="$1"
SUBDOMAIN="${2:-b2b.auratextiles.in}"
REMOTE_PATH="/var/www/aura-b2b"

echo "🌐 Deploying to Server: $SERVER_HOST"
echo "🔗 Subdomain: $SUBDOMAIN"

# 3. Create Remote Server Directory & Upload Build Artifacts
echo "📡 Uploading files to $SERVER_HOST:$REMOTE_PATH..."
ssh $SERVER_HOST "mkdir -p $REMOTE_PATH/server $REMOTE_PATH/web/dist"

rsync -avz --delete web/dist/ $SERVER_HOST:$REMOTE_PATH/web/dist/
rsync -avz --exclude 'node_modules' --exclude '.env' server/ $SERVER_HOST:$REMOTE_PATH/server/

# 4. Install Server Dependencies & Start PM2
echo "⚙️ Installing server dependencies & starting PM2 process..."
ssh $SERVER_HOST << EOF
  cd $REMOTE_PATH/server
  npm install --production

  # Create .env if missing
  if [ ! -f .env ]; then
    echo "PORT=5050" > .env
    echo "MONGODB_URI=mongodb://127.0.0.1:27017/aura_textiles_b2b" >> .env
  fi

  # Start or Restart PM2
  if pm2 list | grep -q "aura-b2b-api"; then
    pm2 restart aura-b2b-api
  else
    pm2 start index.js --name "aura-b2b-api"
    pm2 save
  fi
EOF

echo ""
echo "================================================================="
echo "🎉 DEPLOYMENT COMPLETE!"
echo "🌐 API Server Running on Port 5050 (PM2 Managed)"
echo "📁 Production Web Files uploaded to $REMOTE_PATH/web/dist"
echo "================================================================="
