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
  const queryString = 'SELECT _id, username, email, subscription_type FROM "project-owners" WHERE _id = ($1)::uuid';
  const values = [id];
  const response = await pool.query(queryString, values);
  return response;
}

async function dbGetUserPassword (id) {
  const queryString = 'SELECT _id, password FROM "project-owners" WHERE _id = ($1)::uuid';
  const values = [id];
  const { rows: [data] } = await pool.query(queryString, values);
  if (!data) {
    const message = 'Bad request';
    const error = new Error(message);
    error.statusCode = 400;
    throw error;
  }
  return data;
}

async function dbGetAllProjectOwner () {
  const queryString = 'SELECT _id, username, email, subscription_type FROM "project-owners"';
  const response = await pool.query(queryString);
  return response;
}

async function dbPatchProjectOwner (column, newValue, _id) {
  const queryString = `UPDATE "project-owners" SET ${column} = $1 WHERE _id = ($2)::uuid RETURNING _id, username, email, subscription_type`
  const values = [newValue, _id]
  const response = await pool.query(queryString, values);
  return response;
}

module.exports = {
  dbAddProjectOwner,
  dbDeleteProjectOwner,
  dbGetProjectOwner,
  dbGetAllProjectOwner,
  dbPatchProjectOwner,
  dbGetUserPassword
}