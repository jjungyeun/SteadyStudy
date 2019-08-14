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
// req.body.(date, id, title, detail, startTime, endTime, category, state)
router.post('/add', function(req, res){
    var date = new Date();
    if(req.body.date == 1)
        date.setDate(date.getDate() + 1);
    var curDate = date.getFullYear() + '-' + (date.getMonth()+1) +'-'+date.getDate();
    var startTime = curDate + ' ' + req.body.startTime;
    var endTime = curDate + ' ' + req.body.endTime;
    var sql = "INSERT into taskTBL (id, title, detail, wDate, startTime, endTime, category, state) "+
        "values ('" + req.body.id + "','" + req.body.title + "','" + req.body.detail + "', '" + curDate + "', '" +
        startTime+"','"+endTime+"','"+req.body.category+"','"+req.body.state+"');";
    console.log(sql);
    connection.query(sql, function(err, data, fields){
        if(!err){
            res.send("success");
        }
        else {
            console.log('task 추가 실패: ', err);
            res.send('error');
        }
    });
});

// task 수정
router.post('/edit',function(req, res){

});

// task 삭제
router.get('/delete/:taskid',function(req, res){

});

module.exports = router;