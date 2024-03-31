'use strict';

const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   let hashedPassword1 = hashPassword("secret")
   let hashedPassword2 = hashPassword("secret2")
   let hashedPassword3 = hashPassword("secretStaff")
   await queryInterface.bulkInsert('Users', [
    {username:"user1", email:"user1@gmail.com", password:hashedPassword1, role:"admin", phoneNumber:"111-222-333", address:"Jalan Server1, kelurahan Client2, Prov FullStack, Indonesia", createdAt: new Date(), updatedAt:new Date()},
    {username:"user2", email:"user2@gmail.com", password:hashedPassword2, role:"admin", phoneNumber:"121-232-333", address:"Jalan Server2, kelurahan Client2, Prov FullStack, Indonesia", createdAt: new Date(), updatedAt:new Date()},
    {username:"user3", email:"user3@gmail.com", password:hashedPassword3, role:"staff", phoneNumber:"141-252-333", address:"Jalan Server1, kelurahan Client3, Prov FullStack, Indonesia", createdAt: new Date(), updatedAt:new Date()},
    {username:"user4", email:"user4@gmail.com", password:hashPassword('secret'), role:"admin", phoneNumber:"111-222-333", address:"Jalan Server1, kelurahan Client2, Prov FullStack, Indonesia", createdAt: new Date(), updatedAt:new Date()},
    {username:"user5", email:"user5@gmail.com", password:hashPassword('secret'), role:"admin", phoneNumber:"111-222-333", address:"Jalan Server1, kelurahan Client2, Prov FullStack, Indonesia", createdAt: new Date(), updatedAt:new Date()}
   ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
