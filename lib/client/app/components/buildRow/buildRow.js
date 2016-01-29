var moment = require('moment');


var buildRow = function() {
  return {
    restrict: 'E',
    scope: {
      model: '=',
      active: '='
    },
    link: function (scope, element, attrs) {
      refreshModel();

      scope.$watch('model', function (newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
          refreshModel();
        }
      });

      scope.$watch('active', function (newValue, oldValue) {
        if (newValue !== undefined && newValue !== oldValue) {
          expand();
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

        if (scope.model.unitTestProgress === 100) {
          scope.unitTestChartData = [scope.model.unitTestsFailed, scope.model.unitTestsPassed];
          scope.unitTestPercentage = Math.floor((scope.model.unitTestsPassed / (scope.model.unitTestsPassed + scope.model.unitTestsFailed)) * 100);
          scope.unitTestsPassed = scope.unitTestPercentage > 65;
        }
        scope.unitTestBoxClass = getDetailsBoxClass(scope.model.unitTestProgress, scope.unitTestsPassed);

        if (scope.model.functionalTestsProgress === 100) {
          scope.functionalTestChartData = [scope.model.functionalTestsFailed, scope.model.functionalTestsPassed];
          scope.functionalTestPercentage = Math.floor((scope.model.functionalTestsPassed / (scope.model.functionalTestsPassed + scope.model.functionalTestsFailed)) * 100);
          scope.functionalTestsPassed = scope.functionalTestPercentage > 65;
        }
        scope.functionalTestBoxClass = getDetailsBoxClass(scope.model.functionalTestsProgress, scope.functionalTestsPassed);

        if (scope.model.metrixProgress === 100) {
          scope.metrixPassed = scope.model.metrixTestPassed && scope.model.metrixMaintainabilityPassed;

          if (scope.model.metrix) {
            if (scope.model.metrix.metrixTestPassed) {
              scope.testArrowIcon = 'icon-up';
            } else {
              scope.testArrowIcon = 'icon-down';
            }

            if (scope.model.metrix.metrixMaintainabilityPassed) {
              scope.maintainabilityArrowIcon = 'icon-up';
            } else {
              scope.maintainabilityArrowIcon = 'icon-down';
            }
          }
        }
        scope.metrixBoxClass = getDetailsBoxClass(scope.model.metrixProgress, scope.metrixPassed);

        if (scope.model.buildProgress === 100) {
          scope.buildPassed = scope.model.debugBuild && scope.model.releaseBuild;
          if (scope.model.debugBuild) {
            scope.debugBuildClass = 'build-success';
          } else {
            scope.debugBuildClass = 'build-failed';
          }

          if (scope.model.releaseBuild) {
            scope.releaseBuildClass = 'build-success';
          } else {
            scope.releaseBuildClass = 'build-failed';
          }
        }
        scope.buildBoxClass = getDetailsBoxClass(scope.model.buildProgress, scope.buildPassed);

        if (scope.model.unitTestProgress === 0 &&
          scope.model.functionalTestsProgress === 0 &&
          scope.model.metrixProgress === 0 &&
          scope.model.buildProgress === 0) {
          scope.status = 'Pending';
          scope.buildRowClass = ' pending';
        } else if (!scope.unitTestsPassed || !scope.functionalTestsPassed || !scope.metrixPassed || !scope.buildPassed) {
          if (scope.model.type === 'build') {
            scope.status = 'Failed';
          } else {
            scope.status = 'Rejected';
          }
          scope.buildRowClass = ' rejected';
        } else if (scope.model.unitTestProgress < 100 ||
          scope.model.functionalTestsProgress < 100 ||
          scope.model.metrixProgress < 100 ||
          scope.model.buildProgress < 100) {
          scope.status = 'Running';
          scope.buildRowClass = ' running';
        } else {
          if (scope.unitTestsPassed &&
            scope.functionalTestsPassed &&
            scope.metrixPassed &&
            scope.buildPassed) {
            if (scope.model.type === 'build') {
              scope.status = 'Complete';
            } else {
              scope.status = 'Accepted';
            }
            scope.buildRowClass = ' complete';
          } else {
            if (scope.model.type === 'build') {
              scope.status = 'Failed';
            } else {
              scope.status = 'Rejected';
            }
            scope.buildRowClass = ' rejected';
          }
        }
      }

      function getDetailsBoxClass(progress, complete) {
        if (progress === 0) {
          return 'pending';
        }
        if (progress < 100) {
          return 'running';
        }
        if (complete) {
          return 'complete';
        }
        return 'rejected';
      }

      function expand() {
        if (scope.active) {
          scope.buildRowAnimationClass = ' expanded';
        } else {
          scope.buildRowAnimationClass = '';
        }
      }
    },
    templateUrl: 'templates/build-row.html'
  };
};

module.exports = buildRow;
