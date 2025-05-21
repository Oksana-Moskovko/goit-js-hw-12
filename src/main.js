import { getImagesByQuery } from './js/pixabay-api.js'
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader
} from './js/render-functions.js';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]')
//
form.addEventListener('submit', e => {
  e.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.error({
      message: 'Sorry, there are no images matching your search query. Please, try again!',
    });
    return;
  }
  
  showLoader();
  
  getImagesByQuery(query)
    .then(data => {
      hideLoader();
      const hits = data.hits;
      if (!hits.length) {
        iziToast.error({
          message: 'Sorry, there are no images matching your search query. Please, try again!',
        });
        return;
      }
      clearGallery();
      createGallery(hits);
    })
    .catch(error => {
      hideLoader();
      iziToast.error({
        message: 'Something went wrong. Please try again later.',
      });
    });
});