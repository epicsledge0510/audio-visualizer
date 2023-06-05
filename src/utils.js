// Why are the all of these ES6 Arrow functions instead of regular JS functions?
// No particular reason, actually, just that it's good for you to get used to this syntax
// For Project 2 - any code added here MUST also use arrow function syntax

const makeColor = (red, green, blue, alpha = 1) => {
    return `rgba(${red},${green},${blue},${alpha})`;
  };
  

  
  const goFullscreen = (element) => {
      if (element.requestFullscreen) {
          element.requestFullscreen();
      } else if (element.mozRequestFullscreen) {
          element.mozRequestFullscreen();
      } else if (element.mozRequestFullScreen) { // camel-cased 'S' was changed to 's' in spec
          element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
      }
      // .. and do nothing if the method is not supported
  };
  
  export {makeColor, goFullscreen};
  