const { compareToken } = require('../helpers/jwt');
const { User } = require('../models')

async function authentication(req,res,next){
    try {
        const { authorization } = req.headers
        if(!authorization){
            throw {name:"Unauthorized", message:"Invalid Token"}
        }
        
        let verified = authorization.split(" ")[1]
        // console.log(compareToken(verified),'<- isi tokennya');
        verified = compareToken(verified)
        
        let user = await User.findByPk(verified.id)
        if(!user){
            throw {name:"Unauthorized", message:"Invalid Token"}
        }

        req.user={
            id:verified.id,
            role:verified.role
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports=authentication