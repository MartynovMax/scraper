import _ from 'lodash';
import request from 'request';
import cheerio from 'cheerio';
import moment from 'moment';

import EventManager from './EventManager';



export default class Scraper {

  /**
   * @param  {ScraperConfig} CONFIG
   * @param  {Object} options
   */
  constructor(CONFIG, options) {
    if (!CONFIG) throw Error('Config object is empty');

    this.CONFIG  = CONFIG;
    this.options = options || {};

    this.EventManager = new EventManager([
      'start',
      'finish',
      'error',
    ]);
  }




  /**
   * @param  {Object} options
   */
  requestPage(options) {
    return new Promise((resolve, reject) => {  
      request.get(options, (err, res, buffer)  => {
        if (err) return reject(err);

        this.log(`Request URL: ${options.url}`);

        const $ = cheerio.load(buffer.toString());
        resolve($);
      });
    });
  }



  /**
   * @param  {Object} item
   */
  save(items) {
    return new Promise((resolve, reject) => {  
      if (!items) return resolve();
      if (!_.isArray(items)) items = [items];

      // console.log('Save items', items);
      console.log('Save items');

      resolve();
    });
  }



  log() {
    console.log.apply(console, arguments);
  }



  error() {
    console.error.apply(console, arguments);
    this.EventManager.triggerEvent('error', arguments);
  }



  on() {
    this.EventManager.on.apply(this.EventManager, arguments);
  }



  off() {
    this.EventManager.off.apply(this.EventManager, arguments);
  }



  processStart() {
    this.log(`Start scraping at ${moment().format(this.CONFIG.logDateFormat)}`);
    this.EventManager.triggerEvent('start');
  }



  processFinish() {
    this.log(`Finish scraping at ${moment().format(this.CONFIG.logDateFormat)}`);
    this.EventManager.triggerEvent('finish');
    this.EventManager.clear();
  }
}
