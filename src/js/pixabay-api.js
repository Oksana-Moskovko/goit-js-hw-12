import axios from 'axios';

const perPage = 15;

export async function getImagesByQuery(query, page) {
  try {
    const response = await axios.get("https://pixabay.com/api/", {
      params: {
        key: '50343879-15e81ad9c5fd9246c97e6d2d5',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
      }
    });

    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}

