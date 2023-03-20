import { Sequelize } from "sequelize";

const DB_NAME = "railway"
const DB_HOST = "containers-us-west-20.railway.app"
const DB_PASSWORD = "x4tcNPTqhlFBytTuCDks"
const DB_PORT = 5474
const DB_USER = "root"

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql"
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