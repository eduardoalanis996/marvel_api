import { Collaborator } from "../entities/Collaborator"

export interface ICollaboratorRepository{
    createMany(data: Collaborator[]): Promise<void>
    getAllByCharacterCode(code: string): Promise<any>
}