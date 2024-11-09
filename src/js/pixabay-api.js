function showLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'block';
}
function hideLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'none';
}
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
  perPage = 200,
  options = defaultOptions
) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&page=${page}&per_page=${perPage}&image_type=${
    options.image_type
  }&orientation=${options.orientation}&safesearch=${options.safesearch}`;
  showLoader();
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error fetching images');
    }
    const data = await response.json();
    return data.hits;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    hideLoader();
  }
}
