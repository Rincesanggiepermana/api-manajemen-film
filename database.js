const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./movies.db', (err) => {
  if (err) {
    console.error('Gagal terhubung ke database:', err.message);
  } else {
    console.log('Berhasil terhubung ke database SQLite.');
  }
});

// TABEL MOVIES
db.run(`CREATE TABLE IF NOT EXISTS movies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  year INTEGER NOT NULL
)`);

// TABEL DIRECTORS 
db.run(`CREATE TABLE IF NOT EXISTS directors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  nationality TEXT
)`);

// TABEL USERS (DENGAN ROLE)
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user'
)`, (err) => {
  if (err) {
    console.error("Gagal membuat tabel users:", err.message);
  }
});

module.exports = db;
