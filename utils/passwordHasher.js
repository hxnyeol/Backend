const bcrypt = require("bcrypt");
const salt = 10;

async function hashPassword(pwd) {
  return await bcrypt.hash(pwd, salt);
}

async function cmpPass(pwd, hashPwd) {
  return await bcrypt.compare(pwd, hashPwd);
}

module.exports = { hashPassword, cmpPass };
