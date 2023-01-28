import { DataTypes, Model } from 'sequelize';
import connection from '.';

class User extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  username: {
    type: DataTypes.STRING,
  },

  role: {
    type: DataTypes.STRING,
  },

  email: {
    type: DataTypes.STRING,
  },

  password: {
    type: DataTypes.STRING,
  },
}, {
  sequelize: connection,
  tableName: 'users',
  timestamps: false,
});

export default User;
