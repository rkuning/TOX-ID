const { tokenVerify } = require("../helpers");

const authUser = (req, res, next) => {
  const { access_token } = req.headers;
  if (access_token) {
    try {
      req.userData = tokenVerify(access_token);
      next();
    } catch (error) {
      res.status(401).json({ message: "Cannot auth the token!" });
    }
  } else {
    res.status(403).json({ message: `Forbidden! Login to access this route!` });
  }
};

module.exports = authUser;
