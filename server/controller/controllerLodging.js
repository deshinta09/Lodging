const { Lodging, User } = require('../models')
const { Op } = require("sequelize");
const Buffer = require('buffer/').Buffer
const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret 
})

class ControllerLodging{
    static async publicLodging(req,res,next){
        try {
            let option = {where:{}}
            let {page,sort,search,filter} = req.query
            if(sort){
                option.order=[['createdAt',sort]]
            }
            if(search){
                option.where.name={[Op.iLike]: `%${search}%`}
            }
            if(filter){
                option.where.typeId={[Op.eq]:filter}
            }
            const limit = 10
            if(page){
                option.limit=limit
                option.offset=(page-1)*limit
            }
            // console.log(option,'<= option');
            let lodging = await Lodging.findAndCountAll(option)
            res.status(200).json(lodging)
        } catch (error) {
            next(error)
        }
    }

    static async allLodging(req,res, next){
        try {
            let lodging = await Lodging.findAll({
                include:{
                    model:User,
                    attributes: {
                        exclude: ['password']
                    }
                }
            })
            res.status(200).json(lodging)
        } catch (error) {
            next(error)
        }
    }

    static async addLodging(req,res, next){
        try {
            let {name,facility,roomCapacity,imgUrl,location,price,typeId} = req.body
            let lodging = await Lodging.create({name,facility,roomCapacity,imgUrl,location,price,authorId:req.user.id,typeId})

            res.status(201).json(lodging)
        } catch (error) {
            next(error)
        }
    }

    static async lodgingById(req,res,next){
        try {
            let {id} = req.params
            
            let lodging = await Lodging.findByPk(id)
            if(!lodging){
                throw {name:"NotFound", message:"error not found"}
            }

            res.status(200).json(lodging)
        } catch (error) {
            next(error)
        }
    }

    static async updateLodging(req,res,next){
        try {
            let {id} = req.params
            let findLodging = await Lodging.findByPk(id)
            if(!findLodging){
                throw {name:"NotFound", message:"error not found"}
            }

            let {name,facility,roomCapacity,imgUrl,location,price,authorId,typeId} = req.body
            let lodging = await Lodging.update({name,facility,roomCapacity,imgUrl,location,price,authorId,typeId},{where:{id}, returning: true})

            res.status(200).json(lodging[1][0])
        } catch (error) {
            next(error)
        }
    }

    static async deleteLodging(req,res,next){
        try {
            let {id} = req.params
            let lodging = await Lodging.findByPk(id)
            if(!lodging){
                throw {name:"NotFound", message:"error not found"}
            }

            await Lodging.destroy({where:{id}})
            res.status(200).json({message:`${lodging.name} success to delete`})
        } catch (error) {
            next(error)
        }
    }

    static async uploadImage(req,res,next){
        try {
            if(!req.file){
                throw {name:"BadRequest", message:"error not found"}
            }

            let {id} = req.params
            let lodging = await Lodging.findByPk(id)

            let bs64 = Buffer.from(req.file.buffer).toString('base64')
            
            let dataUrl = `data:${req.file.mimetype};base64,${bs64}`

            let result = await cloudinary.v2.uploader.upload(dataUrl)

            await Lodging.update({imgUrl:result.secure_url},{where:{id}})

            res.status(200).json({message:`${lodging.name} success to update`})
        } catch (error) {
            console.log(error,'<-err controller patch');
            next(error)
        }
    }
}

module.exports=ControllerLodging