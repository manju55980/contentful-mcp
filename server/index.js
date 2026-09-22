import express from 'express';
import 'dotenv/config';
import * as example from './routes/example/index.js';

const app = express();
app.use(express.json());
const port = Number(process.env.PORT || 4000);

async function main() {
  await example.init?.();
  app.get('/health', (_req, res) => res.json({ ok: true }));
  app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
