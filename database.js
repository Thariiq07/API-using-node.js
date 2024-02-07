import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()

async function getNotes() {
  const [rows] = await pool.query("SELECT * FROM notes")
  return rows
}

async function getNote(id) {
  const [rows] = await pool.query(`
  SELECT * 
  FROM notes
  WHERE id = ?
  `, [id])
  return rows[0]
}

async function createNote(title, contents) {
  console.log(title,contents)
  const result = await pool.query(`
  INSERT INTO notes (title, contents)
  VALUES (?, ?)
  `, [title, contents])
  
   return result
}

async function updateNote(noteId, newTitle, newContents) {
  console.log(noteId, newTitle, newContents);
  const result = await pool.query(`
    UPDATE notes 
    SET title = ?, contents = ?
    WHERE id = ?
  `, [newTitle, newContents, noteId]);
  
  return result;
}

const result = await getNote(4)
console.log(result)

