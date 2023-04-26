const mongoose = require('mongoose');

const DB = process.env.DB;
// connectiong mongoose 
mongoose.connect(DB).then(()=>console.log('connected successfully')).catch(error=>console.log(error))