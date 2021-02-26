import * as THREE from 'three';
import { OrbitControls } from './lib/OrbitControls'
import { TextAnimation } from './textAnimation'
import { DiscoAnimation } from './discoAnimation'
import { ConfettiAnimation } from './confettiAnimation'

import TWEEN from '@tweenjs/tween.js'

const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );

const scene = new THREE.Scene();

// ambian light
const ambientLight = new THREE.AmbientLight( 0xffffff ); // soft white light
scene.add( ambientLight )

// background
const backgroundPlane = new THREE.Mesh( new THREE.BoxGeometry( 200, 200, 200 ), new THREE.MeshStandardMaterial( {color: 0xffffff, side: THREE.DoubleSide} ) )
backgroundPlane.receiveShadow = true
backgroundPlane.geometry.center()
// backgroundPlane.position.set(0,0,-110)
scene.add( backgroundPlane )

// Happy Birthday
new TextAnimation(scene, 'Happy Birthday', {x:0,y:15,z:0})
let name = location.search.substr(1).replace(/%20/g, ' ')
const by = new TextAnimation(scene, 'von Momme <3', {x:0,y:-40,z:0}, 4, true, 1)
if (name === '') {
  name = 'Merlin'
} else by.hide()
new TextAnimation(scene, name, {x:0,y:0,z:0})

// disco
const disco = new DiscoAnimation(scene, {y:35})

// confetti
const confetti = new ConfettiAnimation(scene)

//renderer
const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
document.body.appendChild( renderer.domElement );

window.addEventListener( 'resize', onWindowResize );

const controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = false
controls.enableRotate = true
controls.enableZoom = false
camera.position.set( 0, 0, 100 );
controls.update();

update();

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function update() {
  requestAnimationFrame( update );
  TWEEN.update()
  disco.update()
  confetti.update()
  render();
}

function render() {
  controls.update();

  renderer.render( scene, camera );

}