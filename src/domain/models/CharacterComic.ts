import { postgresConnection } from "../../common/persistence/PostgresConnection";
import CharacterModel from "./Character";
import { DataTypes } from 'sequelize'

const CharacterComicModel = postgresConnection.define('CharacterComic', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    characterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comicId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

postgresConnection.sync();

export default CharacterComicModel