const Ramp = require('ramp.js')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const resize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize()

const randomBetween = (a,b) => {
  return Math.floor(Math.random() * b) + a
}

class TextAnimation {
  constructor({text, startX, startY, targetX, targetY, color}) {
    this.text = text
    this.startX = startX
    this.startY = startY
    this.targetX = targetX
    this.targetY = targetY
    this.color = color
    
    this.x = new Ramp(this.startX)
    this.y = new Ramp(this.startY)
    this.goUp = false

    this.x.go(this.targetX-randomBetween(5, 10), randomBetween(1200, 1400), 'QUADRATIC_OUT')
    this.y.go(this.targetY-randomBetween(5, 10), randomBetween(1200, 1400), 'QUADRATIC_OUT')
  }
  draw() {
    if (this.x.isFinished() && this.y.isFinished()) {
      console.log('paused');
      if (this.goUp) {
        this.y.go(this.targetY-randomBetween(5, 10), randomBetween(1200, 1400), 'QUADRATIC_INOUT')
      } else {
        this.y.go(this.targetY+randomBetween(5, 10), randomBetween(1200, 1400), 'QUADRATIC_INOUT')
      }
      this.goUp = !this.goUp
    }
    ctx.fillStyle = this.color
    ctx.fillText(this.text, this.x.update(), this.y.update());
  }
}
class ConfettiAnimation {
  constructor({direction = 'TOP', confettiCount = 10}) {
    this.direction = direction
    this.confettiParts = []
    for (let i = 0; i < confettiCount; i++) {
      let x, y
      let color = `hsl(${randomBetween(0, 360)}, 100%, 50%)`
      let size = randomBetween(10, 20)
      let angle = randomBetween(0, Math.PI*2)
      if (this.direction == 'TOP') {
        x = randomBetween(0, canvas.width)
        y = randomBetween(-50, -canvas.height)
      }
      this.confettiParts.push({x, y, color, size, angle})
    }
  }
  draw() {
    for (let i = 0; i < this.confettiParts.length; i++) {
      ctx.fillStyle = this.confettiParts[i].color;
      ctx.fillRect(this.confettiParts[i].x, this.confettiParts[i].y, this.confettiParts[i].size, this.confettiParts[i].size)
      this.confettiParts[i].y += randomBetween(1, 4)
      if (this.direction = 'TOP' && this.confettiParts[i].y >= canvas.height+50) this.confettiParts[i].y = -50
    }
  }
}

const objects = [new ConfettiAnimation({ direction: 'TOP', confettiCount: 1000 })]

const createText = ({text = '', targetX, targetY}) => {
  const textArray = text.split('')

  let currentOffset = (-(ctx.measureText(text).width) + 5*(textArray.length-1))/2
  for (let i = 0; i < textArray.length; i++) {
    objects.push(new TextAnimation({
        text: textArray[i],
        startX: canvas.width/2, startY: canvas.height+30,
        targetX: targetX + (currentOffset),
        targetY: targetY,
        color: `hsl(${randomBetween(0, 360)}, 100%, 35%)`
    }))
    currentOffset += ctx.measureText(textArray[i]).width + 5
    console.log(currentOffset);
  }
}

ctx.font = '600 50px Arial';

createText({ text: 'Happy Birthday', targetX: canvas.width/2, targetY: canvas.height/3-100  })
createText({ text: 'Tim Döscher', targetX: canvas.width/2, targetY: canvas.height/3  })
createText({ text: 'Vom TG19', targetX: canvas.width/2, targetY: canvas.height-100  })

const animationLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < objects.length; i++) {
    objects[i].draw()    
  }
  window.requestAnimationFrame(animationLoop)
}
animationLoop()
