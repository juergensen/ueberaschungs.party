import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js'

class TextAnimation {
  constructor(scene, text = 'LUL', targetPosition = { x: 0, y: 0, z: 0}, textSize = 4, animated = true, sweep = 2) {
    this.scene = scene
    this.text = text
    this.targetPosition = targetPosition
    this.textSize = textSize
    this.animated = animated
    this.sweep = sweep

    var group = new THREE.Object3D()

    this.font = new THREE.Font(require('./fonts/helvetiker_regular.typeface.json'))
    this.letters = []
    let totalWidth = 0
    let totalGeometry = new THREE.TextGeometry(this.text, {
      font: this.font,
      size: this.textSize,
      height: .5
    })
    totalGeometry.computeBoundingBox()
    totalWidth = totalGeometry.boundingBox.max.x - totalGeometry.boundingBox.min.x

    let xOffset = -totalWidth/2
    text.split('').forEach((t, index) => {
      if (!t.replace(/\s/g, '').length) {
        xOffset += this.textSize
        return
      }
      let mesh = new THREE.Mesh(
        new THREE.TextGeometry(t, {
          font: this.font,
          size: 4,
          height: .5
        }),
        new THREE.MeshStandardMaterial( {
          color: Math.floor((Math.random()*0xFFFFFF)),
          side: THREE.DoubleSide
        })
      )
      group.add(mesh)
      mesh.position.set(0, -100, -20)
      const target = {
        ...targetPosition,
        x: (targetPosition.x || 0) + xOffset,
      }
      
      let position = {
        x: mesh.position.getComponent(0),
        y: mesh.position.getComponent(1),
        z: mesh.position.getComponent(2),
      }
      const update = (o) => {
        mesh.position.set(position.x, position.y, position.z)
      }
      let tweenInit = new TWEEN.Tween(position)
        .to({...target, y: target.y+this.sweep}, 2000 + (index*100))
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .onUpdate(update)
        .onComplete(() => {
          if (this.animated) {
            let tween = new TWEEN.Tween(position)
              .to({...target, y: target.y-this.sweep}, 1000)
              .easing(TWEEN.Easing.Sinusoidal.InOut)
              .onUpdate(update)
      
            let tweenBack = new TWEEN.Tween(position)
              .to({...target, y: target.y+this.sweep}, 1000)
              .easing(TWEEN.Easing.Sinusoidal.InOut)
              .onUpdate(update)
      
            tween.chain(tweenBack)
            tweenBack.chain(tween)
      
            tween.start()
          }
        })
      tweenInit.start()
        
      mesh.geometry.computeBoundingBox()
      xOffset += mesh.geometry.boundingBox.max.x - mesh.geometry.boundingBox.min.x + 1

      this.letters.push({
        mesh
      })
    })
    this.scene.add(group)
    this.group = group
  }

  hide() {
    this.group.rotateY(Math.PI)
    this.group.position.add(new THREE.Vector3(0,0,100))
  }
}

export { TextAnimation }