let draggingCard = null;
let dragOverCard = null;
let songNo = 0;



// 카드 이벤트
function 드래깅시작() {
    draggingCard = this;
    this.classList.add('draggingCard');
}
function 드래깅끝(ev) {
    ev.preventDefault();
    draggingCard = null;
    
    this.classList.remove('draggingCard');

    if(dragOverCard) {
        dragOverCard.classList.remove('overCard');
        dragOverCard = null;
    }
}
function 카드위에올라감(ev) {
    ev.preventDefault();
    dragOverCard = this;
    this.classList.add('overCard')
}
function 카드위에서벗어남(ev) {
    ev.preventDefault();
    dragOverCard = null;
    this.classList.remove('overCard');
}

//========================================================================
// 카드가 박스위에 올라갔을 때
function 박스위에올라감(ev) {
    ev.preventDefault();
    this.classList.add('overBox');
}
function 박스위에서벗어남(ev) {
    ev.preventDefault();
    this.classList.remove('overBox');
}
function 카드를놓았음(ev) {
    ev.preventDefault();

    // 카드 위에서 놓았을 떄
    if(dragOverCard) {
        this.insertBefore(draggingCard, dragOverCard);
    // 박스 위에서 놓았을 때
    } else {
        this.appendChild(draggingCard);
    }
    this.classList.remove('overBox');
}


//============================================================
//배열 순서 섞기
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

//문제 + 카드추가
function 문제추가() {
    let p = document.getElementsByClassName('word')[0];
    p.innerHTML = song.bear[songNo].kor;
}

function 카드추가() {
    let wordArray = song.bear[songNo].eng.split(" ");
    shuffle(wordArray);
    let box = document.querySelector('.box');
    let cardHTML = "";
    let count = 1;

    for(let word of wordArray) {
        cardHTML += `<div number="${count++}" draggable="true" class="card">
        ${word}</div>`
    }

    box.innerHTML = cardHTML;
}




window.onload = function() {
    문제추가()
    카드추가()
    
    
    let card = document.querySelectorAll('.card');
    for(let cards of card) {
        cards.addEventListener('dragstart',드래깅시작);
        cards.addEventListener('dragend',드래깅끝);
        cards.addEventListener('dragover',카드위에올라감);
        cards.addEventListener('dragleave',카드위에서벗어남);
    }


    let boxs = document.querySelectorAll('.box');
    for(let box of boxs){
        box.addEventListener('dragover', 박스위에올라감);
        box.addEventListener('dragleave', 박스위에서벗어남);
        box.addEventListener('drop', 카드를놓았음);
    }



    let nextBtn = document.querySelector('#nextBtn');
    nextBtn.addEventListener('click', nextBtnClick);

    function nextBtnClick(){
        let p = document.getElementsByClassName('word')[0];
        songNo++;
        p.innerHTML = song.bear[songNo].kor;

        //영어 박스

        let wordArray = song.bear[songNo].eng.split(" ");
        shuffle(wordArray);
        let box = document.querySelector('.box');
        let cardHTML = "";
        let count = 1;

        for(let word of wordArray) {
            cardHTML += `<div oo="${count++}" draggable="true" class="card">
            ${word}</div>`
        }

        box.innerHTML = cardHTML;


    }
    
}