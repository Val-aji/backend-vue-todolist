import db from "../config/db.js";
import { DataTypes } from "sequelize";

const clientModels = db.define("client", {
    namaLengkap: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 50]
        }
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [3, 20]
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [3, 30]
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5, 255]
        }
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [5, 255]
        }
    }
}, {
    freezeTableName: true
})

clientModels.sync()
    .then(() => {
        console.log("tabel client berhasil dibuat")
    })
    .catch(error => {
        console.log("tabel client gagal dibuat")
        console.log({error})
    })

export default clientModels;