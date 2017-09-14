import _ from 'lodash';



export default class EventManager {

  /**
   * @param  {Array} listEventsNames
   */
  constructor(listEventsNames) {
    if (!_.isArray(listEventsNames)) throw TypeError('Events names list is not an Array');

    this._listEventsNames = listEventsNames;
    this._eventHandlers   = [];
  }



  /**
   * Add event listener
   * @param  {String} eventName
   * @param  {Function} handler
   */
  on(eventName, handler) {
    if (!eventName) throw Error('Event name is empty');
    if (_.indexOf(this._listEventsNames, eventName) === -1) throw Error(`Unknown event name: ${eventName}`);
    if (!handler) throw Error(`Handler for event ${eventName} is undefined`);
    if (typeof(handler) !== 'function') throw Error(`Handler for event ${eventName} should be a function`);
    if (!this._eventHandlers[eventName]) this._eventHandlers[eventName] = [];
    this._eventHandlers[eventName].push(handler);
  }



  /**
   * Remove event listener
   * @param  {String} eventName
   * @param  {Function} handler
   */
  off(eventName, handler) {
    if (!eventName) throw Error('Event name is empty');
    if (_.indexOf(this._listEventsNames, eventName) === -1) throw Error(`Unknown event name: ${eventName}`);
    if (!this._eventHandlers[eventName] || !this._eventHandlers[eventName].length) return;

    if (!handler) {
      this._eventHandlers[eventName] = [];
    } else {
      _.remove(this._eventHandlers[eventName], (eventHandler) => {
        return eventHandler === handler;
      });
    }
  }



  /**
   * Call event listener
   * @param  {String} eventName
   * @param  {Object} data
   */
  triggerEvent(eventName, data) {
    if (!eventName) throw Error('Event name is empty');
    if (_.indexOf(this._listEventsNames, eventName) === -1) throw Error(`Unknown event name: ${eventName}`);

    let handlers = this._eventHandlers[eventName];
    if (!Array.isArray(handlers) || !handlers.length) return;
    
    for (let handler of handlers) {
      handler.call(null, data);
    }
  }



  /**
   * Clear all listeners
   */
  clear() {
    this._listEventsNames = [];
  }
}
