const express = require ('express');
const app =express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');
const port = process.env.PORT || 5000;
require('dotenv').config();

// midle ware
app.use(cors(
    {
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204,
        "Access-Control-Allow-Origin":" http://localhost:3000"
      }
));
app.use(express.json());

const uri = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.xa1zyf9.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const Usercollection = client.db("userDocument2").collection("user");
app.post('/userSetData', async(req, res)=>{
    try{
        const data = req.body;
        const result = await Usercollection.insertOne(data);
        res.send(result);
    }
    catch(e){
        res.send(e.message);
    }

})

app.get('/userData', async(req, res)=>{
    const query = {};
    const result = await Usercollection.find(query).toArray();
    res.send(result); 
})

app.delete('/userData/:id', async(req, res)=>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const result= await Usercollection.deleteOne(query);
    res.send({acknowledged: true});
})

app.get('/', (req, res)=>{
    res.send('server is running');
})

app.listen(port, ()=>{
    console.log(`server running ${port} port`)
})