const uuidv1 = require('uuid/v1')
const { Pool } = require('pg');
const pool = new Pool();

async function dbAddProjectOwner (username, email, subscription_type) {
  const queryString = 'INSERT into "project-owners" (_id, username, email, subscription_type) VALUES ($1, $2, $3, $4)';
  const values = [uuidv1(), username, email, subscription_type];
  const response = await pool.query(queryString, values);
  return response;
}

module.exports = {
  dbAddProjectOwner,
}