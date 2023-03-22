import { Sequelize } from "sequelize";
import mysql2 from "mysql2"

const DB_NAME = "nouvalaj_warungonline"
const DB_HOST = "localhost"
const DB_PASSWORD = "6Fs+xDpD@MIb"
const DB_PORT = 3306
const DB_USER = "root"

const db = new Sequelize({
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  dialect: "mysql",
  port: DB_PORT,
  host: DB_HOST,
  dialectModule: mysql2
})

db.authenticate()
    .then(() => {
        console.log("koneksi ke database berhasil")
    })
    .catch(error => {
        console.log("koneksi ke database gagal")
        console.log({error})
    })

export default db;
