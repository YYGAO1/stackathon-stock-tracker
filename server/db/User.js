const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN } = conn.Sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ENUM } = require("sequelize");
const JWT = process.env.JWT;

const User = conn.define("user", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  isAdmin: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isFA: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  avatar: {
    type: TEXT,
    get: function () {
      const prefix_PNG = "data:image/png;base64,";
      const prefix_JPEG = "data:image/jpeg;base64,";
      const prefix_JPG = "data:image/jpg;base64,";

      const data = this.getDataValue("avatar");
      if (!data) {
        return data;
      }
      if (data.startsWith(prefix_JPEG || prefix_PNG || prefix_JPG)) {
        return data;
      }
      return `${prefix_JPEG || prefix_PNG || prefix_JPG}${data}`;
    },
  },
  about: {
    type: TEXT,
  },
});

// User.prototype.createOrder = async function () {
//   const cart = await this.getCart();
//   cart.isCart = false;
//   await cart.save();
//   return cart;
// };

User.prototype.addToWatchlist = async function (_stock) {
  let stock = await conn.models.stock.findOne({
    where: {
      userId: this.id,
      ticker: _stock.ticker,
    },
  });
  if (!stock) {
    stock = await conn.models.stock.create({
      ticker: _stock.ticker,
      userId: this.id,
      name: _stock.name,
    });
  }
  return stock;
};

User.prototype.getWatchlist = async function () {
  let watchlist = await conn.models.stock.findAll({
    where: {
      userId: this.id,
    },
  });
  return watchlist;
};

User.prototype.updateStock = async function (_stock) {
  let stock = await conn.models.stock.findOne({
    where: {
      userId: this.id,
      ticker: _stock.ticker,
    },
  });
  if (stock) {
    await stock.update(_stock);
  }
  return stock;
};

User.prototype.removeFromWatchList = async function (_stock) {
  let stock = await conn.models.stock.findOne({
    where: {
      userId: this.id,
      ticker: _stock.ticker,
    },
  });
  if (stock) {
    await stock.destroy();
  }
  return stock;
};

// User.prototype.addToCart = async function ({ product, quantity }) {
//   const cart = await this.getCart();
//   let lineItem = cart.lineItems.find((lineItem) => {
//     return lineItem.productId === product.id;
//   });
//   if (lineItem) {
//     lineItem.quantity += quantity;
//     await lineItem.save();
//   } else {
//     await conn.models.lineItem.create({
//       orderId: cart.id,
//       productId: product.id,
//       quantity,
//     });
//   }
//   return this.getCart();
// };

// User.prototype.removeFromCart = async function ({ product, quantityToRemove }) {
//   const cart = await this.getCart();
//   const lineItem = cart.lineItems.find((lineItem) => {
//     return lineItem.productId === product.id;
//   });
//   lineItem.quantity = lineItem.quantity - quantityToRemove;
//   if (lineItem.quantity > 0) {
//     await lineItem.save();
//   } else {
//     await lineItem.destroy();
//   }
//   return this.getCart();
// };

User.addHook("beforeSave", async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.findByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
    if (user) {
      return user;
    }
    throw "user not found";
  } catch (ex) {
    const error = new Error("bad credentials");
    error.status = 401;
    throw error;
  }
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({
    where: {
      username,
    },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error("bad credentials");
  error.status = 401;
  throw error;
};

module.exports = User;
