import { getImagesByQuery } from './js/pixabay-api.js'
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton
} from './js/render-functions.js';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');
const loadMoreButton = document.querySelector('.btn-load-more');
const loaderTop = document.querySelector('.loader-top');
const loaderBottom = document.querySelector('.loader-bottom');


let page = 1;
let totalPages = 0;
const perPage = 15;
let query = "";

// === Fetching posts ===
async function fetchPosts() {
  const data = await getImagesByQuery(query, page);
  return data.hits;
}

// === On form submit ===
form.addEventListener('submit', async e => {
  e.preventDefault();

  query = input.value.trim();
  page = 1;

  if (!query) {
    iziToast.error({
      position: 'topRight',
      message: 'Sorry, there are no images matching your search query. Please, try again!',
    });
    return;
  }
  
  showLoader(loaderTop);
  clearGallery();
  
  try {
    const data = await getImagesByQuery(query, page);
    const images = data.hits;
    totalPages = Math.ceil(data.totalHits / perPage);

    if (!images.length) {
      iziToast.error({
        position: 'topRight',
        message: 'Sorry, there are no images matching your search query. Please, try again!',
      });
      hideLoadMoreButton();
      return;
    }

    createGallery(images);
    
    if (totalPages > 1) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }

    page += 1;

  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader(loaderTop);
  }   
});

// === On "Load more" button click ===
loadMoreButton.addEventListener('click', async () => {
  showLoader(loaderBottom);

  try {
    const images = await fetchPosts();
    createGallery(images);

    const firstCard = document.querySelector('.gallery-item');
    if (firstCard) {
      const cardHeight = firstCard.getBoundingClientRect().height;

      window.scrollBy({
        top: 2 * cardHeight,
        behavior: "smooth",
      });
    }

    page += 1;

    if (page > totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        position: 'topRight',
        message: 'We\'re sorry, there are no more posts to load.',
      });
    }

  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: 'Failed to load more posts.',
    });
  } finally {
    hideLoader(loaderBottom);
  }
});