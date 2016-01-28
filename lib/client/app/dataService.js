var dataService = function ($http) {
  return {
    getModel: function () {
      return $http.get('/api/model');
    }
  };
};

dataService.$inject = ['$http'];
module.exports = dataService;
