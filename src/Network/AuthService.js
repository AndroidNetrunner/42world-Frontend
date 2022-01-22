import * as API from './APIType';
import axios from 'axios';

const authUrl = path => {
  return `${API.url('/auth')}${path}`;
};

const AuthService = {
  github: async () => {
    const method = 'GET';
    const url = authUrl('/github');
    console.log(url);

    let response;
    try {
      response = await axios({
        method,
        url,
      });
    } catch (error) {
      return error;
    }
    return response;
  },
  githubCallback: async code => {
    const method = 'GET';
    const url = authUrl('/github/callback' + code);

    let response;
    try {
      response = await axios({
        method,
        url,
      });
    } catch (error) {
      alert(error);
    }
    return response;
  },
  signout: async () => {
    const method = 'GET';
    const url = API.url('/signout');

    let response;
    try {
      response = await axios({
        method,
        url,
      });
    } catch (error) {
      alert(error);
    }
    return response;
  },
};

export default AuthService;
