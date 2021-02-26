import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js'

class DiscoAnimation {
  constructor(scene, position = {x:0,y:0,z:0}) {
    var group = new THREE.Object3D();

    var radius = 5;
    let pointRadius = .2
    var separation = 10;
    let count = 0
    for ( var s = 0; s <= 180; s+=separation ) {
      var radianS = s*Math.PI / 180;
      var pZ = radius * Math.cos(radianS);

      for ( var t = 0; t < 360; t+=separation ) {
        count++
        var radianT = t*Math.PI / 180;

        var pX = radius* Math.sin(radianS) * Math.cos(radianT);
        var pY = radius* Math.sin(radianS) * Math.sin(radianT);

        var geometory = new THREE.SphereGeometry(pointRadius);
        var material = new THREE.MeshStandardMaterial({
          color: Math.floor((Math.random()*0xFFFFFF))
        });
        var mesh = new THREE.Mesh(geometory, material);
        mesh.position.x = pX;
        mesh.position.y = pY;
        mesh.position.z = pZ;
        group.add(mesh);
      }
    }
    group.rotation.x += 90 * Math.PI/180
    group.position.set(0,100,0)
    let pos = {...group.position}
    const update = (o) => {
      group.position.set(pos.x, pos.y, pos.z)
    }
    let tween = new TWEEN.Tween(pos)
      .to({
        x:0,
        y:0,
        z:0,
        ...position
      }, 4000)
      .easing(TWEEN.Easing.Sinusoidal.Out)
      .onUpdate(update)
      .start()

    scene.add(group)
    this.group = group
  }

  update() {
    this.group.rotation.z += 0.01
  }
}

export { DiscoAnimation }