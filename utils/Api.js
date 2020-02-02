

import axios from 'axios';

const domain = 'https://https://google.com/wp-json/wp/v2/';

export default class Api {

  static getPageContents(id) {
    return axios({
      method: 'get',
      url:  `${domain}pages/${id}`,
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
    });
  }
}