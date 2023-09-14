import { expect } from 'chai';
import { describe, it} from 'mocha';
import { CollaboratorRepositoryImpl } from '../src/domain/repositories/Collaborator.repository';

describe('CharacterRepository', () => {

    it('should get related characters by name {Iron Man - ironman}', async () => {

        const collaboratorRepositoryImpl = new CollaboratorRepositoryImpl()

        const res = await collaboratorRepositoryImpl.getAllByCharacterCode('ironman')

        expect(res).length.gte(0)
    });

});
