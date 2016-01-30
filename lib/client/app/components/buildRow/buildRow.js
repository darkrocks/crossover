var moment = require('moment');

var buildRow = function() {
  return {
    restrict: 'EA',
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

      /**
       * Populate view model based on input data
       */
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

        scope.unitTestsPassed = true;
        scope.functionalTestsPassed = true;
        scope.metrixPassed = true;
        scope.buildPassed = true;

        // unit tests
        if (scope.model.unitTestProgress === 100) {
          scope.unitTestChartData = [scope.model.unitTestsFailed, scope.model.unitTestsPassed];
          scope.unitTestPercentage = Math.floor((scope.model.unitTestsPassed / (scope.model.unitTestsPassed + scope.model.unitTestsFailed)) * 100);
          scope.unitTestsPassed = scope.unitTestPercentage > 50;
        }
        scope.unitTestBoxClass = getDetailsBoxClass(scope.model.unitTestProgress, scope.unitTestsPassed);

        // functional tests
        if (scope.model.functionalTestsProgress === 100) {
          scope.functionalTestChartData = [scope.model.functionalTestsFailed, scope.model.functionalTestsPassed];
          scope.functionalTestPercentage = Math.floor((scope.model.functionalTestsPassed / (scope.model.functionalTestsPassed + scope.model.functionalTestsFailed)) * 100);
          scope.functionalTestsPassed = scope.functionalTestPercentage > 50;
        }
        scope.functionalTestBoxClass = getDetailsBoxClass(scope.model.functionalTestsProgress, scope.functionalTestsPassed);

        // metrics
        if (scope.model.metrixProgress === 100) {
          scope.metrixPassed = scope.model.metrix.metrixTestPassed && scope.model.metrix.metrixMaintainabilityPassed;

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

        // build
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

        // figure out status
        if (scope.model.unitTestProgress === 0 &&
          scope.model.functionalTestsProgress === 0 &&
          scope.model.metrixProgress === 0 &&
          scope.model.buildProgress === 0) {
          scope.status = 'Pending';
          scope.buildRowClass = ' pending';
          scope.statusLine1 = '';
          if (scope.model.type === 'build') {
            scope.statusLine2 = 'Build Pending';
          } else {
            scope.statusLine2 = 'Change Pending';
          }
        } else if (!scope.unitTestsPassed || !scope.functionalTestsPassed || !scope.metrixPassed || !scope.buildPassed) {
          if (scope.model.type === 'build') {
            scope.statusLine1 = 'Build Failed';
            scope.status = 'Failed';
          } else {
            scope.statusLine1 = 'Change Failed';
            scope.status = 'Rejected';
          }

          if (!scope.unitTestsPassed) {
            scope.statusLine2 = 'Unit Tests Failed';
          } else if (!scope.functionalTestsPassed) {
            scope.statusLine2 = 'Functional Tests Failed';
          } else if (!scope.metrixPassed) {
            scope.statusLine2 = 'Metrics Reduction';
          } else if (!scope.buildPassed) {
            scope.statusLine2 = 'Build Failed';
          }

          scope.buildRowClass = ' rejected';
        } else if (scope.model.unitTestProgress < 100 ||
          scope.model.functionalTestsProgress < 100 ||
          scope.model.metrixProgress < 100 ||
          scope.model.buildProgress < 100) {
          scope.status = 'Running';
          scope.buildRowClass = ' running';

          scope.statusLine1 = '';
          scope.statusLine2 = 'Running';

        } else {
          if (scope.model.type === 'build') {
            scope.status = 'Complete';
            scope.statusLine1 = '';
            scope.statusLine2 = 'Complete';
            scope.statusButtonText = 'Deploy';
          } else {
            scope.status = 'Accepted';
            scope.statusLine1 = 'Change Accepted';
            scope.statusLine2 = 'Auto-Merged';
            scope.statusButtonText = 'Merged Build';
          }
          scope.buildRowClass = ' complete';
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
