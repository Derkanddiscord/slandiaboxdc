const queries = require("./queries.js");
// CREATE TABLE IF NOT EXISTS users (usersUnique TEXT, iduser TEXT, idserver TEXT, level INTEGER, xp INTEGER, coins INTEGER, robos INTEGER, status INTEGER)')

module.exports = {
  exists: async function(iduser, idserver) {
    let query = "SELECT * FROM users WHERE iduser = ? AND idserver = ? LIMIT 1";
    let result = await queries.getQuery(query, [iduser, idserver]);
    //[]

    if (result != undefined) {
      return true;
    }
    return false;
  },
  registerUsers: async function(iduser, idserver) {
    let query =
      "INSERT INTO users(usersUnique, iduser, idserver, level, xp, coins, robos, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    let userUnique = iduser + "-" + idserver;

    await queries.runQuery(query, [
      userUnique,
      iduser,
      idserver,
      0,
      0,
      10,
      0,
      0
    ]);
  },
  getAll: async function(iduser, idserver) {
    let query = "SELECT * FROM users WHERE iduser = ? AND idserver = ?";
    let result = await queries.getQuery(query, [iduser, idserver]);

    //console.log(result)
    return result;
  },
  updateXP: async function(iduser, idserver, newXP) {
    let query =
      "UPDATE users SET xp = xp + ? WHERE iduser = ? AND idserver = ?";

    await queries.runQuery(query, [newXP, iduser, idserver]);
  },
  addXP: async function(iduser, idserver, newXP) {
    let query =
      "UPDATE users SET xp = xp + ? WHERE iduser = ? AND idserver = ?";

    await queries.runQuery(query, [newXP, iduser, idserver]);
  },
  removeXP: async function(iduser, idserver, newXP) {
    //let querySelect = "SELECT * FROM userLevels WHERE iduser = ? AND idserver = ?";
    //let result = await queries.getQuery(querySelect, [iduser, idserver]);

    let query =
      "UPDATE users SET xp = xp - ? WHERE iduser = ? AND idserver = ?";
    //if(result)
    await queries.runQuery(query, [newXP, iduser, idserver]);
  },
  getXP: async function(iduser, idserver) {
    let query = "SELECT xp, level FROM users WHERE iduser = ? AND idserver = ?";
    let result = await queries.getQuery(query, [iduser, idserver]);
    if (result) {
      return result;
    }
    return false;
  },
  updateLevel: async function(iduser, idserver, newLevel) {
    let query = "UPDATE users SET level = ? WHERE iduser = ? AND idserver = ?";

    await queries.runQuery(query, [newLevel, iduser, idserver]);
  },
  //coins
  addCoins: async function(iduser, coin) {
    let query = "UPDATE users SET coins = coins + ? WHERE iduser = ?";

    await queries.runQuery(query, [coin, iduser]);
  },
  removeCoins: async function(iduser, coin) {
    let query = "UPDATE users SET coins = coins - ? WHERE iduser = ?";

    await queries.runQuery(query, [coin, iduser]);
  },
  listAll: async function(tipo, top) {
    let query = "SELECT * FROM users ORDER BY coins DESC LIMIT 10";
    let result = await queries.allQuery(query, []);

   
    return result;
  },
  //robos stats
  addRobos: async function(iduser) {
    let query = "UPDATE users SET robos = robos + 1 WHERE iduser = ?";

    await queries.runQuery(query, iduser);
  },

  // cooldown
  // cooldowns (iduser TEXT, comando TEXT, tiempo TEXT, estado INTEGER)
  addCooldown: async function(iduser, comando, tiempo) {
    
    let tiempoCool = parseInt(tiempo) * 1000;
    let tiempoRol = tiempoCool + Date.now();
    
    let query =
      "INSERT INTO cooldowns(iduser, comando, tiempo, estado) VALUES (?, ?, ?, ?)";

    await queries.runQuery(query, [iduser, comando, tiempoRol, 0]);
  },
  removeCooldown: async function(iduser, comando) {
    let query = "DELETE FROM cooldowns WHERE iduser = ? AND comando = ?";

    await queries.runQuery(query, [iduser, comando]);
  },
  existsCooldown: async function(iduser, comando) {
    let query = "SELECT * FROM cooldowns WHERE iduser = ? AND comando = ? LIMIT 1";
    let result = await queries.getQuery(query, [iduser, comando]);
    //[]

    if (result != undefined) {
      return true;
    }
    return false;
  },
  getCooldown: async function(iduser, comando) {
    let query =
      "SELECT * FROM cooldowns WHERE iduser = ? AND comando = ? LIMIT 1";

    let result = await queries.getQuery(query, [iduser, comando]);
    return result;
  }
};
