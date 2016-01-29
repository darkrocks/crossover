var angular = require('angular');
require('angular-mocks');

var LandingController = require('./landing/LandingController');
var dataService = require('./dataService');
var backendStub = require('./backendStub');
var buildRow = require('./components/buildRow/buildRow');
var progressBar = require('./components/progressBar/progressBar');

var app = angular.module('app', ['ngMockE2E']);
app.run(backendStub);

app.controller('LandingController', LandingController);
app.factory('dataService', dataService);
app.directive('buildRow', buildRow);
app.directive('progressBar', progressBar);
