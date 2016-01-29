var dataService = function ($http) {
  return {
    getBuilds: function () {
      return $http.get('/api/build')
        .then(function (res) {
          return res.data;
        });
    }
  };
};

dataService.$inject = ['$http'];
module.exports = dataService;
