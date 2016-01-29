var dataService = function ($http) {
  return {
    getModel: function () {
      return $http.get('/api/model')
        .then(function (res) {
          return res.data;
        });
    }
  };
};

dataService.$inject = ['$http'];
module.exports = dataService;
