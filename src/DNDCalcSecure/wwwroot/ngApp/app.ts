namespace DNDCalcSecure {

    angular.module('DNDCalcSecure', ['ui.router', 'ngResource', 'ui.bootstrap']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ) => {
        // Define routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/ngApp/views/home.html',
                controller: DNDCalcSecure.Controllers.HomeController,
                controllerAs: 'controller'
            })
            .state('creation', {
                url: '/creation',
                templateUrl: '/ngApp/views/creation.html',
                controller: DNDCalcSecure.Controllers.CreationController,
                controllerAs: 'controller'
            })
            .state('save', {
                url: '/save',
                templateUrl: '/ngApp/views/save.html',
                controller: DNDCalcSecure.Controllers.SaveController,
                controllerAs: 'controller'
            })
            .state('secret', {
                url: '/secret',
                templateUrl: '/ngApp/views/secret.html',
                controller: DNDCalcSecure.Controllers.SecretController,
                controllerAs: 'controller'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/ngApp/views/login.html',
                controller: DNDCalcSecure.Controllers.LoginController,
                controllerAs: 'controller'
            })
            .state('register', {
                url: '/register',
                templateUrl: '/ngApp/views/register.html',
                controller: DNDCalcSecure.Controllers.RegisterController,
                controllerAs: 'controller'
            })
            .state('externalRegister', {
                url: '/externalRegister',
                templateUrl: '/ngApp/views/externalRegister.html',
                controller: DNDCalcSecure.Controllers.ExternalRegisterController,
                controllerAs: 'controller'
            }) 
            .state('about', {
                url: '/about',
                templateUrl: '/ngApp/views/about.html',
                controller: DNDCalcSecure.Controllers.AboutController,
                controllerAs: 'controller'
            })
            .state('dungeon', {
                url: '/dungeon',
                templateUrl: '/ngApp/views/dungeon.html',
                controller: DNDCalcSecure.Controllers.DungeonController,
                controllerAs: 'controller'
            })
            .state('notFound', {
                url: '/notFound',
                templateUrl: '/ngApp/views/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });

    
    angular.module('DNDCalcSecure').factory('authInterceptor', (
        $q: ng.IQService,
        $window: ng.IWindowService,
        $location: ng.ILocationService
    ) =>
        ({
            request: function (config) {
                config.headers = config.headers || {};
                config.headers['X-Requested-With'] = 'XMLHttpRequest';
                return config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401 || rejection.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(rejection);
            }
        })
    );

    angular.module('DNDCalcSecure').config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });

    

}
