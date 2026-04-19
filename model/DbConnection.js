require('dotenv').config();
const mongoose = require("mongoose");

exports.connect = async function(where){
    let uri = process.env.MONGO_URI;
    if(where === 'test') uri = process.env.TEST_MONGO_URI;
    if(process.env.CI) uri = "mongodb://adm:secret@localhost:27017"; //CI test

    try{
        await mongoose.connect(uri);
    }catch(error){
        console.log(error);
    }
}

exports.disconnect = async function(){
    await mongoose.connection.close();
}