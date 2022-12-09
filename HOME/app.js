function moveBear() {
    bear = document.getElementsByClassName('bear')[0];
    bear.classList.add('show_bear');
}

window.onload = function() {

    // $('section').on('click',moveBear);
    section = document.getElementsByTagName('section')[0];
    section.addEventListener('mouseover',moveBear);
}