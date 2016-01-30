/**
 * Mock for backend. Simulates data changes
 */

var ownerNames = [
  'bill',
  'josh',
  'harry',
  'ben'
];

function createItem(type) {
  var item = {};
  item.type = type;
  item.id = Math.floor(Math.random() * 10000);

  switch(type) {
    case 'build':
      var buildNumber = Math.floor(Math.random() * 10000);
      item.name = 'Tenrox R1_' + buildNumber;

      populateInitialData(item);
      break;
    case 'changelist':
      var firewallNumber = Math.floor(Math.random() * 100000);
      item.name = 'Tenrox R1_' + firewallNumber;

      var nameIndex = Math.floor(Math.random() * 4);
      item.owner = ownerNames[nameIndex];

      populateInitialData(item);
      break;
  }

  return item;
}

function populateInitialData(item) {
  var minutes = Math.floor(Math.random() * 6);
  item.timeStarted = getDateInFuture(0, minutes);
  item.buildProgress = 0;
  item.unitTestProgress = 0;
  item.functionalTestsProgress = 0;
  item.metrixProgress = 0;
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
  createItem('build'),
  createItem('changelist'),
  createItem('changelist'),
  createItem('build'),
  createItem('changelist'),
  createItem('changelist')
];


  var intervalId = setInterval(function () {
    var item = getUndoneItem();
    if (item) {
      if (item.unitTestProgress < 100) {
        item.unitTestProgress += 10;

        if (item.unitTestProgress === 100) {
          item.unitTestsPassed = Math.floor(Math.random() * 30) + 70;
          item.unitTestsFailed = Math.floor(Math.random() * 25) + 50;
          item.unitTestsCoverage = Math.floor(Math.random() * 15) + 50;
        }
      } else if (item.functionalTestsProgress < 100) {
        item.functionalTestsProgress += 10;

        if (item.functionalTestsProgress === 100) {
          item.functionalTestsPassed = Math.floor(Math.random() * 30) + 70;
          item.functionalTestsFailed = Math.floor(Math.random() * 25) + 50;
          item.functionalTestsCoverage = Math.floor(Math.random() * 15) + 50;

        }
      } else if (item.buildProgress < 100) {
        item.buildProgress += 10;

        if (item.buildProgress === 100) {
          item.debugBuild = Math.random() >= 0.15;
          item.releaseBuild = Math.random() >= 0.15;
        }
      } else if (item.metrixProgress < 100) {
        item.metrixProgress += 10;

        if (item.metrixProgress === 100) {
          item.metrix = {
            metrixTestScore: Math.floor(Math.random() * 50) + 50,
            metrixTestPassed: Math.random() >= 0.15,
            metrixMaintainabilityScore: Math.floor(Math.random() * 50) + 50,
            metrixMaintainabilityPassed: Math.random() >= 0.15,
            metrixSecurityScore: Math.floor(Math.random() * 50) + 50,
            metrixWorkmanshipScore: Math.floor(Math.random() * 50) + 50
          };
        }
      }
    } else {
      clearInterval(intervalId);
    }
  }, 100);

function getUndoneItem() {
  var undone;
  for (var i = 0; i < model.length; i++) {
    var item = model[i];
    if (!undone && !isItemDone(item)) {
      undone = item;
    }
  }
  return undone;
}

function isItemDone(item) {
  return (item.buildProgress === 100 &&
  item.unitTestProgress === 100 &&
  item.functionalTestsProgress === 100 &&
  item.metrixProgress === 100);
}

var backendStub = function($httpBackend) {
  $httpBackend.whenGET('/api/build').respond(model);
  $httpBackend.whenGET(/templates/).passThrough();
};

backendStub.$inject = ['$httpBackend'];
module.exports = backendStub;
