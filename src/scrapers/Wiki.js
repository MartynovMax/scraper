import Scraper from '../Scraper';
import _ from 'lodash';
import async from 'async';

export default class Wiki extends Scraper {
  constructor(options) {
    this.baseUrl = 'https://wikipedia.org/';
    this.options = options || {};

    this.start();
  }



  start() {
    async.waterfall([
      (callback) => {

      },
    ], (err) => {

    });
  }

}
