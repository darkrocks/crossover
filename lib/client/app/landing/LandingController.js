var LandingController = function ($scope, dataService) {
  dataService.getModel()
    .then(function (model) {
      $scope.test = model.name;
    });
};
LandingController.$inject = ['$scope', 'dataService'];
module.exports = LandingController;
