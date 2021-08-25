import express from "express";
import config from "config";
import log from "./logger/index";
import connectDatabase from "./db/connect";
import routes from "./routes/routes";
import deserializeUser from "./middleware/deserializeUser";

// Initialize the app instance
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(deserializeUser);

const port = config.get("port") as number;
const host = config.get("host") as string;


app.listen(port, host, () =>{
  log.info(`Server is running at http://${host}:${port}`);
  
  connectDatabase();
  routes(app);
})
