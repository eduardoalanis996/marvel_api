import { Comic } from "../entities/Comic";
import ComicModel from "../models/Comic";
import { IComicRepository } from "../interfaces/IComic.respository";

export class ComicRepositoryImpl implements IComicRepository {

    public async createMany(data: {
        id: number
        name: string
    }[]): Promise<void> {
        try {
            await ComicModel.bulkCreate(data, {
                updateOnDuplicate: ['id','name','updated_at'],
            })
        } catch (e) {
            throw e
        }
    }

}