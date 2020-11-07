const sqlite3 = require('sqlite3').verbose();
const path = require('path')
const dbPath = path.resolve(__dirname, 'todo.db')
const sql = new sqlite3.Database(dbPath)

async function tableCoins(){
  await sql.run('CREATE TABLE IF NOT EXISTS users (usersUnique TEXT, iduser TEXT, idserver TEXT, level INTEGER, xp INTEGER, coins INTEGER, robos INTEGER, status INTEGER)')
  await sql.run('CREATE TABLE IF NOT EXISTS cooldowns (iduser TEXT, comando TEXT, tiempo TEXT, estado INTEGER)')
}

module.exports = {
  createTables: async function(){
    try {
      await tableCoins();
      
      } catch (e) {
      console.error(e)
    }
  }
}