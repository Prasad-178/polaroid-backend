const { Router } = require("express");
const getMovieByName = require("../api/getMovieByName");
const router = Router();
const session = require("../session/session");

router.get("/", async (req, res) => {
  res.render("search", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    data: {
      results: []
    },
    name: ""
  });
});

router.post("/", async (req, res) => {
  const data = await getMovieByName(req.body.name);
  res.render("search", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    data: data,
    name: req.body.name
  });
});

module.exports = router;
