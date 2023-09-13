import { CharacterRepositoryImp } from "../../domain/repositories/Character.repository";
import { SyncLogRepository } from "../../domain/repositories/SyncLog.repository";

export class CharacterService {

    constructor(
        private readonly characterRepositoryImp: CharacterRepositoryImp,
        private readonly syncLogRepository: SyncLogRepository,
    ) { }

    public async getCharactersRelatedByCode(code: string) {
        const lastSyncDate = await this.syncLogRepository.getLastDate()

        const characters = await this.characterRepositoryImp.getRelatedCharactersByCode(code)

        const groupedByCharacter: Array<{ [key: string]: any }> = []

        characters.forEach((character: { [key: string]: any }) => {
            const { character_name } = character
            let characterIndex = null
            const hasCharacter = groupedByCharacter.find((item, index) => {
                characterIndex = index
                return item.character == character_name
            })
            if (hasCharacter && characterIndex) {
                groupedByCharacter[characterIndex].Comics.push(character.comic_name)
            } else {
                groupedByCharacter.push({ character: character_name, Comics: [character.comic_name] })
            }
        })

        return { characters: groupedByCharacter, last_sync: lastSyncDate.last_sync_date }

    }





}