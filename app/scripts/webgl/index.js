var THREE = require('three');
var Stats = require('./stats');
var Utils = require('./utils');
require('./trackball');

var Emoji = require('./emoji');

var WebGL = function() {
  this.container = document.createElement('div');
  this.container.classList.add('webgl');
  document.body.appendChild( this.container );

  window.addEventListener( 'resize', this.onWindowResize.bind(this), false );

  this.initRenderer();
  this.initScene();
  this.initCamera();
  this.initLight();
  this.initMisc();

  this.emojiCtrl = new Emoji(this.scene);
  this.utilsCtrl = new Utils();

  this.initPicker();

  this.animate();
};

WebGL.prototype.initRenderer = function() {
  this.renderer = new THREE.WebGLRenderer();
  this.renderer.setPixelRatio( window.devicePixelRatio );
  this.renderer.setSize( window.innerWidth, window.innerHeight );
  this.container.appendChild( this.renderer.domElement );
};

WebGL.prototype.initScene = function() {
  this.scene = new THREE.Scene();
  this.scene.fog = new THREE.FogExp2( 0x000000, 0.0009 );
};

WebGL.prototype.initCamera = function() {
  this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 3000 );
  this.camera.position.z = 1200;
  this.scene.add(this.camera);
};

WebGL.prototype.initLight = function() {
  var light = new THREE.AmbientLight( 0x404040 ); // soft white light
  this.scene.add( light );
};

WebGL.prototype.initPicker = function() {
  this.raycaster = new THREE.Raycaster();
  this.renderer.domElement.addEventListener('click', this.onMouseClick.bind(this));
};

WebGL.prototype.initMisc = function() {
  // Trackball controls
  this.controls = new THREE.TrackballControls( this.camera );

  // Stats
  this.stats = new Stats();
  container.appendChild( this.stats.domElement );
};

WebGL.prototype.animate = function() {
  requestAnimationFrame( this.animate.bind(this) );
  this.render();

  this.stats.update();
};

WebGL.prototype.render = function() {
  this.controls.update();

  this.renderer.render( this.scene, this.camera );
};

WebGL.prototype.onWindowResize = function() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();

  this.renderer.setSize( window.innerWidth, window.innerHeight );
};

WebGL.prototype.onMouseClick = function(e) {
  e.preventDefault();

  this.raycaster.setFromCamera(this.utilsCtrl.getMouse(), this.camera);

  var intersects = this.raycaster.intersectObjects(this.emojiCtrl.getEmoji());

  if (intersects.length > 0) {
    console.log('gotcha');
  }
};

module.exports = WebGL;