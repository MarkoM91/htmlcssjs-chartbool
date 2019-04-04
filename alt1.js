function getMOnthNameFromDate(date) {
    var mom = moment(date, "MM DD YYYY");
    var monthName = mom.format("MMMM");

    return monthName;
}

function printKeysAndValues(object) {
  var keys = Object.keys(object); //oggetto JS (Object), keys funzione.
  var values = Object.values(object);
}

function dashboardItem() {

  $.ajax({
    url: "http://157.230.17.132:4016/sales",
    method : "GET",
    success : function(inData) {
       kpiDashboard(inData)
       //CREAZIONE GRAFICO A TORTA
       var result = kpiSalesman(inData);
       pieChart(result);
    },
    error: function (request, state, error) {
      console.log("request" , request);
      console.log("state" , state);
      console.log("date" , error);
    }
  });
}

function kpiDashboard(inData) {
  var totMonth = {

    "gennaio":0,
    "febbraio":0,
    "marzo":0,
    "aprile":0,
    "maggio":0,
    "giugno":0,
    "luglio":0,
    "agosto":0,
    "settembre":0,
    "ottobre":0,
    "novembre":0,
    "dicembre":0
  }

  for (var i = 0; i < inData.length; i++) {
     var data = inData[i];
     var amount = data.amount;
     var date = data.date;
     var salesman = data.salesman;

     var mom = moment(date, "DD/MM/YYYY");
     var monthName = mom.locale("it").format("MMMM");

     totMonth[monthName] += amount;
    }

  var monthList = Object.keys(totMonth);
  var valueList = Object.values(totMonth);

  selectMOTY(monthList);
  lineChart(monthList, valueList);
}

function kpiSalesman(inData) {
  var totSalesman = {};
  var totalAmount = 0;

  for (var i = 0; i < inData.length; i++) {
    var element = inData[i];
    var salesman = element.salesman;
    var amount = element.amount;

    totalAmount += amount;
    var perc = (amount / totalAmount) * 100;
    if (!totSalesman[salesman]) {
       totSalesman[salesman] = 0;
    }
    totSalesman[salesman] += element.amount;
  }
  var salesmanList = Object.keys(totSalesman);
  selectS(salesmanList);

  return totSalesman;
}

function inputTxt() {
  var me = $(this);
  var input = $("#txt");
  var inputVal = input.val();

  var salesmanElem = me.siblings(".salesman  option").val();
  var monthElem = me.siblings(".monthOfTheYear  option").val();

  postSales(salesmanElem, inputVal, monthElem);
}

function postSales(salesmanElem, inputVal, monthElem) {
   var outData = {
    salesman: salesmanElem,
    amount: inputVal,
    date: monthElem
 }

   $.ajax({
       url: "http://157.230.17.132:4016/sales",
       data:outData,
       method : "POST",
       success : function(inData) {
          dashboardItem(inData);
       }
   });
 }

function selectS(salesmanList) {
  var selectSalesman = $(".salesman");

  for (var i = 0; i < salesmanList.length; i++) {
    var element = salesmanList[i];
    var option = document.createElement("option");

    option.value = element;
    option.innerHTML = element;

    selectSalesman.append(option);
  }
}

function selectMOTY(monthList) {
  var selectMOTY = $(".monthOfTheYear");

  for (var i = 0; i < monthList.length; i++) {
    var monthName = monthList[i];
    option =document.createElement("option");

    option.value = monthName;
    option.innerHTML = monthName;

    selectMOTY.append(option);
  }
}

function lineChart(monthList, valueList) {
  Chart.defaults.global.defaultFontColor = 'red';

  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
// The type of chart we want to create
type: 'line',

// The data for our dataset
data: {
    labels: monthList,
    datasets: [{
        label: 'My First dataset',
        backgroundColor: [

          'rgba(255, 99, 132, 1)',
        ],
        borderColor:  [

          'rgba(255, 99, 132, 1)',
        ],

        data: valueList
    }]
  },
    options:{}
});
}

function pieChart(data) {
  var labels = Object.keys(data);
  var values = Object.values(data);

  Chart.defaults.global.defaultFontColor = 'red';

  var ctx = document.getElementById('myChart2').getContext('2d');
  var chart = new Chart(ctx, {
// The type of chart we want to create
type: 'pie',

// The data for our dataset
data: {
    labels: labels,
    datasets: [{
        label: 'My First dataset',
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],

        borderColor:  [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        data: values
    }]
  },

    options:{}
});
}

function init() {
 getMOnthNameFromDate("12/07/2017");

 var object = {
  "att1" : "val1",
  "att2" : "val2",
  "att3" : "val3",
 };

 dashboardItem();
 printKeysAndValues(object);

 var button = $("#btn");
 button.click(inputTxt);

}

$(document).ready(init);
