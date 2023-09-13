import { SyncLog } from "../entities/SyncLog";
import { ISyncLogRepository } from "../interfaces/ISyncLog.respository";
import SyncLogModel from "../models/SyncLog";

export class SyncLogRepository implements ISyncLogRepository {

    public async addNewDate(): Promise<void> {
        await SyncLogModel.create({ last_sync_date: new Date() })
    }

    public async getLastDate(): Promise<any> {

       const resultQuery = await SyncLogModel.findOne({
            order: [['last_sync_date', 'DESC']]
        }) 

        return resultQuery
    }

}