let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let cnt=0;

const winPatterns = [
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [3,4,5],
  [6,7,8],
];


boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if(turnO){
      box.innerText = "O";
      box.style.backgroundColor = "#cdf1c6ff";
      box.style.color = "white";
      turnO=false;
    }else{
      box.innerText="X";
      box.style.backgroundColor = "#f87082ff";
      box.style.color = "white";
      turnO=true;
    }
    box.disabled=true;
    cnt++;
    
    let isWinner = checkWinner();
    if(cnt === 9 && !isWinner){
      gameDraw();
    }
  });
});


const resetGame = () => {
  turnO = true;
  cnt=0;
  enableboxes();
  msgContainer.classList.add("hide");
};


const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableboxes();
};

const disableboxes = () => {
  for(let box of boxes){
    box.disabled = true;
  }
};

const enableboxes = () => {
  for(let box of boxes){
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "";
  }
};

const showWinner = (winner) => {
  msg.innerText=`Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableboxes();

};

const checkWinner = () => {
  for(let pattern of winPatterns){
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if(pos1val != "" && pos2val != "" && pos3val != ""){
      if(pos1val === pos2val && pos2val === pos3val){
        showWinner(pos1val);
        return true;
      }
      
    }
  }
};

newGameBtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);