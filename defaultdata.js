const Users = require('./modals/userSchema');
const users = require('./constant/sample_data');


const DefaultData = async()=>{
    try{

           await Users.deleteMany({});
          const storeData = await Users.insertMany(users);
          console.log(storeData)
    }catch(error){
              console.log('err====',error.message);
    }
}


module.exports = DefaultData;