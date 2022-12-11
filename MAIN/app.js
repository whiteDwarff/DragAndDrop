let draggingCard = null;
let dragOverCard = null;
let songNo = 0;
//songNo = json.parse(localStorage.getItem("songNo"));



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

    for(let word of wordArray) {
        cardHTML += `<div draggable="true" class="card">
        ${word}</div>`
    }

    box.innerHTML = cardHTML;
}


//넥스트 버튼 기능
function nextBtnClick(){
    answerCheck();

    //현재 문항이 모든 문제수를 넘어가게되면..
    if(songNo >= song.bear.length){
        alert('This is the last question!');
        songNo--;
    }
    gameSetting();
}

//다시시작 버튼 기능
function resultBtnClick(){
    songNo = 0;
    gameSetting();
}

//정답 체크하는 함수
function answerCheck() {
    cardText = document.querySelectorAll('.card');
    
    let myAnswer = '';
    for(let cardTexts of cardText){
        myAnswer += cardTexts.innerText;
    }
    
    let answerArray = song.bear[songNo].eng.split(" ");
    let answer = '';
    for(let answerArrays of answerArray){
        answer += answerArrays;
    }

    if(myAnswer == answer){
        console.log("정답입니다.");
        answerBox.innerHTML = '';
        songNo ++;
        localStorage.setItem("songNo", JSON.stringify(songNo));
    }
    else{ console.log("틀렸습니다!");
    answerBox.innerHTML = '';
    localStorage.setItem("songNo", JSON.stringify(songNo));
}
    console.log(answer);
    console.log(myAnswer);
}

//card에 드래그 앤 드롭 붙혀주는 함수
function nextGameCard(){
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

}

//현재 문항 수 / 전체 문항 수
function remain(){
    let remainText = document.querySelector('.remain');
    let present = songNo + 1;
    let entire = song.bear.length;
    remainText.innerText = `${present}/${entire}`;
}


function gameSetting(){
    문제추가();
    카드추가();
    nextGameCard();
    remain();
}



//실행
window.onload = function() {
    let answerBox = document.getElementById('answerBox');
    
    // if(JSON.parse(localStorage.songNo)){
    //     songNo = JSON.parse(localStorage.songNo);
    // }
    // songNo = JSON.parse(localStorage.songNo);
    gameSetting();

    let nextBtn = document.querySelector('#nextBtn');
    nextBtn.addEventListener('click', nextBtnClick);

    let resultBtn = document.querySelector('#resultBtn');
    resultBtn.addEventListener('click', resultBtnClick);

}