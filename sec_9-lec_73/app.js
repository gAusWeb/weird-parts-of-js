//----------------------------------------------
// Custom Framework / library usage
//----------------------------------------------


// example 1 - Basic 

// gets a new object (the architecture allows us not to have to use the 'new' keyowrd here)
var g = G$('John', 'Doe');

// use our chainable methods
g.greet().setLang('es').greet(false).log();

//----------------------------------------------


// example 2 - Using it with a jQuery dom element

// use jQuery to find a DOM element and add a click event to it
$('#login').click(function() {

	// create a new 'Greetr' object on the click of the login button
	var loginGrtr = G$('John', 'Doe');
	
	// hide the button and select html elements, once clicked
	$('#logindiv').hide();

	// fire off an HTML greeting, passing the '#greeting' as the selector and the chosen language, and log the welcome as well
	loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();

});

//----------------------------------------------