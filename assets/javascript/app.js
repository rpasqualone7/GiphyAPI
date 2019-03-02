
$(document).ready(function(){

    //Setting up an array of pre established buttons, as well as a place to hold the new ones
    
    var topics= ["The Smiths", "Depeche Mode", "The Cure", "New Order", "Rush", "Fleetwood Mac", "Joy Divison", "The Chameleons UK", "Fields of the Nephilim", "Kate Bush"];
    
    
    //Getting the buttons to display
    
        function showButtons(){
            $("#button-container").empty();
            for(var i= 0; i < topics.length; i++) {
                var newButton = $("<button>");
                newButton.attr("data-type", topics[i]); 
                newButton.attr("class", "gif btn-info");
                newButton.text(topics[i]);
                // console.log(topics[i]);
                $("#button-container").append(newButton);
                // console.log(newButton)
    
           
        }
    }
    
    // showButtons ();
    
    //Adding user input to the array of buttons
    var submit = function() {
    
     $("#submit").on("click", function(event){
        event.preventDefault();
        var userInput = $("#user-input").val();
        topics.push(userInput);
        showButtons();
          
        
    });
        }
    
    //Getting the gifs to display
     var displayGif = function(){
         var buttonVal = $(this).data('type');
        //  console.log(buttonVal);
    
         var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + buttonVal + "&api_key=VXiAf2zNT74RKKgX2IcHhMdJ4bgc59ki&limit=10";
    
         $.ajax({url: queryURL, method: "GET"})
    
         .done(function(response) {
    
            $("#gif-container").empty();
            var results = response.data;
            // console.log(results)
    
            //gathering gif info from JSON, creating a place for them to display and rendering them static on loading
            for(var i = 0; i < results.length; i++) {
                var showDiv = $("<div>");
                
                var rating = results[i].rating
                var animated = results[i].images.fixed_height.url;
                var static = results[i].images.fixed_height_still.url;
                var showImg = $("<img>");
                var p = $("<p>").text("Rating: " + rating);
    
                showImg.attr("src", static);
                showImg.addClass("bandsGiphy");
                showImg.attr("data-type", "still");
                showImg.attr("data-still", static);
                showImg.attr("data-animate", animated);
                showDiv.append(p);
                showDiv.append(showImg)
                $("#gif-container").prepend(showDiv);
            }
    
        });
     
    }
        //getting the gifs to animate on click
        var animate = function() {
    
            var gifCondition = $(this).data("type");
            var gifStill = $(this).data("still");
            var gifAnimate = $(this).data("animate");
    
            if(gifCondition === "still") {
                $(this).attr("src", gifAnimate);
                $(this).attr("data-type", "animate");
                console.log(gifCondition)
            }
            else if( gifCondition === "animate") {
                $(this).attr("src", gifStill);
                $(this).attr("src", "still");
                console.log (gifCondition);
            }
            console.log(gifCondition)
        }
       
    showButtons();
    
    submit ();
    
    animate();
    
    $(document).on("click", ".gif", displayGif);
    
    $(document).on("click", ".bandsGiphy", animate);
    
    
    
        
    
           
    
        
    
    
    
    });
    