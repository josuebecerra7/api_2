$(document).ready(function(){

    console.log("database.js loaded")
    
    // This button updates the balance from the DB
	$("#updateButton").click(function(event){
		event.preventDefault();
		ajaxGetDB();
	});

    // This button purchases BTC/USD
    $("#purchaseButton").click(function(event){
		event.preventDefault();
		ajaxPost();
        console.log("button pushed");
	});

    // Call API and get DB 
    function ajaxGetDB(){
        var output = $.ajax({
            type: 'GET',       
            url: "http://localhost:5001/balance",
            dataType: 'json',
            context: document.body,
            global: false,
            async:false,
            success: function(response) {
                var db_len = response.length-1;
                document.getElementById("btc_div").innerHTML=response[db_len].Transaction.quantity[0];
                document.getElementById("usd_div").innerHTML=response[db_len].Transaction.quantity[1];
                return response;
            }
        }).responseText;
        return output;
    }

    // Call API and get latest BTC price
    function ajaxBTC(){
        var output = $.ajax({
            type: 'GET',       
            url: "http://localhost:5002/get-price",
            dataType: 'json',
            context: document.body,
            global: false,
            async:false,
            success: function(response) {
                return response;
            }
        }).responseText;
        return output;
    }

    // Transaction and POST to the DB
    function ajaxPost(){
        // Get current balance
        var balance = JSON.parse(ajaxGetDB());
        // Get BTC price
        var btc_price = JSON.parse(ajaxBTC());
        var last = balance.length -1
        // Print just for debbuging
        console.log(balance[last].Transaction.quantity);
        console.log(btc_price.price.bitcoin.usd);

        // Get user inputs
        var from = $("#selectFrom").val();
        var to = $("#selectTo").val();
        var quantity = $("#quantity").val();
        var new_balance

        if (from==1 && to==2){
            // This means from BTC to USD
            if (quantity>balance[last].Transaction.quantity[0]){window.alert("You don't have enough Bitcoin")}else{
                new_balance_usd = (quantity * btc_price.price.bitcoin.usd) + balance[last].Transaction.quantity[1];
                new_balance_btc = balance[last].Transaction.quantity[0] - quantity;
            };

        } else if (from==2 && to==1){
            // This means from USD to BTC
            if (quantity>balance[last].Transaction.quantity[1]){window.alert("You don't have enough USD")}else{
                new_balance_btc = (quantity / btc_price.price.bitcoin.usd) + balance[last].Transaction.quantity[0];
                new_balance_usd = balance[last].Transaction.quantity[1] - quantity;
            };
        }else{
            window.alert("select valid data");
        }
        // Post to API
        var settings = {
            "url": "http://localhost:5001/balance",
            "method": "POST",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/json"
            },
            "data": JSON.stringify({
              "database": "Lab4",
              "collection": "balance",
              "Transaction": {
                "client": "Messbah",
                "coins": [
                  "BTC",
                  "USD"
                ],
                "quantity": [
                    new_balance_btc,
                    new_balance_usd
                ],
                "date": Date.now()
              }
            }),
          };
          
          $.ajax(settings).done(function (response) {
            console.log(response);
          });

    }
  
});