import { ICollaboratorRepository } from "../interfaces/ICollaborator.repository"
import CollaboratorModel from "../models/Collaborator"
import { postgresConnection } from "../../common/persistence/PostgresConnection"
import { Collaborator } from "../entities/Collaborator"

export class CollaboratorRepositoryImpl implements ICollaboratorRepository {

    public async createMany(data: {
        id: number,
        name: string,
        role: string
    }[]): Promise<void> {
        try {
            await CollaboratorModel.bulkCreate(data, {
                updateOnDuplicate: ['id', 'name', 'role'],
            })
        } catch (e) {
            throw e
        }
    }

    public async getAllByCharacterCode(code: string): Promise<Collaborator[]> {
        try {
            const resultQuery  =  await postgresConnection.query(`
            select distinct col.id, col.name, col."role" from "characters" c 
            inner join character_comics cc on c.id  = cc.character_id 
            inner join collaborator_comics col_co  on cc.comic_id  = col_co.comic_id 
            inner join collaborators col on col_co.collaborator_id  = col.id  
            where c.code = ?
            order by col.id`, { replacements: [code] })

            return resultQuery[0] as Collaborator[]
        } catch (e) {
            throw e
        }
    }

}