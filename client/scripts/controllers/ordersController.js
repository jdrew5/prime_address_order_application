myApp.controller('OrdersController', ["$scope", "$http", function($scope, $http){

    $scope.user = {};
    $scope.users = [];
    $scope.orders = [];

    $scope.getUsers = function() {
        $http.get('/getusers').then(function(response){
            $scope.users = response.data;
        });
    };

    $scope.getUsers();

    $scope.getOrders = function(user) {
        $scope.totalAmount = 0;
        $http.get('/getorders', {params: user}).then(function(response){
            $scope.orders = response.data;

            for (var i = 0; i < $scope.orders.length; i++) {
                $scope.totalAmount += parseFloat($scope.orders[i].amount);
            }

        });
    };
}]);