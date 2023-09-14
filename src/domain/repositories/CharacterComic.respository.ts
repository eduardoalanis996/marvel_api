import CharacterComicModel from "../models/CharacterComic";
import { ICharacterComicRepository } from "../interfaces/ICharacterComic.repository";

export class CharacterComicRepositoryImp implements ICharacterComicRepository {
    public async createMany(data: {
        characterId: number
        comicId: number
    }[]): Promise<void> {
        try {
            const findOrCreate = data.map((item) => {
                return CharacterComicModel.findOrCreate({
                    where: { comic_id: item.comicId, characterId: item.characterId }, defaults: item
                });
            })
            await Promise.all(findOrCreate)
        } catch (e) {
            throw e
        }
    }


}