import { expect } from 'chai';
import { describe, it} from 'mocha';
import { CharacterRepositoryImp } from '../src/domain/repositories/Character.repository';

describe('CharacterRepository', () => {

    it('should get related characters by name {Iron Man - ironman}', async () => {

        const characterRepositoryImp = new CharacterRepositoryImp()

        const res = await characterRepositoryImp.getRelatedCharactersByCode('ironman')

        expect(res).length.gte(0)
    });



});
