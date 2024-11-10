import axios from 'axios';
import { renderImages } from './render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function toggleLoader(isLoading) {
  const loader = document.getElementById('loader');
  if (isLoading) {
    loader.style.display = 'block';
  } else {
    loader.style.display = 'none';
  }
}
toggleButton(false);
function toggleButton(isVisible) {
  const button = document.querySelector('.loadMore');

  if (isVisible) {
    button.style.display = 'block';
  } else {
    button.style.display = 'none';
  }
}
const API_KEY = '46931303-4adba5c677ceeed1d52c819f0';
const BASE_URL = 'https://pixabay.com/api/';
const defaultOptions = {
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};
let currentPage = 1;

export async function fetchImages(
  query,
  page = 1,
  perPage = 20,
  options = defaultOptions
) {
  toggleLoader(true);
  try {
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
      query
    )}&page=${page}&per_page=${perPage}&image_type=${
      options.image_type
    }&orientation=${options.orientation}&safesearch=${options.safesearch}`;
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error('Error fetching images');
    }
    return response.data.hits;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    toggleButton(true);
  }
}

const morePictures = document.querySelector('.loadMore');
morePictures.addEventListener('click', async () => {
  const query = document
    .querySelector('#form input[name="query"]')
    .value.trim();

  if (!query) return;

  currentPage += 1;
  toggleButton(false);
  try {
    const images = await fetchImages(query, currentPage, 15, defaultOptions);
    if (images.length === 0) {
      iziToast.info({
        title: 'We are sorry,',
        message: 'but you have reached the end of search results.',
        position: 'topRight',
        timeout: 3000,
      });
      toggleButton(false);
    } else {
      renderImages(images);
      smoothScroll();
      toggleButton(true);
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    toggleLoader(false);
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
