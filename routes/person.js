//require person schema
const Person = require("../models/person");

//require express
const express = require("express");

//init express router
const router = express.Router();


//@URL http://localhost:5000/persons
//@Create Many Records with model.create()
router.post("/", (req, res) => {
    const newPerson = new Person({ name: "FARAH", age: 6, favoriteFoods: ["POTATE"] });
    newPerson
          .save()
          .then(() => res.send("person has been added with success"))
          .catch((err) => res.send(err))
});

//@URL http://localhost:5000/persons
//@Use model.find() to Search Your Database
router.get("/", (req, res) => {
    Person.find()
      .then((persons) => res.send(persons))
      .catch((err) => res.send(err));
  });


//@URL http://localhost:5000/persons
//@Use model.findOne() to Return a Single Matching Document from Your Database
router.get("/food/:favoriteFoods", (req, res) => {
    let favoriteFoods= {...req.params}
    Person.findOne(favoriteFoods)
    .then((persons) => res.send(persons))
    .catch((err) => res.send(err))
})

//@//@URL http://localhost/persons/id
//@Use model.findById() to Search Your Database By _id
router.get("/:_id", (req, res) => {
    let { _id } = req.params;
    Person.find({ _id })
    .then((person) => res.send(person))
    .catch((err) => res.send(err));
});

//@URL http://localhost/persons/id
//@Perform Classic Updates by Running Find, Edit, then Save
router.put("/findupdate/:name", (req, res) => {
    let { searchname } = req.params;
   let person = Person.findOne({ name:searchname });
    console.log(Person.findOne({ name:searchname }));
   person.age=25;
   person.save()
    //.then((person) => res.send(person))
    //.catch((err) => res.send(err));
});




//@URL http://localhost:5000/persons/id
//Perform Classic Updates by Running Find, Edit, then Save
router.put("/:_id", (req, res) => {
    let { _id } = req.params;
    Person.findByIdAndUpdate({ _id },{$set:{...req.body}})
    .then(() => res.send("Person Has been Updated"))
    .catch((err) => res.send(err));
});

//@URL http://localhost:5000/persons/id
//Delete One Document Using model.findByIdAndRemove
router.delete("/:_id", (req, res) => {
    let { _id } = req.params;
    Person.findByIdAndRemove({ _id })
      .then(() => res.send(`Person with id = ${ _id} has been deleted`))
      .catch((err) => res.send(err));
  });

  //@URL http://localhost:5000/persons/id
//Delete One Document Using model.deleteMany
router.delete("/", (req, res) => {
    let nameToRemove = "Marry";
    Person.deleteMany({name:nameToRemove })
      .then(() => res.send(`Person with name = ${ nameToRemove} has been deleted`))
      .catch((err) => res.send(err));
  });
  
  
  //@URL http://localhost:5000/persons/
  //Chain Search Query Helpers to Narrow Search Results
  router.get("/", (req, res) => {
  
   let foodToSearch = { favoriteFoods: { $all: ["POTATE"] } };
  
    Person.find(foodToSearch).sort({name:'asc'}).limit(2).select({age:0}).exec()
      .then((person) => res.send(person))
      .catch((err) => res.send(err));
  });
  
  
  
  //export router
  module.exports=router
