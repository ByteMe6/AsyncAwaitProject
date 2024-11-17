import Handlebars from 'handlebars';
import axios from 'axios';

const postsContainer = document.querySelector('.posts');
const postsSection = document.querySelector('.posts');

async function loadPosts() {
  try {
    const response = await axios.get('http://localhost:1488/posts');
    const data = response.data;
    const template = document.querySelector('.template').innerHTML;
    const compiledTemplate = Handlebars.compile(template);

    postsContainer.innerHTML =
      data.length > 0
        ? data.map(post => compiledTemplate({ post })).join('')
        : 'No posts available';
  } catch (error) {
    console.error('Error loading posts:', error);
    postsContainer.innerHTML = 'Error loading posts. Please try again later.';
  }
}

function addLikes(e) {
  if (!e.target.classList.contains('like')) {
    return;
  }

  const postId = e.target.getAttribute('data-id');

  axios.get(`http://localhost:1488/posts/${postId}`).then(response => {
    let likes = response.data.likes;

    axios.patch(`http://localhost:1488/posts/${postId}`, {
      likes: (likes += 1),
    });
    loadPosts();
  });
}

loadPosts();
postsSection.addEventListener('click', addLikes);
