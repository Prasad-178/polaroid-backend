const { Router } = require("express");
const login = require("../controllers/user/login");
const logout = require("../controllers/user/logout");
const register = require("../controllers/user/register");
const appendToList = require("../controllers/list/appendItemToList");
const createList = require("../controllers/list/createList");
const verifyToken = require("../middleware/verifyToken");
const session = require("../session/session");
const getMyLists = require("../controllers/list/getMyLists");
const deleteList = require("../controllers/list/deleteList");
const getMyListByName = require("../controllers/list/getMyListByName");
const getUser = require("../controllers/user/getUser");
const settings = require("../controllers/user/settings");
const getList = require("../controllers/list/getListByUserandListName");
const getListsByUser = require("../controllers/list/getListsOfUser");
const removeFromWatchlist = require("../controllers/watchlist/removeFromWatchlist");
const removeFromWatched = require("../controllers/watched/removeFromWatched");
const deleteAccount = require("../controllers/user/deleteAccount");
const forgotPasswordOTP = require("../controllers/user/forgotPasswordOTP");
const resetPassword = require("../controllers/user/resetPassword");
const deleteItemFromList = require("../controllers/list/deleteItemFromList");
const userDetails = require("../controllers/user/userDetails")
const router = Router();

router.get('/check', userDetails)

router.post('/getuser', getUser)

// router.get("/login", (req, res) => {
//   res.render("login", { error: "" });
// });

// router.get("/register", (req, res) => {
//   res.render("register", { error: "" });
// });

// router.get('/forgotpassword', (req, res) => {
//   res.render('forgot_password_1', {
//     error: ""
//   })
// })

// router.get('/resetpassword', (req, res) => {
//   res.render('forgot_password_2', {
//     error: "",
//     email: ""
//   })
// })

router.post('/forgotpassword', forgotPasswordOTP)

router.post('/resetpassword', resetPassword)

router.get('/deactivate', deleteAccount)

router.post("/login", login);

router.post("/register", register);

router.post("/createlist", createList);

router.post("/addtolist", appendToList);

router.get("/settings", (req, res) => {
  if (!session.isLoggedIn) {
    res.redirect("/user/login");
    return;
  }
  res.render("settings", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    data: {
      success: false,
      successMessage: "",
      error: ""
    }
  });
});

router.post('/settings', async (req, res) => {
  const data = await settings(req, res)
  res.render("settings", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    data: data
  })
})

router.get("/profile", async (req, res) => {
  const user = await getUser();
  res.render("profile", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    currentUser: true,
    data: user.user,
    listLength: user.lists
  });
});

router.get("/list/:listName", async (req, res) => {
  let listName = req.params.listName;
  listName.split("%20").join(" ") ;

  const list = await getMyListByName(listName);
  res.render("list_page", {
    check: session.isLoggedIn,
    username: session.username,
    email: session.email,
    data: list,
    heading: "CREATED BY " + session.username,
    time: "Created On " + list.createdAt.slice(0, 15),
    isTrending: false,
    listHeading: list.listName,
    editable: true
  });
});

router.post("/delete/list/:listName/:filmname", async (req, res) => {
  // console.log("delete trigger")

  var listName = req.params.listName.split("%20").join(" ")
  var filmName = req.params.filmname

  await deleteItemFromList(listName, filmName)

  // console.log(listName+ " " + filmName)

  res.redirect("/user/list/"+listName)
})

router.get("/watchlist", async (req, res) => {
  const user = await getUser()
  // console.log(user)
  res.render("watchlist", {
    check: true,
    username: session.username,
    email: session.email,
    data: user.user.planToWatch,
    userWatchList: session.username,
    editable: true
  });
});

router.get("/watchedfilms", async (req, res) => {
  const user = await getUser()
  // console.log(user)
  // console.log("wae is : ", typeof user.watched)
  res.render("watched_films", {
    check: true,
    username: session.username,
    email: session.email,
    data: user.user.watched,
    userWatchList: session.username,
    editable: true
  });
});

router.post('/watchlist/:id', async (req, res) => {
  const id = req.params.id
  await removeFromWatchlist(id)
  res.redirect("/user/watchlist")
})

router.post('/watched/:id', async (req, res) => {
  const id = req.params.id
  await removeFromWatched(id)
  res.redirect("/user/watchedfilms")
})

router.get("/list", getMyLists)

router.post("/list/delete/:listName", async (req, res) => {
  let listName = req.params.listName;
  listName.split("%20").join(" ") ;
  await deleteList(listName);

  res.redirect("/user/list");
});

router.post("/list", createList);

router.get("/logout", logout);

module.exports = router;
