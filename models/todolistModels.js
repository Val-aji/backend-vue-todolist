import db from "../config/db.js"
import { DataTypes } from "sequelize"

const todolistModels = db.define("todolist", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 30]
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 40]
        }
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    tanggalMulai: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tanggalBerakhir: {
        type: DataTypes.STRING,
        allowNull: true

    }
}, {
    updatedAt: false,
    createdAt: false,
    freezeTableName: true
})

todolistModels.sync()
    .then(() => console.log("tabel todolist berhasil dibuat"))
    .catch(error => {
        console.log("tabel todolist gagal dibuat")
        console.log({error})
    })


export default todolistModels