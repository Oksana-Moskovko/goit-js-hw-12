import{a as L,S as w,i as n}from"./assets/vendor-CrlV4O_2.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))u(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&u(l)}).observe(document,{childList:!0,subtree:!0});function t(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function u(o){if(o.ep)return;o.ep=!0;const a=t(o);fetch(o.href,a)}})();const S=15;async function m(e,r){try{return(await L.get("https://pixabay.com/api/",{params:{key:"50343879-15e81ad9c5fd9246c97e6d2d5",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:S}})).data}catch(t){throw console.error("API error:",t),t}}const f=document.querySelector(".gallery"),q=new w(".gallery a",{captionsData:"alt",captionDelay:250});function g(e){const r=e.map(t=>`
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
      `).join("");f.insertAdjacentHTML("beforeend",r),q.refresh()}function P(){f.innerHTML=""}function h(e){e.style.display="block"}function b(e){e.style.display="none"}function v(){const e=document.querySelector(".btn-load-more");e.style.display="block"}function c(){const e=document.querySelector(".btn-load-more");e.style.display="none"}const M=document.querySelector(".form"),R=document.querySelector('input[name="search-text"]'),$=document.querySelector(".btn-load-more"),p=document.querySelector(".loader-top"),y=document.querySelector(".loader-bottom");let s=1,d=0;const B=15;let i="";async function O(){return(await m(i,s)).hits}M.addEventListener("submit",async e=>{if(e.preventDefault(),i=R.value.trim(),s=1,!i){n.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please, try again!"});return}h(p),P();try{const r=await m(i,s),t=r.hits;if(d=Math.ceil(r.totalHits/B),!t.length){n.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please, try again!"}),c();return}g(t),d>1?v():c(),s+=1}catch{n.error({position:"topRight",message:"Something went wrong. Please try again later."})}finally{b(p)}});$.addEventListener("click",async()=>{h(y);try{const e=await O();g(e);const r=document.querySelector(".gallery-item");if(r){const t=r.getBoundingClientRect().height;window.scrollBy({top:2*t,behavior:"smooth"})}s+=1,s>d&&(c(),n.info({position:"topRight",message:"We're sorry, there are no more posts to load."}))}catch{n.error({position:"topRight",message:"Failed to load more posts."})}finally{b(y)}});
//# sourceMappingURL=index.js.map
