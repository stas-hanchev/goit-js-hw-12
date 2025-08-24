import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function generateMarkup(images) {
  return images
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" width="360" height="200" loading="lazy" />
        </a>
        <ul class="image-stats">
          <li class="stat-item"><span class="stat-label">Likes:</span> ${likes}</li>
          <li class="stat-item"><span class="stat-label">Views:</span> ${views}</li>
          <li class="stat-item"><span class="stat-label">Comments:</span> ${comments}</li>
          <li class="stat-item"><span class="stat-label">Downloads:</span> ${downloads}</li>
        </ul>
      </li>
    `)
    .join('');
}

export function createGallery(images) {
  galleryContainer.innerHTML = generateMarkup(images);
  lightbox.refresh();
}

export function appendToGallery(images) {
  galleryContainer.insertAdjacentHTML('beforeend', generateMarkup(images));
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loader.style.display = 'inline';
}

export function hideLoader() {
  loader.style.display = 'none';
}
