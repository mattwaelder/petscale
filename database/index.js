const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/petscaledb";

const db = mongoose.connect(mongoURI, { useNewUrlParser: true });

// mongoose.connect("mongodb://localhost:27017/petscaledb");
// const db = mongoose.connection;

const sessionSchema = new mongoose.Schema({
  owner: String,
  name: String,
  weight: Number,
  created_at: Date,
});

const userSchema = new mongoose.Schema({
  username: String,
  pets: Array,
});

const PetData = mongoose.model("PetData", sessionSchema);

db.then((db) => console.log(`Connected to: ${mongoURI}`)).catch((err) => {
  console.log(`There was a problem connecting to mongo at: ${mongoURI}`);
  console.log(err);
});

console.log(mongoose.connection.readyState);

// db.on("error", console.error.bind(console, "MongoDB connection error:"));

// module.exports = db;
module.exports = PetData;
