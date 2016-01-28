var model = {
  name: 'yohoho'
};

var backendStub = function($httpBackend) {
  $httpBackend.whenGET('/api/model').respond(model);
  $httpBackend.whenGET(/templates/).passThrough();
};

backendStub.$inject = ['$httpBackend'];
module.exports = backendStub;
