(function() {
  'use strict';
  
  angular.module('app', [
  'ngRoute',
  'ui.bootstrap',
  'directives.in-place'
  ])
  .config(['$routeProvider', function ($routeProvider) {
    
    $routeProvider
    .when('/', {
      templateUrl: 'src/app/surveys/edit.html',
      controller: 'SurveysEditController'
    })
    .when('/section/:sectionId', {
      templateUrl: 'src/app/surveys/section.html',
      controller: 'SurveysEditSectionController'
    })    
    .otherwise({
      redirect: '/'
    });
  }]);
  
}());
