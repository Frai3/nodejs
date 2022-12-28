const express = require('express')
const routes = require('./routes')
const app = express()

app.set('port', process.env.PORT || 2000)

app.use(express.json())

// app.get('/', (req, res) => {
//     res.send("Hello World")
// })

app.listen(app.get('port'), ()=>{
    console.log("Port "+app.get('port'))
})

app.use('/', routes)