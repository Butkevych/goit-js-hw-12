import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function renderImages(images) {
  const galleryElement = document.querySelector('.gallery');

  const imagesSet = images
    .map(image => {
      return `
    <div class="image-card">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" />
      </a>
      <div class="img-details">
     <div class="coms"> <p>Likes</p> ${image.likes}</div>
      <div class="coms"><p>Views</p> ${image.views}</div>
      <div class="coms"><p>Comments</p> ${image.comments}</div>
      <div class="coms"><p>Downloads</p> ${image.downloads}</div>
      </div>
      </div>
    `;
    })
    .join('');
  galleryElement.insertAdjacentHTML('beforeend', imagesSet);

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
