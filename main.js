const url = "https://github.com/topics";
const cheerio = require("cheerio");
const request = require("request");
const pdfkit = require("pdfkit");
const getReposPageHTML = require("./reposPage");

request(url, cb);
function cb(err, response, html) {
  if (err) console.log(err);
  else {
    // console.log(html);
    getTopicLinks(html);
  }
}
function getTopicLinks(html) {
  let $ = cheerio.load(html);
  let linkElemArr = $(".no-underline.d-flex.flex-column.flex-justify-center");
  for (let i = 0; i < linkElemArr.length; i++) {
    let link = $(linkElemArr[i]).attr("href");
    let topic  = link.split("/").pop();
    let fullLink = `https://github.com${link}`;
    getReposPageHTML(fullLink,topic);
  }
}
