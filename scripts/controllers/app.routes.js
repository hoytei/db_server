 (function () {
    'use strict';
    angular.module('app')
    	.config(function($routeProvider) { 
            $routeProvider 
            .when("/", {
                templateUrl : "views/table.html"
            })      
            .when("/commitment_detail", {
                templateUrl : "views/commitment_detail.html"
            })
            .when("/commitment_detail/:ID", {
                templateUrl : "views/commitment_detail.html"
            });
           
        });
})();