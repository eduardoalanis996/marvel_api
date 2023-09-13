import { MigrationController } from './src/adapters/controllers/Migration.controller';
import { CollaboratorController } from './src/adapters/controllers/Collaborator.controller';
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const migrationController = new MigrationController()
const collaboratorController = new CollaboratorController()

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/test', async (req: Request, res: Response) => await migrationController.test(req, res));
app.get('/colaborators/:code', async (req: Request, res: Response) => await collaboratorController.getByCode(req, res));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});