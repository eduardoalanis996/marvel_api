import { IMarvelRepository } from "../interfaces/IMarvel.repository";
import * as crypto from 'crypto';
import moment from "moment";
import axios from "axios"

export class MarvelRepositoryImpl implements IMarvelRepository {

    private MARVEL_API_URL
    private MARVEL_API_PUBLIC_KEY
    private MARVEL_API_PRIVATE_KEY

    constructor() {
        this.MARVEL_API_URL = process.env.MARVEL_API_URL
        this.MARVEL_API_PUBLIC_KEY = process.env.MARVEL_API_PUBLIC_KEY
        this.MARVEL_API_PRIVATE_KEY = process.env.MARVEL_API_PRIVATE_KEY

        console.log(process.env.MARVEL_API_URL,process.env.MARVEL_API_PUBLIC_KEY,process.env.MARVEL_API_PRIVATE_KEY)
    }

    private getAutenticationParams(): string {
        const ts = moment().unix();
        const hash = crypto.createHash('md5').update(`${ts.toString()}${this.MARVEL_API_PRIVATE_KEY}${this.MARVEL_API_PUBLIC_KEY}`).digest("hex")
        return `apikey=${this.MARVEL_API_PUBLIC_KEY}&hash=${hash}&ts=${ts}`
    }

    public async getComicByCharacterId(id: number): Promise<{ [key: string]: any }> {
        try {
            const authParams = this.getAutenticationParams()
            const result = await axios.get(`${this.MARVEL_API_URL}characters/${id}/comics?${authParams}`)
            return result.data
        } catch (e) {
            throw new Error("Error getCharacterByName");
        }
    }

    public async getCharacterByName(name: string): Promise<{ [key: string]: any }> {
        try {
            const authParams = this.getAutenticationParams()
            const result = await axios.get(`${this.MARVEL_API_URL}characters?name=${name}&${authParams}`)
            return result.data
        } catch (e) {
            throw new Error("Error getCharacterByName");
        }
    }

    public async getCharacterIdByName(name: string): Promise<number> {
        const authParams = this.getAutenticationParams()
        try {
            const result = await axios.get(`${this.MARVEL_API_URL}characters?name=${name}&${authParams}`)
            return result.data.data.results[0]?.id
        } catch (e) {
            console.log(e,authParams,`${this.MARVEL_API_PRIVATE_KEY}${this.MARVEL_API_PUBLIC_KEY}`)
            throw new Error("Error getCharacterByName");
        }
    }

    public async getComicsByCharacterId(characterIds: number[]): Promise<Array<{ [key: string]: any }>> {
        try {
            const charactersIdParam = characterIds.join(',')
            const authParams = this.getAutenticationParams()
            const result = await axios.get(`${this.MARVEL_API_URL}comics?limit=10format=comic&characters=${charactersIdParam}&${authParams}`)
            return result.data.data.results
        } catch (e) {
            console.log(e)
            throw new Error("Error getCharacterByName");
        }
    }

}