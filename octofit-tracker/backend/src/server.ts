import express from 'express';

const app = express();
const port = 8000;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on http://localhost:${port}`);
});
