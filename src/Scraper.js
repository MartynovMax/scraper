import _ from 'lodash';
import request from 'request';
import cheerio from 'cheerio';
import moment from 'moment';



export default class Scraper {
  constructor(name, options) {
    this._eventNames = [
      'start',
      'finish',
      'error',
    ];
    this._eventHandlers = [];
  }



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
    this._triggerEvent('error', arguments);
  }



  processStart() {
    this.log(`Start scraping at ${moment().format('hh:mm:ss DD/MM/YYYY')}`);
    this._triggerEvent('start');
  }



  processFinish() {
    this.log(`Finish scraping at ${moment().format('hh:mm:ss DD/MM/YYYY')}`);
    this._triggerEvent('finish');
  }



  on(eventName, handler) {
    if (!eventName) throw Error('Event name is empty');
    if (_.indexOf(this._eventNames, eventName) === -1) throw Error(`Unknown event name: ${eventName}`);
    if (!handler) throw Error(`Handler for event ${eventName} is undefined`);
    if (typeof(handler) !== 'function') throw Error(`Handler for event ${eventName} should be a function`);
    if (!this._eventHandlers[eventName]) this._eventHandlers[eventName] = [];
    this._eventHandlers[eventName].push(handler);
  }



  off(eventName, handler) {
    if (!eventName) throw Error('Event name is empty');
    if (_.indexOf(this._eventNames, eventName) === -1) throw Error(`Unknown event name: ${eventName}`);
    if (!this._eventHandlers[eventName] || !this._eventHandlers[eventName].length) return;

    if (!handler) {
      this._eventHandlers[eventName] = [];
    } else {
      _.remove(this._eventHandlers[eventName], (eventHandler) => {
        return eventHandler === handler;
      });
    }
  }



  _triggerEvent(eventName, data) {
    if (!eventName) throw Error('Event name is empty');
    if (_.indexOf(this._eventNames, eventName) === -1) throw Error(`Unknown event name: ${eventName}`);

    let handlers = this._eventHandlers[eventName];
    if (!Array.isArray(handlers) || !handlers.length) return;
    
    for (let handler of handlers) {
      handler(data);
    }
  }
}
