import axios from 'axios';
import { displayNotification } from '../views/base';

export default class CityCode {
  constructor(query) {
    this.query = `query=${query}`;
  }

  async findCityCode() {
    try {
      const res = await axios({
        method: 'POST',
        url: '/find-city-code',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: this.query,
      });

      this.result = res.data;
    } catch (error) {
      console.log(error);
      displayNotification('error', 'We could not get the results. Please try again in few minutes');
    }
  }
}
