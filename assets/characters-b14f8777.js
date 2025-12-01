import"./styles-4e156fe2.js";const l="https://rickandmortyapi.com/api/character/";async function o(a){try{return(await(await fetch(l+`?page=${a}`)).json()).results}catch(e){console.log(e)}}function i(a,e){const c=e.map(t=>`
      <ul class="character-ul">
        <img src="${t.image}" alt="" class="character-img">
        <h2 class="character-h2">${t.name}</h2>
        <p class="character-p">Origin: <span class="character-span">${t.origin.name}</span></p>
        <p class="character-p">Location: <span class="character-span">${t.location.name}</span></p>
      </ul>
    `).join("");a.insertAdjacentHTML("beforeend",c)}const u=document.querySelectorAll(".select-btn"),h=document.querySelectorAll(".select-ul"),p=document.querySelector(".characters-ul"),s=document.querySelector(".loadmore-btn");let r=1;async function n(){const a=await o(r);i(p,a)}s.addEventListener("click",async()=>{s.disabled=!0,r++,await n(),s.disabled=!1});u.forEach(a=>{a.addEventListener("click",()=>{const e=a.nextElementSibling;e&&e.classList.contains("select-ul")&&(h.forEach(c=>{c!==e&&c.classList.remove("active")}),e.classList.toggle("active"))})});n();
