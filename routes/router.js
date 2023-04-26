const express = require('express')
const router = new express.Router();
const Users = require('../modals/userSchema');


// API to get Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.
router.get('/lt5BMW|Mercedes', async(req,res)=>{
    try{
        const usersData = await Users.find({$and:[{income: {$lt: '$5'},
            car: {$in:["BMW","Mercedes-Benz"]}
        }]});
        res.status(201).json(usersData)
    }catch(error){
        console.log(error.message);
    }
})

// API to get Male Users which have phone price greater than 10,000.
router.get('/male|phgt10k', async(req,res)=>{
    try{
        const usersData = await Users.find({$and:[{gender: {$eq: 'Male'},
        phone_price: {$gt:'10000'}
        }]});
        res.status(201).json(usersData)
    }catch(error){
        console.log(error.message);
    }
})

// API to get  Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name.
router.get('/lnstwMqtgt15', async(req,res)=>{
    try{
        const usersData = await Users.find({
            last_name: { $regex: /^M/ },
            $expr: { $gt: [{ $strLenCP: '$quote' }, 15] },
            email: { $regex: /M$/i }
          });
        res.status(201).json(usersData)
    }catch(error){
        console.log(error.message);
    }
})

//API to get Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.

router.get('/bmw|mrec|audi&emailnotd', async(req,res)=>{
    try{
        const usersData = await Users.find({
            car: { $in: ['BMW', 'Mercedes-Benz', 'Audi'] },
            email: { $not: { $regex: /\d/ } }
          });
        res.status(201).json(usersData)
    }catch(error){
        console.log(error.message);
    }
})

 // API to get the data of top 10 cities which have the highest number of users and their average income.
router.get('/top10CWithHighNoOfUsersAndAverageIncm', async(req,res)=>{
    try{
        const usersData = await Users.aggregate([
            { $group: { _id: '$city', count: { $sum: 1 }, totalIncome: { $sum: { $toDouble: { $substr: ['$income', 1, -1] } } } } },
            { $sort: { count: -1 } },
            { $limit: 10 },
            { $project: { _id: 1, count: 1, averageIncome: { $divide: ['$totalIncome', '$count'] } } }
          ])
        res.status(201).json(usersData)
    }catch(error){
        console.log(error.message);
    }
})



module.exports =router;