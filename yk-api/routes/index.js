var express = require('express');
var router = express.Router();
var mongo = require('mongodb-curd');
var dbBase = 'yk'
    /* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/info/getData', function(req, res, next) {
    var { shu, skip, limit } = req.body
    if (!shu || !skip || limit) {
        res.send({ code: 2, message: "参数不完整" })
    }
    momgo.find(dbBase, 'flow', req.body, function() {
        if (result.length) {
            var len = result.length
            mongo.find(dbBase, 'flow', req.body, function(result) {
                if (!result) {
                    res.send({ code: 0, message: "error" })
                } else {
                    res.send({ code: 1, data: result, len: len })
                }
            })
        } else {
            res.send({ code: 0, message: "error" })
        }
    }, {
        skip: skip,
        limit: limit
    })
});











router.get('/info/getData', function(req, res, nxt) {
    mongo.find(dbBase, 'flow', function(result) {
        if (!result) {
            res.send({ code: 0, message: "error" })
        } else {
            res.send({ code: 1, data: result })
        }
    })

})

module.exports = router;