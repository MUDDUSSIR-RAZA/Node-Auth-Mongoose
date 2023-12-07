const { createUser, findUser } = require("../model/user");

exports.createUser = async (email, password) => {
  try {
    const user = await findUser(email);
    if (user) {
      return "User Already Exist!";
    }
    const resp = await createUser(email, password);
    return resp;
  } catch (err) {
    throw err;
  }
};

exports.login = (email, password) => {
  try {
    const user = findUser(email);
    if (!!user) return "Wrong Email or Password";
    return "User Successfully Login";
  } catch (err) {
    throw err;
  }
};
