var express = require('express');
var router = express.Router();

var connection = require('../index.js').connection;

// diary 불러오기
// SELECT detail, state from diaryTbl where id = "" and wdate = "";
router.get('/get/:id/:date',function(req, res){
 var sql = 'SELECT detail, state from diaryTbl where id = "'+req.params.id+'" and wdate = "'+req.params.date+'";';
 console.log(sql);
 connection.query(sql, function(err, data){
    if(!err){
        if(data.length==0)
            res.send('empty');
        else
            res.send(data);
    }
    else {
        console.log('다이어리 load 실패: ', err);
        res.send('error');
    }
});
});

// diary 수정
// INSERT INTO diaryTbl(id, wDate, detail, state) VALUES (?,?,?,?);
// UPDATE diaryTbl SET detail = "", state = "" WHERE id = "" and wdate = "";
router.post('/edit',function(req, res){
    var sqlI = 'INSERT INTO diaryTbl(id, wDate, detail, state) VALUES (?,?,?,?);';
    var params = [req.body.id, req.body.date, req.body.detail, req.body.state];
    var sqlU = 'UPDATE diaryTbl SET detail = "'+req.body.detail+'", state = "'+req.body.state+
        '" WHERE id = "'+req.body.id+'" and wdate = "'+req.body.date+'";';

    if(req.body.type == 'new'){
        connection.query(sqlI, params, function(err, data){
            console.log(sqlI);
            if(!err){
                res.send('update');
            }
            else {
                console.log('다이어리 insert 실패: ', err);
                res.send('error');
            }
        });
    }
    else {
        connection.query(sqlU, function(err, data){
            console.log(sqlU);
            if(!err){
                res.send('update');
            }
            else {
                console.log('다이어리 update 실패: ', err);
                res.send('error');
            }
        });
    }
    

});

module.exports = router;