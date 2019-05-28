/**
 * AUTHOR: Jared Tanner
 * PURPOSE: Super simple pacman -> move the Pacman around with WASD; collision detection with walls; possibly collect dots, w/ score at top?
 * CURRENT OBJECTIVES: Make pacman start in middle; make letters yellow, with black outline; make letters edible once the player eats all the dots
**/

/////////
// Dot //
/////////
class Dot {
  constructor(ctx, x, y){
    this.ctx = ctx
    this.pos = { x, y }
  }

  randomPos(w, h){
    this.pos.x = Math.floor(Math.random() * (w - 10) + 5)
    this.pos.y = Math.floor(Math.random() * (h - 10) + 5)
  }

  draw(){
    let { ctx, pos } = this;
    let { x, y } = pos

    ctx.beginPath()
    ctx.arc(x, y, 5, 0, (Math.PI * 2), false)
    ctx.fillStyle = 'yellow'
    ctx.fill()
    ctx.stroke()
  }
}

////////////
// Pacman //
////////////
class Pacman {
  constructor(ctx, x, y, dir) {
    this.ctx = ctx
    this.pos = { x, y }
    this.dir = dir // 0=R 1=D 2=L 3=U
    this.angle = 0
    this.isClosing = true
  }

  updateAngle(){
    const CHANGE = 1/32
    let { isClosing, angle } = this

    this.angle = isClosing ? angle - CHANGE : angle + CHANGE

    if ( 2 * this.angle <= -.5 || 2 * this.angle >= .25 ){
      this.isClosing = !isClosing
    }

  }

  // draws pacman
  draw(){
    let { ctx, pos, dir, angle } = this

    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)

    let start = (dir * Math.PI * .5) + (Math.PI * (.25 + angle))
    let end = start + (Math.PI * 1.5) - (2 * Math.PI * angle)
    ctx.arc(pos.x, pos.y, 50, start, end, false) // (x, y, r, startAngle, endAngle, clockwise)

    ctx.lineTo(pos.x, pos.y)
    
    ctx.fillStyle = 'yellow'
    ctx.fill()
    ctx.stroke()
  }

  updatePos(w, h){
    let { dir, pos } = this

    switch(dir){
      case 0:
        pos.x = pos.x + 5 < w - 50 ? pos.x + 5 : w - 50
        return
      case 1:
        pos.y = pos.y + 5 < h - 50 ? pos.y + 5 : h - 50
        return
      case 2:
        pos.x = pos.x - 5 > 50 ? pos.x - 5 : 50
        return
      case 3:
        pos.y = pos.y - 5 > 50 ? pos.y - 5 : 50
        return
      default:
        console.log(`ERROR: invalid direction ${dir}`)
        return
    }
  }

  // changes direction of the pacman
  changeDir(dir){
    this.dir = dir
  }

}


/////////
// Game
/////////
class Game{
  constructor(ctx, w, h){
    // setup
    this.ctx = ctx
    this.w = w
    this.h = h
    this.points = 0
    
    window.addEventListener('keydown', e => {
      this.handleKeyDown(e)
    })
    
    this.pacman = new Pacman(this.ctx, w/2, h/2, 0)
    this.dots = []
    for (let i = 0; i < 1000; i++){ // fill with (10) rondom dots
      let dot = new Dot(this.ctx, 0, 0)
      dot.randomPos(w, h)
      this.dots.push(dot)
    }

    this.gameLoop = this.gameLoop.bind(this)
  }

  handleKeyDown(e){
    let { keyCode } = e;
    let { pacman } = this;
    switch(keyCode){
      case 38:
      case 87: // w
        pacman.changeDir(3)
        return
      case 37:
      case 65: // a
        pacman.changeDir(2)
        return
      case 40:
      case 83: // s
        pacman.changeDir(1)
        return
      case 39:
      case 68: // d
        pacman.changeDir(0)
        return
      default:
        console.log(`ERROR: key #${keyCode} not recognized`)
        return
    }
  }

  handleDotCollision(){
    const WIDTH = 46
    let { dots, pacman } = this
    let collideX = x => x < pacman.pos.x + WIDTH && x > pacman.pos.x - WIDTH
    let collideY = y => y < pacman.pos.y + WIDTH && y > pacman.pos.y - WIDTH

    dots.map((dot, i) => {
      // if dot colides with pacman
      if (collideX(dot.pos.x) && collideY(dot.pos.y)){
        let eaten = this.dots.splice(i, 1)
        this.points++
      }
    })
  }

  gameLoop(){
    let { ctx, w, h, pacman } = this

    ctx.clearRect(0, 0, w, h)
    ctx.save()
    this.draw()
    ctx.restore()

    pacman.updatePos(w, h)
    pacman.updateAngle()
    this.handleDotCollision()
    
    window.requestAnimationFrame(this.gameLoop)
  }

  draw(){
    let { dots, pacman, points, ctx } = this
    
    // POINTS text 
    ctx.font = "48px serif"
    ctx.fillStyle = "yellow"
    ctx.fillText(`POINTS: ${points}`, 30, 45)
    ctx.strokeText(`POINTS: ${points}`, 30, 45)
    
    dots.map(dot => dot.draw())
    pacman.draw()

  }

}


function start(){
  let canvas = document.getElementById('game');
  let ctx = canvas.getContext('2d')
  
  let game = new Game(ctx, 800, 600)

  window.requestAnimationFrame(game.gameLoop)
}

