/* DB에서 데이터 받아오기. 프로젝트겸 공부했습니다.

npm init으로 json파일 만들고
express, mysql, fs, ejs install한다.
src폴더를 만들어 config.json, option.js(fs,json.parse등을 위한 js)를 넣는다. */

var express = require('express'); // HTTP핸들러(서버에 연결하여 DB데이터를 가져오는 기능)를 포함한 웹 프레임워크.
var app = express(); // express 객체 인스턴스 생성
var options = require('./src/option'); // fs는 '파일 시스템'의 약자
// node.js 환경에서 파일시스템에 접근, 사용할 수 있게 해주는 모듈이다.

var mysql = require('mysql'); // mysql 사용시 쓰는 모듈
// 새 연결 db생성.
var db = mysql.createConnection({
  host: '비밀',
  port: 9999,
  user: 'root',
  password: '',
  database: 'kkhPractice'
})

db.connect(); // 생성된 db 연결

/* 기본라우팅
라우팅은 URI(또는 경로) 및 특정한 HTTP 요청 메소드(GET, POST 등)인 특정 엔드포인트에 대한 클라이언트 요청에 애플리케이션이 응답하는 방법을 결정하는 것을 말합니다.

각 라우트는 하나 이상의 핸들러 함수를 가질 수 있으며, 이러한 함수는 라우트가 일치할 때 실행됩니다. */
/* 한줄요약 라우팅 : 사용자의 요청을 적당한 컨트롤러와 연결해주는 작업. */

app.use(express.static('public')); // public을 쓰겠다.

app.listen(3001, function () {
  console.log("server start on port 3001.");
}) // 서버를 리스닝 한다. 나는 3001번을 리스닝했다.

app.get('/', function (req, res) { // req(요청),res(응답) '/'는 서버에서의 경로, function은 라우트가 일치할 때 실행되는 함수.
/* <get>
  url은 클라이언트가 서버로 보내는 신호.
  localhost:3000/ -> localhost3000은 서버로 접근
  url을 통해서 서버에 어떠한 신호를 보내주는 것. ex) '/'를 신호로보냄. /신호를 받고 html을 띄워주는 응답을 해줌.
 */
  res.sendFile(__dirname + '/public/main.html');
})

app.post('/', function (req, res) { // 포스트방식으로 데이터쿼리 전송. get보다 더 많은 정보를 주고받을 수 있다.

  var responseData = {}; // 데이터를 담을 객체 선언

  var query = db.query('SELECT A01,A02,A03 FROM production ', function (err, rows) {
    // 응답데이터를 받을 배열 생성
    responseData.A01 = [];
    responseData.A02 = [];
    responseData.A03 = [];
    // forEach사용해서 responseData에 받은데이터 하나씩 넣음.
    if (err) throw err;
    if (rows[0]) {
      responseData.result = 'ok';
      rows.forEach(function (val) {
        responseData.A01.push(val.A01);
      });

      rows.forEach(function (val) {
        responseData.A02.push(val.A02);
      });

      rows.forEach(function (val) {
        responseData.A03.push(val.A03);
      });
    } else {
      responseData.result = 'none';
      responseData.A01 = '';
      responseData.A02 = '';
      responseData.A03 = '';
    }
    // responseData를 json으로 응답.
    res.json(responseData);
    console.log('success \n' + responseData);

  });

});