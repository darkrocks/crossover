var d3 = require('d3');

var pieChart = function() {
  return {
    restrict: 'E',
    scope: {
      data: '=',
      width: '@'
    },
    link: function(scope, element, attrs) {
      var width = scope.width,
        height = scope.width,
        radius = Math.min(width, height) / 2;

      var color = d3.scale.ordinal()
        .range(["#eb7d3b", "#72ac4d"]);

      var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

      var labelArc = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

      var pie = d3.layout.pie()
        .sort(null)
        .value(function (d) {
          return d;
        });

      var svg = d3.select(element.find('svg')[0])
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + (width / 2 - 10) + "," + (height / 2 - 10) + ")");

      var g = svg.selectAll(".arc")
        .data(pie(scope.data))
        .enter().append("g")
        .attr("class", "arc");

      g.append("path")
        .attr("d", arc)
        .style("fill", function (d) {
          return color(d.data);
        });

      g.append("text")
        .attr("transform", function (d) {
          return "translate(" + labelArc.centroid(d) + ")";
        })
        .attr("dy", ".35em")
        .text(function (d) {
          return d.data;
        });
    },
    templateUrl: 'templates/pie-chart.html'
  };
};

module.exports = pieChart;
