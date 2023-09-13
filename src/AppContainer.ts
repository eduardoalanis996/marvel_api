import { asClass, createContainer } from "awilix";
import { CharacterService } from "./application/services/Character.service";
import { MigrationService } from "./application/services/Migration.service";
import { CollaboratorService } from "./application/services/Collaborator.service";


import { MarvelRepositoryImpl } from "./domain/repositories/Marvel.respository";
import { ComicRepositoryImpl } from "./domain/repositories/Comic.repository";
import { CollaboratorRepositoryImpl } from "./domain/repositories/Collaborator.repository";
import { CharacterRepositoryImp } from "./domain/repositories/Character.repository";
import { CharacterComicRepositoryImp } from "./domain/repositories/CharacterComic.respository";
import { CollaboratorComicRepositoryImpl } from "./domain/repositories/CollaboratorComic.repository";

import dotenv from 'dotenv';

dotenv.config();

const container = createContainer({
    injectionMode: 'CLASSIC'
})

container.register({
    // Services
    characterService: asClass(CharacterService).scoped(),
    migrationService: asClass(MigrationService).scoped(),
    collaboratorService: asClass(CollaboratorService).scoped(),
    
    //Repositories
    marvelRepositoryImpl: asClass(MarvelRepositoryImpl).scoped(),
    comicRepositoryImpl: asClass(ComicRepositoryImpl).scoped(),
    collaboratorRepositoryImpl: asClass(CollaboratorRepositoryImpl).scoped(),
    characterRepositoryImp: asClass(CharacterRepositoryImp).scoped(),
    characterComicRepositoryImp: asClass(CharacterComicRepositoryImp).scoped(),
    collaboratorComicRepositoryImpl: asClass(CollaboratorComicRepositoryImpl).scoped()
})


export { container }