import { createGallery, appendToGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';
import { getImagesByQuery } from './js/pixabay-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let searchQueryGlobal = '';
const perPage = 15;

form.addEventListener('submit', async event => {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements['search-text'].value.trim();

  if (!searchQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  if (searchQuery !== searchQueryGlobal) {
    currentPage = 1;
    clearGallery();
    loadMoreBtn.style.display = 'none';
    searchQueryGlobal = searchQuery;
  }

  await fetchImages();
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  await fetchImages();
});

async function fetchImages() {
  try {
    showLoader();

    const data = await getImagesByQuery(searchQueryGlobal, currentPage, perPage);

    hideLoader();

    if (!data.hits.length) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      loadMoreBtn.style.display = 'none';
      return;
    }

    if (currentPage === 1) {
      createGallery(data.hits);
      iziToast.success({
        title: 'Success',
        message: `Found ${data.totalHits} images.`,
        position: 'topRight',
      });
    } else {
      appendToGallery(data.hits);

      const galleryItems = document.querySelectorAll('.gallery .gallery-item');
      if (galleryItems.length > 0) {
        const cardHeight = galleryItems[0].getBoundingClientRect().height;
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }
    }

    if (currentPage * perPage >= data.totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(error);
  }
}

const input = document.querySelector('input');
input.addEventListener('input', () => {
  if (input.value.trim() !== '') {
    input.classList.add('filled');
  } else {
    input.classList.remove('filled');
  }
});
