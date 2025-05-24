import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map((img) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${img.largeImageURL}">
          <img 
            class="gallery-image" 
            src="${img.webformatURL}" 
            alt="${img.tags}" 
          />
        </a>
        <div class="information"> 
        <p><span class="bold-font">Likes:</span> ${img.likes}</p>
        <p><span class="bold-font">Views:</span> ${img.views}</p>
        <p><span class="bold-font">Comments:</span> ${img.comments}</p>
        <p><span class="bold-font">Downloads:</span> ${img.downloads}</p>
        </div> 
      </li>
      `)
    .join("");
    
  // gallery.innerHTML = markup;
  gallery.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = "";
}
export function showLoader(loader) {
  loader.style.display = 'block';
}

export function hideLoader(loader) {
  loader.style.display = 'none';
}
export function showLoadMoreButton() {
  const buttonLoadMore = document.querySelector('.btn-load-more');
  buttonLoadMore.style.display = 'block';
}
export function hideLoadMoreButton() {
  const buttonLoadMore = document.querySelector('.btn-load-more');
  buttonLoadMore.style.display = 'none';
}
  