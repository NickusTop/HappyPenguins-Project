import"./styles-7e9ddd23.js";const t="https://rickandmortyapi.com/api/character/";async function e(){try{return(await(await fetch(t+"?page=1")).json()).results}catch(c){console.log(c)}}async function r(c){try{const a=await e();c.innerHTML=a.map(s=>`
            <ul class="character-ul">
      <img src="${s.image}" alt="" class="character-img">
      <h2 class="character-h2">${s.name}</h2>
      <p class="character-p">Origin: <span class="character-span">${s.origin.name}</span></p>
      <p class="character-p">Location: <span class="character-span">${s.location.name}</span></p>
    </ul>
            `).join("")}catch(a){console.log(a)}}const n=document.querySelectorAll(".select-btn"),o=document.querySelectorAll(".select-ul"),l=document.querySelector(".characterspages-div");n.forEach(c=>{c.addEventListener("click",()=>{const a=c.nextElementSibling;a&&a.classList.contains("select-ul")&&(o.forEach(s=>{s!==a&&s.classList.remove("active")}),a.classList.toggle("active"))})});async function i(){const c=await e();return console.log(c),c}i();r(l);
