const { createUserM } = require("../model/authM");
const bcrypt = require("bcrypt");

exports.createUserM = async (email, password) => {
  try {
    const hashPass = await bcrypt.hash(password, 12);
    return await createUserM(email, hashPass);
  } catch (err) {
    if (err.name === "ValidationError") {
      throw err.errors['email'].message ;
    } else {
      throw err;
    }
  }
};