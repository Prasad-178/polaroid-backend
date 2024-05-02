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
const ongoingShows = require("../controllers/theatre/ongoingShows");
const movieLocationAndTiming = require("../controllers/theatre/movieLocationAndTiming");
const cancelBooking = require("../controllers/bookings/cancelBooking");

/**
 * @swagger
 * /lists:
 *   get:
 *     summary: Get recent lists
 *     responses:
 *       200:
 *         description: Login Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   listName:
 *                     type: string
 *                     example: "Favourite movies"
 *                   description:
 *                     type: string
 *                     example: "My favourite movies"
 *                   createdBy:
 *                     type: string
 *                     example: "Prasad"
 *                   createdAt:
 *                     type: string
 *                     example: "Jan 10 2024"
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "123"
 *                         poster_path:
 *                           type: string
 *                           example: "http://tmdb.ord/597/coverpage"
 *                   
 */
router.get("/lists", getRecentLists);


/**
 * @swagger
 * /booking/{id}/getAvl:
 *   get:
 *     summary: Get movie availability
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of movie of which we want to check available shows
 *     responses:
 *       200:
 *         description: Movie Availability details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 locations:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "VR Chennai"
 *                 timings:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "8th May 2PM"
 */
router.get("/booking/:id/getAvl", getMovieAvailability)


/**
 * @swagger
 * /followers/{username}:
 *   get:
 *     summary: Get follower details
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of a user whose followers you want to see
 *     responses:
 *       200:
 *         description: Follower Details of queried user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username: 
 *                     type: string
 *                     example: "Prasad"
 *                   followers: 
 *                     type: integer
 *                     example: 1
 *                   following: 
 *                     type: integer
 *                     example: 2
 *                   watched: 
 *                     type: integer
 *                     example: 1
 *                   favourites: 
 *                     type: integer
 *                     example: 0
 *       404:
 *         description: User Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found!"
 */
router.get('/followers/:username', getFollowerDetails)


/**
 * @swagger
 * /following/{username}:
 *   get:
 *     summary: Get following details
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of a user whose following you want to see
 *     responses:
 *       200:
 *         description: Following Details of queried user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username: 
 *                     type: string
 *                     example: "Prasad"
 *                   followers: 
 *                     type: integer
 *                     example: 1
 *                   following: 
 *                     type: integer
 *                     example: 2
 *                   watched: 
 *                     type: integer
 *                     example: 1
 *                   favourites: 
 *                     type: integer
 *                     example: 0
 *       404:
 *         description: User Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found!"
 */
router.get('/following/:username', getFollowingDetails)

/**
 * @swagger
 * /ongoingshows:
 *   get:
 *     summary: Get movie IDs which have ongoing shows
 *     responses:
 *       200:
 *         description: Movie IDs that have upcoming shows
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "597"
 */
router.get('/ongoingshows', ongoingShows)


router.post('/addtowatchlist/:id', addToWatchlist)

router.post('/removefromwatchlist/:id', removeFromWatchlist)

router.post('/addtofavs/:id', addToFavourites)

router.post('/removefromfavs/:id', removeFromFavourites)

router.post('/addtowatched/:id', addToWatched)

router.post('/removefromwatched/:id', removeFromWatched)


/**
 * @swagger
 * /lists/{username}:
 *   get:
 *     summary: Get lists of a user
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of a user whose lists you want to see 
 *     responses:
 *       200:
 *         description: Login Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   listName:
 *                     type: string
 *                     example: "Favourite movies"
 *                   description:
 *                     type: string
 *                     example: "My favourite movies"
 *                   createdBy:
 *                     type: string
 *                     example: "Prasad"
 *                   createdAt:
 *                     type: string
 *                     example: "Jan 10 2024"
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "123"
 *                         poster_path:
 *                           type: string
 *                           example: "http://tmdb.ord/597/coverpage"
 *                   
 */
router.get('/lists/:username', getListsByUser)

/**
 * @swagger
 * /list/{username}/{listName}:
 *   get:
 *     summary: Get lists of a user
 *     parameters:
 *       - name: username
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of a user whose lists you want to see 
 *       - name: listName
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         description: List Name
 *     responses:
 *       200:
 *         description: Login Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 listName:
 *                   type: string
 *                   example: "Favourite movies"
 *                 description:
 *                   type: string
 *                   example: "My favourite movies"
 *                 createdBy:
 *                   type: string
 *                   example: "Prasad"
 *                 createdAt:
 *                   type: string
 *                   example: "Jan 10 2024"
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "123"
 *                       poster_path:
 *                         type: string
 *                         example: "http://tmdb.ord/597/coverpage"
 */
router.get('/list/:username/:listName', getList)

router.post('/confirmticket', addBooking)

router.post('/cancelticket', cancelBooking)

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

router.get('/loctim/:movieName', movieLocationAndTiming)

module.exports = router;
