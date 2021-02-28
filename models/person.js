const mongoose = require("mongoose");

const schema = mongoose.Schema;

//create person prototype

const personSchema = new schema({
      name: { type: String, required: true },
      age: { type: Number },
      favoriteFoods :[{type:String}]
})



//export module

const Person = mongoose.model("person", personSchema)
module.exports = Person;