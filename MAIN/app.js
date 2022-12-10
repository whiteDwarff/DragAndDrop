let draggingCard = null;
let dragOverCard = null;
let songNo = 0;

const NEXTBTN = document.getElementById('nextBtn');


// 움직이는 카드가 ~~
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
////////////////////////////////////////////////////////////////
// 움직이는 카드가 ~~
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
////////////////////////////////////////////////////////////////

function 한글버전() {
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
        cardHTML += `<div oo="${count++}" draggable="true" class="card">
        ${word}</div>`
    }

    box.innerHTML = cardHTML;
}
//카드 섞기
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);

}

////////////////////////////////////////////////////////

window.onload = function(){
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

    한글버전();
    카드추가();


    NEXTBTN.addEventListener('click', ccc);
    function ccc(){
        songNo++;
        console.log('click');
    }


}