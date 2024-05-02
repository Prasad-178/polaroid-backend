const { Router } = require("express");
const multer = require('multer')
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
const userDetails = require("../controllers/user/userDetails");
const uploadImage = require("../controllers/user/updateImage");
const imageUploadDatabase = require("../controllers/user/imageUploadDatabase");
const bookingHistory = require("../controllers/user/bookingHistory");
const router = Router();

const DIR = './public/uploads';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.get('/check', userDetails)

router.post('/getuser', getUser)

router.post('/forgotpassword', forgotPasswordOTP)

router.post('/resetpassword', resetPassword)

router.get('/deactivate', deleteAccount)

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login for User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: Successfully logged in!
 *       404:
 *         description: User Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No such user exists!
 *       403:
 *         description: Wrong Password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: The password you have entered is wrong!
 *
 */
router.post("/login", login);

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register for User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registeration Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Registered successfully!
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error!
 *       403:
 *         description: User Already Exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: A user with this username/email already exists!
 *
 */
router.post("/register", register);

/**
 * @swagger
 * /user/createList:
 *   post:
 *     summary: Create a movies list
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               listName:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: List Creation Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: List created successfully!
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error!
 *       401:
 *         description: List Already Exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: A list with this name already exists!
 *
 */
router.post("/createlist", createList);

router.post("/addtolist", appendToList);

router.post('/settings', settings)

router.post("/list/:listName", getMyListByName);

router.post("/delete/list", deleteItemFromList)

router.post('/watchlistdelete/:id', removeFromWatchlist)

router.post('/watcheddelete/:id', removeFromWatched)

router.post("/list", getMyLists)

/**
 * @swagger
 * /user/list/delete/{listName}/{username}:
 *   delete:
 *     summary: Delete a movie list
 *     parameters:
 *       - in: path
 *         name: listName
 *         required: true
 *         description: Name of the list
 *         schema:
 *           type: string
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username of User
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List Deletion Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: List deleted successfully!
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error!
 *       401:
 *         description: List Doesn't Exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No such list exists!
 *
 */
router.delete("/list/delete/:listName/:username", deleteList);

router.post("/createlist", createList);

/**
 * @swagger
 * /user/logout:
 *   get:
 *     summary: Logout of User
 *     responses:
 *       200:
 *         description: Logout Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged out successfully!
 */
router.get("/logout", logout);

router.post('/uploadImage', upload.single('profileImg'), uploadImage)

router.post('/imgdatabase', imageUploadDatabase)

router.post('/bookinghistory', bookingHistory)

module.exports = router;
