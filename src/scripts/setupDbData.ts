import express, { Express } from 'express';
import { MigrationService } from '../application/services/Migration.service';
import { container } from '../AppContainer';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 30000

const migrationService = container.resolve<MigrationService>('migrationService')


const server = app.listen(port, async () => {

    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    console.log(`Synchronize data....`);

    await migrationService.synchronize()

    server.close(() => {
        console.log('Migration Successfully.');
    });
});
