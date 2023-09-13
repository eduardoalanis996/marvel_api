import { postgresConnection } from "../../common/persistence/PostgresConnection";
import { DataTypes } from 'sequelize'

const SyncLogModel = postgresConnection.define('SyncLog', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    last_sync_date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
});

postgresConnection.sync();

export default SyncLogModel