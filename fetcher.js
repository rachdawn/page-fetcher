const request = require('request');
const fs = require('fs');

if (process.argv.length !== 4) {
  console.error('Use syntax: node fetcher.js <url> <filePath>');
  return;
}

const url = process.argv[2];
const filePath = process.argv[3];

request(url, (error, response, body) => {
    if (error) {
        console.error(error);
        return;
    }
    if (response.statusCode !== 200) {
        console.error(`Failed to fetch. Status code: ${response.statusCode}`);
        return;
    }
    fs.writeFile(filePath, body, error => {
        if (error) {
            console.error(error);
            return;
        }
    console.log(`Downloaded and saved ${body.length} bytes to ${filePath}`);
    })
});