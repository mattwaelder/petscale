const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/petscaledb";

const db = mongoose.connect(mongoURI, { useNewUrlParser: true });

// mongoose.connect("mongodb://localhost:27017/petscaledb");
// const db = mongoose.connection;

const petSchema = new mongoose.Schema({
  owner: String,
  name: String,
  weight: Number,
  created_at: Date,
});

const PetData = mongoose.model("PetData", petSchema);

db.then((db) => console.log(`Connected to: ${mongoURI}`)).catch((err) => {
  console.log(`There was a problem connecting to mongo at: ${mongoURI}`);
  console.log(err);
});

console.log(mongoose.connection.readyState);

// db.on("error", console.error.bind(console, "MongoDB connection error:"));

// module.exports = db;
module.exports = PetData;
