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

async function dbDeleteProjectOwner (id) {
  const queryString = 'DELETE FROM "project-owners" where _id = ($1)::uuid RETURNING *';
  const values = [id];
  const response = await pool.query(queryString, values);
  return response;
}

async function dbGetProjectOwner (id) {
  const queryString = 'SELECT _id, username, email, subscription_type FROM "project-owners" where _id = ($1)::uuid';
  const values = [id];
  const response = await pool.query(queryString, values);
  return response;
}

async function dbGetAllProjectOwner () {
  const queryString = 'SELECT _id, username, email, subscription_type FROM "project-owners"';
  const response = await pool.query(queryString);
  return response;
}

module.exports = {
  dbAddProjectOwner,
  dbDeleteProjectOwner,
  dbGetProjectOwner,
  dbGetAllProjectOwner,
}