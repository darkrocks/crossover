var ROW_NORMAL_HEIGHT = 49;
var ROW_EXPANDED_HEIGHT = 200;


function startAnimation (element, finalHeight, expand, done) {
  var step = 0;
  var iteration = 0;
  var intervalId = window.setInterval(function () {
    iteration++;
    var currentHeight = element[0].offsetHeight;

    if (expand && currentHeight < finalHeight) {
      if (iteration % 3 === 0) {
        step++;
      }

      if (currentHeight + step > finalHeight) {
        step = finalHeight - currentHeight;
      }
      currentHeight = currentHeight + step;

      element.css('height', currentHeight + 'px');
      return;
    }

    if (!expand && currentHeight > finalHeight) {
      if (iteration % 3 === 0) {
        step++;
      }

      if (currentHeight - step < finalHeight) {
        step =  currentHeight - finalHeight;
      }
      currentHeight = currentHeight - step;

      element.css('height', currentHeight + 'px');
      return;
    }

    clearInterval(intervalId);
    done();
  }, 1);

  return intervalId;
}

var expandAnimation = function() {
  return {
    addClass: function(element, className, done) {
      var intervalId = startAnimation(element, ROW_EXPANDED_HEIGHT, true, done);

      return function(isCancelled) {
        if(isCancelled) {
          clearInterval(intervalId);
        }
      };
      // do some cool animation and call the doneFn
    },
    removeClass: function(element, className, done) {
      var intervalId = startAnimation(element, ROW_NORMAL_HEIGHT, false, done);

      return function(isCancelled) {
        if(isCancelled) {
          clearInterval(intervalId);
        }
      };
    }
  };
};

module.exports = expandAnimation;
