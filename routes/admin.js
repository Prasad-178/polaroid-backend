const csrf = require('csurf')
const bodyParser = require('body-parser')
const { Router } = require('express')
const router = Router()

const showTheatreAdmins = require('../controllers/admin/showTheatreAdmins')
const deleteTheatreAdmin = require('../controllers/admin/deleteTheatreAdmin')
const createTheatreAdmin = require('../controllers/admin/createTheatreAdmin')

const csrfProtection = csrf({ cookie: true })
const parseForm = bodyParser.urlencoded({ extended: false })

router.get("/getadmindetails", csrfProtection, showTheatreAdmins)

router.post("/deletetheatreadmin", parseForm, csrfProtection, deleteTheatreAdmin)

router.post("/createtheatreadmin", parseForm, csrfProtection, createTheatreAdmin)

module.exports = router