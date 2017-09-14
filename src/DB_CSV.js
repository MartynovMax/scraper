import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import CONFIG from './config.js';



export default class DB_CSV {

  /**
   * @param  {String} dbName
   */
  constructor(dbName) {
    if (!dbName) throw 'Database name is not defined';

    const adapter = new FileSync(`${CONFIG.outputDir}/${dbName}.json`);
    const db      = lowdb(adapter)
  }
}
