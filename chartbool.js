function dashboardKPI() {

  $.ajax({

    url: "http://157.230.17.132:4016/sales",
    //data: outData,
    method : "GET",
    success : function(inData) {

      for (var i = 0; i < inData.length; i++) {

         var amount = inData[i];
         var salesman = amount.salesman;
         var amount = amount.amount;
          console.log(salesman);
          console.log(amount);
      }

       Chart.defaults.global.defaultFontColor = 'red';

       var ctx = document.getElementById('myChart').getContext('2d');
       var chart = new Chart(ctx, {
     // The type of chart we want to create
     type: 'bar',

     // The data for our dataset
     data: {
         labels: salesman,
         datasets: [{
             label: 'My First dataset',
             backgroundColor: [
                 'rgba(255, 99, 132, 0.2)',
                 'rgba(54, 162, 235, 0.2)',
                 'rgba(255, 206, 86, 0.2)',
                 'rgba(75, 192, 192, 0.2)',
                 'rgba(153, 102, 255, 0.2)',
                 'rgba(255, 159, 64, 0.2)'
             ],
             borderColor:  [
                 'rgba(255, 99, 132, 1)',
                 'rgba(54, 162, 235, 1)',
                 'rgba(255, 206, 86, 1)',
                 'rgba(75, 192, 192, 1)',
                 'rgba(153, 102, 255, 1)',
                 'rgba(255, 159, 64, 1)'
             ],

             data: amount
         }]

    },
    error: function (request, state, error) {
      console.log("request" , date);
      console.log("state" , state);
      console.log("date" , error);
    }
  });


})
}

function init() {

  dashboardKPI();
}

$(document).ready(init);
