import { DataTypes } from "sequelize";
import db from "../config/db.js"

const keyboardModels = db.define("keyboard", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 30]
        }
    },
    tanggal: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 40]
        }
    },
    data: {
        type: DataTypes.JSON,
        allowNull: false
    }
}, {
    freezeTableName: true,
    updatedAt: false,
    createdAt: false
})

keyboardModels.sync()
    .then(() => console.log("Tabel keyboard berhasil dibuat"))
    .catch(() => console.log("Tabel keyboard gagal dibuat"))
    
export default keyboardModels;