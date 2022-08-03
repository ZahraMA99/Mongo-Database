const express = require("express");

const bodyParser = require("body-parser");
const Person = require("../models/person");

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post("/person", function (request, response) {
  let person = request.body;
  let person1 = new Person(person);
  person1.save();
  response.end();
});

router.put("/person/:id", function (request, response) {
  let pID = request.params.id;
  Person.findByIdAndUpdate(pID, { age: 80 }, function (err, person) {
    response.end();
  });
});

router.delete("/apocalypse", function (request, response) {
  Person.find({}, function (err, people) {
    people.forEach((p) => p.remove());
  });

  response.end();
});

module.exports = router;
