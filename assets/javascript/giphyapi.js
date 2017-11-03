//background fade in
function main() {
	$('#background').hide()
	$('#background').fadeIn(1000)
}
$(document).ready(main);

//initial array of celebrities
var celebrities = ["Kim Kardashian", "Ryan Gosling", "Honey Boo Boo", "Lady Gaga", "Taylor Lautner", "Nicki Minaj", "Homer Simpson", "Chris Hemsworth", "Brad Pitt", "Katy Perry", "David Beckham", "Rhianna", "Zac Efron", "Donald Trump", "Taylor Swift", "Chris Farley", "The Rock"];

//function to call celebrity gifs
function displayCelebrityGif(celeb){
	var celebrity = celeb;
	console.log(celebrity)
	var apiKey = "ogk2frRp1Sq0tCaxdYyiRw8e0wuRhD9G"
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + celebrity + "&api_key=" + apiKey + "&limit=10";

	//creates ajax call for specific celebrity being clicked
	$.ajax({
		url: queryURL, 
		method: "GET"
	})
	.done(function(response){

	//console.log(response)
	var celebrities = response.data;
	//$("#searches").empty();
	//create for loop to display the data received
	for (var j = 0; j < celebrities.length; j++) {
		
		//creates a div to hold the celebrity
		var celebrityDiv = $("<div class=''>")
		// retrieves the rating data
		var rating = celebrities[j].rating;
		// Make a paragraph tag with jQuery and store it in a variable named p.
		var p = $("<p>").text("Rating: " + rating);
		// Set the image's src to still.url.
		var celebrityStill = celebrities[j].images.fixed_height_still.url;
		// Set the image's src to animated.url.
		var celebrityAnimated = celebrities[j].images.fixed_height.url;
		// Make an image tag with jQuery and store it in a variable.
		var image = $("<img>");
		image.attr("src", celebrityStill);
		image.attr("data-still", celebrityStill);
		image.attr('data-animated', celebrityAnimated);
		image.attr('data-state', 'still');
		image.addClass('searchImage');
		
		//creates an element to have the rating displayed<button class="btn btn-default celebrity" data-person="The Rock">The Rock</button>
		celebrityDiv.append(p);
		celebrityDiv.append(image)
		
		//append the celebrityDiv variable to the element with an id of searches
		$("#searches").prepend(celebrityDiv);
	}
});
};

$(document).on('click', '.searchImage', function(){
	
	var state = $(this).attr('data-state');
	if (state == "still"){
		$(this).attr('src', $(this).data('animated'));
		$(this).attr('data-state', 'animated');
	} else{
		$(this).attr('src', $(this).data('still'));
		$(this).attr('data-state', 'still');	 
	}
});
//calling renderButton function
renderButtons();

//createding function to add the list of celebrities already supplied in my array. 
function renderButtons(){
	$("#celebrity-view").empty();
	for (var i = 0; i < celebrities.length; i++) {
		//console.log(celebrities.length)
		var a = $("<button class='btn btn-default'>");
		a.addClass("celebrity");
		a.attr("data-person", celebrities[i]);
		a.text(celebrities[i]);
		$("#celebrity-view").append(a);
	}
}

//click function to add celebrities to array of celebrities
$("#add-person").on("click", function(event){
	event.preventDefault();
	var celebrity = $("#search-input").val().trim();
	if (celebrity) {
		celebrities.push(celebrity);
		
	}
	renderButtons();
});

//click to call celebrity class and display celebrity function
$(document).on("click", ".celebrity", function(){
	var clickedCeleb =  $(this).attr("data-person");
	displayCelebrityGif(clickedCeleb)});
$('#main-container').hide()
$('#main-container').fadeIn(3000)