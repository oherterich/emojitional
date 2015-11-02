var THREE = require('three');

var Emoji = function(scene) {
  this.numParticles = 100;
  this.emojiImages = [];
  this.emojiObjects = [];

  this.createImageArray();
  this.initEmojiObjects(scene);
};

Emoji.prototype.createImageArray = function() {
  for (var i = 0; i < this.numParticles; i++) {
    var url = '../../images/emoji/emoji-' + i + '.png';
    this.emojiImages.push(url);
  }
};

Emoji.prototype.initEmojiObjects = function(scene) {
  var loader = new THREE.TextureLoader();
  var numParticles = 100;

  this.emojiImages.forEach(function(emojiImage, index) {
    loader.load(emojiImage, function(texture) {
      var vector = new THREE.Vector3();

      var phi = Math.acos( -1 + ( 2 * index ) / this.numParticles );
      var theta = Math.sqrt( this.numParticles * Math.PI ) * phi;

      vector.x = 500 * Math.cos( theta ) * Math.sin( phi );
      vector.y = 500 * Math.sin( theta ) * Math.sin( phi );
      vector.z = 500 * Math.cos( phi );

      var geometry = new THREE.PlaneGeometry(64, 64);
      var material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true } );
      var plane = new THREE.Mesh( geometry, material );
      plane.position.x = vector.x;
      plane.position.y = vector.y;
      plane.position.z = vector.z;

      vector.copy( plane.position ).multiplyScalar( 2 );
      plane.lookAt( vector );

      scene.add( plane );
      this.emojiObjects.push(plane);
    }.bind(this));
  }.bind(this));
};

Emoji.prototype.getEmoji = function() {
  return this.emojiObjects;
};

module.exports = Emoji;