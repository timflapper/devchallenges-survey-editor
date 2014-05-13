(function() {
  'use strict';

  angular.module('directives.in-place', [])
  .directive('inPlace', function() {
    function link(scope, element, attrs) {
      
    }
    
    return {
      controller: function($scope) {
        var editor = null;
        var viewer = null;
        
        this.setEditor = function(elem) {
          editor = elem;
        }
        
        this.setViewer = function(elem) {
          viewer = elem;
        }
        
        this.edit = function() {
          viewer.hide();
          editor.show();
          editor.focus();
        };
        
        this.view = function() {
          viewer.show();
          editor.hide();
        }
      },
      link: link
    };
  })
  .directive('inPlaceView', function() {
    
    function link(scope, element, attrs, ctrl) {
      element.toggleClass('hidden', false);
      
      ctrl.setViewer({
        show: function() {
          element.toggleClass('hidden', false);
        },
        hide: function() {
          element.toggleClass('hidden', true);
        }
      });
      
      element.on('click', function() {
        ctrl.edit();
      });
    }
    
    return {
      require: '^inPlace',
      link: link
    }
    
  })
  .directive('inPlaceEdit', function() {

    function link(scope, element, attrs, ctrl) {
      element.toggleClass('hidden', true);
      
      ctrl.setEditor({
        show: function() {
          element.toggleClass('hidden', false);
        },
        hide: function() {
          element.toggleClass('hidden', true);
        },
        focus: function() {
          scope.focus();
        }
      });
      
      scope.blur = function() {
          ctrl.view();
      }
    }
    
    return {
      require: '^inPlace',
      controller: function($scope) {
        var focusElem = null;
        
        this.setFocus = function(elem) {
          focusElem = elem;
        };
        
        $scope.focus = function() {
          focusElem.focus();
        };
      },
      link: link
    }
    
  })
  .directive('inPlaceFocus', function() {

    function link(scope, element, attrs, ctrl) {
      
      element.on('blur', function() {
        scope.blur();
      });
      
      ctrl.setFocus({
        focus: function() {
          element[0].focus();
          var value = element.val();
          element.val('').val(value);
        }
      });
    }
    
    return {
      require: '^inPlaceEdit',
      link: link
    }
    
  });

}());
