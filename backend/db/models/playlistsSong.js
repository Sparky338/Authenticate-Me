'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlaylistsSong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PlaylistsSong.belongsTo(models.Playlist, {foreignKey: "playlistId"})
      PlaylistsSong.belongsTo(models.Song, {foreignKey: "songId"})
    }
  }
  PlaylistsSong.init({
    playlistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'
    },
    songId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'
    },
  }, {
    sequelize,
    modelName: 'PlaylistsSong',
  });
  return PlaylistsSong;
};
