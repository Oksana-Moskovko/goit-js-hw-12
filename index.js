import{a as L,S,i as s}from"./assets/vendor-CrlV4O_2.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))u(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&u(d)}).observe(document,{childList:!0,subtree:!0});function t(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function u(o){if(o.ep)return;o.ep=!0;const a=t(o);fetch(o.href,a)}})();const q=15;async function m(e,r){try{return(await L.get("https://pixabay.com/api/",{params:{key:"50343879-15e81ad9c5fd9246c97e6d2d5",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:q}})).data}catch(t){throw console.error("API error:",t),t}}const f=document.querySelector(".gallery"),P=new S(".gallery a",{captionsData:"alt",captionDelay:250});function g(e){const r=e.map(t=>`
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
      `).join("");f.insertAdjacentHTML("beforeend",r),P.refresh()}function v(){f.innerHTML=""}function h(e){e.style.display="block"}function b(e){e.style.display="none"}function M(){const e=document.querySelector(".btn-load-more");e.style.display="block"}function c(){const e=document.querySelector(".btn-load-more");e.style.display="none"}const R=document.querySelector(".form"),$=document.querySelector('input[name="search-text"]'),B=document.querySelector(".btn-load-more"),p=document.querySelector(".loader-top"),y=document.querySelector(".loader-bottom");let n=1,i=0;const w=15;let l="";async function O(){const e=await m(l,n);return i=Math.ceil(e.totalHits/w),e.hits}R.addEventListener("submit",async e=>{if(e.preventDefault(),l=$.value.trim(),n=1,!l){s.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please, try again!"});return}h(p),v();try{const r=await m(l,n),t=r.hits;if(i=Math.ceil(r.totalHits/w),!t.length){s.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please, try again!"}),c();return}g(t),i>1?M():c()}catch{s.error({position:"topRight",message:"Something went wrong. Please try again later."})}finally{b(p)}});B.addEventListener("click",async()=>{if(n+=1,n>=i){s.error({position:"topRight",message:"We're sorry, there are no more posts to load"}),c();return}h(y);try{const e=await O();g(e);const t=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:2*t,behavior:"smooth"}),n>=i&&c()}catch{showError(),s.error({position:"topRight",message:"Failed to load more posts."})}finally{b(y)}});
//# sourceMappingURL=index.js.map
