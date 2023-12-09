const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    validate: {
      validator: async function (email) {
        const existingUser = await this.constructor.findOne({ email });
        return !existingUser;
      },
      message: "Email already exists!",
    },
  },
  password: String,
});

const Users = mongoose.model("User", userSchema);

module.exports = Users;
