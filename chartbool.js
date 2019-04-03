function dashboardKPI() {


  $.ajax({

    url: "http://157.230.17.132:4016/sales",
    //data: outData,
    method : "GET",
    success : function(inData) {

      var arrS = [];
      var arrA = [];
      for (var i = 0; i < inData.length; i++) {

         var amount = inData[i];
         var salesman = amount.salesman;
         var amount = amount.amount;
          arrS.push(salesman);
          arrA.push(amount);
      }
console.log(arrS);
console.log(arrA);
       Chart.defaults.global.defaultFontColor = 'red';

       var ctx = document.getElementById('myChart').getContext('2d');
       var chart = new Chart(ctx, {
     // The type of chart we want to create
     type: 'bar',

     // The data for our dataset
     data: {
         labels: arrS,
         datasets: [{
             label: 'My First dataset',
             backgroundColor: [
                 'rgba(255, 99, 132)'

             ],
             borderColor:  [
                 'rgba(255, 99, 132, 1)'

             ],

             data: arrA
         }]
       },

         options:{}
     });

    },
    error: function (request, state, error) {
      console.log("request" , date);
      console.log("state" , state);
      console.log("date" , error);
    }

  });

}

function init() {

  dashboardKPI();
}

$(document).ready(init);
