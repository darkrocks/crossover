var LandingController = function ($scope, dataService) {
  dataService.getBuilds()
    .then(function (builds) {
      $scope.builds = builds;
      console.log(JSON.stringify(builds));
    });
};
LandingController.$inject = ['$scope', 'dataService'];
module.exports = LandingController;
