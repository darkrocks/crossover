var progressBar = function() {
  return {
    restrict: 'EA',
    scope: {
      progress: '=',
      success: '='
    },
    link: function(scope, element, attrs) {
      refresh();
      scope.$watch('progress',refresh);
      scope.$watch('success', refresh);

      function refresh() {
        scope.doneStyle = {
          width: scope.progress + '%'
        };
        scope.complementStyle = {
          width: (100 - scope.progress) + '%'
        };

        scope.doneClass = 'done';
        if (scope.progress === 100 && scope.success) {
          scope.doneClass += ' success';
        }

        scope.complementClass = 'complement';
        if (scope.progress === 100 && !scope.success) {
          scope.doneClass += ' fail';
        }
      }
    },
    templateUrl: 'templates/progress-bar.html'
  };
};

module.exports = progressBar;
