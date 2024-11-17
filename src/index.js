import Handlebars from 'handlebars';
import axios from 'axios';

async function loadPosts() {
    try {
        const response = await axios.get('http://localhost:1488/posts');
        const data = response.data;
        const postsContainer = document.querySelector('.posts');

        postsContainer.innerHTML = '';

        const template = document.querySelector('.template').innerHTML;
        const compiledTemplate = Handlebars.compile(template);

        postsContainer.innerHTML = data.length > 0 ?
            data.map(post => compiledTemplate({ post })).join('') :
            'No posts available';
    } catch (error) {
        console.error('Error loading posts:', error);
        const postsContainer = document.querySelector('.posts');
        postsContainer.innerHTML = 'Error loading posts. Please try again later.';
    }
}

loadPosts();
