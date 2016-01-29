var angular = require('angular');

var LandingController = function ($scope, dataService) {
  setInterval(function () {
    dataService.getBuilds()
      .then(function (builds) {
        $scope.builds = builds;
      });
  }, 100);

  $scope.onRowClicked = function (clickedBuild){
    $scope.activeBuildId = clickedBuild.id;
  };

};

LandingController.$inject = ['$scope', 'dataService'];
module.exports = LandingController;
