const app = require('../app')
const request = require('supertest')
const { Lodging, User, Type, sequelize } = require('../models');
const { hashPassword } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');

const path = require('path')
const fs = require('fs')
const filePath = path.resolve(__dirname, "../helpers/ketik.jpg");
const imageBuffer = fs.readFileSync(filePath);

let token;
let tokenStaff;

beforeAll(async()=>{
    let user = [
        {
            username:"user12", 
            email:"user12@gmail.com", 
            password:hashPassword('secret'), 
            role:"admin", 
            phoneNumber:"111-222-333", 
            address:"Jalan Server1, kelurahan Client2, Prov FullStack, Indonesia", 
            createdAt: new Date(),
            updatedAt:new Date()
        },
        {
            username:"user22", 
            email:"user22@gmail.com", 
            password:hashPassword('secret2'), 
            role:"staff", 
            phoneNumber:"121-232-333", 
            address:"Jalan Server2, kelurahan Client2, Prov FullStack, Indonesia", 
            createdAt: new Date(), 
            updatedAt:new Date()
        }
    ]
    await sequelize.queryInterface.bulkInsert('Users', user, {})

    let types = [
        {
            name:'Spa',
            createdAt: new Date(), 
            updatedAt:new Date()
        },
        {
            name:'Motel',
            createdAt: new Date(), 
            updatedAt:new Date()
        }
    ]
    await sequelize.queryInterface.bulkInsert('Types', types, {})

    let lodgings = [
        {
            name: "Luxury Suite",
            facility: "Spa, Gym, Pool",
            roomCapacity: 2,
            imgUrl: "https://example.com/luxury-suite.jpg",
            location: "City Center",
            price: 200,
            typeId: 1,
            authorId: 1,
            createdAt: new Date(), 
            updatedAt:new Date()
        },
        {
            name: "Cozy Cabin",
            facility: "Fireplace, Kitchenette",
            roomCapacity: 4,
            imgUrl: "https://example.com/cozy-cabin.jpg",
            location: "Mountain Retreat",
            price: 250,
            typeId: 2,
            authorId: 2,
            createdAt: new Date(), 
            updatedAt:new Date()
        }
    ]
    // let lodgings = require('../dataLodgings')
    await sequelize.queryInterface.bulkInsert('Lodgings', lodgings, {})
})

afterAll(async()=>{
    await sequelize.queryInterface.bulkDelete('Lodgings', null, {truncate: true, cascade: true, restartIdentity: true})
    await sequelize.queryInterface.bulkDelete('Types', null, {truncate: true, cascade: true, restartIdentity: true})
    await sequelize.queryInterface.bulkDelete('Users', null, {truncate: true, cascade: true, restartIdentity: true})
})

describe('GET /lodgings', ()=>{
    test('should response 200 - OK', async()=>{
        let user = await User.create(
            {
                username:"user123", 
                email:"user123@gmail.com", 
                password:hashPassword('secret'), 
                role:"admin", 
                phoneNumber:"111-222-333", 
                address:"Jalan Server1, kelurahan Client2, Prov FullStack, Indonesia", 
                createdAt: new Date(),
                updatedAt:new Date()
            }
        )
        token = createToken({id:user.id,role:user.role})
        let respon = await request(app).get('/lodgings').set('authorization', `Bearer ${token}`)

        expect(respon.status).toBe(200)
        expect(respon.body).toBeInstanceOf(Array)
        expect(respon.body[0]).toHaveProperty("name", expect.any(String))
        expect(respon.body[0]).toHaveProperty("facility", expect.any(String))
        expect(respon.body[0]).toHaveProperty("roomCapacity", expect.any(Number))
        expect(respon.body[0]).toHaveProperty("imgUrl", expect.any(String))
        expect(respon.body[0]).toHaveProperty("location", expect.any(String))
        expect(respon.body[0]).toHaveProperty("price", expect.any(Number))
        expect(respon.body[0]).toHaveProperty("typeId", expect.any(Number))
        expect(respon.body[0]).toHaveProperty("authorId", expect.any(Number))

    })

    // belum login
    test('should response 401 - Invalid Token', async()=>{
        let respon = await request(app).get('/lodgings')

        expect(respon.status).toBe(401)
        expect(respon.body).toBeInstanceOf(Object)
        expect(respon.body).toHaveProperty("message", "Invalid Token")
    })

    // token salah
    test('should response 401 - OK', async()=>{
        let respon = await request(app).get('/lodgings').set('authorization', `Bearer ${token}-salah`)

        expect(respon.status).toBe(401)
        expect(respon.body).toBeInstanceOf(Object)
        expect(respon.body).toHaveProperty("message", "Invalid Token")
    })
})

describe('POST /lodgings', ()=>{
    let lodging = {
        name: "Beachfront Villa",
        facility: "Private Beach Access, Jacuzzi",
        roomCapacity: 4,
        imgUrl: "https://example.com/cozy-cabin.jpg",
        location: "Mountain Retreat",
        price: 250,
        typeId: 2
    }

    test('should response 201', async()=>{
        let respon = await request(app).post('/lodgings').send(lodging).set('authorization', `Bearer ${token}`)

        expect(respon.status).toBe(201)
        expect(respon.body).toBeInstanceOf(Object)
        expect(respon.body).toHaveProperty("name", lodging.name)
        expect(respon.body).toHaveProperty("facility", lodging.facility)
        expect(respon.body).toHaveProperty("roomCapacity", lodging.roomCapacity)
        expect(respon.body).toHaveProperty("imgUrl", lodging.imgUrl)
        expect(respon.body).toHaveProperty("location", lodging.location)
        expect(respon.body).toHaveProperty("price", lodging.price)
        expect(respon.body).toHaveProperty("typeId", lodging.typeId)
    })

    // belum login
    test('should response 401 - Invalid Token', async()=>{

        let respon = await request(app).post('/lodgings').send(lodging)

        expect(respon.status).toBe(401)
        expect(respon.body).toBeInstanceOf(Object)
        expect(respon.body).toHaveProperty("message", "Invalid Token")
    })

    // token salah
    test('should response 401 - OK', async()=>{

        let respon = await request(app).post('/lodgings').send(lodging).set('authorization', `Bearer ${token}-salah`)

        expect(respon.status).toBe(401)
        expect(respon.body).toBeInstanceOf(Object)
        expect(respon.body).toHaveProperty("message", "Invalid Token")
    })

    // bad request
    test('should response 400 - error validation', async()=>{
        lodging ={
            name: "",
            facility: "Private Beach Access, Jacuzzi",
            roomCapacity: 4,
            imgUrl: "https://example.com/cozy-cabin.jpg",
            location: "Mountain Retreat",
            price: 250,
            typeId: 2,
        }

        let respon = await request(app).post('/lodgings').send(lodging).set('authorization', `Bearer ${token}`)

        expect(respon.status).toBe(400)
        expect(respon.body).toBeInstanceOf(Object)
        expect(respon.body).toHaveProperty("message", "Name Lodging is require")
    })
})

describe(' GET /lodgings/:id', ()=>{
    test('should response 200 - OK', async()=>{
        let respon = await request(app).get('/lodgings/1').set('authorization', `Bearer ${token}`)

        expect(respon.status).toBe(200)
        expect(respon.body).toBeInstanceOf(Object)
        expect(respon.body).toHaveProperty("name", expect.any(String))
        expect(respon.body).toHaveProperty("facility", expect.any(String))
        expect(respon.body).toHaveProperty("roomCapacity", expect.any(Number))
        expect(respon.body).toHaveProperty("imgUrl", expect.any(String))
        expect(respon.body).toHaveProperty("location", expect.any(String))
        expect(respon.body).toHaveProperty("price", expect.any(Number))
        expect(respon.body).toHaveProperty("typeId", expect.any(Number))
        expect(respon.body).toHaveProperty("authorId", expect.any(Number))
    })

    // belum login 
    test('should response 401 - unauthorize', async()=>{
        let respon = await request(app).get('/lodgings/1')

        expect(respon.status).toBe(401)
        expect(respon.body).toBeInstanceOf(Object)
        expect(respon.body).toHaveProperty("message", "Invalid Token")
    })

    // token salah
    test('should response 401 - unauthorize', async()=>{
        let respon = await request(app).get('/lodgings/1').set('authorization', `Bearer ${token}-salah`)

        expect(respon.status).toBe(401)
        expect(respon.body).toBeInstanceOf(Object)
        expect(respon.body).toHaveProperty("message", "Invalid Token")
    })

    // data tdk ada di database
    test('should response 404 - not found', async()=>{
        let respon = await request(app).get('/lodgings/100').set('authorization', `Bearer ${token}`)

        expect(respon.status).toBe(404)
        expect(respon.body).toBeInstanceOf(Object)
        expect(respon.body).toHaveProperty("message", "error not found")
    })
})

describe('PUT /lodgings/:id', ()=>{
    let lodging = {
        name: "Loop Villa",
        facility: "Private Beach Access",
        roomCapacity: 5,
        imgUrl: "https://example.com/cozy-cabin.jpg",
        location: "Mountain Retreat",
        price: 300,
        typeId: 2
    }

    test('should response 200 - OK', async()=>{
        let respon = await request(app).put('/lodgings/2').send(lodging).set('authorization', `Bearer ${token}`)

        expect(respon.status).toBe(200)
        expect(respon.body).toBeInstanceOf(Object)
        expect(respon.body).toHaveProperty("name", expect.any(String))
        expect(respon.body).toHaveProperty("facility", expect.any(String))
        expect(respon.body).toHaveProperty("roomCapacity", expect.any(Number))
        expect(respon.body).toHaveProperty("imgUrl", expect.any(String))
        expect(respon.body).toHaveProperty("location", expect.any(String))
        expect(respon.body).toHaveProperty("price", expect.any(Number))
        expect(respon.body).toHaveProperty("typeId", expect.any(Number))
    })

    // belum login
    test('should response 401 - unauthorize', async()=>{
        let respon = await request(app).put('/lodgings/2').send(lodging)

        expect(respon.status).toBe(401)
        expect(respon.body).toBeInstanceOf(Object)
        expect(respon.body).toHaveProperty("message", "Invalid Token")
    })

    // token salah
    test('should response 401 - unauthorize', async()=>{
        let respon = await request(app).put('/lodgings/2').send(lodging).send(lodging).set('authorization', `Bearer ${token}-salah`)

        expect(respon.status).toBe(401)
        expect(respon.body).toBeInstanceOf(Object)
        expect(respon.body).toHaveProperty("message", "Invalid Token")
    })

    // id tdk ada di database
    test('should response 404 - not found', async()=>{
        let respon = await request(app).put('/lodgings/100').set('authorization', `Bearer ${token}`)

        expect(respon.status).toBe(404)
        expect(respon.body).toBeInstanceOf(Object)
        expect(respon.body).toHaveProperty("message", "error not found")
    })

    // token staff update data bukan miliknya
    test('should response 403 - forbidden', async()=>{
        let staff = await User.create(
            {
                username:"user222", 
                email:"user222@gmail.com", 
                password:hashPassword('secret2'), 
                role:"staff", 
                phoneNumber:"121-232-333", 
                address:"Jalan Server2, kelurahan Client2, Prov FullStack, Indonesia", 
                createdAt: new Date(), 
                updatedAt:new Date()
            }
        )
        tokenStaff = createToken({id:staff.id, role:staff.role})
        let respon = await request(app).put('/lodgings/2').set('authorization', `Bearer ${tokenStaff}`)


        expect(respon.status).toBe(403)
        expect(respon.body).toBeInstanceOf(Object)
        expect(respon.body).toHaveProperty("message", "You are not authorize")
    })

    // bad request
    test('should response 400 - error validation', async()=>{
        lodging ={
            name: "",
            facility: "Private Beach Access, Jacuzzi",
            roomCapacity: 4,
            imgUrl: "https://example.com/cozy-cabin.jpg",
            location: "Mountain Retreat",
            price: 250,
            typeId: 2,
        }

        let respon = await request(app).put('/lodgings/3').send(lodging).set('authorization', `Bearer ${token}`)

        expect(respon.status).toBe(400)
        expect(respon.body).toBeInstanceOf(Object)
        expect(respon.body).toHaveProperty("message", "Name Lodging is require")
    })
})

describe('DELETE /lodgings/:id', ()=>{
    test('shoult response 200 - OK', async()=>{
        let respon = await request(app).delete('/lodgings/2').set('authorization', `Bearer ${token}`)
        
        expect(respon.status).toBe(200)
        expect(respon.body).toBeInstanceOf(Object)
        expect(respon.body).toHaveProperty("message", expect.any(String))
    })

    // belum login 
    test('shoult response 401 - unauthorize', async()=>{
        let respon = await request(app).delete('/lodgings/1')

        expect(respon.status).toBe(401)
        expect(respon.body).toBeInstanceOf(Object)
        expect(respon.body).toHaveProperty("message", "Invalid Token")
    })

    // token salah
    test('shoult response 401 - unauthorize', async()=>{
        let respon = await request(app).delete('/lodgings/1').set('authorization', `Bearer ${token}-salah`)

        expect(respon.status).toBe(401)
        expect(respon.body).toBeInstanceOf(Object)
        expect(respon.body).toHaveProperty("message", "Invalid Token")
    })

    // data tdk ada di database
    test('shoult response 404 - not found', async()=>{
        let respon = await request(app).delete('/lodgings/100').set('authorization', `Bearer ${token}`)

        expect(respon.status).toBe(404)
        expect(respon.body).toBeInstanceOf(Object)
        expect(respon.body).toHaveProperty("message", "error not found")
    })

    // staff menghapus bukan miliknya
    test('shoult response 403 - forbidden', async()=>{
        let staff = await User.create(
            {
                username:"user223", 
                email:"user223@gmail.com", 
                password:hashPassword('secret2'), 
                role:"staff", 
                phoneNumber:"121-232-333", 
                address:"Jalan Server2, kelurahan Client2, Prov FullStack, Indonesia", 
                createdAt: new Date(), 
                updatedAt:new Date()
            }
        )
        let tokenStaff = createToken({id:staff.id, role:staff.role})
        let respon = await request(app).delete('/lodgings/1').set('authorization', `Bearer ${tokenStaff}`)

        expect(respon.status).toBe(403)
        expect(respon.body).toBeInstanceOf(Object)
        expect(respon.body).toHaveProperty("message", "You are not authorize")
    })
})

describe('PATCH /lodgings/:id', ()=>{
    test('should response 200 - OK', async()=>{
        let response = await request(app).patch('/lodgings/3').attach("imageUrl", imageBuffer, "ketik.jpg").set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })

    //token tdk ada
    test('should response 401 - Invalid Token', async()=>{
        let response = await request(app).patch('/lodgings/3').attach("imageUrl", imageBuffer, "ketik.jpg")

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })

    // token salah
    test('should response 401 - Invalid Token', async()=>{
        let response = await request(app).patch('/lodgings/3').attach("imageUrl", imageBuffer, "ketik.jpg").set('authorization', `Bearer ${token}-salah`)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })

    // id database tidak ada
    test('should response 404 - not found', async()=>{
        let respon = await request(app).patch('/lodgings/300').attach("imageUrl", imageBuffer, "ketik.jpg").set('authorization', `Bearer ${token}`)

        expect(respon.status).toBe(404)
        expect(respon.body).toBeInstanceOf(Object)
        expect(respon.body).toHaveProperty("message", "error not found")
    })

    // tdk mengirim gambar
    test('should response 400 - bad request', async()=>{
        let response = await request(app).patch('/lodgings/3').set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "error not found")
    })

    // token staff
    test('should response 403 - forbidden', async()=>{
        let response = await request(app).patch('/lodgings/3').attach("imageUrl", imageBuffer, "ketik.jpg").set('authorization', `Bearer ${tokenStaff}`)

        expect(response.status).toBe(403)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "You are not authorize")
    })
})

describe('GET /pub', ()=>{
    test('Get /pub should response 200 - OK', async()=>{
        let respon = await request(app).get('/pub')

        expect(respon.status).toBe(200)
        expect(respon.body.rows).toBeInstanceOf(Array)
        expect(respon.body.rows[0]).toHaveProperty("name", expect.any(String))
        expect(respon.body.rows[0]).toHaveProperty("facility", expect.any(String))
        expect(respon.body.rows[0]).toHaveProperty("roomCapacity", expect.any(Number))
        expect(respon.body.rows[0]).toHaveProperty("imgUrl", expect.any(String))
        expect(respon.body.rows[0]).toHaveProperty("location", expect.any(String))
        expect(respon.body.rows[0]).toHaveProperty("price", expect.any(Number))
        expect(respon.body.rows[0]).toHaveProperty("typeId", expect.any(Number))
        expect(respon.body.rows[0]).toHaveProperty("authorId", expect.any(Number))
    })

    // testing tanpa filter
    test('Get /pub/:id should response 200 - OK', async()=>{
        let data = require('../dataLodgings')
        await sequelize.queryInterface.bulkInsert('Lodgings', data, {})
        
        let respon = await request(app).get('/pub?filter=')

        expect(respon.status).toBe(200)
        expect(respon.body.rows).toBeInstanceOf(Object)
        expect(respon.body.rows[0]).toHaveProperty("name", expect.any(String))
        expect(respon.body.rows[0]).toHaveProperty("facility", expect.any(String))
        expect(respon.body.rows[0]).toHaveProperty("roomCapacity", expect.any(Number))
        expect(respon.body.rows[0]).toHaveProperty("imgUrl", expect.any(String))
        expect(respon.body.rows[0]).toHaveProperty("location", expect.any(String))
        expect(respon.body.rows[0]).toHaveProperty("price", expect.any(Number))
        expect(respon.body.rows[0]).toHaveProperty("typeId", expect.any(Number))
        expect(respon.body.rows[0]).toHaveProperty("authorId", expect.any(Number))
    })

    // testing dgn filter parameter
    test('Get /pub/:id should response 200 - OK', async()=>{
        let data = require('../dataLodgings')
        await sequelize.queryInterface.bulkInsert('Lodgings', data, {})
        
        let respon = await request(app).get('/pub?filter=1')

        expect(respon.status).toBe(200)
        expect(respon.body.rows).toBeInstanceOf(Object)
        expect(respon.body.rows[0]).toHaveProperty("name", expect.any(String))
        expect(respon.body.rows[0]).toHaveProperty("facility", expect.any(String))
        expect(respon.body.rows[0]).toHaveProperty("roomCapacity", expect.any(Number))
        expect(respon.body.rows[0]).toHaveProperty("imgUrl", expect.any(String))
        expect(respon.body.rows[0]).toHaveProperty("location", expect.any(String))
        expect(respon.body.rows[0]).toHaveProperty("price", expect.any(Number))
        expect(respon.body.rows[0]).toHaveProperty("typeId", 1)
        expect(respon.body.rows[0]).toHaveProperty("authorId", expect.any(Number))
    })

    // testing pagination
    test('Get /pub/:id should response 200 - OK', async()=>{
        let data = require('../dataLodgings')
        await sequelize.queryInterface.bulkInsert('Lodgings', data, {})
        
        let respon = await request(app).get('/pub?page=1')

        expect(respon.status).toBe(200)
        expect(respon.body.count).toBe(10)
        expect(respon.body.rows).toBeInstanceOf(Object)
        expect(respon.body.rows[0]).toHaveProperty("name", expect.any(String))
        expect(respon.body.rows[0]).toHaveProperty("facility", expect.any(String))
        expect(respon.body.rows[0]).toHaveProperty("roomCapacity", expect.any(Number))
        expect(respon.body.rows[0]).toHaveProperty("imgUrl", expect.any(String))
        expect(respon.body.rows[0]).toHaveProperty("location", expect.any(String))
        expect(respon.body.rows[0]).toHaveProperty("price", expect.any(Number))
        expect(respon.body.rows[0]).toHaveProperty("typeId", expect.any(Number))
        expect(respon.body.rows[0]).toHaveProperty("authorId", expect.any(Number))
    })
})

describe('GET /pub/:id', ()=>{
    test('Get /pub/:id should response 200 - OK', async()=>{
        let respon = await request(app).get('/pub/1')

        expect(respon.status).toBe(200)
        expect(respon.body).toBeInstanceOf(Object)
        expect(respon.body).toHaveProperty("name", expect.any(String))
        expect(respon.body).toHaveProperty("facility", expect.any(String))
        expect(respon.body).toHaveProperty("roomCapacity", expect.any(Number))
        expect(respon.body).toHaveProperty("imgUrl", expect.any(String))
        expect(respon.body).toHaveProperty("location", expect.any(String))
        expect(respon.body).toHaveProperty("price", expect.any(Number))
        expect(respon.body).toHaveProperty("typeId", expect.any(Number))
        expect(respon.body).toHaveProperty("authorId", expect.any(Number))
    })

    // data tdk ada di database
    test('should response 404 - not found', async()=>{
        let respon = await request(app).get('/pub/100')

        expect(respon.status).toBe(404)
        expect(respon.body).toBeInstanceOf(Object)
        expect(respon.body).toHaveProperty("message", "error not found")
    })
})