import { CharacterController } from './src/adapters/controllers/Character.controller';
import { CollaboratorController } from './src/adapters/controllers/Collaborator.controller';
import { MigrationService } from './src/application/services/Migration.service';
import { SyncLogRepository } from './src/domain/repositories/SyncLog.repository';
import express, { Express, Request, Response } from 'express';
import { container } from './src/AppContainer';
import dotenv from 'dotenv';

const migrationService = container.resolve<MigrationService>('migrationService')
const syncLogRepository = container.resolve<SyncLogRepository>('syncLogRepository')

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const characterController = new CharacterController()
const collaboratorController = new CollaboratorController()

app.use(async (request, response, next) => {
  const lastSyncDate = await syncLogRepository.getLastDate()
  if (!lastSyncDate) {
    await migrationService.synchronize()
  }
  next()
})

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/characters/:code', async (req: Request, res: Response) => await characterController.getByCode(req, res));
app.get('/colaborators/:code', async (req: Request, res: Response) => await collaboratorController.getByCode(req, res));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});