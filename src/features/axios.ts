import axios from 'axios'
import env from '../env';

const http = axios.create({
    baseURL: env.url_backend,
    headers: {'api-key-laika': 'laika'}
});


export default  http;