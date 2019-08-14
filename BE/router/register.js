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
    connection.query('SELECT * from userTbl where nickname = "'+req.params.nickname+'"', function(err, data){
        if(!err){
            if(data.length == 0)
                res.send("pass");
            else
                res.send("fail");
        }
        else {
            console.log(err);
            res.send('error');
        }
    });
});

// 회원가입
// req.body.(id, nickname, birthday, gender, field, sigupdate, changedaytime, saying)
router.post('/signup',function(req, res){
    var changedaytime = req.body.changedaytime.split(':')[0];
    changedaytime = changedaytime.replace(/0/gi, ""); 
    var sql = "INSERT into userTBL values ('"+req.body.id+
        "','"+req.body.nickname+"', '"+req.body.birthday+"','"+req.body.gender+
        "','"+req.body.field+"', default, "+changedaytime+", '"+req.body.saying+"', default);";
        
    console.log(sql);
    connection.query(sql, function(err, data){
        if(!err){
            res.send("success");
        }
        else   {
            res.send(err);
            console.log(err);
        }
    });

});


module.exports = router;