//Factory Method Example


//Object.create() - creates a new object with the specified prototype object and properties.
//can accept a properties object which is then mixed in to the returned object
var firstPizzaStore = Object.create(PizzaStore);  
firstPizzaStore.createPizza(); // returns 'Generic pizza created' 


//When used with a properties object, Object.create() can get verbose, we can use this similar fromPrototype function 
//(credit: http://yehudakatz.com/)
var fromPrototype = function(prototype, object) {  
    var newObject = Object.create(prototype);
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            newObject[prop] = object[prop];
        }
    }
  return newObject;
};


//Define the Pizza product
var Pizza = {
	description: 'Plain Generic Pizza'
};

//And the basic PizzaStore
var PizzaStore = {
	createPizza: function(type) {
		if (type === 'cheese') {
			return fromPrototype(Pizza, {
				description: 'Cheesy, Generic Pizza'
			});
		} else if (type === 'veggie') {
			return fromPrototype(Pizza, {
				description: 'Veggie, Generic Pizza'
			});
		}
	}
}

//Extend PizzaStore so we can have two variations
var ChicagoPizzaStore = fromPrototype(PizzaStore, {
	createPizza: function(type) {
		if (type === 'cheese') {
			return fromPrototype(Pizza, {
				description: 'Cheesy, Deep-dish Chicago Pizza'
			});
		} else if (type === 'veggie') {
			return fromPrototype(Pizza, {
				description: 'Veggie, Deep-dish Chicago Pizza'
			});
		}
	}
})

var CaliforniaPizzaStore = fromPrototype(PizzaStore, {
	createPizza: function(type) {
		if (type === 'cheese') {
			return fromPrototype(Pizza, {
				description: 'Cheesy, Tasty California Pizza'
			});
		} else if (type === 'veggie') {
			return fromPrototype(Pizza, {
				description: 'Veggie, Tasty California Pizza'
			});
		}
	}
})

//Elsewhere in our app
var chicagoStore = Object.create(ChicagoPizzaStore);
var pizza = chicagoStore.createPizza('veggie'); //same as Object.create(ChicagoPizzaStore).createPizza('veggie');
console.log(pizza.description); //returns 'Veggie, Deep-dish Chicago Pizza'
var caliStore = Object.create(CaliforniaPizzaStore);
var pizza2 = caliStore.createPizza('cheese'); //returns 'Cheesy, Tasty California Pizza'


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