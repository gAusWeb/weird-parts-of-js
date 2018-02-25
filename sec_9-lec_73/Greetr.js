


// Use an immediately invoked function expression (IIFE) to contain my code to keep from interfearing with other libraries/code
(function(global, $) {


	// set up greetr object - This will be function that generates an object
	var Greetr = function(firstName, lastName, language) {
		// this will save us using the new keyword everytime we use this library
		return new Greetr.init(firstName, lastName, language);
	}


	// set / create an empty object, so we can use Greetr.prototype, instead of Greetr.init.prototype
	Greetr.prototype = {};


	// we make a function constructor that builds an object and gives it 3 properties and sets their values if you pass arguments, other wise it will fallback to its defaults
	Greetr.init = function(firstName, lastName, language) {
		// set self to this, so you dont have to worry what the 'this' var points to later
		var self = this;
		//set up default values, in case they are not specified
		self.firstName = firstName || '',
		self.lastName = lastName || '',
		self.language = language || 'en';

	}


	// Any objects created with this function (Greetr.init), will actually point here (Greetr.prototype) for its proto chain - proto chain is a list of methods attached to an object, but stored in the object's prototype - all functions have a prototype
	Greetr.init.prototype = Greetr.prototype;


	// expose the library to the global scope
	// To make something available everywhere we need to attach it to the gobla object, it is initially parsed in through the 'global' arguemnt at the top
	global.Greetr = global.G$ = Greetr;



}(window, jQuery));
// when this is invoked, we pass in global and our jQuery object, which could also be a '$' 
// window is being passed into the IIFE, and referenced through 'global', which is the first argument parsed at the top


