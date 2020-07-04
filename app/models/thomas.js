const { Sequelize, Model } = require('sequelize');

const { sequelize } = require('../../core/db');

class ThomasModel extends Model {}

ThomasModel.init(
  {
    file_id: {
      type: Sequelize.SMALLINT(),
      unsigned: true,
      autoIncrement: true,
      primaryKey: true,
    },

    file_name: {
      type: Sequelize.STRING(128),
      unique: true,
      allowNull: false,
    },
    file_size: {
      type: Sequelize.STRING(12),
      allowNull: false,
      set(val) {
        const size = `${(val / 1024).toFixed(2)} KB`;
        this.setDataValue('file_size', size);
      },
    },
    file_path: {
      type: Sequelize.STRING(128),
      unique: true,
      allowNull: false,
    },
    upload_time: {
      type: Sequelize.STRING(64),
      allowNull: true,
      get() {
        if (!this.getDataValue('upload_time')) {
          return '';
        }
        const t = parseInt(this.getDataValue('upload_time'));
        return new Date(t).toLocaleString();
      },
    },
    operate_author: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'thomas',
  }
);

module.exports = {
  ThomasModel,
};
