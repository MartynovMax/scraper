import _ from 'lodash';

export default class ScraperConfig {
  constructor(dataObj) {
    if (!dataObj) throw Error('Data not defined');
    
    const DEFAULT = {
      dbType          : '', 
      dbName          : '', 
      requestsInterval: 0, // ms
      logDateFormat   : 'hh:mm:ss DD/MM/YYYY', // moment.js
    };

    Object.assign(this, DEFAULT, dataObj);

    if (!this.dbType) throw Error('DB type is required');
  }  
}
