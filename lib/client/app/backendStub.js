var ownerNames = [
  'bill',
  'josh',
  'harry',
  'ben'
];

var changelistStatuses = [
  'Accepted',
  'Rejected',
  'Pending'
];

var buildStatuses = [
  'Complete',
  'Failed',
  'Pending'
];

function createRandomItem(type) {
  var item = {};
  item.type = type;

  switch(type) {
    case 'build':
      var buildNumber = Math.floor(Math.random() * 10000);
      item.name = 'Tenrox R1_' + buildNumber;

      var buildStatusIndex = Math.floor(Math.random() * 2);
      item.status = buildStatuses[buildStatusIndex];

      populateCommonData(item);
      break;
    case 'changelist':
      var firewallNumber = Math.floor(Math.random() * 100000);
      item.name = 'Tenrox R1_' + firewallNumber;

      var nameIndex = Math.floor(Math.random() * 3);
      item.owner = ownerNames[nameIndex];

      var changelistStatusIndex = Math.floor(Math.random() * 2);
      item.status = changelistStatuses[changelistStatusIndex];

      populateCommonData(item);
      break;
  }

  return item;
}

function populateCommonData(item) {
  var minutes = Math.floor(Math.random() * 6);
  item.timeStarted = getDateInFuture(0, minutes);

  if (Math.random() >= 0.5) {
    item.buildProgress = 100;
    item.debugBuild = Math.random() >= 0.8;
    item.releaseBuild = Math.random() >= 0.8;
  } else {
    item.buildProgress = Math.floor(Math.random() * 99);
  }

  if (Math.random() >= 0.5) {
    item.unitTestProgress = 100;
    item.unitTestsPassed = Math.floor(Math.random() * 50) + 50;
    item.unitTestsCoverage = Math.floor(Math.random() * 50) + 50;
  } else {
    item.unitTestProgress = Math.floor(Math.random() * 99);
  }

  if (Math.random() >= 0.5) {
    item.functionalTestsProgress = 100;
    item.functionalTestsPassed = Math.floor(Math.random() * 50) + 50;
    item.functionalTestsCoverage = Math.floor(Math.random() * 50) + 50;
  } else {
    item.functionalTestsProgress = Math.floor(Math.random() * 99);
  }

  if (Math.random() >= 0.5) {
    item.metrixProgress = 100;
    item.metrix = {
      testScore: Math.floor(Math.random() * 50) + 50,
      testPassed: Math.random() >= 0.8,
      maintainabilityScore: Math.floor(Math.random() * 50) + 50,
      maintainabilityPassed: Math.random() >= 0.8,
      securityScore: Math.floor(Math.random() * 50) + 50,
      workmanshipScore: Math.floor(Math.random() * 50) + 50
    };
  } else {
    item.metrixProgress = Math.floor(Math.random() * 99);
  }
}

function getDateInFuture(days, minutes) {
  var d = new Date();
  if (days) {
    d.setDate(d.getDate() + days);
  }

  if (minutes) {
    d.setTime(d.getTime() + (minutes*60*1000));
  }

  return d;
}

var model = [
  createRandomItem('build'),
  createRandomItem('changelist'),
  createRandomItem('changelist'),
  createRandomItem('build'),
  createRandomItem('changelist'),
  createRandomItem('changelist')
];

var backendStub = function($httpBackend) {
  $httpBackend.whenGET('/api/model').respond(model);
  $httpBackend.whenGET(/templates/).passThrough();
};

backendStub.$inject = ['$httpBackend'];
module.exports = backendStub;