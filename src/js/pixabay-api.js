import axios from 'axios';
import { renderImages } from './render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const API_KEY = '46931303-4adba5c677ceeed1d52c819f0';
const BASE_URL = 'https://pixabay.com/api/';
const defaultOptions = {
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

export async function fetchImages(
  query,
  page = 1,
  perPage = 20,
  options = defaultOptions
) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&page=${page}&per_page=${perPage}&image_type=${
    options.image_type
  }&orientation=${options.orientation}&safesearch=${options.safesearch}`;

  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    throw new Error('Failed to fetch images. Please try again later.');
  }
}
