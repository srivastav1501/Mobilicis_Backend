const mongoose = require('mongoose')
// CREATING USERSCHEMA TO STORE THE DATA IN MONGOOSE DATABASE
const userSchema= new mongoose.Schema({
    id: Number,
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    income: String,
    city: String,
    car: String,
    quote: String,
    phone_price: String
})

const Users = new mongoose.model('user',userSchema);

module.exports= Users;