import { Comic } from "../../domain/entities/Comic"

export class ComicDTO {

    public static getComicInfo(data: { [key: string]: any }): Comic {
        return {
            id: data.id,
            name: data.title,
        }
    }

}