import { Request, Response } from 'express';
import { container } from "../../AppContainer"
import { CharacterService } from '../../application/services/Character.service';

const characterService = container.resolve<CharacterService>('characterService')

export class CharacterController {

    async getByCode(req: Request, res: Response) {
        const characters = await characterService.getCharactersRelatedByCode(req.params.code)
        const hasCharacters = characters.characters.length > 1
        if (hasCharacters)
            res.status(200).json(characters)
        res.status(404).json({ message: 'Character not found', code: 'NOT_FOUND' })
    }

}