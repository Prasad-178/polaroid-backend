const { Router } = require('express')
const router = Router()

const showTheatreAdmins = require('../controllers/admin/showTheatreAdmins')
const deleteTheatreAdmin = require('../controllers/admin/deleteTheatreAdmin')
const createTheatreAdmin = require('../controllers/admin/createTheatreAdmin')

router.get("/getadmindetails", showTheatreAdmins)

router.post("/deletetheatreadmin", deleteTheatreAdmin)

router.post("/createtheatreadmin", createTheatreAdmin)

module.exports = router