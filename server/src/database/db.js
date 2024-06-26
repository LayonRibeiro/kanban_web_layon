import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("Waiting connection to database...");
  mongoose
    .connect( process.env.MONGODB_URI,
      { dbName: process.env.MONGODB_DATABASE }
    )
    .then(() => console.log("MongoDB Atlas Connected"))
    .catch((error) => console.log(error));
};

export default connectDatabase;
