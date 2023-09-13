import { Request, Response } from 'express';
import { container } from "../../AppContainer"
import { CollaboratorService } from '../../application/services/Collaborator.service';


const collaboratorService = container.resolve<CollaboratorService>('collaboratorService')

export class CollaboratorController {

    async getByCode(req: Request, res: Response) {
        const collaborators = await collaboratorService.getCollaboratorOnCharacterByCode(req.params.code)
        const hasCollaborators = Object.keys(collaborators).length > 1
        if (hasCollaborators)
            res.status(200).send(collaborators)
        res.status(404).send({ message: 'Character not found', code: 'NOT_FOUND' })
    }

}