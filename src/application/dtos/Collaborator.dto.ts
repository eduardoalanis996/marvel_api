import { Collaborator } from "../../domain/entities/Collaborator"

export class CollaboratorDTO{

    public static getCollaboratorOnComicInfo(data: { [key: string]: any }): Collaborator {
        return {
            id: data.resourceURI.split('/').pop(),
            name: data.name,
            role: data.role
        }
    }

}