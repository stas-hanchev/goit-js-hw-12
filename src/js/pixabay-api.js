import axios from 'axios';

const API_KEY = '51669150-fb97c08ffc3fd3823d92d526e';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1, perPage = 15) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: perPage,
    },
  });
  return response.data;
}