import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://italic-ecommerce.herokuapp.com/',
});

export default instance;
