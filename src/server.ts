import "express-async-errors";
import express from "express";
import cors from "cors";
import routes from "./routes";
import ErrorHandler from "~middlewares/ErrorHandler.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(ErrorHandler);

app.listen(process.env.PORT || 3333, () => {
  console.log("HTTP server running!");
});
