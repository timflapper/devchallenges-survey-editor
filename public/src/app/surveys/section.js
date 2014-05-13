(function() {
  'use strict';

  var section = {
    id: 1,
    name: 'Hi, nice to meet you!',
    description: 'Would you mind telling us a little bit about yourself? :)',
    questions: [{
      id: 1,
      type: 4,
      text: 'What is your name?',
      description: 'Please give us your first and last name'
    }]
  }
  
  function getQuestion(id, callback) {
    var result = null;
    
    section.questions.forEach(function(item, index){
      if (item.id !== id) return;
      
      result = item;
    });
    
    callback(null, result);
  }

  angular.module('app')
    .controller('SurveysEditSectionController', function($scope, $modal) {
      $scope.section = section;
    });
}());
