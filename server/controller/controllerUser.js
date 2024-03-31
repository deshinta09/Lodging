const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { User } = require('../models')

class ControllerUser{
    static async createStaff(req,res,next){
        try {
            let { email, password } = req.body
            if(!email||!password){
                throw {name:"BadRequest", message:"invalid input"}
            }
            
            let user = await User.create({ email, password, role:"staff" })

            res.status(201).json(user)
        } catch (error) {
            next(error)
        }
    }
    static async login(req,res,next){
        try {
            let { email, password } = req.body
            if(!email||!password){
                throw {name:"BadRequest", message:"invalid input"}
            }
            // console.log(req.body,'<-req.body');
            let user = await User.findOne({where:{email}})
            if(!user){
                throw {name:"Unauthorize", message:"error invalid email or password"}
            }

            // console.log(user,'<-user');
            let checkPassword = comparePassword(password, user.password)
            // console.log(checkPassword,'<-password check');
            if(!checkPassword){
                throw {name:"Unauthorize", message:"error invalid email or password"}
            }

            let access_token = createToken({id:user.id, role:user.role})
            res.status(200).json({access_token})
        } catch (error) {
            next(error)
        }
    }
}

module.exports=ControllerUser