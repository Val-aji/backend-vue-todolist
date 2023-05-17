import { views } from "../config/views.js";
import keyboardModels from "../models/keyboardModels.js";
import clientModels from "../models/clientModels.js";

export const getData = async(req, res) => {
    try {
        const {username} = req.body

        const userDB = await clientModels.findOne({
            where: {username}
        })

        if(!userDB) return views(res, 404, "username tidak ditemukan", null)

        const result = await keyboardModels.findAll({
            where: {username},
            id: [["id", "DESC"]]
        })

        views(res, 200, "get data keyboard success", result)

    } catch (error) {
        views(res, 400, "get data gagal", {error, message: error.message})
    }

}

export const insertData = async(req, res) => {
    try {
        const {username, data, tanggal} = req.body

        const userDB = await clientModels.findOne({
            where: {username}
        })

        if(!userDB) return views(res, 404, "username tidak ditemukan!", null)

        const tanggalMulai = tanggal ? tanggal : new Date().toLocaleString("ID-id", {timeZone: "Asia/Jakarta"})

        const result = await keyboardModels.create({
            username, tanggal: tanggalMulai, data
        })

        if(result) {
            views(res, 201, "Insert Data Berhasil", result)
        } else {
            views(res, 400, "insert data gagal", null)

            return false
        }
    } catch (error) {
        views(res, 400, "Insert Data gagal", {error, message: error.message})
        console.log({error})
    }
}

export const deleteData = async(req, res) => {
    const {username, id} = req.body
    console.log({username})
    try {
        const userDB = await keyboardModels.findOne({
            where: {username}
        })
        
        if(!userDB) {
            
            views(res, 404, "username tidak ditemukan")

            return false
        } 

        const result = await keyboardModels.destroy({
            where: {id}  
        })

        views(res, 200, "Delete data berhasil")
    } catch (error) {
        views(res, 400, {error: error.message, message: "deleteData gagal"})
    }
    

    

    



}



