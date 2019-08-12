var express = require('express');
var router = express.Router();

var connection = require('../index.js').connection;

// 이미 회원인지 확인
router.get('/check/member/:id', function(req, res, next) {
    connection.query('SELECT * from userTbl where ID = "'+req.params.id+'"',function(err, data,fields){
        if(!err){
            if(data.length == 0){
                res.send('signup');
            }
            else {
                console.log(data);
                res.send(data);
            }
        }
        else{
            console.log('Error while performing Query.', err);
            res.send('error');
        }
    });
});

// 닉네임 중복확인
router.get('/check/nickname/:nickname',function(req, res){

});

// 회원가입
// req.body.(id, nickname, birthday, gender, field, sigupdate, changedaytime, saying)
router.post('signup',function(req, res){

});


module.exports = router;