import { postgresConnection } from "../../common/persistence/PostgresConnection";
import { DataTypes } from 'sequelize'

const CollaboratorComicModel = postgresConnection.define('CollaboratorComic', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }, 
    collaboratorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comicId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

postgresConnection.sync();

export default CollaboratorComicModel