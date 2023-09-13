import { SyncLog } from "../entities/SyncLog"

export interface ISyncLogRepository {
    addNewDate(): Promise<void>
    getLastDate(): Promise<SyncLog>
}