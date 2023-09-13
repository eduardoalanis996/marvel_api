import { CollaboratorComicRepositoryImpl } from "../../domain/repositories/CollaboratorComic.repository";
import { CharacterComicRepositoryImp } from "../../domain/repositories/CharacterComic.respository";
import { CollaboratorRepositoryImpl } from "../../domain/repositories/Collaborator.repository";
import { CharacterRepositoryImp } from "../../domain/repositories/Character.repository";
import { MarvelRepositoryImpl } from "../../domain/repositories/Marvel.respository";
import { ComicRepositoryImpl } from "../../domain/repositories/Comic.repository";
import { CollaboratorComic } from "../../domain/entities/CollaboratorComic";
import { CollaboratorComicDto } from "../dtos/CollaboratorComic.dto";
import { CharacterComic } from "../../domain/entities/CharacterComic";
import { Collaborator } from "../../domain/entities/Collaborator";
import { CharacterComicDTO } from "../dtos/CharacterComic.dto";
import { Character } from "../../domain/entities/Character";
import { CollaboratorDTO } from "../dtos/Collaborator.dto";
import { CharacterDTO } from "../dtos/Character.dto";
import { Comic } from "../../domain/entities/Comic";
import { ComicDTO } from "../dtos/Comic.dto";

const DEFAULT_CHARACTERS = ['Iron Man', 'Captain America']

export class MigrationService {

    private MARVEL_CHARACTERS

    constructor(
        private readonly marvelRepositoryImpl: MarvelRepositoryImpl,
        private readonly comicRepositoryImpl: ComicRepositoryImpl,
        private readonly collaboratorRepositoryImpl: CollaboratorRepositoryImpl,
        private readonly characterRepositoryImp: CharacterRepositoryImp,
        private readonly characterComicRepositoryImp: CharacterComicRepositoryImp,
        private readonly collaboratorComicRepositoryImpl: CollaboratorComicRepositoryImpl
    ) {
        this.MARVEL_CHARACTERS = process.env.MARVEL_CHARACTERS?.split('|') || DEFAULT_CHARACTERS
    }

    public async synchronize(): Promise<void> {

        const characters: Character[] = []
        const comics : Comic[] = []
        const collaborators: Collaborator[] = []
        const characterComics: CharacterComic[] = []
        const collaboratorComics:CollaboratorComic[] = []

        try{
            const getCharacterByName = this.MARVEL_CHARACTERS.map((name) => { return this.marvelRepositoryImpl.getCharacterIdByName(name) })

            const characterIdS = await Promise.all(getCharacterByName)
    
            const comicsByCharacterIds = await this.marvelRepositoryImpl.getComicsByCharacterId(characterIdS)
    
            comicsByCharacterIds.forEach((comic) => {
    
                comics.push(ComicDTO.getComicInfo(comic))
    
                comic.characters.items.forEach((character: { [key: string]: any }) => {
    
                    if (!characters.find(c => c.id == character.resourceURI.split('/').pop())) {
                        characters.push(CharacterDTO.getCharacterOnComicInfo(character))
                    }
                    characterComics.push(CharacterComicDTO.getCharacterComicData(comic.id, character))
                });
    
                comic.creators.items.forEach((collaborator: { [key: string]: any }) => {
                    if (!collaborators.find(c => c.id == collaborator.resourceURI.split('/').pop())) {
                        collaborators.push(CollaboratorDTO.getCollaboratorOnComicInfo(collaborator))
                    }
                    collaboratorComics.push(CollaboratorComicDto.getCollaboratorComicData(comic.id, collaborator))
                });
    
            })
    
            const comicsDataToInsert = Array.from(new Set(comics))
            const collaboratorsDataToInsert = Array.from(new Set(collaborators))
            const characterDataToInsert = Array.from(new Set(characters))
    
            await this.comicRepositoryImpl.createMany(comicsDataToInsert)
            await this.collaboratorRepositoryImpl.createMany(collaboratorsDataToInsert)
            await this.characterRepositoryImp.createMany(characterDataToInsert)
            await this.characterComicRepositoryImp.createMany(characterComics)
            await this.collaboratorComicRepositoryImpl.createMany(collaboratorComics)
        }catch(e){
            console.log(e, 'MIGRATION')
        }
    }


}