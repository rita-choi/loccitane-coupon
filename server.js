var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
//body-parser 설치
var app = express();
var router = express.Router();
//var router = require('./routes/main')(app);
//var ajax = require('./routes/ajax');

var requestIp = require('request-ip');

var coupon = require("coupon");
var stringify = require('json-stringify');

var uuid = require('uuid');
var port = 3000;

var admin = require("firebase-admin");
//var functions = require("firebase-functions");
var serviceAccount = require("./serviceAccountKey.json");



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://loccitane-coupon-dev.firebaseio.com"
});

var db= admin.database();
var ref = db.ref("coupons");
var dbRef = admin.database().ref("coupons");
app.use(bodyParser.urlencoded({ extended: true }));
//app.use를 활용하여 bodyParser.urlencoded 및 extended는 request 객체의 body에 대한 url encoding의 확자을 할 수 있도록 'true'로 설정
app.use(bodyParser.json());
// bodyParser의 객체의 json()을 이용하여 request body에 오는 데이터를 json 형식으로 변환하게끄 ㅁ한다




router.use(function(req, res, next) {
        // log each request to the console
        console.log(req.method, req.url);
        // continue doing what we were doing and go to the route
       next();
});



//GET POST 부분을 설정해 주는 것이 중요
app.route('/').get(function(req, res){
//여기에 동작 구현

var LoccitaneCouponInfo = "";
var clientIp = requestIp.getClientIp(req); // on localhost > 127.0.0.1
var used_cnt = 0;
//coupon cmd 창에 출력
console.log("clientIp>>>>"+ clientIp);
//Ip 출력

//id 저장

//ref.once("value", function(snapshot) {
//  console.log(snapshot.val());
//});\


var LoccitaneCoupon = coupon("LoccitaneCoupon").limit(1).only("Sample");
//쿠폰을 자동으로 생성해 주는 coupon 모듈 / npm install coupon
var LoccitaneCouponInfo = JSON.stringify(LoccitaneCoupon.json().id);
//npm install json-stringify --save 설치
used_cnt = 0;

res.render('index.html', {
'coupon' : LoccitaneCouponInfo,
'ip' : clientIp,
'used' : used_cnt
});

//index.html를 렌더링하며 coupon 코드 전송
//res.render('index.html')
})

app.post('/clicked', urlencodedParser, function(req,res,next) {
clientIp = req.body.currentip;
console.log("IP 확인");


var newRef = db.ref("coupons");

newRef.orderByChild('ip').equalTo(clientIp).once("value").then(function(snapshot){
console.log("진입");
var data = snapshot.val(); //전체 데이터가 있는지 없는지 파악하는 것이기 때문에 의미가 없음;

  if(data) next(); //이미 쿠폰을 발급받은 내역이 있는 경우
  if(data === null) next('route'); //발급받지 않은 경우
});



}, function (req, res, next){
  var newRef = db.ref("coupons");
console.log("저장된 쿠폰 불러옴");



newRef.orderByChild('ip').equalTo(clientIp).once("value").then(function(snapshot){
    snapshot.forEach(function(coupons){

  res.send(coupons.val());


  });
  });


});

app.post('/clicked', urlencodedParser,  function(req,res,next) {
console.log("저장된 쿠폰이 없는 경우");
var LoccitaneCouponInfo = req.body.coupon;
var clientIp = req.body.currentip; // on localhost > 127.0.0.1
var newRef = db.ref("coupons");

//  var couponsRef = ref.child("campaign_coupon")
//  var NewCoupon = couponsRef.push();


newRef.push({
    coupon: LoccitaneCouponInfo,
      ip: clientIp,
      used: 0
    });

    var newRef = db.ref("coupons");
  console.log("쿠폰을 다시 불러와서 뿌려줍니다");


  newRef.orderByChild('ip').equalTo(clientIp).once("value").then(function(snapshot){
      snapshot.forEach(function(coupons){

    res.send(coupons.val());

  });
  });

});

app.post('/usecoupon', urlencodedParser,  function(req,res,next) {
console.log("쿠폰 사용 여부 확인");
var LoccitaneCouponInfo = req.body.savedcoupon;
var clientIp = req.body.savedip; // on localhost > 127.0.0.1
var used_cnt = 1;
var newRef = db.ref("coupons");
//  var couponsRef = ref.child("campaign_coupon")
//  var NewCoupon = couponsRef.push();

newRef.orderByChild('ip').equalTo(clientIp).once("value").then(function(snapshot){
    snapshot.forEach(function(coupons){
console.log("used value>>>" + coupons.val().used);

admin.database().ref('coupons/'+coupons.key+'/used').set(used_cnt);

if(coupons.val().used == 1){
    res.send("<h3>이미 사용된 쿠폰입니다.</h3>");
}else{
      res.send("<h3>ㅇㅅㅇ 샘플 받아가시5</h3>");
}
  });
  });


});

app.route('/promotion').get(function(req, res){
//여기에 동작 구현

res.render('promotion.html');

//index.html를 렌더링하며 coupon 코드 전송
//res.render('index.html')
})


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


//app.get('/',function(req,res, next){
// res.json()
// })



var server = app.listen(port, function(){
    console.log("Express server has started on port" + port);
    app.use(express.static('public'));
});
