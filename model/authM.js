const Users = require("../model/db/users");

exports.createUserM = async (email, password) => {
  try {
    const user = new Users({
      email: email,
      password: password,
    });
    await user.save();
    return "User Successfully SigUp!"
  } catch (err) {
    throw err;
  }
};

exports.findUserM = async (email) => {
  try {
    return await Users.findOne({ email });
  } catch (err) {
    throw err;
  }
};
