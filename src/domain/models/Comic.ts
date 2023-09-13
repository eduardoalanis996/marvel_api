import { postgresConnection } from "../../common/persistence/PostgresConnection";
import CharacterModel from "./Character";
import { DataTypes } from 'sequelize'

const ComicModel = postgresConnection.define('Comic', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//ComicModel.belongsToMany(CharacterModel, { through: 'CharacterComicModel' });

postgresConnection.sync();

export default ComicModel