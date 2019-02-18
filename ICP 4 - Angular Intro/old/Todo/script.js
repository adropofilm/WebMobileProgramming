var angularTodo = angular.module('angularTodo', []);

angularTodo.controller('app-root', ['$scope', function ($scope) {
    $scope.items = [];

    $scope.deleteTodo = function (index) {
        $scope.items.splice(index, 1);
    };

    $scope.addNewItem = function (item) {
        $scope.items.push({name: item.name, completed: false});
        item.name = "";
    };

    $scope.completeItem = function (index) {
        $scope.items[index].completed = !$scope.items[index].completed;
    };

}]);
