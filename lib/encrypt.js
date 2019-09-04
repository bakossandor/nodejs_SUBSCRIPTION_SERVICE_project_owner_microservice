const bcrypt = require('bcrypt');

const round = 10;

async function encryptPassword(password) {
  return await bcrypt.hash(password, round);
}

module.exports = {
  encryptPassword,
}