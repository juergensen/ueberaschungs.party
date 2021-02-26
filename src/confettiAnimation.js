import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js'

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class ConfettiAnimation {
  constructor(scene) {
    var group = new THREE.Object3D()
    this.startY = 100
    this.endY = -100
    this.speed = 0.3
    this.xWidth = 200
    this.zWidth = 200

    const geometory = new THREE.SphereGeometry(.5);

    for (let i = 0; i < 1000; i++) {
      var mesh = new THREE.Mesh(geometory, new THREE.MeshStandardMaterial({
        color: Math.floor((Math.random()*0xFFFFFF))
      }))
      mesh.position.set(randomInt(-this.xWidth/2,this.xWidth/2), this.startY + randomInt(0, this.startY-this.endY), randomInt(-this.zWidth/2,this.zWidth/2))
      group.add(mesh)
      
    }
    scene.add(group)
    this.group = group
  }

  update() {
    for (let p = 0; p < this.group.children.length; p++) {
      let y = this.group.children[p].position.y - this.speed
      if (this.group.children[p].position.y < this.endY)
        this.group.children[p].position.set(
          randomInt(-this.xWidth/2,this.xWidth/2),
          this.startY,
          randomInt(-this.zWidth/2,this.zWidth/2)
        )
      else
        this.group.children[p].position.set(
          this.group.children[p].position.x,
          this.group.children[p].position.y - this.speed,
          this.group.children[p].position.z
        )
    }
  }
}

export { ConfettiAnimation }