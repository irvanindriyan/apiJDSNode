'use strict';
const express = require('express');
const auth = require('./authRoutes');
const fetchData = require('./fetchRoutes');
const router = express();

router.get(`/api/`, (_req, res) => {
  res.json({
    "message": "Welcome to Rest Api"
  });
});

router.use(auth);
router.use(fetchData);

module.exports = router;