(function() {
  'use strict';

  var survey = {
    id: 1,
    name: 'Springest Developer Trial',
    description: '## Introduction\n' + '\n' + 'Welcome to [Springest][1]! We will start with some questions. At the end of which you will be presented with a couple of problems to get your hands dirty!\n' + '\n' + 'Feel free to ask *any* questions, if you have any. Come join us in [Campfire][2]. Ask [Wouter][3] for access if that was not already set up for you. If you want to IM us, most of us are available on \<first-name\>@springest.com. Have a look at the [Team Page][4] to check out our names.\n' + '\n' + 'This is the first version of the extensive guide, and we are looking to improve it further. If you have any feedback on it, please do tell Wouter.\n' + '\n' + 'We wish you luck!' + '\n' + '[1]:	http://www.springest.com\n' + '[2]:	https://springest.campfirenow.com\n' + '[3]:	mailto:wouter@springest.com\n' + '[4]:	http://www.springest.co.uk/about-springest/team-springest',
    sections: [{
      id: 1,
      name: 'Hi, nice to meet you!',
      description: 'Would you mind telling us a little bit about yourself? :)'
    }]
  };
  
  function loadSurvey(id, callback) {
    // var err = new Error('Could not find survey with id ' + String(id));
    
    // callback(err);
    callback(null, survey);
  }
  
  function deleteSection(id, callback) {    
    var tmpSections = [];
    
    survey.sections.forEach(function(item, index) {
      if (item.id === id) return;
      
      tmpSections.push(item);
    });
    
    survey.sections = tmpSections;
    
    callback(null, survey);
  }

  angular.module('app')
    .controller('SurveysEditController', function($scope, $location, $modal) {
      init();

      $scope.sectionAdd = function() {

      };

      $scope.sectionEdit = function(id) {
        $location.url('/section/' + id);
      };

      $scope.sectionDelete = function(id) {
        
        $scope.alert = {
          name: 'Are you sure?',
          description: 'You are about to delete a section. Are you sure?',
          cancel: 'No, thank you!',
          confirm: 'Yes, i\'m sure!'
        };
                
        var modal = $modal.open({
          templateUrl: 'src/app/alert.html',
          scope: $scope
        });
        
        $scope.alertCancel = function() {
          modal.dismiss('cancel');
        };
        
        $scope.alertConfirm = function() {
          deleteSection(id, function(err, survey) {
            surveyResult(err, survey);
                        
            modal.close();
          });
          

        };
      };
      
      function surveyResult(err, survey) {
        if (err) {
          $scope.error = err;
          return;
        }
        
        $scope.error = null;
        $scope.survey = survey;
      }
      
      function init() {
        $scope.survey = null;
        
        // TODO: Load data from some backend instead of the mocked up stuff.
        loadSurvey(1, surveyResult);
      }

    });

}());
