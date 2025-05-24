import { getImagesByQuery } from './js/pixabay-api.js'
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoaderBottom,
  hideLoaderBottom,
  showLoadMoreButton,
  hideLoadMoreButton
} from './js/render-functions.js';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');
const loadMoreButton = document.querySelector('.btn-load-more');
// const loaderTop = document.querySelector('.loader-top');
// const loaderBottom = document.querySelector('.loader-bottom');
let page = 1;
let totalPages = 0;
const perPage = 15;
let query = "";

// === Fetching posts ===
async function fetchPosts() {
  const data = await getImagesByQuery(query, page);
  totalPages = Math.ceil(data.totalHits / perPage);

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
  
  showLoader();
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
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader();
  }   
});

// === On "Load more" button click ===
loadMoreButton.addEventListener('click', async () => {
  page += 1;

  if (page >= totalPages) {
    iziToast.error({
      position: 'topRight',
      message: 'We\'re sorry, there are no more posts to load',
    });
    hideLoadMoreButton();
    return;
  }

  showLoaderBottom();

  try {
    const images = await fetchPosts();
    createGallery(images);

    const imagesContainer = document.querySelector('.gallery-item');
    const cardHeight = imagesContainer.getBoundingClientRect().height;

    window.scrollBy({
      top: 2 * cardHeight,
      behavior: "smooth",
    });
    
    if (page >= totalPages) {
      hideLoadMoreButton();
    }
  } catch (error) {
    showError();
    iziToast.error({
      position: 'topRight',
      message: 'Failed to load more posts.',
    });
  } finally {
    hideLoaderBottom();
  }
});

