import { views } from "../config/views.js";
import todolistModels from "../models/todolistModels.js";
import clientModels from "../models/clientModels.js";


export const getData = async(req, res) => {
    try {
        const {username} = req.body

        const userDB = await clientModels.findOne({
            where: {username}
        })

        if(!userDB) return views(res, 404, "username tidak ditemukan")

        const result = await todolistModels.findAll({
            where: {username}
        })

        views(res, 200, "get data success", result)
        
        
    } catch (error) {
        views(res, 400, "Get data invalid")
    }
}
export const insertData = async(req, res) => {
    try {
        const {title, username} = req.body

        const userDB = await clientModels.findOne({
            where: {username}
        })
        if(!userDB) return views(res, 404, "username tidak ditemukan!")

        const tanggalMulai = new Date().toLocaleString("ID-id", {timezone: "Asia/Jakarta"})

        const result = await todolistModels.create({
            username, title, status: false, tanggalMulai
        })

        views(res, 201, "data todolist berhasil ditambahkan", result)

    } catch (error) {
        views(res, 400, "Insert Todolist Invalid", {error, message: error.message})
    }
}

export const selesai = async(req, res) => {
    try {
        const {username, id} = req.body
        
        const userDB = await clientModels.findOne({
            where: {username}
        })

        if(!userDB) return views(res, 404, "username tidak ditemukan!")

        const result = await todolistModels.findOne({
            where: {username, id: parseInt(id)}
        })
        if(!result) return views(res, 404, "data dengan id " + id + " tidak ditemukan")

        const tanggalBerakhir = new Date().toLocaleString("ID-id", {timezone: "asia/jakarta"})
        await todolistModels.update(
            {status: true, tanggalBerakhir},
            {
                where: {username, id: parseInt(id)}
            }
        )
        views(res, 200, "work done success", result)
    } catch (error) {
        views(res, 400, "work done invalid", {error, message: error.message})
    }
}

export const deleteData = async(req, res) => {
    try {
        const {username, id} = req.body
        const userDB = await clientModels.findOne({
            where: {username}
        })
        if(!userDB) return views(res, 404, "username tidak ditemukan!")

        const dataClient = await todolistModels.findOne({
            where: {username, id}
        })
        if(!dataClient) return views(res, 400, "data tidak ditemukan")
        const result = await todolistModels.destroy({
            where: {id:id, username}
        })
        console.log({result})
        views(res, 200, "delete berhasil")
    } catch (error) {
        views(res, 400, "Delete Data Success")
    }
}
