import clientModels from "../models/clientModels.js";
import { views } from "../config/views.js";
//import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const editProfile = async(req, res) => {
    try {
        const {namaLengkap, bio, username} = req.body
        
        const userDB = await clientModels.findOne({
            where: {username}
        })
        if(!userDB) return views(res, 404, "account tidak ditemukan")

        await clientModels.update(
            {namaLengkap, bio},
            {where: {username}}
        )
        views(res, 200, "change data success")
    } catch (error) {
        views(res, 400, "change data invalid", {error, message: error,message})
    }
}

export const cekLogin = async(req, res) => {
    try {
        const {username, token} = req.body
        const result = await clientModels.findOne({
            where: {username}
        })
        if(!result) return views(res, 401, "username tidak ada")

        if(result.token !== token) return views(res, 401, "token invalid")

        views(res, 200, "cek login berhasil", {namaLengkap: result.namaLengkap, bio: result.bio})
    } catch (error) {
        views(res, 400, "cek login invalid", {error, message: error.message})
    }
}
export const login = async(req, res) => {
    try {
        const {username, password} = req.body

        const dataUser = await clientModels.findOne({
            where: {username}
        })

        if(!dataUser) return views(res, 404, "username tidak ditemukan", null)
        
        //const newPassword = await argon2.verify(dataUser.password, password)
        if(password !== dataUser.password) return views(res, 401, "Password salah!",null)
        
        const token = jwt.sign({id: dataUser.id}, process.env.SECRET_KEY)
        const obj = {
            id: dataUser.id,
            username: dataUser.username,
            token
        }
        await clientModels.update(
            {token},
            {where: {username}}
        )
        views(res, 200, "Login Berhasil", obj)
    } catch (error) {
        views(res, 400, "Login Invalid", {error, message: error.message})
    }
}

export const register = async(req, res) => {
    try {
        console.log({body: req.body})
        const {username, namaLengkap, password}  = req.body
        
        const dataDB = await clientModels.findOne({
            where: {username},
        })
        if(dataDB) return views(res, 409, "email telah ada")
        const newPassword = await argon2.hash(password)
        if(!newPassword) return views(  res, 500, "hash password failed")

        await clientModels.create({
            username,
            namaLengkap,
            password: newPassword
        })

        views(res, 201, "data berhasil ditambahkan", {username, namaLengkap})

    } catch (error) {
        console.log({error})
        views(res, 400, "registrasi gagal", {error, messageError: error.message})
    }
}
