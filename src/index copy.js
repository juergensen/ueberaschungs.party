import * as THREE from 'three';

const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.z = 100;

const scene = new THREE.Scene();

//model
const font = new THREE.Font(require('./fonts/helvetiker_regular.typeface.json'))
const cube = new THREE.Mesh(
  new THREE.TextGeometry('Happy Birthday', {
    font: font,
    size: 10,
    height: 1
  }),
  new THREE.MeshStandardMaterial( { color: 0xffffff } )
)
cube.geometry.center()
cube.receiveShadow = true;
cube.castShadow = true;
scene.add( cube );


const plane = new THREE.Mesh( new THREE.PlaneGeometry( 1000, 1000 ), new THREE.MeshStandardMaterial( {color: 0xffffff, side: THREE.DoubleSide} ) );
plane.position.set(0,-30,0)
plane.rotation.x = 90 * Math.PI/180
plane.receiveShadow = true;
scene.add( plane );

const sphere = new THREE.SphereGeometry( 1, 16, 8 );

//lights

const light1 = new THREE.PointLight( 0xff0040, 2, 70 );
light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
light1.castShadow = true;
scene.add( light1 );

const light2 = new THREE.PointLight( 0x0040ff, 2, 50 );
light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0040ff } ) ) );
light2.castShadow = true;
scene.add( light2 );

const light3 = new THREE.PointLight( 0x80ff80, 2, 50 );
light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x80ff80 } ) ) );
light3.castShadow = true;
scene.add( light3 );

const light4 = new THREE.PointLight( 0xffaa00, 2, 50 );
light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) ) );
light4.castShadow = true;
scene.add( light4 );

//renderer

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
document.body.appendChild( renderer.domElement );

window.addEventListener( 'resize', onWindowResize );

animate();

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

  requestAnimationFrame( animate );

  render();

}

function render() {

  const time = Date.now() * 0.0005;

  light1.position.x = Math.sin( time * 0.7 ) * 50;
  light1.position.y = Math.cos( time * 0.5 ) * 25;
  light1.position.z = Math.cos( time * 0.3 ) * 30;

  light2.position.x = Math.cos( time * 0.3 ) * 50;
  light2.position.y = Math.sin( time * 0.5 ) * 25;
  light2.position.z = Math.sin( time * 0.7 ) * 30;

  light3.position.x = Math.sin( time * 0.7 ) * 50;
  light3.position.y = Math.cos( time * 0.3 ) * 25;
  light3.position.z = Math.sin( time * 0.5 ) * 30;

  light4.position.x = Math.sin( time * 0.3 ) * 50;
  light4.position.y = Math.cos( time * 0.7 ) * 25;
  light4.position.z = Math.sin( time * 0.5 ) * 30;
    
  renderer.render( scene, camera );

}