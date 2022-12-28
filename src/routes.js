var express = require('express')
var session = require('express-session')
const controller = require('./controller')
var route = express()

// route.get("/", controller.index)
route.use(controller.parser)
route.post("/login", controller.login)
route.use(controller.check)
route.get("/", controller.list)
route.post("/", controller.create)
route.put("/:id", controller.update)
route.get("/:id", controller.get)
route.delete("/:id", controller.delete)

module.exports = route