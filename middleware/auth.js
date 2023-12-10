const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../data/key");

exports.verify = (req, res, next) => {
  const { token } = req.headers;

  jwt.verify(token, SECRET_KEY, function (err, decoded)  {
    if(err){
        res.send('un Authorized');
        return
    }
    req.email = decoded.email;
    next();
  });
};
