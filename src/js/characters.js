const selectUlstatus = document.querySelector('.select-ul-status');
const selectUlspecies = document.querySelector('.select-ul-species');
const selectUltype = document.querySelector('.select-ul-type')
const selectUlgender = document.querySelector('.select-ul-gender');
const selectBtnstatus = document.querySelector('.select-btn-status');
const selectBtnspecies = document.querySelector('.select-btn-species');
const selectBtntype = document.querySelector(".select-btn-type")
const selectBtngender = document.querySelector('.select-btn-gender');

selectBtnstatus.addEventListener('click', clickUl);
selectBtnspecies.addEventListener('click', clickUl2);
selectBtntype.addEventListener('click', clickUl3)
selectBtngender.addEventListener('click', clickUl4);


function clickUl() {
  selectUlstatus.classList.toggle('active');
}
    
function clickUl2() {
  selectUlspecies.classList.toggle('active');
}

function clickUl3() {
    selectUltype.classList.toggle('active')
}

function clickUl4() {
  selectUlgender.classList.toggle('active');
}