var angular = require('angular');

var LandingController = function ($scope, dataService) {
  dataService.getBuilds()
    .then(function (builds) {
      $scope.builds = builds;
      console.log(JSON.stringify(builds));
    });

  $scope.onRowClicked = function (clickedBuild){
    $scope.activeBuildId = clickedBuild.id;
  };
};
LandingController.$inject = ['$scope', 'dataService'];
module.exports = LandingController;
