const { Sequelize, Model } = require("sequelize");
const { sequelize } = require("../../core/db");
const { secretUtile } = require("../../core/utile");

class UserModel extends Model { }

UserModel.init(
  {
    user_id: {
      type: Sequelize.INTEGER(11),
      unsigned: true,
      autoIncrement: true,
      primaryKey: true,
    },
    org_id: {
      type: Sequelize.INTEGER(11),
      unsigned: true,
      allowNull: false,
    },
    account: {
      type: Sequelize.STRING(128),
      unique: true,
      allowNull: false,
    },
    secret: {
      type: Sequelize.STRING(128),
      allowNull: false,
      set(val) {
        const pwd = secretUtile.generateSecret(val);
        this.setDataValue("secret", pwd);
      },
      unique: true
    },
    nick_name: {
      type: Sequelize.STRING(128),
      allowNull: true,
    },
    create_by: {
      type: Sequelize.INTEGER(11),
      unsigned: true,
      allowNull: true,
    },
    state_code: {
      type: Sequelize.TINYINT,
      unsigned: true,
      defaultValue: 1,
    },
    sms_code: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

module.exports = {
  UserModel,
};
