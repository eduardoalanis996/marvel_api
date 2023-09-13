import { expect } from 'chai';
import { describe, it, before, after } from 'mocha';
import { MarvelRepositoryImpl } from '../../src/domain/repositories/Marvel.respository';

let marvelRepositoryImpl: MarvelRepositoryImpl
let characterId: number

describe('MarvelRepository', () => {

  before(() => {
    marvelRepositoryImpl = new MarvelRepositoryImpl()
  });

  it('should get character by name {Iron Man}', async () => {

    const res = await marvelRepositoryImpl.getCharacterByName('Iron Man')

    expect(res.code).to.equal(200);
    expect(res.status).to.equal('Ok');
    expect(res.data.total).to.equal(1);

    characterId = res.data.results[0].id
  });


  it(`should get comics by character id`, async () => {

    const res = await marvelRepositoryImpl.getComicByCharacterId(characterId)
    
    expect(res.code).to.equal(200);
    expect(res.status).to.equal('Ok');
    expect(res.data.total).gte(1)
  });


});
