$(document).ready(function(){
    console.log("convert.js")
    $("#purchaseButton").click(function(event){
		event.preventDefault();
		overlay();
        console.log("button pushed");
	});


    function buyBTC(){
        var settings_get = {
            "url": "http://localhost:5002/get-price",
            "method": "GET",
            "timeout": 0,
            "dataType": "json"
          };
          var settings_post = {
            "url": "http://localhost:5002/get-price",
            "method": "POST",
            "timeout": 0,
            "dataType": "json"
          };
          var from = $("#selectFrom").val();
          var to = $("#selectTo").val();
          var quantity = $("#quantity").val();
          if (quantity==null){window.alert("Enter the amount in quantity");};
          console.log(quantity);
        if (from==1 && to==2){
            console.log("btc to usd");
          //  console.log($("#btc").val());    
            console.log(document.getElementById("btc").getAttribute('value'));       
        } else if (from==2 && to==1){
            console.log("usd to btc")    
        }else{
            window.alert("select valid data");
        }
        
          
        $.ajax(settings_get).done(function (response) {

         //   var btc_price =response.price.bitcoin.usd;           
          });
    }

});