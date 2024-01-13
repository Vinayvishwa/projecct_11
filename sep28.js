let canvas= document.querySelector('canvas')

let pen= canvas.getContext('2d')
let cellSize = 50
let snakecell=[[0,0]]
let gameOver =false
let direction ='right'
let boardW =1000
let boardH =550
let count = 0;
let foodcell = generateFood()

document.addEventListener('keydown',(e)=>{
        if(e.key==='ArrowUp')
        {
            direction='up'
        }
        else if(e.key==='ArrowDown')
        {
            direction='down'
        }
        else if(e.key==='ArrowLeft')
        {
            direction='left'
        }
        else{
            direction='right'
        }
    })
function draw(){
    if(gameOver){
        pen.fillStyle='blue'
        pen.font='40px san-sarif'
        pen.fillText('game over',50,50)
        clearInterval(id)
        return;
    }
    pen.clearRect(0,0,1000,550)
for(let cell of snakecell){
    pen.fillStyle='red'
    pen.fillRect(cell[0],cell[1],cellSize,cellSize)

}
pen.fillStyle='purple'
pen.fillRect(foodcell[0],foodcell[1],cellSize,cellSize)
pen.font='40px san-sarif'
pen.fillText(`score ${count}`,70,50)
}
// draw()
function update(){
  
    let headX=snakecell[snakecell.length-1][0];
    let headY=snakecell[snakecell.length-1][1];
    let newX
    let newY
   
   if(direction==='right' )
   {
      newX=headX+cellSize
      newY=headY
      if(newX===boardW || checkMate(newX,newY)){
        gameOver=true
      }
   }
   else if(direction==='left')
   {
    newX=headX-cellSize
    newY=headY
    if(newX<0){
        gameOver=true
    }
   }
   else if(direction==='up')
   {
    newX=headX
    newY=headY-cellSize
    if(newY<0){
        gameOver=true
    }
   }
   else{
    newX=headX
    newY=headY+cellSize
    if(newY===boardH){
        gameOver=true
    }
   }
    snakecell.push([newX,newY]);
    if(newX===foodcell[0] && newY===foodcell[1]){
        foodcell = generateFood()
        count++
    }else{
        snakecell.shift();
    }
}
// update()
let id = setInterval(() => {
    draw()
    update()
},150);

function generateFood(){
    return([
        Math.round(Math.random()*(boardW-cellSize)/50)*50 ,
        Math.round(Math.random()*(boardH-cellSize)/50)*50 
    ])
}
console.log(generateFood());
// khud ko katna acchi baat nii
function checkMate(newX,newY){
    for(let item of snakecell){
        if(item[0]===newX && item[1]===newY){
            return true
        }
    }
    return false
}