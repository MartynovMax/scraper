require('babel-register');


const name         = 'Wiki';
const ScraperClass = require(`./scrapers/${name}.js`);
const scraper      = new ScraperClass.default();

// scraper.start();

scraper.on('finish', () => {
  console.log('General Finish');
  // process.exit();
});
