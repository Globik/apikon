//const seo = require('../libs/seo.json')
const okno = function(n){
	return `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>${n.title}</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0"> 
    <meta itemprop="name" content="${n.items[0]}"/>
    <link rel="icon" href="/favicon.ico">
    <style>
    .imghalter{
		width:50%;
		margin: 0 auto;
	}
	.imghalter img{
	width:100%;
}
ul,ul li{
list-style-type:none;
display:inline;
}
    </style>
    </head><body><nav itemscope itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
    <a itemprop="iem" href="/"><span itemprop="name">rouletka.ru</span></a>
    <meta itemprop="position" content="1" /></li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
    <a itemprop="iem" href="/photos"><span itemprop="name">photos</span></a>
    <meta itemprop="position" content="2" /></li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
    <a itemprop="iem" href="/photos/${n.lword}"><span itemprop="name">${n.word}</span></a>
    <meta itemprop="position" content="3" /></li>
    </nav>
    <section>${getPhoteli(n)}</section>
    </body></html>`;
}
module.exports = { okno }


function getPhoteli(n){
	//console.log(n.jObj.yandexsearch.response.results.grouping.group);
	let s='';
	
	n.jObj.yandexsearch.response.results.grouping.group.forEach(function(el, i){
		s+=`<div itemscope itemtype="http://schema.org/ImageObject" class="imghalter"><img onerror="this.remove();" src="${el.doc.url}" itemprop="contentUrl"/><span itemprop="description">${n.items[i]}.</span></div>`
	});
	return s;
}
