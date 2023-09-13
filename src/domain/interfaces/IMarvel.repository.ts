export interface IMarvelRepository {

    getCharacterByName(name: string): Promise<{ [key: string]: any }>
    getComicByCharacterId(id: number): Promise<{ [key: string]: any }>
    getCharacterIdByName(name: string): Promise<number>
    getComicsByCharacterId(characterIds: number[]): Promise<Array<{ [key: string]: any }>>

}