var moment = require('moment');

var buildRow = function() {
  return {
    restrict: 'E',
    scope: {
      model: '='
    },
    link: function(scope, element, attrs) {
      scope.model.timeStartedFormated = moment(scope.model.timeStarted).format('MM/DD/YYYY  h:mm a');

      switch(scope.model.type) {
        case 'build':
          scope.model.iconClass = 'icon-build';
          break;
        case 'changelist':
          scope.model.iconClass = 'icon-changeset';
          break;
      }
    },
    templateUrl: 'templates/build-row.html'
  };
};

module.exports = buildRow;
