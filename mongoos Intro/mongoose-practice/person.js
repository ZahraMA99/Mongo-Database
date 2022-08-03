// use moongoos library
const mongoos = require("mongoose");

//make connection between mongoos and library
mongoos.connect("mongodb://localhost/peopleDB", { useNewUrlParser: true });

// create schema
const Schema = mongoos.Schema;

// initilize schema
const personSchema = new Schema({
  firstNmae: String,
  lastName: String,
  age: Number,
});

//create model person by the previous schema
const Person = mongoos.model("person", personSchema);

// create document(instance) from person model
let p1 = new Person({ firstNmae: "David", lastName: "Smith", age: 25 });
p1.save();
console.log(p1);

let p2 = new Person({ firstNmae: "zahra", lastName: "aqel", age: 22 });
let p3 = new Person({ firstNmae: "basel", lastName: "ahmad", age: 23 });

let personArray = [p2, p3];
personArray.forEach((p) => p.save());
console.log(personArray);
