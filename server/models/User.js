const mongoose = require('mongoose');
const { Schema } = mongoose; //the structure of records and their properties in a collection is schema

const userSchema = new Schema({
  googleID: String
});

mongoose.model('users',userSchema);