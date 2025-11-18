const selectButtons = document.querySelectorAll('.select-btn');
const selectUls = document.querySelectorAll('.select-ul');

selectButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const ul = btn.nextElementSibling;
    if (ul && ul.classList.contains('select-ul')) {
      selectUls.forEach(otherUl => {
        if (otherUl !== ul) {
          otherUl.classList.remove('active');
        }
      });
      ul.classList.toggle('active');
    }
  });
});
