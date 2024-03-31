const app = require('../app')
const request = require('supertest')
const { User, sequelize } = require('../models');
const { hashPassword } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');

let token;

beforeAll(async()=>{
    try {
        let user = [
            {
                username:"user1", 
                email:"user1@gmail.com", 
                password:hashPassword('secret'), 
                role:"admin", 
                phoneNumber:"111-222-333", 
                address:"Jalan Server1, kelurahan Client2, Prov FullStack, Indonesia", 
                createdAt: new Date(),
                updatedAt:new Date()
            },
            {
                username:"user2", 
                email:"user2@gmail.com", 
                password:hashPassword('secret2'), 
                role:"staff", 
                phoneNumber:"121-232-333", 
                address:"Jalan Server2, kelurahan Client2, Prov FullStack, Indonesia", 
                createdAt: new Date(), 
                updatedAt:new Date()
            }
        ]
    await sequelize.queryInterface.bulkInsert('Users', user, {})
    } catch (error) {
        console.log(error);
    }
})

afterAll(async()=>{
    await sequelize.queryInterface.bulkDelete('Users', null, {truncate: true, cascade: true, restartIdentity: true})
})

describe('POST /login', ()=>{
    test('should response 200 - OK', async()=>{
        let user = {
            email:'user1@gmail.com',
            password: 'secret'
        }

        const respon = await request(app).post('/login').send(user)
  
        expect(respon.status).toBe(200)
        expect(respon.body).toHaveProperty("access_token",expect.any(String))
    })

    //tdk memasukkan email
    test('should response 400 - invalid input', async()=>{
        let user = {
            email:'',
            password: 'secret'
        }

        const respon = await request(app).post('/login').send(user)

        expect(respon.status).toBe(400)
        expect(respon.body).toHaveProperty("message", "invalid input")
    })

    //email yg dimasukkan salah
    test('should response 401 - error invalid email or password', async()=>{
        let user = {
            email:'userSalah@gmail.com',
            password: 'secret'
        }

        const respon = await request(app).post('/login').send(user)

        expect(respon.status).toBe(401)
        expect(respon.body).toHaveProperty("message", "error invalid email or password")
    })

    //tdk memasukkan password
    test('should response 400 - invalid input', async()=>{
        let user = {
            email:'user1@gmail.com',
            password: ''
        }

        const respon = await request(app).post('/login').send(user)

        expect(respon.status).toBe(400)
        expect(respon.body).toHaveProperty("message", "invalid input")
    })

    //password salah
    test('should response 401 - error invalid email or password', async()=>{
        let user = {
            email:'user1@gmail.com',
            password: 'passwordSalah'
        }

        const respon = await request(app).post('/login').send(user)

        expect(respon.status).toBe(401)
        expect(respon.body).toHaveProperty("message", "error invalid email or password")
    })
})

describe('POST /add-user', ()=>{
    test('should response 201 - created', async()=>{
        let admin = await User.create(
            {username:"user", 
            email:"user@gmail.com", 
            password:'secret', 
            role:"admin", 
            phoneNumber:"111-222-333", 
            address:"Jalan Server1, kelurahan Client2, Prov FullStack, Indonesia"}
        )

        token = createToken({id:admin.id, role:admin.role})
        let user = {
            email:'userTest@gmail.com',
            password:'secretTest'
        }

        const response = await request(app).post('/add-user').send(user).set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("email", user.email)
        expect(response.body).toHaveProperty("password", expect.any(String))
        expect(response.body).toHaveProperty("role", "staff")
    })

     // email tdk ada
     test('should response 400 - Invalid Input', async()=>{
        let user = {
            password:'secretTest'
        }

        const response = await request(app).post('/add-user').send(user).set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "invalid input")
    })

    // email string kosong
    test('should response 400 - Invalid Input', async()=>{
        let user = {
            email:'',
            password:'secretTest'
        }

        const response = await request(app).post('/add-user').send(user).set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "invalid input")
    })

    // password string kosong
    test('should response 400 - Invalid Input', async()=>{
        let user = {
            email:'userTest2gmail.com',
            password:''
        }

        const response = await request(app).post('/add-user').send(user).set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "invalid input")
    })

    // password tdk diberikan
    test('should response 400 - Invalid Input', async()=>{
        let user = {
            email:'userTest2gmail.com'
        }

        const response = await request(app).post('/add-user').send(user).set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "invalid input")
    })

    // email sudah ada
    test('should response 400 - email unique', async()=>{
        let user = {
            email:'userTest@gmail.com',
            password:'secret'
        }

        const response = await request(app).post('/add-user').send(user).set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Email must be unique")
    })

    // email format salah
    test('should response 400 - Email must be type email', async()=>{
        let user = {
            email:'userTestgmail.com',
            password:'secret'
        }

        const response = await request(app).post('/add-user').send(user).set('authorization', `Bearer ${token}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", "Email must be type email")
    })

    // token tdk ada
    test('should response 401 - invalid token', async()=>{
        let user = {
            email:'userTest3@gmail.com',
            password:'secretTest'
        }

        const response = await request(app).post('/add-user').send(user)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })

    // token salah
    test('should response 201 - created', async()=>{
        let user = {
            email:'userTest4@gmail.com',
            password:'secretTest'
        }

        const response = await request(app).post('/add-user').send(user).set('authorization', `Bearer ${token}-salah`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", "Invalid Token")
    })
})