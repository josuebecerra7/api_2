$(document).ready(function(){
    console.log("database.js")
    	// GET REQUEST
	$("#updateButton").click(function(event){
		event.preventDefault();
		ajaxGet();
	});


    function ajaxGet(){
        var settings = {
            "url": "http://localhost:5001/balance",
            "method": "GET",
            "timeout": 0,
            "dataType": "json"
          };
          
          $.ajax(settings).done(function (response) {
            var db_len = response.length-1;
            document.getElementById("btc_div").innerHTML=response[db_len].Transaction.quantity[0];
            document.getElementById("usd_div").innerHTML=response[db_len].Transaction.quantity[1];
          });
    }


    
  
});