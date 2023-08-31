// index.js
const Mustache = require('mustache');
const request = require('request');
const fs = require('fs');
const MUSTACHE_MAIN_DIR = './main.mustache';


var  options = {
  url: 'https://quotes.rest/qod?language=en',
  json: true,
  headers: {
    'Authorization': 'Bearer LyvztM4429E0spQtoufjYEfNKX0UZEE2PcoX0QGx'
  }
};


request(options, function(error, response, body){
  if (error) {
    generateReadMe("Err", "or");
  } else {
    console.log(body);
    quote = body["contents"]["quotes"][0]["quote"];
    author = body["contents"]["quotes"][0]["author"];
    generateReadMe(quote, author)
  }
});



function generateReadMe(quote, author) {
  
  let DATA = {
    quote: quote,
    quoteauthor: author
  };
  
  
  fs.readFile(MUSTACHE_MAIN_DIR, (err, data) =>  {
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync('README.md', output);
  });
}
generateReadMe();
