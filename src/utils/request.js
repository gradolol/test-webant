import store from '../store';
import axios from 'axios';
import router from '@/router';

export default function setup() {
  axios.interceptors.request.use((config) => {
    const token = store.getters.ACCESS_TOKEN;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  }, (err) => {
      return Promise.reject(err);
  });

  axios.interceptors.response.use((response) => {
    return response;
    }, (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      if (error.response.config.url === `${process.env.VUE_APP_BASE_API}/oauth/v2/token`) {
        store.dispatch('SIGNOUT');
        router.push('/login');
      }
      originalRequest._retry = true;
      return new Promise( (resolve, reject) => {
        if (!localStorage.getItem('refresh_token')) {
          store.dispatch('SIGNOUT');
          router.push('/login');
          return;
        } else {
          store.dispatch('AUTHORIZATION',
          {
            grant_type: 'refresh_token',
            refresh_token: localStorage.getItem('refresh_token'),
          })
          .then((data) => {
            error.config.headers['Authorization'] = 'Bearer ' + data.data.access_token;
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.access_token;
            originalRequest.headers['Authorization'] = 'Bearer ' + store.state.access_token;
            resolve(axios(originalRequest));
          })
          .catch((err) => {
            console.log(err)
            store.dispatch('SIGNOUT');
            router.push('/login');
            reject(err);
          })
        }
      });
    }
    return Promise.reject(error);
  });
}
