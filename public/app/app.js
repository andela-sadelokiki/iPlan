var app = angular.module('iPlan', ['ui.router', 'ngStorage']);
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            views: {
                '': {
                    templateUrl: 'app/views/nav.view.html'
                },
                'theView@home': {
                    templateUrl: 'app/views/home.view.html',
                    controller: 'TodoCtrl'
                }
            }
        })
        .state('completed', {
          url: '/completed',
          views: {
            '': {
              templateUrl: 'app/views/nav.view.html'
            },
            'theView@completed': {
              templateUrl: 'app/views/completed.view.html',
              controller: 'TodoCtrl'
            }
          }
        })
    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode(true);
}])
