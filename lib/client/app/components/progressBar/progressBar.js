var progressBar = function() {
  return {
    restrict: 'E',
    scope: {
      progress: '=',
      success: '='
    },
    link: function(scope, element, attrs) {
      scope.visible = scope.progress > 0;
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
    },
    templateUrl: 'templates/progress-bar.html'
  };
};

module.exports = progressBar;
