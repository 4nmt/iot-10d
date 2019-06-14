var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var path = require('path');
var logger = require('morgan');
var db = require('./db');

const PORT = 3484;
var LED = require('./communicate/led');
var LCD = require('./communicate/lcd');

var cookieParser = require('cookie-parser');
var loginRouter = require('./routes/login');
var homeRouter = require('./routes/home');
var authRouter = require('./routes/auth');
var historyRouter = require('./routes/history');
var freeRouter = require('./routes/free');
var controlRouter = require('./routes/control');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginRouter);
app.use('/home', homeRouter);
app.use('/auth', authRouter);
app.use('/history', historyRouter);
app.use('/control', controlRouter);
app.use('/free', freeRouter);

// Socket handling
io.on('connection', function (socket) {
  // Hàm console.log giống như hàm Serial.println trên Arduino
  console.log("Connected"); // In ra màn hình console là đã có một Socket Client kết nối thành công.

  var ledRed = new LED(5, socket);
  var ledBlue = new LED(4, socket);
  var lcd = new LCD(socket);
  var lock = false;
  lcd.send("Hello word", '');

  // Khi nhận được lệnh LED_STATUS
  socket.on('LED_STATUS', function (status) {
    // Nhận được thì in ra thôi hihi.
    console.log("recv LED", status)
  })

  socket.on('SCAN_STATUS', async function (status) {
    let data = status["data"];

    let users = await db.collection('users').get();
    let arrs_fixed = users.docs.map(function (x) {
      return {
        id: x.data().id.toString().split('-'),
        name: x.data().name,
        isAccepted: x.data().isAccepted,
      };
    });

    for (i in arrs_fixed) {
      if (arrs_fixed[i].id.length == data.length && arrs_fixed[i].id.every((u, i) => (u == data[i].toString()))) {
        ledBlue.turnOn();
        ledRed.turnOff();
        lcd.send('Xin chao,', arrs_fixed[i].name);

        db.collection('history').add({
          id: arrs_fixed[i].id.join('-'),
          name: arrs_fixed[i].name,
          time: Date.now(),
        });

        return;
      }
    }

    // let arrs = [[181, 57, 84, 99, 187]]
    // for (i in arrs) {

    //   console.log(arrs[i]);

    //   if (arrs[i].length == data.length && arrs[i].every((u, i) => u == data[i])) {
    //     ledBlue.turnOn();
    //     ledRed.turnOff();
    //     lcd.send("Door open");
    //     return;
    //   }
    // }

    ledBlue.turnOff();
    ledRed.turnOn();
    lcd.send('Failed!', 'Who are you?');

    // Nhận được thì in ra thôi hihi.
    console.log("SCAN_STATUS", JSON.stringify(status))
  })

  // Khi socket client bị mất kết nối thì chạy hàm sau.
  socket.on('disconnect', function () {
    console.log("disconnect") 	// In ra màn hình console cho vui
  })
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});


server.listen(PORT, function () {
  console.log(`Server is running on port ${PORT} ...`);
});

module.exports.io = io;