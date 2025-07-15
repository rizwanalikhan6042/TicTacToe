const boxes=document.querySelectorAll('.box');
const infoText=document.querySelector('.info');
const resetBtn=document.querySelector('#reset');
const winImg=document.querySelector('.imgBox img');
const winSound = new Audio('./sound/game-over-deep-male-voice-clip-352695.mp3');
const clickSound = new Audio('./sound/game-start-317318.mp3');


let currentTurn = 'X';
let isGameActive=true;

function changeTurn(){
    return currentTurn==='X'?'O':'X';
}

infoText.textContent=`Turn For${currentTurn}`;

boxes.forEach(box=>{
    box.addEventListener('click',()=>{
        if(box.textContent!==''|| !isGameActive ){
            return;
        }
        box.textContent=currentTurn;
       clickSound.currentTime = 0; 
        clickSound.play();   
        checkGameState(currentTurn);
        if(!isGameActive) return;
        currentTurn=changeTurn();
        infoText.textContent=`Turn for ${currentTurn}`;
    })
})
// /define winning patterns/

const winPatterns = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // main diagonal
  [2, 4, 6]  // anti‑diagonal
];

function checkGameState(mark){
    var winfound=false;
    winPatterns.forEach(function(pattern){
        var a=pattern[0];
        var b=pattern[1];
        var c=pattern[2];
        if(boxes[a].textContent===mark&&
            boxes[b].textContent===mark&&
            boxes[c].textContent===mark
        ){
            winfound=true;
            
           boxes[a].classList.add('winner');
           boxes[b].classList.add('winner');
           boxes[c].classList.add('winner');
        }

    })
    if(winfound){
        isGameActive=false;
           infoText.textContent=mark+'  wins 🎉';

        winImg.classList.add('active');
        winSound.currentTime = 0;
        winSound.play();  
        return;
    }

    var boardFull=true;
    boxes.forEach(function(box){
        if(box.textContent===''){
            boardFull=false;
        }
    })

    if(boardFull){
      isGameActive=false;
      infoText.textContent="It's a draw 🤝";
    }

}

resetBtn.addEventListener('click', function () {
  // 1) Empty all boxes and remove 'winner' class
  boxes.forEach(function (box) {
    box.textContent = '';
    box.classList.remove('winner');
  });

  // 2) Reset turn and game state
  currentTurn = 'X';
  isGameActive = true;

  // 3) Reset banner text
  infoText.textContent = 'Turn for ' + currentTurn;

  // 4) Hide GIF if visible
  winImg.classList.remove('active');
});

