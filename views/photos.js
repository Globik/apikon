const photos = function(n){
	return `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>Photos</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0"> 
    <link rel="icon" href="/favicon.ico">
    <style>
    .imghalter{
		width:50%;
		margin: 0 auto;
	}
	.imghalter img{
	width:100%;
}
    </style>
    </head><body>
    <section>${getPhoteli(n)}</section>
    </body></html>`;
}

module.exports = { photos }

function getPhoteli(n){
	//console.log(n.jObj.yandexsearch.response.results.grouping.group);
	let s='';
	//response.results.grouping.group:[{url}]
	n.jObj.yandexsearch.response.results.grouping.group.forEach(function(el, i){
		s+=`<div class="imghalter"><img onerror="this.remove();" src="${el.doc.url}" /></div>`
	});
	return s;
}
