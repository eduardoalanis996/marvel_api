import CharacterModel from "../models/Character";
import { ICharacterRepository } from "../interfaces/ICharacter.repository";
import { postgresConnection } from "../../common/persistence/PostgresConnection";

export class CharacterRepositoryImp implements ICharacterRepository {
    public async createMany(data: {
        id: number,
        code: string,
        name: string
    }[]): Promise<void> {
        try {
            await CharacterModel.bulkCreate(data, {
                updateOnDuplicate: ['id', 'name', 'code'],
            })
        } catch (e) {
            throw e
        }
    }

    public async getRelatedCharactersByCode(code: string): Promise<any> {
        try {
            const resultQuery = await postgresConnection.query(` 
            select DISTINCT comics."name" as comic_name, "characters"."name" as character_name from (
                select cc.comic_id from "characters" c 
                inner join character_comics cc on c.id  = cc.character_id 
                where c.code  = ?
            ) as tb 
                inner join character_comics on tb.comic_id = character_comics.comic_id
                inner join "characters" on character_comics.character_id = "characters"."id" and "characters".code != ?
                inner join comics on character_comics.comic_id = comics."id"`, { replacements: [code, code] })

            return resultQuery[0]
        } catch (e) {
            throw e
        }
    }

}