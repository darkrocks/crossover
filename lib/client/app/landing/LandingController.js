var angular = require('angular');

var LandingController = function ($scope, dataService) {
  dataService.getBuilds()
    .then(function (builds) {
      $scope.builds = builds;
      console.log(JSON.stringify(builds));
    });

  $scope.onRowClicked = function (clickedBuild){
    for (var i = 0; i < $scope.builds.length; i++) {
      if ($scope.builds[i] === clickedBuild) {
        $scope.builds[i].active = true;
      } else {
        $scope.builds[i].active = false;
      }
    }

    $scope.builds = angular.copy($scope.builds);
  };
};
LandingController.$inject = ['$scope', 'dataService'];
module.exports = LandingController;
