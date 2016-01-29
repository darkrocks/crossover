var coverageIndicator = function() {
  return {
    restrict: 'E',
    scope: {
      percentage: '='
    },
    link: function(scope, element, attrs) {
      refresh();

      scope.$watch('percentage',refresh);

      function refresh() {
        if (scope.percentage > 50) {
          scope.coverageClass = 'high';
        } else {
          scope.coverageClass = 'low';
        }
        scope.coveredStyle = {
          width: scope.percentage + '%'
        };
        scope.complementStyle = {
          width: (100 - scope.percentage) + '%'
        };
      }
    },
    templateUrl: 'templates/coverage-indicator.html'
  };
};

module.exports = coverageIndicator;
