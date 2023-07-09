/* eslint-disable no-unused-vars */
import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const init_interns = (sequelize, Types) => {
  class interns extends Model {}
  interns.init(
    {
      Name: DataTypes.STRING,
      Email: DataTypes.STRING,
      Phone: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Interns",
    }
  );

  return interns;
};

export default init_interns(connection, DataTypes);
