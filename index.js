import{a as u,S as d,i}from"./assets/vendor-1AYLTIiv.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();function p(a){return u.get("https://pixabay.com/api/",{params:{key:"50343879-15e81ad9c5fd9246c97e6d2d5",q:a,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(r=>r.data).catch(r=>{throw console.error("API error:",r),r})}const c=document.querySelector(".gallery"),f=new d(".gallery a",{captionsData:"alt",captionDelay:250});function m(a){const r=a.map(t=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${t.largeImageURL}">
          <img 
            class="gallery-image" 
            src="${t.webformatURL}" 
            alt="${t.tags}" 
          />
        </a>
        <div class="information"> 
        <p><span class="bold-font">Likes:</span> ${t.likes}</p>
        <p><span class="bold-font">Views:</span> ${t.views}</p>
        <p><span class="bold-font">Comments:</span> ${t.comments}</p>
        <p><span class="bold-font">Downloads:</span> ${t.downloads}</p>
        </div> 
      </li>
      `).join("");c.innerHTML=r,f.refresh()}function y(){c.innerHTML=""}function h(){const a=document.querySelector(".loader");a.style.display="block"}function l(){const a=document.querySelector(".loader");a.style.display="none"}const g=document.querySelector(".form"),L=document.querySelector('input[name="search-text"]');g.addEventListener("submit",a=>{a.preventDefault();const r=L.value.trim();if(!r){i.error({message:"Sorry, there are no images matching your search query. Please, try again!"});return}h(),p(r).then(t=>{l();const s=t.hits;if(!s.length){i.error({message:"Sorry, there are no images matching your search query. Please, try again!"});return}y(),m(s)}).catch(t=>{l(),i.error({message:"Something went wrong. Please try again later."})})});
//# sourceMappingURL=index.js.map
