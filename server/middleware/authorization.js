const { Lodging } = require('../models')

async function authorization(req,res,next){
    try {
        let {id} = req.params
        let lodging = await Lodging.findByPk(id)
        if(!lodging){
            throw {name:"NotFound", message:"error not found"}
        }

        if(req.user.role==="admin"){
            next()
        } else{
            if(lodging.authorId===req.user.id){
                next()
            } else{
                throw {name:"Forbidden", message:"You are not authorize"}
            }
        }
    } catch (error) {
        next(error)
    }
}

async function authorizationAdmin(req,res,next){
    try {
        if(req.user.role==="admin"){
            next()
        } else{
            throw {name:"Forbidden", message:"You are not authorize"}
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {authorization, authorizationAdmin}