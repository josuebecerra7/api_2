$(document).ready(function(){
    console.log( "db ready! 123" );
    let payload = {database: "Lab4",collection:"balance"};

    $("#b1").click(function(){
        console.log("button pushed")
        $("#div1").ajax({
            type: "GET",
            url: 'http://localhost:5001/balance',
            data : payload,
            contentType: 'application/json',
            success: function(response){
                console.log("GET returned successfully");
                console.log(response);
                document.getElementById("#get_btc").innerHTML = JSON.stringify(response);
    
            },
            error: function(error){
            console.log("GET failed");
                console.log(error);
            }
    });   
        
  
    });

    console.log( "posted something on db" );
});