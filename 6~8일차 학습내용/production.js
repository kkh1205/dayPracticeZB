/* Chart.js 프레임워크를 사용하여 만듦. */
// 차트안에 들어가는 데이터를 모아놓은 객체.
var data = {
  labels: ['1분기', '2분기', '3분기', '4분기'],
  datasets: [{
      label: 'A-01',
      data: [0, 0, 0, 0],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1
    },
    {
      label: 'A-02',
      data: [0, 0, 0, 0],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)'
      ],
      borderWidth: 1
    },
    {
      label: 'A-03',
      data: [0, 0, 0, 0],
      backgroundColor: [
        'rgba(255, 206, 86, 0.2)'
      ],
      borderColor: [
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1
    }
  ]
}
// 옵션을 모아놓은 객체
var options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
// 자세히 로직을 다 알지는 못하지만 chart를 인스턴스로 생성하여 id가 produceChart인 요소(canvers)에 그려주는듯 함.
var ctx = document.getElementById('ProduceChart');
var ProduceChart = new Chart(ctx, {
  type: 'bar',
  data: data,
  options: options
});

// 위에까진 차트 적용. 데이터를 객체에 저장시켜야 변수로 지정하든 뭘 하든 할수 있으니 객채로 저장.

// 해당 창이 켜질 때, sandAjax를 호출.
window.onload = function(){
  sandAjax('http://localhost:3001');
}

function sandAjax(url) {
  var oReq = new XMLHttpRequest(); // XMLHttpRequest객체는 서버와 상호작용 하기위해 사용된다. 새로고침없이도 URL로부터 데이터를 받을 수 있다. 그래서 매개변수를 URL로 받음.

  oReq.open('POST',url); // url로부터 받는 데이터 형식이 POST라고 선언
  oReq.setRequestHeader('Content-Type','application/json'); // 컨텐츠 타입을 json이라 알려줌.
  oReq.send(); // 그걸 보냄
  
  // load될때 펑션 실행
  oReq.addEventListener('load', function() {
    // json에 있는 Text를 파싱해서 result에 넣어줌.
    var result = JSON.parse(oReq.responseText);
    console.log(result);
    // 파싱된 값의 특정값을 변수에 각각 담음.(써먹을 데이터)
    var A01 = result.A01;
    var A02 = result.A02;
    var A03 = result.A03;
    // comp_data에 차트데이터를 대입.
    var comp_data = data.datasets[0].data;
    var comp_data1 = data.datasets[1].data;
    var comp_data2 = data.datasets[2].data;
    // for문으로 db에서 가져온 값을 comp_data에 대입
    for (var i = 0; i < comp_data.length; i++) {
      comp_data[i] = A01[i];
    }

    for (var i = 0; i < comp_data.length; i++) {
      comp_data1[i] = A02[i];
    }

    for (var i = 0; i < comp_data.length; i++) {
      comp_data2[i] = A03[i];
    }
    // 차트데이터에 db값을 담은 comp_data를 대입.
    data.datasets[0].data = comp_data;
    data.datasets[1].data = comp_data1;
    data.datasets[2].data = comp_data2;
    // 차트 업데이트.
    ProduceChart.update();
  })
}