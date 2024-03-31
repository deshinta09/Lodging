if(process.env.NODE_ENV!=="production"){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const port = 3000
const router = require('./router/index')
const cors = require('cors')
const errors = require('./middleware/error')

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('hellow dah terkoneksii!!!')
})
app.use(router)

app.use(errors)

app.listen(port, ()=>{
    console.log(`listen on port ${port}`);
})

module.exports=app