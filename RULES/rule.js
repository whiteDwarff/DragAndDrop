let count = 1;



function liEventHandler() {
    let li = document.getElementsByClassName('toggleBox')[0]
    li.classList.toggle('blockBox1');
}
function liEventHandler1() {
    let li = document.getElementsByClassName('toggleBox')[1]
    li.classList.toggle('blockBox2');
}
function liEventHandler2() {
    let li = document.getElementsByClassName('toggleBox')[2]
    li.classList.toggle('blockBox3');
}
function liEventHandler3() {
    let li = document.getElementsByClassName('toggleBox')[3]
    li.classList.toggle('blockBox3');
}
function toggleEventHandler() {
    let ul = document.getElementById('rule');
    
    if(count) {
        ul.classList.remove('none');
        this.innerText = '게임 진행방법 닫기';
        count--;
    } else {
        ul.classList.add('none');
        this.innerText = '게임 진행방법 보기';
        count++;
    }

}



window.onload = function() {
    
    let li1 = document.querySelector('#rule li:first-child');
    let li2 = document.querySelector('#rule li:nth-child(2)');
    let li3 = document.querySelector('#rule li:nth-child(3)');
    let li4 = document.querySelector('#rule li:last-child');
    
    
    li1.addEventListener('click', liEventHandler);
    li2.addEventListener('click', liEventHandler1);
    li3.addEventListener('click', liEventHandler2);
    li4.addEventListener('click', liEventHandler3);


    let toggleBtn = document.getElementById('toggleBtn');
    toggleBtn.addEventListener('click', toggleEventHandler);
}