export interface Post {
  id: string;
  user_id: string;
  status: number;
  title: string;
  ingress: string;
  content: string;
  deleted: boolean;
  publish_date: Date;
  createdAt: Date;
  updatedAt: Date;
}

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Posts",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 0,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      ingress: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      content: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      deleted: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 0,
      },
      published_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Posts",
    }
  );
};
