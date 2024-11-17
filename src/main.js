import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api.js';
import { renderImages, renderError } from './js/render-functions.js';

let query = '';
let page = 1;
let perPage = 15;

function toggleLoader(isLoading) {
  const loader = document.getElementById('loader');
  loader.style.display = isLoading ? 'block' : 'none';
}

function toggleLoadMoreButton(isVisible) {
  const morePictures = document.querySelector('.load-more-btn');
  morePictures.style.display = isVisible ? 'block' : 'none';
}

const form = document.querySelector('#form');
const morePictures = document.querySelector('.load-more-btn');

toggleLoadMoreButton(false);

form.addEventListener('submit', async event => {
  event.preventDefault();

  query = event.target.elements.query.value.trim();
  page = 1;
  document.querySelector('.gallery').innerHTML = '';
  if (!query) {
    toggleLoader(false);
    iziToast.error({
      title: 'Sorry,',
      message: 'your search field is empty. Write something down, please!',
      position: 'topRight',
      timeout: 3000,
    });
    return;
  }

  try {
    const data = await fetchImages(query, page, perPage);
    if (page >= data.totalHits / 15) {
      morePictures.disabled = false;

      iziToast.error({
        title: 'Sorry,',
        message:
          'there are no images matching your search query. Please, try again!',
        position: 'topRight',
        timeout: 3000,
      });
    } else {
      renderImages(data.hits);
      toggleLoader(false);
      toggleLoadMoreButton(true);

      smoothScroll();
    }
  } catch (error) {
    renderError(error);
  }
});

morePictures.addEventListener('click', async () => {
  page += 1;
  toggleLoadMoreButton(false);
  toggleLoader(true);

  try {
    const data = await fetchImages(query, page, perPage);
    renderImages(data.hits);
    toggleLoader(false);

    if (page >= data.totalHits / 15) {
      morePictures.disabled = false;

      iziToast.info({
        title: "We're sorry,",
        message: "but you've reached the end of search results.",
        position: 'topRight',
        timeout: 3000,
      });
    } else {
      toggleLoadMoreButton(true);
    }

    smoothScroll();
  } catch (error) {
    renderError(error);
  }
});

function smoothScroll() {
  const firstImageCard = document.querySelector('.image-card');
  if (firstImageCard) {
    const cardHeight = firstImageCard.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      left: 0,
      behavior: 'smooth',
    });
  }
}
