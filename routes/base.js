const { Router } = require("express");
const router = Router();
const getReviews = require("../controllers/reviews/getReviewsAndRating");
const addReview = require("../controllers/reviews/addReview");
const getRecentLists = require("../controllers/list/getRecentLists");
const follow = require("../controllers/follow/follow");
const unFollow = require("../controllers/follow/unfollow");
const getMyLists = require("../controllers/list/getMyLists");
const appendToList = require("../controllers/list/appendItemToList");
const getList = require("../controllers/list/getListByUserandListName");
const getListsByUser = require("../controllers/list/getListsOfUser");
const addToWatchlist = require("../controllers/watchlist/addToWatchlist");
const addToFavourites = require("../controllers/favourites/appendItemToFavourites");
const addToWatched = require("../controllers/watched/addToWatched");
const removeFromWatchlist = require("../controllers/watchlist/removeFromWatchlist");
const removeFromFavourites = require("../controllers/favourites/removeItemFromFavourites");
const removeFromWatched = require("../controllers/watched/removeFromWatched");
const checkIfFavourite = require("../controllers/user/checkIfFavourite");
const checkIfInWatchlist = require("../controllers/user/checkIfInWatchlist");
const checkIfWatched = require("../controllers/user/checkIfWatched");
const getFollowerDetails = require("../controllers/user/getFollowerDetails");
const getFollowingDetails = require("../controllers/user/getFollowingDetails");
const getMovieAvailability = require("../controllers/bookings/getMovieAvailability");
const getSeats = require("../controllers/bookings/getSeats");
const addBooking = require("../controllers/bookings/addBooking");

router.get("/lists", getRecentLists);

router.get("/booking/:id/getAvl", getMovieAvailability)

router.get('/followers/:username', getFollowerDetails)

router.get('/following/:username', getFollowingDetails)

router.post('/addtowatchlist/:id', addToWatchlist)

router.post('/removefromwatchlist/:id', removeFromWatchlist)

router.post('/addtofavs/:id', addToFavourites)

router.post('/removefromfavs/:id', removeFromFavourites)

router.post('/addtowatched/:id', addToWatched)

router.post('/removefromwatched/:id', removeFromWatched)

router.get('/lists/:username', getListsByUser)

router.get('/list/:username/:listName', getList)

router.post('/confirmticket', addBooking)

router.get('/retrieveseats/:id/:timing/:venue', getSeats)

router.get('/retrievebookingdetails/:id', getMovieAvailability)

router.post('/profile/follow/:name', follow)

router.post('/profile/unfollow/:name', unFollow)

router.get("/filmreviews/:id", getReviews)

router.post("/checkiffav/:id", checkIfFavourite)

router.post("/checkifinwatchlist/:id", checkIfInWatchlist)

router.post("/checkifwatched/:id", checkIfWatched)

router.post("/getmylists", getMyLists)

router.get("/list/add/:listName/:listItem", appendToList)

router.post("/film/:id", addReview)

module.exports = router;
