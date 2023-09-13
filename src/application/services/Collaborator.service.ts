import { CollaboratorRepositoryImpl } from "../../domain/repositories/Collaborator.repository"
import { SyncLogRepository } from "../../domain/repositories/SyncLog.repository"

export class CollaboratorService {

    constructor(
        private readonly collaboratorRepositoryImpl: CollaboratorRepositoryImpl,
        private readonly syncLogRepository: SyncLogRepository,
    ) { }

    public async getCollaboratorOnCharacterByCode(code: string): Promise<{ [key: string]: any }> {
        const lastSyncDate = await this.syncLogRepository.getLastDate()
        const collaborators = await this.collaboratorRepositoryImpl.getAllByCharacterCode(code)
        const groupedByRole: { [key: string]: any } = {}

        collaborators.forEach((collaborator) => {
            const { role } = collaborator
            if (groupedByRole.hasOwnProperty(role)) {
                groupedByRole[role].push(collaborator.name)
            } else {
                groupedByRole[role] = [collaborator.name]
            }
        })

        return {...groupedByRole, last_sync: lastSyncDate.last_sync_date}
    }

}

