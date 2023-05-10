const { UUID, UUIDV4, STRING } = require("sequelize");
const conn = require("./conn");

const Stock = conn.define("stock", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  ticker: {
    type: STRING,
    allowNull: false,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = Stock;
