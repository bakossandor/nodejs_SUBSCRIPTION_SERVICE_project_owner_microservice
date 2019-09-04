const uuidv1 = require('uuid/v1');
const { Pool } = require('pg');
const pool = new Pool();

const { encryptPassword } = require('../lib/encrypt');

async function dbAddProjectOwner (username, email, password, subscription_type) {
  const hashedPassword = await encryptPassword(password);
  const queryString = 'INSERT into "project-owners" (_id, username, email, password, subscription_type) VALUES ($1, $2, $3, $4, $5)';
  const values = [uuidv1(), username, email, hashedPassword, subscription_type];
  const response = await pool.query(queryString, values);
  return response;
}

module.exports = {
  dbAddProjectOwner,
}