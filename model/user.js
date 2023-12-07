const fs = require("fs");
const path = require("path");
const { uuid } = require("uuidv4");

const usersPath = path.join(process.cwd(), "data", "users.json");

const readData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(usersPath, (err, data) => {
      if (err) return reject(err);
      resolve(JSON.stringify(data.toString()));
    });
  });
};

const writeData = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(usersPath, data, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

exports.findUser = async (email) => {
  try {
    const users = await readData();
    const user = users.find((u) => users.email === email);
    return user;
  } catch (err) {
    throw err;
  }
};

exports.createUser = async (email, password) => {
  try {
    const existingUsers = await readData();
    const updatedUsers = [...existingUsers, { email, password, id: uuid() }];
    await writeData(updatedUsers);
    return "User Successfully Created";
  } catch (err) {
    throw err;
  }
};
