var moment = require('moment');

var buildRow = function() {
  return {
    restrict: 'E',
    scope: {
      model: '='
    },
    link: function (scope, element, attrs) {
      refreshModel();
      scope.$watch(function () {
        return scope.model;
      }, function (newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
          refreshModel();
        }
      });

      function refreshModel() {
        scope.model.timeStartedFormated = moment(scope.model.timeStarted).format('MM/DD/YYYY  h:mm a');

        switch (scope.model.type) {
          case 'build':
            scope.model.iconClass = 'icon-build';
            break;
          case 'changelist':
            scope.model.iconClass = 'icon-changeset';
            break;
        }

        scope.buildRowClass = 'row build-row';

        if (scope.model.status === 'Pending') {
          scope.buildRowClass += ' pending';
        }

        if (scope.model.status === 'Failed' || scope.model.status === 'Rejected') {
          scope.buildRowClass += ' rejected';
        }

        if (scope.model.status === 'Complete' || scope.model.status === 'Accepted') {
          scope.buildRowClass += ' complete';
        }

        if (scope.model.status === 'Running') {
          scope.buildRowClass += ' running';
        }

        scope.buildRowStyle = {};
        if (scope.model.active) {
          scope.buildRowStyle = {
            height: '100px'
          };
        }
      }
    },
    templateUrl: 'templates/build-row.html'
  };
};

module.exports = buildRow;
