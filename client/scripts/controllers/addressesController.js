myApp.controller('AddressesController', ["$scope", "$http", function($scope, $http){

    $scope.user = {};
    $scope.users = [];
    $scope.addresses = [];

    $scope.getUsers = function() {
        $http.get('/getusers').then(function(response){
            $scope.users = response.data;
        });
    };

    $scope.getUsers();

    $scope.getAddresses = function(user) {
        $http.get('/getaddresses', {params: user}).then(function(response){
            $scope.addresses = response.data;
        });
    };

}]);