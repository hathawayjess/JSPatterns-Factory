//Abstract Factory Example

var fromPrototype = function(prototype, object) {
    var newObject = Object.create(prototype);
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            newObject[prop] = object[prop];
        }
    }
  return newObject;
};


//Now, let's create an Abstract Factory (Ingredients is the Abstract Factory)
var Ingredients = {
	createDough: function() {
		return 'generic dough';
	},
	createSauce: function() {
		return 'generic sauce';
	},
	createCrust: function() {
		return 'generic crust';
	}
}

Ingredients.createChicagoStyle = function() {
	return fromPrototype(Ingredients, {
		createDough: function() {
			return 'thick, heavy dough';
		},
		createSauce: function() {
			return 'rich marinara';
		},
		createCrust: function() {
			return 'deep-dish';
		}
	})
}

Ingredients.createCaliforniaStyle = function() {
	return fromPrototype(Ingredients, {
		createDough: function() {
			return 'light, fluffy dough';
		},
		createSauce: function() {
			return 'tangy red sauce';
		},
		createCrust: function() {
			return 'thin and crispy';
		}
	})
}

//when you wish to grab ingredients for a specific kind of pizza
var californiaIngredients = Ingredients.createCaliforniaStyle();  
californiaIngredients.createCrust(); // returns 'thin and crispy';  

//the object returned by createCaliforniaStyle is the concrete implementation of our Abstract Ingredients object 
//the object returned by createCaliforniaStyle can be thought of as a CaliforniaIngredients object
//it is a subclass of Ingredients -- the returned object extends Ingredients and overrides its Factory Methods