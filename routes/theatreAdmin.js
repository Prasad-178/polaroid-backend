const { Router } = require('express')
const router = Router()

const login = require('../controllers/theatreAdmin/login')
const addShow = require('../controllers/theatreAdmin/addShow')
const deleteLocation = require('../controllers/theatreAdmin/deleteLocation')
const deleteMovie = require('../controllers/theatreAdmin/deleteMovie')
const deleteShow = require('../controllers/theatreAdmin/deleteShow')
const showInfo = require('../controllers/theatreAdmin/showInfo')
const perLocationStats = require('../controllers/theatreAdmin/perLocationStats')
const perMovieStats = require('../controllers/theatreAdmin/perMovieStats')
const perLocationStatsLastWeek = require('../controllers/theatreAdmin/perLocationStatsLastWeek')
const perLocationStatsLastMonth = require('../controllers/theatreAdmin/perLocationStatsLastMonth')
const perMovieStatsLastWeek = require('../controllers/theatreAdmin/perMovieStatsLastWeek')
const perMovieStatsLastMonth = require('../controllers/theatreAdmin/perMovieStatsLastMonth')

router.post('/locationstats', perLocationStats)

router.post('/locationstats/week', perLocationStatsLastWeek)

router.post('/locationstats/month', perLocationStatsLastMonth)

router.post('/moviestats', perMovieStats)

router.post('/moviestats/week', perMovieStatsLastWeek)

router.post('/moviestats/month', perMovieStatsLastMonth)

router.post('/info', showInfo)

/**
 * @swagger
 * /theatreAdmin/login:
 *   post:
 *     summary: Login for Theatre Admin
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
 *         description: Theatre Admin Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No such theatre admin exists!
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
router.post("/login", login)

router.post("/addshow", addShow)

router.post('/location', deleteLocation)

router.post('/movie', deleteMovie)

router.post('/show', deleteShow)

module.exports = router
