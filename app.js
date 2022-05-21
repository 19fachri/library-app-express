if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const morgan = require("morgan");
const multer = require("multer"); // v1.0.5
const upload = multer(); // for parsing multipart/form-data
const app = express();
const imageKit = require("./helpers/imageKit");
const { uploadFile } = require("./helpers/imageKit");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// app.use(morgan());

app.get("/", (req, res) => {
  res.status(200).json({ message: "server ready" });
});

routes.get("/test", (req, res, next) => {
  res.status(200).json({ message: "hello" });
});
routes.post("/test", upload.single("image"), async (req, res, next) => {
  try {
    const response = await uploadFile(req.file);
    console.log(response.url);
    res.status(200).json({ message: "hello" });
  } catch (error) {}
});
app.use(routes);

module.exports = app;
