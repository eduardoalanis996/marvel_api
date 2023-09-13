import { postgresConnection } from "../../common/persistence/PostgresConnection";
import { DataTypes } from 'sequelize'

const CollaboratorModel = postgresConnection.define('Collaborator', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});



postgresConnection.sync();

export default CollaboratorModel