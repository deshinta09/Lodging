const app = require('../app')
const request = require('supertest')
const { User ,Type, sequelize } = require('../models');
const { createToken } = require('../helpers/jwt');
const { hashPassword } = require('../helpers/bcrypt');

let token;

beforeAll(async()=>{
  let types = [
    {
      "name": "Spa", createdAt: new Date(), updatedAt:new Date()
    },
    {
      "name": "Hotel", createdAt: new Date(), updatedAt:new Date()
    },
    {
      "name": "Resort", createdAt: new Date(), updatedAt:new Date()
    },
    {
      "name": "Castle", createdAt: new Date(), updatedAt:new Date()
    },
    {
      "name": "Apartment", createdAt: new Date(), updatedAt:new Date()
    }
  ]
  await sequelize.queryInterface.bulkInsert('Types', types, {})
})

afterAll(async()=>{
  await sequelize.queryInterface.bulkDelete('Types', null, {truncate: true, cascade: true, restartIdentity: true})
  await sequelize.queryInterface.bulkDelete('Users', null, {truncate: true, cascade: true, restartIdentity: true})
})

describe('GET /types', ()=>{
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
    let resepon = await request(app).get('/types').set('authorization', `Bearer ${token}`)

    expect(resepon.status).toBe(200)
    expect(resepon.body).toBeInstanceOf(Array)
    expect(resepon.body[0]).toHaveProperty("id", expect.any(Number))
    expect(resepon.body[0]).toHaveProperty("name", expect.any(String))
  })

  // belum login 
  test('should response 401 - Invalid Token', async()=>{
    let resepon = await request(app).get('/types')

    expect(resepon.status).toBe(401)
    expect(resepon.body).toBeInstanceOf(Object)
    expect(resepon.body).toHaveProperty("message", "Invalid Token")
  })

  // token salah
  test('should response 401 - Invalid Token', async()=>{
    let resepon = await request(app).get('/types').set('authorization', `Bearer ${token}-salah`)

    expect(resepon.status).toBe(401)
    expect(resepon.body).toBeInstanceOf(Object)
    expect(resepon.body).toHaveProperty("message", "Invalid Token")
  })
})

describe('POST /types', ()=>{
  test('should response 201 - OK', async()=>{
    let type = {
      name:"Kos", createdAt: new Date(), updatedAt: new Date()
    }
    let respon = await request(app).post('/types').send(type).set('authorization', `Bearer ${token}`)

    expect(respon.status).toBe(201)
    expect(respon.body).toBeInstanceOf(Object)
    expect(respon.body).toHaveProperty('id', expect.any(Number))
    expect(respon.body).toHaveProperty('name', type.name)
  })
})

describe('PUT /types/:id', ()=>{
  test('should response 200 -OK', async()=>{
    let type = {
      name:"Kos", createdAt: new Date(), updatedAt: new Date()
    }
    let respon = await request(app).put('/types/2').send(type).set('authorization', `Bearer ${token}`)

    expect(respon.status).toBe(200)
    expect(respon.body).toBeInstanceOf(Object)
    expect(respon.body).toHaveProperty('id', expect.any(Number))
    expect(respon.body).toHaveProperty('name', type.name)
  })
})

describe('DELETE /types/:id', ()=>{
  test('should response 200 - OK', async()=>{
    let respon = await request(app).delete('/types/2').set('authorization', `Bearer ${token}`)

    expect(respon.status).toBe(200)
    expect(respon.body).toBeInstanceOf(Object)
    expect(respon.body).toHaveProperty("message", expect.any(String))
  })
})