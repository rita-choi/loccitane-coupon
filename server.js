var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: true
});

var app = express();
var router = express.Router();


var requestIp = require('request-ip');

var coupon = require("coupon");
var stringify = require('json-stringify');

var uuid = require('uuid');
var port = 3000;

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://loccitane-coupon-dev.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("coupons");
var dbRef = admin.database().ref("coupons");
app.use(bodyParser.urlencoded({
    extended: true
}));
//app.use를 활용하여 bodyParser.urlencoded 및 extended는 request 객체의 body에 대한 url encoding의 확자을 할 수 있도록 'true'로 설정
app.use(bodyParser.json());
// bodyParser의 객체의 json()을 이용하여 request body에 오는 데이터를 json 형식으로 변환하게끄 ㅁ한다




router.use(function (req, res, next) {
    // log each request to the console
    // continue doing what we were doing and go to the route
    next();
});



//GET POST 부분을 설정해 주는 것이 중요
app.route('/').get(function (req, res) {
    //여기에 동작 구현

    var LoccitaneCouponInfo = "";
    var clientIp = requestIp.getClientIp(req);
    var used_cnt = 0;

    var LoccitaneCoupon = coupon("LoccitaneCoupon").limit(1).only("Sample");
    //쿠폰을 자동으로 생성해 주는 coupon 모듈 / npm install coupon
    var LoccitaneCouponInfo = JSON.stringify(LoccitaneCoupon.json().id);
    //npm install json-stringify --save 설치
    used_cnt = 0;

    res.render('index.html', {
        'coupon': LoccitaneCouponInfo,
        'ip': clientIp,
        'used': used_cnt
    });

    //index.html를 렌더링하며 coupon 코드 전송
    //res.render('index.html')
})

app.post('/clicked', urlencodedParser, function (req, res, next) {
    clientIp = req.body.currentip;



    var newRef = db.ref("coupons");

    newRef.orderByChild('ip').equalTo(clientIp).once("value").then(function (snapshot) {

        var data = snapshot.val(); //전체 데이터가 있는지 없는지 파악하는 것이기 때문에 의미가 없음;

        if (data) next(); //이미 쿠폰을 발급받은 내역이 있는 경우
        if (data === null) next('route'); //발급받지 않은 경우
    });



}, function (req, res, next) {
    var newRef = db.ref("coupons");



    newRef.orderByChild('ip').equalTo(clientIp).once("value").then(function (snapshot) {
        snapshot.forEach(function (coupons) {

            res.send(coupons.val());


        });
    });


});

app.post('/clicked', urlencodedParser, function (req, res, next) {

    var LoccitaneCouponInfo = req.body.coupon;
    var clientIp = req.body.currentip; // on localhost > 127.0.0.1
    var newRef = db.ref("coupons");


    newRef.push({
        coupon: LoccitaneCouponInfo,
        ip: clientIp,
        used: 0
    });

    var newRef = db.ref("coupons");


    newRef.orderByChild('ip').equalTo(clientIp).once("value").then(function (snapshot) {
        snapshot.forEach(function (coupons) {

            res.send(coupons.val());

        });
    });

});

app.post('/usecoupon', urlencodedParser, function (req, res, next) {

    var LoccitaneCouponInfo = req.body.savedcoupon;
    var clientIp = req.body.savedip; // on localhost > 127.0.0.1
    var lang = req.body.lang;
    var used_cnt = 1;
    var newRef = db.ref("coupons");

    newRef.orderByChild('ip').equalTo(clientIp).once("value").then(function (snapshot) {
        snapshot.forEach(function (coupons) {

            admin.database().ref('coupons/' + coupons.key + '/used').set(used_cnt);

            if (coupons.val().used == 1) {
                if (lang == "cn") res.send("<style>.popup {height: 220px !important; top: 50% !important;} .popup-text { margin-top: 75px !important; }</style><h3>每人限享礼遇一次<br/>感谢支持欧舒丹</h3>")
                if (lang == "kr") res.send("<style>.popup-text { margin-top: 85px !important; }</style><h3>이미 사용된 쿠폰입니다.</h3>");
            } else {
                if (lang == "cn") res.send("<style>.popup {height: 220px !important; top: 50% !important;} .popup-text { margin-top: 85px !important; }</style><h3 style='font-size: 1.3em;nono'>谢谢参与</h3>")
                if (lang == "kr") res.send("<style>.popup-text { margin-top: 85px !important; }</style><h3>쿠폰이 사용되었습니다.</h3>");
            }
        });
    });


});


app.post('/clicked', urlencodedParser, function (req, res, next) {
    clientIp = req.body.currentip;


    var newRef = db.ref("coupons");

    newRef.orderByChild('ip').equalTo(clientIp).once("value").then(function (snapshot) {

        var data = snapshot.val(); //전체 데이터가 있는지 없는지 파악하는 것이기 때문에 의미가 없음;

        if (data) next(); //이미 쿠폰을 발급받은 내역이 있는 경우
        if (data === null) next('route'); //발급받지 않은 경우
    });



}, function (req, res, next) {
    var newRef = db.ref("coupons");




    newRef.orderByChild('ip').equalTo(clientIp).once("value").then(function (snapshot) {
        snapshot.forEach(function (coupons) {

            res.send(coupons.val());


        });
    });


});



app.route('/kr').get(function (req, res) {

    var LoccitaneCouponInfo = "";
    var clientIp = requestIp.getClientIp(req); // on localhost > 127.0.0.1
    var used_cnt = 0;


    var LoccitaneCoupon = coupon("LoccitaneCoupon").limit(1).only("Sample");
    //쿠폰을 자동으로 생성해 주는 coupon 모듈 / npm install coupon
    var LoccitaneCouponInfo = JSON.stringify(LoccitaneCoupon.json().id);
    //npm install json-stringify --save 설치
    used_cnt = 0;

    res.render('kr.html', {
        'coupon': LoccitaneCouponInfo,
        'ip': clientIp,
        'used': used_cnt
    });

})

app.route('/promotion').get(function (req, res) {
    //중문 프로모션 페이지

    res.render('promotion.html');

})

app.route('/promotion-kr').get(function (req, res) {
    //국문 프로모션 페이지

    res.render('promotion-kr.html');

})


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);





var server = app.listen(port, function () {
    console.log("Express server has started on port " + port);
    app.use(express.static('public'));
});
