var express = require('express');
var router = express.Router();

var connection = require('../index.js').connection;

// task 불러오기
router.get('/get/:id/:date',function(req, res){
    connection.query('SELECT * from taskTBL where id = "'+req.params.id+'" and wdate = "'+req.params.date+'" ORDER BY starttime',
    function(err, data){
        if(!err){
            res.send(data);
        }
        else {
            console.log('task 불러오기 실패: ', err);
            res.send('error');
        }
    });
});

// task 추가
// req.body.(date, id, title, detail, startTime, endTime, category, state)
router.post('/add', function(req, res){
    var date = new Date();
    if(req.body.date == 1)
        date.setDate(date.getDate() + 1);
    var curDate = date.getFullYear() + '-' + (date.getMonth()+1) +'-'+date.getDate();
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;
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
// req.body.(title, detail, startTime, endTime, category, state, taskid)
router.post('/edit',function(req, res){
    var sql = 'UPDATE taskTbl SET title = "'+ req.body.title + '", detail = "'+ req.body.detail + 
        '", startTime = "'+ req.body.startTime + '", endTime = "'+ req.body.endTime + 
        '", category = "'+ req.body.category + '", state = "'+ req.body.state + 
        '" WHERE num = '+ req.body.taskid  + ' LIMIT 1;';
        console.log(sql);
        connection.query(sql, function(err, data){
            if(!err){
                res.send('success');
            }
            else {
                console.log('task 수정 실패: ', err);
                res.send('error');
            }
        });
});

// task 삭제
router.get('/delete/:taskid',function(req, res){
    connection.query('DELETE from taskTbl where num = '+req.params.taskid+';', function(err, data){
        if(!err){
            res.send('success');
        }
        else {
            console.log('task 삭제 실패: ', err);
            res.send('error');
        }
    })

});

module.exports = router;