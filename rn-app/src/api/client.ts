import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://10.0.15.94:3434',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default httpClient;

if (__DEV__) {
  httpClient.interceptors.request.use(
    (config) => {
      console.log('\n\n\n ---- BEGIN Request config ---- \n\n\n');
      console.log('Method', config.method);
      console.log('Url', config.url);
      console.log('Params', JSON.stringify(config.params));
      console.log('Data', JSON.stringify(config.data));
      console.log('Headers', JSON.stringify(config.headers));

      console.log('\n\n\n ---- END Request config ---- \n\n\n');
      return config;
    },
    (error) => {
      console.log(JSON.stringify(error));
      return Promise.reject(error);
    }
  );

  httpClient.interceptors.response.use(
    (response) => {
      console.log('\n\n\n ---- BEGIN Response ---- \n\n\n');

      console.log('Config', JSON.stringify(response.config.url));
      console.log('Status', JSON.stringify(response.status));
      console.log('Data', JSON.stringify(response.data));
      console.log('Headers', JSON.stringify(response.headers));

      console.log('\n\n\n ---- END Response ---- \n\n\n');
      return response;
    },
    (error) => {
      console.log('\n\n\n ---- BEGIN Error ---- \n\n\n');

      console.log('Error', JSON.stringify(error));
      if (error.response) {
        console.log('Error Response', JSON.stringify(error.response));
      }

      console.log('\n\n\n ---- END Error ---- \n\n\n');
      return Promise.reject(error);
    }
  );
}
