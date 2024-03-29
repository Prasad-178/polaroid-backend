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

router.post("/login", login);

router.post("/register", register);

router.post("/createlist", createList);

router.post("/addtolist", appendToList);

router.post('/settings', settings)

router.post("/list/:listName", getMyListByName);

router.post("/delete/list", deleteItemFromList)

router.post('/watchlistdelete/:id', removeFromWatchlist)

router.post('/watcheddelete/:id', removeFromWatched)

router.post("/list", getMyLists)

router.delete("/list/delete/:listName/:username", deleteList);

router.post("/createlist", createList);

router.get("/logout", logout);

router.post('/uploadImage', upload.single('profileImg'), uploadImage)

router.post('/imgdatabase', imageUploadDatabase)

router.post('/bookinghistory', bookingHistory)

module.exports = router;
