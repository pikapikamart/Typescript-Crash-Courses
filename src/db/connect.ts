import mongoose from "mongoose";
import config from "config";
import log from "../logger";


const connectDatabase = async() =>{
  const dbURI = config.get("dbUri") as string;

  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    log.info("Database Connected");
  } catch (error) {
    log.info("Database Error ", error);
    process.exit(1);
  }
}


export default connectDatabase;