import{S as f,a as w,i as l}from"./assets/vendor-Rdv7LHNr.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function i(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(t){if(t.ep)return;t.ep=!0;const o=i(t);fetch(t.href,o)}})();new f(".gallery a",{captionsData:"alt",captionDelay:250});const S="46931303-4adba5c677ceeed1d52c819f0",q="https://pixabay.com/api/",P={image_type:"photo",orientation:"horizontal",safesearch:!0};async function g(e,r=1,i=20,a=P){const t=`${q}?key=${S}&q=${encodeURIComponent(e)}&page=${r}&per_page=${i}&image_type=${a.image_type}&orientation=${a.orientation}&safesearch=${a.safesearch}`;try{const{data:o}=await w.get(t);return o}catch{throw new Error("Failed to fetch images. Please try again later.")}}const E=new f(".gallery a",{captionsData:"alt",captionDelay:250});function p(e){const r=document.querySelector(".gallery"),i=e.map(({largeImageURL:a,webformatURL:t,tags:o,likes:n,views:b,comments:L,downloads:$})=>`
        <div class="image-card">
          <a href="${a}">
            <img src="${t}" alt="${o}" />
          </a>
          <div class="img-details">
            <div class="coms"><p>Likes</p> ${n}</div>
            <div class="coms"><p>Views</p> ${b}</div>
            <div class="coms"><p>Comments</p> ${L}</div>
            <div class="coms"><p>Downloads</p> ${$}</div>
          </div>
        </div>
      `).join("");r.insertAdjacentHTML("beforeend",i),E.refresh()}function y(e){l.error({title:"Error",message:e.message,position:"topRight",timeout:5e3})}let c="",s=1,h=15;function d(e){const r=document.getElementById("loader");r.style.display=e?"block":"none"}function u(e){const r=document.querySelector(".load-more-btn");r.style.display=e?"block":"none"}const I=document.querySelector("#form"),m=document.querySelector(".load-more-btn");u(!1);I.addEventListener("submit",async e=>{if(e.preventDefault(),c=e.target.elements.query.value.trim(),s=1,document.querySelector(".gallery").innerHTML="",!c){d(!1),l.error({title:"Sorry,",message:"your search field is empty. Write something down, please!",position:"topRight",timeout:3e3});return}try{const r=await g(c,s,h);s>=r.totalHits/15?(m.disabled=!1,l.error({title:"Sorry,",message:"there are no images matching your search query. Please, try again!",position:"topRight",timeout:3e3})):(p(r.hits),d(!1),u(!0),v())}catch(r){y(r)}});m.addEventListener("click",async()=>{s+=1,u(!1),d(!0);try{const e=await g(c,s,h);p(e.hits),d(!1),s>=e.totalHits/15?(m.disabled=!1,l.info({title:"We're sorry,",message:"but you've reached the end of search results.",position:"topRight",timeout:3e3})):u(!0),v()}catch(e){y(e)}});function v(){const e=document.querySelector(".image-card");if(e){const r=e.getBoundingClientRect().height;window.scrollBy({top:r*2,left:0,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
