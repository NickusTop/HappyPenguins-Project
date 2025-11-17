const names = document.querySelectorAll('.character-name');
const image = document.getElementById('characterImage');

names.forEach(name => {
  name.addEventListener('click', () => {
    // Зняти активність з усіх
    names.forEach(n => n.classList.remove('active'));

    // Додати активність до натиснутого
    name.classList.add('active');

    // Плавна зміна картинки
    image.style.opacity = 0;
    setTimeout(() => {
      image.src = name.getAttribute('data-img');
      image.style.opacity = 1;
    }, 200);
  });
});