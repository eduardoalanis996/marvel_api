import CollaboratorComicModel from "../models/CollaboratorComic";
import { ICollaboratorComicRepository } from "../interfaces/ICollaboratorComic.repository";

export class CollaboratorComicRepositoryImpl implements ICollaboratorComicRepository {

    public async createMany(data: {
        collaboratorId: number
        comicId: number
    }[]): Promise<void> {
        try {
            const findOrCreate = data.map((item) => {
                return CollaboratorComicModel.findOrCreate({
                    where: { comic_id: item.comicId, collaborator_id: item.collaboratorId }, defaults: item
                });
            })
            await Promise.all(findOrCreate)
        } catch (e) {
            throw e
        }
    }

}