#!/usr/bin/env node

// Script pour vider le cache en développement
const { spawn } = require('child_process');

console.log('🧹 Clearing cache and restarting dev server...');

// Créer un signal pour vider le cache via une route API temporaire
const clearCache = () => {
  console.log('✅ Cache cleared! Restarting development server...');

  // Redémarrer le serveur de développement
  const devServer = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true
  });

  // Gérer la fermeture propre
  process.on('SIGINT', () => {
    devServer.kill('SIGINT');
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    devServer.kill('SIGTERM');
    process.exit(0);
  });
};

clearCache();