import CharacterModel from "../models/Character";
import { ICharacterRepository } from "../interfaces/ICharacter.repository";

export class CharacterRepositoryImp implements ICharacterRepository
{
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
            console.log(e)
            throw e
        }
    }


}