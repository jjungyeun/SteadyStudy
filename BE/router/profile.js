var express = require('express');
var router = express.Router();

var connection = require('../index.js').connection;

// 프로필 가져오기
router.get('get/:id/all',function(req, res){
    connection.query('SELECT * from userTbl where id = "'+req.params.id+'"',function(err, data,fields){
        if(!err){
            console.log(data);
            res.send(data);
        }
        else{
            console.log('Error while performing Query.', err);
            res.send('error');
        }
    });
});

// 프로필 업데이트
// req.body.(id, nickname, birthday, gender, field, changedaytime, saying)
router.post('/edit',function(req, res){

});

// 한마디 불러오기
router.get('/get/:id/saying',function(req, res){
    connection.query('SELECT saying from userTbl where id = "'+req.params.id+'"',function(err, data,fields){
        if(!err){
            console.log(data);
            res.send(data);
        }
        else{
            console.log('Error while performing Query.', err);
            res.send('error');
        }
    });
});

module.exports = router;