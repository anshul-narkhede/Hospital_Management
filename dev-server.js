
const { spawn } = require('child_process');

console.log('Starting development server...');
const vite = spawn('npx', ['vite'], { stdio: 'inherit', shell: true });

vite.on('error', (error) => {
  console.error('Failed to start development server:', error);
});
