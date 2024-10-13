// API endpoint and API key
const apiUrl = 'https://newsapi.org/v2/top-headlines';
// const apiurl = 'https://newsapi.org/v2/top-headlines';
const apiKey = 'cdd8c8f711d8458d903adbceaeff4977';

// Get elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const newsContainer = document.querySelector('.news-container');
const categories = document.querySelectorAll('.categories a');

// Add event listeners
searchForm.addEventListener('submit', searchNews);
categories.forEach(category => category.addEventListener('click', filterByCategory));

// Function to fetch news data from API
function fetchNews(url) {
  return fetch(url)
    .then(response => response.json())
    .then(data => data.articles)
    .catch(error => console.error(error));
}

// Function to render news articles
function renderNews(articles) {
  newsContainer.innerHTML = '';
  articles.forEach(article => {
    const newsArticle = document.createElement('section');
    newsArticle.className = 'news-article';
    newsArticle.innerHTML = `
      <img src="${article.urlToImage}" alt="News Image">
      <h2>${article.title}</h2>
      <p>${article.description}</p>
    `;
    newsContainer.appendChild(newsArticle);
  });
}

// Search function
function searchNews(event) {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  const url = `${apiUrl}?q=${searchTerm}&apiKey=${apiKey}`;
  fetchNews(url).then(articles => renderNews(articles));
}

// Filter by category function
function filterByCategory(event) {
  event.preventDefault();
  const category = event.target.getAttribute('data-category');
  const url = `${apiUrl}?category=${category}&apiKey=${apiKey}`;
  fetchNews(url).then(articles => renderNews(articles));
}

// Initial news load
fetchNews(`${apiUrl}?country=us&apiKey=${apiKey}`).then(articles => renderNews(articles));