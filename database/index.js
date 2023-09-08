const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/petscaledb";
//mongodb://{USERNAME}:{PASSWORD}@{EC2 INSTANCE IP / HOSTNAME}/{DATABASENAME}
//db = petscaledb, collection = petdatas... db.collection.find({});
// const mongoURI = `mongodb://petscale.xyz:27017/petscaledb`;

// const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@petscale-db-cluster.now8lwu.mongodb.net/petscaledb?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

const db = mongoose.connect(mongoURI, { useNewUrlParser: true });

// mongoose.connect("mongodb://localhost:27017/petscaledb");
// const db = mongoose.connection;

const sessionSchema = new mongoose.Schema({
  owner: String,
  name: String,
  weight: Number,
  unit: String,
  color: Number,
  created_at: Date,
});

// const userSchema = new mongoose.Schema({
//   username: String,
//   pets: Array,
// });

const PetData = mongoose.model("PetData", sessionSchema);

db.then((db) => console.log(`Connected to: ${mongoURI}`)).catch((err) => {
  console.log(`There was a problem connecting to mongo at: ${mongoURI}`);
  console.log(err);
});

console.log(mongoose.connection.readyState);

// db.on("error", console.error.bind(console, "MongoDB connection error:"));

// module.exports = db;
module.exports.PetData = PetData;
