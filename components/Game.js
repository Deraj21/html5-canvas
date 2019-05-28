class Game{
  constructor(w, h){
    // setup
    this.canvas = document.getElementById('game');
    this.canvas.addEventListener('keydown', e => {
      console.log('KEYDOWN EVENT: ', e)
    })
    this.ctx = this.canvas.getContext('2d')
    this.w = w
    this.h = h

    this.pacman = new Pacman(this.ctx, 100, 100, 0)

    this.gameLoop = this.gameLoop.bind(this)
  }

  gameLoop(){
    let { ctx, w, h } = this

    ctx.clearRect(0, 0, w, h)
    ctx.save()
    this.draw()
    ctx.restore()

    this.pacman.pos.x += 10
    this.pacman.changeDir((this.pacman.dir + 1) % 4) // if becomes 4, resets to 0

  }

  draw(){
    this.pacman.draw()
  }

}