export class CharacterComicDTO {

    public static getCharacterComicData(comicId:number, characterData: { [key: string]: any }): any {
        return {
            comicId,
            characterId: +characterData.resourceURI.split('/').pop()
        }
    }

}