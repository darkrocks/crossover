var Chart = require('chart.js');

var pieChart = function() {
  return {
    restrict: 'EA',
    scope: {
      data: '=',
      width: '@'
    },
    link: function (scope, element, attrs) {
      refresh();

      scope.$watchCollection('data', refresh);
      scope.$watchCollection('width', refresh);

      function refresh() {
        if (!scope.data) return;

        scope.style = {
          width: scope.width + 'px',
          height: scope.width + 'px'
        };

        var canvas = element.find('canvas')[0];
        var ctx = canvas.getContext('2d');

        var data = [
          {
            value: scope.data[0],
            color: '#eb7d3b',
            highlight: '#eb7d3b',
            label: 'passed'
          },
          {
            value: scope.data[1],
            color: '#72ac4d',
            highlight: '#72ac4d',
            label: 'failed'
          }
        ];

        new Chart(ctx).Pie(data);
      }

    },
    templateUrl: 'templates/pie-chart.html'
  };
};

module.exports = pieChart;
