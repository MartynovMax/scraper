import _ from 'lodash';
import request from 'request';

export default class Scraper {
  constructor(name, options) {
    if (!name) throw Error('Scraper name is undefined');

    this.name           = name;
    this.scraper        = new require(`./scrapers/${name}`)();
    this.options        = this.scraper.options;
    this._eventHandlers = [];
  }



  requestPage(url, options) {
    request.get(url)
  }



  save(key, value) {
  }



  log() {
    console.log(arguments);
  }



  error() {
    console.error(arguments);
  }



  on(eventName, handler) {
    if (!eventName) throw Error('Event name is empty');
    if (!handler) throw Error(`Handler for event ${eventName} is undefined`);
    if (typeof(handler) !== 'function') throw Error(`Handler for event ${eventName} should be a function`);
    if (!this._eventHandlers[eventName]) this._eventHandlers[eventName] = [];
    this._eventHandlers[eventName].push(handler);
  }



  off(eventName, handler) {
    if (!eventName) throw Error('Event name is empty');
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
    let handlers = this._eventHandlers[eventName];
    if (!Array.isArray(handlers) || !handlers.length) return;
    
    for (let handler of handlers) {
      handler(data);
    }
  }

}
