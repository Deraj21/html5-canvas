class Pacman {
  constructor(ctx, x, y, dir) {
    this.ctx = ctx
    this.pos = {
      x: x,
      y: y
    }
    this.dir = dir // 0=R 1=D 2=L 3=U
  }

  // draws pacman
  draw(){
    let { ctx, pos, dir } = this
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
    let start = (this.dir * Math.PI * .5) + (Math.PI * .25)
    let end = start + (Math.PI * 1.5)
    ctx.arc(pos.x, pos.y, 50, start, end, false) // (x, y, r, startAngle, endAngle, clockwise)
    ctx.lineTo(pos.x, pos.y)
    
    ctx.fillStyle = 'yellow'
    ctx.fill()
    ctx.stroke()
  }

  // changes direction of the pacman
  changeDir(dir){
    this.dir = dir
  }

}
