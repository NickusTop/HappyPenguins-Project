
import blodgettOptimized from '../img/mainpage/1.png';
import blodgettOptimize from '../img/mainpage/18.svg';
import blodgettOptimiz from '../img/mainpage/29.svg';
import blodgettOptim from '../img/mainpage/30.svg';
import blodgettOpti from '../img/mainpage/31.svg';


const names = document.querySelectorAll('.character-name');
const image = document.getElementById('characterImage');

names.forEach(name => {
  name.addEventListener('click', () => {
 
    names.forEach(n => n.classList.remove('active'));

   
    name.classList.add('active');

    image.style.opacity = 0;
    setTimeout(() => {
      image.src = name.getAttribute('data-img');
      image.style.opacity = 1;
    }, 200);
  });
});

     

    
