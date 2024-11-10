import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api.js';
import { renderImages, renderError } from './js/render-functions.js';

function toggleLoader(isLoading) {
  const loader = document.getElementById('loader');
  if (isLoading) {
    loader.style.display = 'block';
  } else {
    loader.style.display = 'none';
  }
}

const form = document.querySelector('#form');

form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = event.target.elements.query.value.trim();
  document.querySelector('.gallery').innerHTML = '';
  if (!query) {
    toggleLoader(false);
    iziToast.error({
      title: 'Sorry,',
      message:
        'there are no images matching your search query. Please, try again!',
      position: 'topRight',
      timeout: 3000,
    });
    return;
  }
  toggleLoader(true);
  try {
    const images = await fetchImages(query);
    if (images.length === 0) {
      iziToast.error({
        title: 'Sorry,',
        message:
          'There are no images matching your search query. Please, try again!',
        position: 'topRight',
        timeout: 3000,
      });
    } else {
      renderImages(images);
    }
  } catch (error) {
    renderError(error);
  } finally {
    toggleLoader(false);
  }
});
