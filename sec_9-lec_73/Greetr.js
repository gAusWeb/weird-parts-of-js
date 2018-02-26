


// Code run down
// G$ sign points to the Greetr function
// The Greetr function return a new value, init (Greetr.init)
// 'init' builds the object & sets the values
// 'Greetr.init.prototype = Greetr.prototype' 
	//- this enalbes access to all the methods we set on the object's prototype
// Which are found here, 'Greetr.prototype = { methods live here };'




// Use an immediately invoked function expression (IIFE) to contain my code to keep from interfearing with other libraries/code
(function(global, $) {

	// set up a 'new' greetr object - This will be function that generates an object
	var Greetr = function(firstName, lastName, language) {
		// this will save us using the new keyword everytime we use this library
		return new Greetr.init(firstName, lastName, language);
	}

	

	// All vars declared within this IIFE are accesible within this library, but will not interfere with anything external, thanks to closures. Values here cannot changed externally, they would need to edit this library to alter them.
	var supportedLangs = ['en', 'es', 'ma'];



	// Setup data that you can access but cannot be altered externally
	// we could have used arrays here, but we want reference these via the name of the language (the name:value pair, this will let us do this dynamically, very easily), aka a string - To access objects data we would use, greetings['en']
	// informal greetings
	var greetings = {
		en: 'Hello',
		es: 'Hola',
		ma: 'alo'
	};

	// formal greetings
	var formalGreetings = {
		en: 'Greetings,',
		es: 'Saludos,',
		ma: 'fòmèl alo'
	};

	// Logger messages - log data (msg's) to console
	var logMessages = {
		en: 'Logged in',
		es: 'Inicio Sesion',
		ma: 'louvri sesyon an'
	}


	// PROTOTYPE OBJECT - (to save memory space)
	// set / create an empty object, so we can use Greetr.prototype, instead of Greetr.init.prototype
	// here we list only items we wish to expose externally
	// 
	Greetr.prototype = {

		// 'this' refers to the calling object at execution time
		fullName: function() {
			return this.firstName + ' ' + this.lastName;
		},
		
		validate: function() {

			// check that is a valid language
			// references the externally inaccessible 'supportedLangs' within the closure
			// As 'supportedLangs' is an array, we can use 'indexOf', which will tell me if the language is in the array -  the 'this' keyword will point to the newly created object
			if (supportedLangs.indexOf(this.language) === -1) {
				throw "Invalid language";
			}
		},
		
		// retrieve messages from object by referring to properties using [] syntax
		greeting: function() {
			return greetings[this.language] + ' ' + this.firstName + '!';
		},
		
		formalGreeting: function () {
			return formalGreetings[this.language] + ' ' + this.fullName();
		},

		// chainable methods return their own containing object
		greet: function(formal) {
			var msg;

			if (formal) {
				msg = this.formalGreeting()
			} else {
				msg = this.greeting()
			}

			// console is a keyword that detects if the browser has a console
			if (console) {
				console.log(msg);
			}

			// 'this' refers to the calling object at execution time 
			// this makes the method chainable with other methods
			return this;
		},

		log: function() {

			// console - this is an object, if undefined it will be coerced to false, so this will enable us to only log systems that support console - Internet explorer only logs items if the console is open, hence why we need to check for this.
			if (console) {
				console.log(
					logMessages[this.language] + ' ' + this.fullName()
				);
			}

			// make chainable
			return this;
		},

		// enable the abilty to change the language on the fly, pass new language as an argument
		setLang: function (lang) {

			// update the language object
			this.language = lang;

			// use the pre-made validate function to check that the lang is valid
			this.validate();

			return this;
		},

		// insert the abilty to accept jQuery elements
		// this accepts a jQuery selector, and whether or not it's a formal greeting
		HTMLGreeting: function(selector, formal) {

			// check if jQuery is available
			if (!$) {
				throw 'jQuery not loaded';
			}

			// check to make sure a selector has been identified
			if (!selector) {
				throw 'Missing a jQuery selector';
			} 

			// determine the message 
			var msg;
			
			if (formal) {
				msg = this.formalGreeting();
			} 
			else {
				msg = this.greeting();
			}

			// inject the message in the chosen place in the DOM
			$(selector).html(msg); 

			// make chainable
			return this;
		}

	}; // end of object literal


	// the actual object is created here, allowing us to 'new' an object without calling 'new'
	// we make a function constructor that builds an object and gives it 3 properties and sets their values if you pass arguments, other wise it will fallback to its defaults
	Greetr.init = function(firstName, lastName, language) {

		// set self to this, so you dont have to worry what the 'this' var points to later
		// 'self' will set the 'this' to all new objects created
		var self = this;
		//set up default values, in case they are not specified
		self.firstName = firstName || '',
		self.lastName = lastName || '',
		self.language = language || 'en';

		self.validate();

	}



	// Any objects created with this function (Greetr.init), will actually point here (Greetr.prototype) for its proto chain - proto chain is a list of methods attached to an object, but stored in the object's prototype - all functions have a prototype
	Greetr.init.prototype = Greetr.prototype;


	// attach our Greetr to the global object, and provide a shorthand '$G' for ease our poor fingers
	// expose the library to the global scope
	// To make something available everywhere we need to attach it to the gobla object, it is initially parsed in through the 'global' arguemnt at the top
	global.Greetr = global.G$ = Greetr;



}(window, jQuery));
// when this is invoked, we pass in global and our jQuery object, which could also be a '$' 
// window is being passed into the IIFE, and referenced through 'global', which is the first argument parsed at the top