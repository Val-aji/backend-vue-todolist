import { Sequelize } from "sequelize";

const DB_NAME = "railway"
const DB_HOST = "containers-us-west-20.railway.app"
const DB_PASSWORD = "x4tcNPTqhlFBytTuCDks"
const DB_PORT = 5474
const DB_USER = "root"

const db = new Sequelize({
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  dialect: "mysql",
  port: DB_PORT,
  host: DB_HOST
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
