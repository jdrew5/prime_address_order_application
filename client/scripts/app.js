var myApp = angular.module("myApp", ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/addresses', {
            templateUrl: "/assets/views/routes/addresses.html"//,
            //controller: "AddressesController"
        }).
        when('/orders', {
            templateUrl: "/assets/views/routes/orders.html"//,
            //controller: "OrdersController"
        }).
        otherwise({
            redirectTo: 'addresses'
        })
}]);

