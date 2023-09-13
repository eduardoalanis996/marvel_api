import { Comic } from "../entities/Comic"

export interface IComicRepository {
    createMany(data: Comic[]): Promise<void>
}