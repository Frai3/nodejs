var Master = require('./models/barang')
var Akses = require('./models/akses')
var session = require('express-session')
const express = require('express')
const jwt = require('jsonwebtoken')
const Validator = require('fastest-validator')
const cookieParser = require('cookie-parser')
const app = express()
const v = new Validator()
const controller = {}

controller.parser = cookieParser()

controller.login = async (req, res, next) => {

    try {
        
        const schema = {
            username: {
                type: "string",
                max: 255
            },
            pass: {
                type: "string",
                max: 255
            }
        }

        let username = req.body.username
        let pass = req.body.pass
        
        const check = v.compile(schema)
        const valid = check({username: username, pass: pass})

        if(valid!=true){
            console.log(check({username: username, pass: pass}))
            res.json("Harap Masukkan Username dan Password")
            return valid
        }else{
            console.log(check({username: username, pass: pass}))
            const response = await Akses.findAll({
                where: {
                    username: username,
                    pass: pass
                }
            })
            .then(function(data){
                const res = {success: true, message: data}
                return res
            })
            .catch(error=>{
                const res = {success: true, message:"Gagal"}
                return res
            })
            if(response.message!=""){
                const user={
                    username: username,
                    pass: pass
                }
                jwt.sign(user, 'secret', {expiresIn:'3600s'}, (err, token)=>{
                    if(err){
                        console.log(err);
                        res.sendStatus(304);
                        return
                    }
                    Token = token
                    res.cookie('auth', Token)
                    res.json({
                        user : user,
                        token : Token
                    });
                    next()
                })
            }else{
                res.json("Tidak Memiliki Akses")
            }
        }
    } catch (e) {
        console.log(e)
    }
}

//Middleware
controller.check = async(req, res, next) => {
    var kode = req.cookies.auth
    console.log(kode)
    jwt.verify(kode, 'secret', (err, data)=>{
        if(err){
            // execute(login)
            console.log(err.message)
            res.json(err)
            return
        }else{
            next()
        }
    })
}

controller.list = async(req, res) => {
    try {
        const response = await Master.findAll().then(function(data){
            const res = {success: true, message:"Sukses", data: data}
            return res
        })
        .catch(error=>{
            const res = {success: true, message:"Gagal"}
            return res
        })

        return res.json(response)
    } catch (e) {
        console.log("Error")
        console.log(e)
    }
}

controller.create = async(req, res) => {
    try {
        
        const schema = {
            nama: {
                type: "string",
                max: 255
            },
        }

        const {nama} = req.body
        
        const check = v.compile(schema)
        const valid = check({nama: nama})

        if(valid==true){
            const response = await Master.create({
                nama: nama
            })

            .then(function(data){
                const res = {success: true, message:"Sukses", data: data}
                return res
            })
            .catch(error=>{
                const res = {success: true, message:"Gagal"}
                return res
            })
            res.json(response)
            // return valid
        }else{
            // console.log('Gagal')
            res.json('Harap Masukkan Nama Barang')
            // return valid
        }
    } catch (e) {
        console.log(e)
    }
}

controller.update = async(req, res) => {
    try {
        const {id} = req.params
        const {nama} = req.body

        const response = await Master.update({
            nama: nama
        }, {
            where: {
                id: id
            }
        })
        .then(function(data){
            const res = {success: true, message:"Sukses", data: data}
            return res
        })
        .catch(error=>{
            const res = {success: true, message:"Gagal"}
            return res
        })
        res.json(response)
    } catch (e) {
        console.log(e)
    }
}

controller.get = async (req, res) => {

    try {
        
    const {id} = req.params

        const response = await Master.findAll({
            where: {
                id: id
            }
        })
        .then(function(data){
            const res = {success: true, data: data}
            return res
        })
        .catch(error=>{
            const res = {success: true, message:"Gagal"}
            return res
        })
        res.json(response)
    } catch (e) {
        console.log(e)
    }
}

controller.delete = async (req, res) => {
    try {
        const {id} = req.params

        const response = await Master.destroy({
            where: {id: id}
        })
        .then(function(data){
            const res = {success: true, message: "Sukses", data: data}
            return res
        })
        .catch(error=>{
            const res = {success: true, message:"Gagal"}
            return res
        })
        res.json(response)
    } catch (e) {
        console.log(e)
    }
}

module.exports = controller