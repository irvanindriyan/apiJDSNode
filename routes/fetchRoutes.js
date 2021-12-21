'use strict'
const express = require('express')
const fetchData = require('../controllers/fetchController')
const { verifyToken } = require('../middleware/verifyJwt')
const { verifyRole } = require('../middleware/verifyRole')
const router = express.Router()

router.get(`/api/fetch/data`, verifyToken, fetchData.getData)
router.get(`/api/fetch/data_order`, [verifyToken, verifyRole], fetchData.getDataOrder)

module.exports = router