import { postgresConnection } from "../../common/persistence/PostgresConnection";
import ComicModel from "./Comic";
import { DataTypes } from 'sequelize'

const CharacterModel = postgresConnection.define('Character', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

postgresConnection.sync();

export default CharacterModel