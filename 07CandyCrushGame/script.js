 document.addEventListener("DOMContentLoaded", () => {
    const space = document.querySelector(".space");
    const width = 8;
    const candyImages = ['./Images/candy1.png', './Images/candy2.png', './Images/firstcan.png', './Images/lollipop.png']

    let squares = [];
    const totalScore = document.querySelector('h4 span');
    const totalMove = document.querySelector('.move h2');
    const block = document.querySelector('.block2');
    const blockImage = document.querySelector('.block2 img');
    const blockH1 = document.querySelector('.block2 h1');
    const live = document.querySelector('h3 .span1');
    const button = document.querySelector('button');
    let move = 20;
    let flag = 0;
    let score = 0;
    let health =3;
    let moveChecker = 0;
    function createBox() {
        for (let i = 0; i < width * width; i++) {
            const box = document.createElement("div");
            box.setAttribute("draggable", true);
            box.setAttribute("id", i);
            let randomImage = Math.floor(Math.random() * candyImages.length);
            box.style.backgroundImage = `url(${candyImages[randomImage]})`;
            space.appendChild(box);
            squares.push(box);
        }
    }

    createBox();

    let imageDrag;
    let imageReplace;
    let boxIdDrag;
    let boxIdReplace;

    squares.forEach((box) => box.addEventListener("dragstart", dragStart));
    squares.forEach((box) => box.addEventListener("dragend", dragEnd));
    squares.forEach((box) => box.addEventListener("dragover", dragOver));
    squares.forEach((box) => box.addEventListener("dragenter", dragEnter));
    squares.forEach((box) => box.addEventListener("dragleave", dragLeave));
    squares.forEach((box) => box.addEventListener("drop", dragDrop));

    function dragStart() {
        imageDrag = this.style.backgroundImage;
        boxIdDrag = parseInt(this.id);
        flag = 1;
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
    }

    function dragLeave() {}

    function dragDrop() {
        imageReplace = this.style.backgroundImage;
        boxIdReplace = parseInt(this.id);
        squares[boxIdDrag].style.backgroundImage = imageReplace;
        squares[boxIdReplace].style.backgroundImage = imageDrag;
    }

    function dragEnd() {
        let validMoves = [
            boxIdDrag - 1,
            boxIdDrag + 1,
            boxIdDrag - width,
            boxIdDrag + width,
        ];

        let validMove = validMoves.includes(boxIdReplace);

        if (boxIdReplace && validMove) {
            boxIdReplace = null;
            move--;
            if(move === 0){
              move = 20
              moveChecker = 1
            }
            totalMove.innerText = move;
            if(moveChecker == 1){
              health--
              live.innerHTML = health
              moveChecker = 0
             }
             if(health === 0){
              space.style.visibility = "hidden"
                 block.style.visibility = "visible"
                 blockImage.src = "https://media.tenor.com/gZAyNLChQqEAAAAC/sad.gif"
                 blockH1.innerHTML = "YOU LOSE"
                 health += 3
                 live.innerHTML = 3
             }
            
            console.log(move);
        } else if (boxIdReplace && !validMove) {
            squares[boxIdReplace].style.backgroundImage = imageReplace;
            squares[boxIdDrag].style.backgroundImage = imageDrag;
        } else {
            squares[boxIdDrag].style.backgroundImage = imageDrag;
        }
    }

    function matchCandy() {
        for (let i = 0; i < width * width; i++) {
            const notAllowedcandys = [7, 15, 23, 31, 39, 47, 55];
            const notAllowedcandy = notAllowedcandys.includes(i);
            if (!(
                notAllowedcandy &&
                squares[i].style.backgroundImage ===
                squares[i + 1].style.backgroundImage
            )) {
                let a = squares[i].style.backgroundImage;
                let b = squares[i + 1] ? squares[i + 1].style.backgroundImage : null;
                let c = squares[i + 2] ? squares[i + 2].style.backgroundImage : null;
                let d = squares[i + width] ? squares[i + width].style.backgroundImage : null;
                let f = squares[i + width * 2] ? squares[i + width * 2].style.backgroundImage : null;
                let g = squares[i + 3] ? squares[i + 3].style.backgroundImage : null;
                let h = squares[i + width * 3] ? squares[i + width * 3].style.backgroundImage : null;
                if (a === b && a === c && a === g) {
                    squares[i].style.backgroundImage = "";
                    squares[i + 1].style.backgroundImage = "";
                    squares[i + 2].style.backgroundImage = "";
                    squares[i + 3].style.backgroundImage = "";
                } else if (a === d && a === f && a === h) {
                    squares[i].style.backgroundImage = "";
                    squares[i + width].style.backgroundImage = "";
                    squares[i + width * 2].style.backgroundImage = "";
                    squares[i + width * 3].style.backgroundImage = "";
                } else if (a === b && a === c) {
                    squares[i].style.backgroundImage = "";
                    squares[i + 1].style.backgroundImage = "";
                    squares[i + 2].style.backgroundImage = "";
                } else if (a === d && a === f) {
                    squares[i].style.backgroundImage = "";
                    squares[i + width].style.backgroundImage = "";
                    squares[i + width + width].style.backgroundImage = "";
                }
            }
        }
    }

    function moveDown() {
        for (let i = 0; i < 56; i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
            const firstRowElem = firstRow.includes(i);
            if (squares[i + width].style.backgroundImage === "") {
                squares[i + width].style.backgroundImage = squares[i].style.backgroundImage;
                squares[i].style.backgroundImage = "";
            }
            if (firstRowElem && squares[i].style.backgroundImage === "") {
                let randomImage = Math.floor(Math.random() * candyImages.length);
                squares[i].style.backgroundImage = `url(${candyImages[randomImage]})`;
            }
        }
    }

    function calScore() {
        for (let i = 0; i < width * width; i++) {
            if (flag === 1 && squares[i].style.backgroundImage === "") {
                score++;
                if(score === 0){
                  totalScore.innerText = "0000"
                } else if(score >= 1 && score <= 9 ){
                   totalScore.innerText = `000${score}`
                }else if(score >= 10 && score <= 99){
                  totalScore.innerText = `00${score}`
               }else if(score >= 100 && score <= 999){
                totalScore.innerText = `0${score}`
             }else if(score >= 1000 && score <= 9999){
              totalScore.innerText = score
           }
            
           
            }
            if(score === 1500 ){
              space.style.visibility = "hidden"
              block.style.visibility = "visible"
              blockImage.src = "https://media1.tenor.com/images/92a51564b3be9252511ad8f6c095d420/tenor.gif?itemid=15728766"
              blockH1.innerHTML = "YOU WIN"
              health = 3
              live.innerHTML = 3
              move = 20
              totalMove.innerHTML = 20
             }
        }
        
    }
     

   button.addEventListener("click", () => {
    block.style.visibility = "hidden"
    space.style.visibility = "visible"
    health = 3
    move = 20
    score = 0
    totalScore.innerHTML = "0000"
    totalMove.innerHTML = 20
   })

    window.setInterval(function () {
        matchCandy();
        moveDown();
        calScore();
    }, 100);
});
