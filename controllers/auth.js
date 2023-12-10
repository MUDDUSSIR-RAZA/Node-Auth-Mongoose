const { createUser, findUser } = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (email, password) => {
  try {
    const hashPass = await bcrypt.hash(password, 12);
    return await createUser(email, hashPass);
  } catch (err) {
    if (err.name === "ValidationError") {
      throw err.errors["email"].message;
    } else {
      throw err;
    }
  }
};

exports.login = async (email, password) => {
  try {
    const user = await findUser(email);
    if (!user) return "Wrong Email!";

    const result = await bcrypt.compare(password, user.password);
    if (!result) return "Wrong Password!";
    
    let token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    return { token };
  } catch (err) {
    throw err;
  }
};
