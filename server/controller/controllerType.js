const { Type } = require('../models')

class ControllerType{
    static async allType(req,res,next){
        try {
            let types = await Type.findAll()
            res.status(200).json(types)
        } catch (error) {
            next(error)
        }
    }

    static async addType(req,res,next){
        try {
            let {name} = req.body

            let type = await Type.create({name})
            res.status(201).json(type)
        } catch (error) {
            next(error)
        }
    }

    static async updateType(req,res,next){
        try {
            let {id} = req.params
            let typeDetail = await Type.findByPk(id)
            if(!typeDetail){
                throw {name:"NotFound", message:"error not found"}
            }

            let {name} = req.body

            let type = await Type.update({name},{where:{id}, returning: true})
            res.status(200).json(type[1][0])
        } catch (error) {
            next(error)
        }
    }

    static async deleteType(req,res,next){
        try {
            let {id} = req.params
            let type = await Type.findByPk(id)
            if(!type){
                throw {name:"NotFound", message:"error not found"}
            }

            await Type.destroy({where:{id}})
            res.status(200).json({message:`${type.name} success to delete`})
        } catch (error) {
            next(error)
        }
    }
}

module.exports=ControllerType