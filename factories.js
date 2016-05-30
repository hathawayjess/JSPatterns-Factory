Javascript Design Patterns - Factories 
Creational Design Pattern

***FACTORY METHOD*** aka Factory Method
FORMAL DEFINITION: Define an interface for creating an object, but let subclasses decide which class to instantiate. 
				   Factory Method lets a class defer instantiation to subclasses.

**ABSTRACT FACTORY*** aka Kit
FORMAL DEFINITION: Provide an interface for creating families of related or dependent objects without specifying their concrete classes. 


-----------------------------------------------------------------------------------------------

Simple Factory vs Factory Method vs Abstract Factory

Simple Factory - an object which encapsulates the creation of another object, shielding that code from the rest of your application.

example:  
var user = UserFactory.createUser();
var admin = UserFactory.createUser('admin');
var customer = UserFactory.createUser('customer');

implementation:
UserFactory.createUser = function(type) {  
    if (type == 'admin') {
        return new Admin(); 
    } else if (type == 'customer') {
        return new Customer();
    }
};

Two Products - Admin and Customer

The return value from a factory is known as the Product. 

Abstract Factory - provides an interface for creating families of related or dependent objects without specifying their concrete classes. 
				   an abstract factory can be composed of Factory Methods

-------------------------------------------------------------------------------------------------------------------
function Employee(name) {
    this.name = name;
 
    this.say = function () {
        log.add("I am employee " + name);
    };
}
 
function EmployeeFactory() {
 
    this.create = function(name) {
        return new Employee(name);
    };
}
 
function Vendor(name) {
    this.name = name;
 
    this.say = function () {
        log.add("I am vendor " + name);
    };
}
 
function VendorFactory() {
 
    this.create = function(name) {
        return new Vendor(name);
    };
}
 
// log helper
var log = (function () {
    var log = "";
 
    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { alert(log); log = ""; }
    }
})();
 
function run() {
    var persons = [];
    var employeeFactory = new EmployeeFactory();
    var vendorFactory = new VendorFactory();
 
    persons.push(employeeFactory.create("Joan DiSilva"));
    persons.push(employeeFactory.create("Tim O'Neill"));
    persons.push(vendorFactory.create("Gerald Watson"));
    persons.push(vendorFactory.create("Nicole McNight"));
 
    for (var i = 0, len = persons.length; i < len; i++) {
        persons[i].say();
    }
 
    log.show();
}