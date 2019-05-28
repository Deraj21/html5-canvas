// 420 x 200 px; draws weather temps as line graph
function drawGraph() {
  // data
  let temps = [
    79, 71, 65, 58,
    55, 62, 69, 72,
  ];

  // set up canvas & context
  let canvas = document.getElementById('my-canvas');
  let ctx = canvas.getContext('2d');

  ctx.strokeRect(10, 10, 420, 200) // make encasing rect
  ctx.beginPath() // clears path
  ctx.moveTo(10 + (0*60), 210 - temps.shift()) // like picking up pencil to move to starting position
  
  let i = 1
  while(temps[0]){
    let x = 10 + (i*60),
        y = 210 - temps.shift()
    ctx.lineTo(x, y) // makes line from prev position to this one
    temps[0] ? ctx.arc(x, y, 2, 0, Math.PI * 2, true) : i
    i++
  }
  
  ctx.stroke() // 'strokes' all the lines made so far
  
}

// 200 x 200 px; draws pie graph
function drawPie(){
  // data
  let percents = [ .10, .20, .50, .09, .07, .04 ];
  let colors = [ 'blue', 'orange', 'purple', 'yellow', 'green', 'red', 'blueviolet', 'pink', 'olivedrab' ];
  // check if percents add up
  if (percents.reduce((total, val) => total + val, 0 ) !== 1){
    console.log('ERROR: percents do not equal 100!')
  }
  
  // set up canvas & context
  let canvas = document.getElementById('my-canvas');
  let ctx = canvas.getContext('2d');
  let end = 0

  // draw each percent arc, and fill it in
  percents.map((val, i, arr) => {
    ctx.beginPath() // start new path so each wedge has it's own fill color
    
    let start = end
    end += Math.PI * 2 * val
    ctx.arc(110, 110, 100, start, end, false) // (x, y, r, startAngle, endAngle, clackwise)
    ctx.lineTo(110, 110)
    
    ctx.fillStyle = colors.shift() // next color
    ctx.fill() // fills current 'path'
    ctx.stroke()
  })

}