console.log("server.js -- file");
const Article = require("./models/article");
const express = require("express");
const mongoose = require("mongoose");
// Initialize the Router path
const articleRouter = require("./routes/articles");
const methodOverride = require("method-override");
const article = require("./models/article");
const app = express();

mongoose
  .connect(
    "mongodb+srv://shekharpareek:4Hfrfoo3VmWalJ1C@cluster0.hwbyaq6.mongodb.net/mydatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Import EJS and set the view engine to use EJS
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));
app.use("/articles", articleRouter);

// Route for the root path ("/")
app.get("/", async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.render("articles/index", { articles });
  } catch (error) {
    console.error("Error retrieving articles:", error);
    res.status(500).send("Error retrieving articles");
  }
});
// call using path
app.get("/api/article/", async (req, res) => {
  try {
    const articles = await Article.findById(req.params.id);
    res.json(articles);
  } catch (error) {
    console.error("Error retrieving articles:", error);
    res.status(500).send("Error retrieving articles");
  }
});
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
