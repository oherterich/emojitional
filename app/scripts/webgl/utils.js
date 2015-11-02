var THREE = require('three');

var Utils = function() {
  this.rendererElement = document.querySelector('.webgl');
  this.mouse = new THREE.Vector2();

  this.addEvents();
};

Utils.prototype.addEvents = function() {
  this.rendererElement.addEventListener( 'mousemove', this.onMouseMove.bind(this), false );
};

Utils.prototype.onMouseMove = function(e) {
  e.preventDefault();

  this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
};

Utils.prototype.getMouse = function() {
  return this.mouse;
};

module.exports = Utils;