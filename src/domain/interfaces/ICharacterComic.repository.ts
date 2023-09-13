
export interface ICharacterComicRepository {
    createMany(data: any[]): Promise<void>
}