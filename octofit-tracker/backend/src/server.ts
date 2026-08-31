import { startServer } from './app.js';

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

console.log(`OctoFit API base URL: ${baseUrl}`);

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
