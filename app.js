require('dotenv').config();
const express = require('express')
const app = express();
require('./db/conn');
const defaultData = require('./defaultdata');
const cors = require('cors')
const router = require('./routes/router');


app.use(express.json());
app.use(cors());
app.use(router);
const port =process.env.PORT || 8005;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

defaultData();