const express = require('express');
const Bus = require('../models/bus');
const router = express.Router();

router.get('/fetch', (req, res, next)=> {
    console.log(req.query);
    Bus.find({from: req.query.from, to: req.query.to})
    .then(result=> {
        res.status(200).json({
            message: 'Buses Fetched Successfully',
            buses: result
        });
    })
    .catch(err=> {
        res.status(500).json({
            message: 'Fetching Buses Failed'
        });
    });
});

module.exports = router;