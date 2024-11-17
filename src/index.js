import Handlebars from 'handlebars';
import axios from 'axios';

async function loadPosts() {
    const response = await axios.get('http://localhost:1488/posts'); // Using axios to fetch posts
    const data = response.data; // Accessing data directly from the response
    console.log(data);
    const posts = document.querySelector('.posts');

    posts.innerHTML = '';

    const templateResponse = await axios.get('src/temps/post.hbs'); // Using axios to fetch the template
    console.log(templateResponse);
    const templateSource = templateResponse.data; // Accessing data directly from the response
    const template = Handlebars.compile(templateSource);

    posts.innerHTML = data.length > 0 ? data.map(post => template(post)).join('') : 'No posts available'; // Updated to handle multiple posts
}

loadPosts();
