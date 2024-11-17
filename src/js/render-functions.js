import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function renderImages(arr) {
  const gallery = document.querySelector('.gallery');
  const imagesHTML = arr
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <div class="image-card">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" />
          </a>
          <div class="img-details">
            <div class="coms"><p>Likes</p> ${likes}</div>
            <div class="coms"><p>Views</p> ${views}</div>
            <div class="coms"><p>Comments</p> ${comments}</div>
            <div class="coms"><p>Downloads</p> ${downloads}</div>
          </div>
        </div>
      `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', imagesHTML);

  lightbox.refresh();
}

export function renderError(error) {
  iziToast.error({
    title: 'Error',
    message: error.message,
    position: 'topRight',
    timeout: 5000,
  });
}

export function clearError() {
  iziToast.hide({}, 'all');
}
