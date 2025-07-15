const boxes=document.querySelectorAll('.box');
const infoText=document.querySelector('.info');
const resetBtn=document.querySelector('.reset');
const winImg=document.querySelector('.imgBox img');

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
        currentTurn=changeTurn();
        infoText.textContent=`Turn for ${currentTurn}`;
    })
})

/*************************************************************************
 * STEP 3 – Part 1
 * --------------------------------------------------
 * Define every winning combination of box indices.
 *************************************************************************/

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



