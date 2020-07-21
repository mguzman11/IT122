//const credentials = require("../credentials");
const mongoose = require("mongoose");

// remote db connection settings. For security, connectionString should be in a separate file not committed to git
 const connectionString = "mongodb+srv://dbuser:pasword1221@cluster0.r91pr.mongodb.net/<dbname>?retryWrites=true&w=majority";

//local db connection settings 
// const ip = process.env.ip || '127.0.0.1';
// const connectionString = 'mongodb://' +ip+ '/<DB_NAME>';

mongoose.connect(connectionString, { dbName: "sccprojects", useNewUrlParser: true }); 

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define Book model in JSON key/value pairs
// values indicate the data type of each key
const mySchema = mongoose.Schema({
 name: { type: String, required: true },
 breed: String,
 age: String,
 sex: String,
}); 

module.exports = mongoose.model('Dog', mySchema);