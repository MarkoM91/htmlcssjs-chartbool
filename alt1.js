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
    "gennaio":0,     // si crea un oggetto che rappresenta l'anno;
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
     var amount = Number(data.amount);
     var date = data.date;
     var salesman = data.salesman;

     var mom = moment(date, "DD/MM/YYYY");
     var monthName = mom.locale("it").format("MMMM");

     if (!isNaN(amount)) {
       totMonth[monthName] += amount; // oggetto, nome del mese(che deve essere trattato come se fosse l'indice di un array), gli aggiungo l'amount corrisponedente
     }

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
    var amount = Number(element.amount);

    //Se è un numero (cioè non è NaN) allora sommo gli amount
    if(!isNaN(amount)) {
      totalAmount += amount;

      if (!totSalesman[salesman]) { //se venditore non esiste all'interno dell'attributo totSalesman;
         totSalesman[salesman] = 0;
      }
        totSalesman[salesman] += amount;
    }
  }

  //Ciclo gli elementi del mio oggetto
  for(var i in totSalesman) {
    //Converto in percentuale il totale calcolato per venditore
    //Dopo il calcolo sostituisco il valore con la percentuale
    totSalesman[i] = ((totSalesman[i] / totalAmount) * 100);
  }
  
  var salesmanList = Object.keys(totSalesman);
  selectS(salesmanList);

  return totSalesman;
}

function inputTxt() {

  var me = $(this);
  var inputVal = me.siblings("#txt").val();

  var salesmanElem = $(".salesman").val();
  var monthElem = $(".monthOfTheYear").val();

  var mom = moment();
  mom.year(2017);
  mom.month(monthElem);
  mom.date(Math.floor(Math.random() * 30) +1);
  var updatedDate = mom.format("DD/MM/YYYY");

  postSales(salesmanElem, inputVal, updatedDate);
}

function postSales(salesmanElem, inputVal, updatedDate) {

   var outData = {
    salesman: salesmanElem,
    amount: Number(inputVal),
    date: updatedDate
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

  Chart.defaults.global.defaultFontColor = 'black';

  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
// The type of chart we want to create
type: 'line',

// The data for our dataset
data: {
    labels: monthList,
    datasets: [{
        label: 'Monthly Sales',
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

  Chart.defaults.global.defaultFontColor = 'black';

  var ctx = document.getElementById('myChart2').getContext('2d');
  var chart = new Chart(ctx, {
// The type of chart we want to create
type: 'pie',

// The data for our dataset
data: {
    labels: labels,
    datasets: [{
        label: 'Salesmen Perfomances',
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
          ],

        borderColor:  [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
          ],
        data: values
    }]
  },

    options:{}
});
}

function init() {

 dashboardItem();

 var button = $("#btn");
 button.click(inputTxt);
}

$(document).ready(init);
