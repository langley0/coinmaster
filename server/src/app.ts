import * as express from "express";
import controller from "./controller";

const PORT = 3001;

const app = express();
app.use("/api", controller);


app.listen(PORT, () => {
    console.log(`server is listening port as ${PORT}`);
});