const express = require("express");
const Article = require("../models/article");
const { method } = require("method");
const router = express.Router();

router.get("/new-Article", function (req, res) {
  res.render("articles/new-Article", { article: new Article() });
});

router.get("/", async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article == null) res.redirect("/");
  res.json(article);
  res.render("articles/show", { article: article });
});

router.post("/", async (req, res) => {
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savedArticle = await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch (error) {
    console.error(error);
    res.render("articles/new-Article", { article: article });
  }
});
router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  console.log("Deleted article");
  res.redirect("/");
});

router.put("/edit/:id", async (req, res) => {
  console.log("Data Updated");
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savedArticle = await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch (error) {
    console.error(error);
    res.render("articles/edit", { article: article });
  }
});
router.get("/edit/:id", async (req, res) => {
  console.log("id");
  await Article.findById(req.params.id);
  res.render(`articles/edit`, {
    article: await Article.findById(req.params.id),
  });
});

module.exports = router;
