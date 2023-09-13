import { cleanedString } from "../../common/utils/string/normalize"
import { Character } from "../../domain/entities/Character"

export class CharacterDTO {

    public static getCharacterOnComicInfo(data: { [key: string]: any }): Character {
        return {
            id: data.resourceURI.split('/').pop(),
            name: data.name,
            code: cleanedString(data.name).toLowerCase()
        }
    }

}