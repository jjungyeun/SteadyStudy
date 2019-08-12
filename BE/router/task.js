var express = require('express');
var router = express.Router();

var connection = require('../index.js').connection;

// 어제 task 불러오기
router.get('/get/:id/:date/yesterday',function(req, res){

});

// 내일 task 불러오기
router.get('/get/:id/:date/tomorrow',function(req, res){

});

// 오늘 task 불러오기
router.get('/get/:id/:date/today',function(req, res){

});

// task 추가
router.post('/add', function(req, res){

});

// task 수정
router.post('/edit',function(req, res){

});

// task 삭제
router.get('/delete/:taskid',function(req, res){

});

module.exports = router;