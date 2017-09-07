import Scraper from '../Scraper';
import _ from 'lodash';
import async from 'async';

export default class Wiki extends Scraper {
  constructor(options) {
    super();

    this.baseUrl = 'https://en.wikipedia.org/';
    this.options = options || {};

    this.start();
  }



  getAllImages($) {
    return new Promise((resolve, reject) => {  
      const $imgs   = $('img');
      const results = [];

      _.each($imgs, ($img) => {
        const $image = $($img);

        try {
          const item = new ImageItem({
            baseUrl: this.baseUrl,
            title  : $image.attr('alt'),
            url    : $image.attr('src'),
            width  : $image.attr('width'),
            height : $image.attr('height'),
          });

          results.push(item);
        } catch(e) {
            console.log('e', e);
          // if ImageItem is incorrect
        }
      });

      resolve(results);
    });
  }




  start() {
    super.processStart();

    super.requestPage({
      url      : `${this.baseUrl}wiki/Main_Page/`,
      encoding : null,
    })
    .then(this.getAllImages.bind(this))
    .then(super.save.bind(this))
    .then(super.processFinish.bind(this))
    .catch((err) => {
      super.error(err);
    });
  }
}





class ImageItem {
  constructor(data) {
    if (!data) throw Error('Empty data');
    if (!data.baseUrl) throw Error('Base URL is required');
    if (!data.url) throw Error('URL is required');

    let url = data.url;

    if (/^\/\//.test('url')) {
      let protocolReg = data.baseUrl.exec(/^(http|https):/);
      let protocol = protocolReg[1] || 'http';
      url = `${protocol}:${url}`;
    } else {
      url = url.replace(/^\//, '');
      url = data.baseUrl + url;
    }

    this.url    = url;
    this.title  = data.title;
    this.width  = data.width || 0;
    this.height = data.height || 0;
  }
}
