angular.module('iPlan')
    .factory('TodoService', ['$http', 'baseUrl', function($http, baseUrl) {
        var Todo = {
            create: function(todo) {
                return $http.post(baseUrl + '/todo', todo)
            },
            getOne: function(id) {
                return $http.get(baseUrl + '/todo/' + id)
            },
            getAll: function() {
                return $http.get(baseUrl + '/todo')
            },
            update: function(id) {
                return $http.put(baseUrl + '/todo/' + id)
            },
            delete: function(id) {
                return $http.delete(baseUrl + '/todo/' + id)
            }
        };
        return Todo;
    }])
