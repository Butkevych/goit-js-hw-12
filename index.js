import{S as l,i as c}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();function d(){const r=document.getElementById("loader");r.style.display="block"}function m(){const r=document.getElementById("loader");r.style.display="none"}const u="46931303-4adba5c677ceeed1d52c819f0",f="https://pixabay.com/api/",p={image_type:"photo",orientation:"horizontal",safesearch:!0};async function y(r,o=1,i=200,s=p){const e=`${f}?key=${u}&q=${encodeURIComponent(r)}&page=${o}&per_page=${i}&image_type=${s.image_type}&orientation=${s.orientation}&safesearch=${s.safesearch}`;d();try{const t=await fetch(e);if(!t.ok)throw new Error("Error fetching images");return(await t.json()).hits}catch(t){throw console.error(t),t}finally{m()}}const g=new l(".gallery a",{captionsData:"alt",captionDelay:250});function h(r){const o=document.querySelector(".gallery");o.innerHTML="";const i=r.map(s=>`
    <div class="image-card">
      <a href="${s.largeImageURL}">
        <img src="${s.webformatURL}" alt="${s.tags}" />
      </a>
      <div class="img-details">
     <div class="coms"> <p>Likes</p> ${s.likes}</div>
      <div class="coms"><p>Views</p> ${s.views}</div>
      <div class="coms"><p>Comments</p> ${s.comments}</div>
      <div class="coms"><p>Downloads</p> ${s.downloads}</div>
      </div>
      </div>
    `).join("");o.innerHTML=i,g.refresh()}function v(r){c.error({title:"Error",message:r.message,position:"topRight",timeout:5e3})}function n(r){const o=document.getElementById("loader");r?o.style.display="block":o.style.display="none"}const L=document.querySelector("#form");L.addEventListener("submit",async r=>{r.preventDefault();const o=r.target.elements.query.value.trim();if(!o){n(!1),c.error({title:"Sorry,",message:"there are no images matching your search query. Please, try again!",position:"topRight",timeout:3e3});return}n(!0);try{const i=await y(o);i.length===0?c.error({title:"Sorry,",message:"There are no images matching your search query. Please, try again!",position:"topRight",timeout:3e3}):h(i)}catch(i){v(i)}finally{n(!1)}});
//# sourceMappingURL=index.js.map
