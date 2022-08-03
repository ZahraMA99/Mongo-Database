const mongoos = require("mongoose");
mongoos.connect("mongodb://localhost/solarSystem", { useNewUrlParser: true });

const Schema = mongoos.Schema;

// Scheams
const solarSystemSchema = new Schema({
  planets: [{ type: Schema.Types.ObjetcId, ref: "Planet" }],
  starName: String,
});

const planetSchema = new Schema({
  name: String,
  system: { type: Schema.Types.ObjetcId, ref: "SolarSystem" },
  visitors: [{ type: Schema.Types.ObjetcId, ref: "Visitor" }],
});

const visitorSchema = new Schema({
  name: String,
  homePlanet: { type: Schema.Types.ObjetcId, ref: "Planet" },
  visitedPlanets: [{ type: Schema.Types.ObjetcId, ref: "Planet" }],
});

// models
const Solar = mongoose.model("SolarSystem", solarSystemSchema);
const Planet = mongoose.model("Planet", planetSchema);
const Visitor = mongoose.model("Visitor", visitorSchema);

let s1 = new Solar({
  planets: [],
  starName: "Sirius",
});

let p1 = new Planet({
  name: "Saturn",
  system: s1,
  visitors: [],
});

let p2 = new Planet({
  name: "Jupiter",
  system: s1,
  visitors: [],
});

let p3 = new Planet({
  name: "Venus",
  system: s1,
  visitors: [],
});

let visit1 = new Visitor({
  name: "visit Saturn",
  homePlanet: p1,
  visitedPlanets: [],
});

let visit2 = new Visitor({
  name: "visit Jupiter",
  homePlanet: p2,
  visitedPlanets: [],
});

let visit3 = new Visitor({
  name: "visit Venus",
  homePlanet: p3,
  visitedPlanets: [],
});

s1.planets.push(p1);
s1.planets.push(p2);
s1.planets.push(p3);
s1.save();

p1.visitors.push(visit1);
p1.save();

p2.visitors.push(visit2);
p2.save();

p3.visitors.push(visit3);
p3.save();

visit1.visitedPlanets.push(p1);
visit1.save();

visit2.visitedPlanets.push(p2);
visit2.save();

visit3.visitedPlanets.push(p3);
visit3.save();

// Find a visitor’s list of visited planets
Visitor.findOne({})
  .populate("visitedPlanets")
  .exec(function (err, visitor) {
    visitor.visitedPlanets.forEach((visitPlanet) =>
      console.log(visitPlanet.name)
    );
  });

// Find all the visitors on a planet
