import mongoose from "mongoose";
mongoose.connection.on("connected", () => {
  console.log("Mongo has successfully connected.");
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongo has disconnected.");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

function startMongoose() {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {})
    .catch((err) => console.log(err));
}
export { startMongoose };
