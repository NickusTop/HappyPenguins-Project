import blodgettOptimized from '../img/mainpage/pistolet.png';
import jerry from '../img/mainpage/holova.png';
import hz from '../img/mainpage/red.svg';
import prosto from '../img/mainpage/green.svg';
import neznay from '../img/mainpage/pink.svg';

const images = {
  blodgettOptimized,
  jerry,
  hz,
  prosto,
  neznay,
};

const names = document.querySelectorAll('.character-name');
const image = document.getElementById('characterImage');

const activeName = document.querySelector('.character-name.active');

if (activeName) {
  const key = activeName.getAttribute('data-name');
  image.src = images[key];
}

names.forEach(name => {
  name.addEventListener('click', () => {
    names.forEach(n => n.classList.remove('active'));
    name.classList.add('active');

    const key = name.getAttribute('data-name');
    const newImg = images[key];

    image.style.opacity = 0;
    setTimeout(() => {
      image.src = newImg;
      image.style.opacity = 1;
    }, 200);
  });
});
