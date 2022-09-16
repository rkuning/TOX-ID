const bcrypt = require("bcrypt");
const saltRound = 7;

const encryptPw = (password) => {
  return bcrypt.hashSync(String(password), saltRound);
};

const decryptPw = (password, hashPwd) => {
  return bcrypt.compareSync(String(password), hashPwd);
};

module.exports = { encryptPw, decryptPw };
