var LandingController = function ($scope, dataService) {
  dataService.getModel()
    .then(function (model) {
      console.log(JSON.stringify(model));
    });
};
LandingController.$inject = ['$scope', 'dataService'];
module.exports = LandingController;
