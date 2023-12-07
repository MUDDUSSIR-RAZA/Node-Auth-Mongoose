const { createUser, findUser } = require("../model/user");
const bcrypt = require("bcrypt");

exports.createUser = async (email, password) => {
  console.log("user");
  try {
    const user = await findUser(email);
    console.log(user);
    if (user) {
      return "User Already Exist!";
    }
    const hashPass = await bcrypt.hash(password, 12);
    const resp = await createUser(email, hashPass);
    return resp;
  } catch (err) {
    throw err;
  }
};

exports.login = async (email, password) => {
  try {
    const user = await findUser(email);
    if (!user) return "Wrong Email";
    
    const result = await bcrypt.compare(password, user.password);
    if (!result) return "Wrong Password";

    return "Login Successfully";
  } catch (err) {
    throw err;
  }
};
