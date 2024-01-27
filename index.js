import express from "express";
import cors from "cors"
import { validationMiddleware } from "./validateMiddleware.js";
import { registerSchema } from "./validateSchema.js";
import { CustomErrorHandler, errorHandler, notfoundHandler } from "./errorHandler.js";
import bodyParser from "body-parser";
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
//validationMiddleware(registerSchema), 
app.post("/register", validationMiddleware(registerSchema), (req, res, next) => {
  try {
    const { name } = req.body;
    if (name === "asikur") {
      throw new CustomErrorHandler(`Custom Error For name ${name}`, 400);
    }
    console.log(req.body);
    res.json({ success: true, body: req.body });
  } catch (error) {
    next(error);
  }
});

app.use(notfoundHandler);
app.use(errorHandler);
app.listen(5000, () => {
  console.log("Server Running on port 5000!")
});
