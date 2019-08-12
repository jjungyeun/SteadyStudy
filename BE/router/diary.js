var express = require('express');
var router = express.Router();

var connection = require('../index.js').connection;

// diary 불러오기
router.get('/get/:id/:date',function(req, res){

});

// diary 수정
router.post('/edit',function(req, res){

});

module.exports = router;