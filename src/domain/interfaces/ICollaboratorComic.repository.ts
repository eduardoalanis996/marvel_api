import { CollaboratorComic } from "../entities/CollaboratorComic"

export interface ICollaboratorComicRepository {
    createMany(data: CollaboratorComic[]): Promise<void>
}