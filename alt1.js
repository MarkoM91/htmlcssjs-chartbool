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

     var mom = moment(date, "DD/MM/YYYY");
     var monthName = mom.locale("it").format("MMMM");

     totMonth[monthName] += amount;
  }
  
  var monthList = Object.keys(totMonth);
  var valueList = Object.values(totMonth);



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

function init() {

 getMOnthNameFromDate("12/07/2017");
 var object = {

  "att1" : "val1",
  "att2" : "val2",
  "att3" : "val3",
 };

 dashboardItem();

 printKeysAndValues(object)
}

$(document).ready(init);
