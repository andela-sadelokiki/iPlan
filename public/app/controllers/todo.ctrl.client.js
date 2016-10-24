angular.module('iPlan')
    .controller('TodoCtrl', ['$rootScope', '$scope', 'TodoService', '$localStorage', function($rootScope, $scope, TodoService, $localStorage) {
        console.log('todocontroller');

        // Variables
        $scope.todos = [];
        $scope.getCompleted = [];
        $scope.completedTodos = [];

        TodoService.getAll().then(function(res) {
            $scope.todos = res.data;
        }, function(err) {

        });

        $scope.createTodo = function() {
            TodoService.create($scope.todo).then(function(res) {
                $scope.todos.push(res.data);
                $scope.todo.title = '';
            }, function(err) {
                console.log(err)
            });
        };

        // $scope.getOneTodo = function() {
        //     TodoService.getOne(id).then(function(res) {
        //         console.log(res);
        //     }, function(err) {
        //         console.log(err);
        //     })
        // };

        $scope.getAll = function() {
            TodoService.getAll().then(function(res) {
                console.log(res);
            }, function(err) {
                console.log(err);
            })
        };


        $scope.completeTodo = function(id, index) {
            return TodoService.delete(id).then(function(res) {
                $scope.todos.splice(index, 1)
                $scope.completedTodos.push(res.data);
                localStorage.setItem("$scope.completedTodos", JSON.stringify($scope.completedTodos));
            }, function(err) {
                console.log(err);
            })
        };

        $scope.getCompletedtodos = function() {
            return $scope.getCompleted = JSON.parse(localStorage.getItem("$scope.completedTodos"))
        };

        $scope.editTodo = function(newtodo) {
          TodoService.update(newtodo).then(function(res) {
            newtodo.editing = true;
            console.log(res.data);
          })
        };

        $scope.doneEditing = function(newtodo) {
          newtodo.editing = false;
        }
    }]);
