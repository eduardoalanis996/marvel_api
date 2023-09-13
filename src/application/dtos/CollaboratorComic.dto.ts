import { CollaboratorComic } from "../../domain/entities/CollaboratorComic"

export class CollaboratorComicDto{

    public static getCollaboratorComicData(comicId:number, collaboratorData: { [key: string]: any }): CollaboratorComic {
        return {
            comicId,
            collaboratorId: collaboratorData.resourceURI.split('/').pop()
        }
    }
}