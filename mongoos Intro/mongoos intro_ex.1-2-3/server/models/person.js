const mongoos = require("mongoose");

mongoos.connect("mongodb://localhost/peopleDB", { useNewUrlParser: true });

const Schema = mongoos.Schema;
const personSchema = new Schema({
  firstNmae: String,
  lastName: String,
  age: Number,
});

const Person = mongoos.model("person", personSchema);
module.exports = Person;
