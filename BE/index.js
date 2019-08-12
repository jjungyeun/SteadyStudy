var express   = require('express');
var createError = require('http-errors');
var path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();

var app = express();

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

//-----------------------------------

//Router 정의
const registerRouter = require('./router/register');
const profileRouter = require('./router/profile');
const taskRouter = require('./router/task');
const diaryRouter = require('./router/diary');

//Route 정의
//app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/profile', profileRouter);
app.use('/task',taskRouter);
app.use('/diary', diaryRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use('/files', express.static(__dirname + '/files'));

module.exports = app;
module.exports = router;