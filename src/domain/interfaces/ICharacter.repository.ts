import { Character } from "../entities/Character"

export interface ICharacterRepository {
    createMany(data: Character[]): Promise<void>
    getRelatedCharactersByCode(code: string): Promise<any>
}