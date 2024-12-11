const photos = function(n){
	return `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>Photos</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0"> 
    <link rel="icon" href="/favicon.ico">
    <meta itemprop="name" content="Картинки"/>
    <style>
    .imghalter{
		width:50%;
		margin: 0 auto;
	}
	.imghalter img{
	width:100%;
}
ul{
list-style-type:none;
}
li{display:inline;}
    </style>
    </head><body><nav itemscope itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
    <a itemprop="iem" href="/"><span itemprop="name">rouletka.ru</span></a>
    <meta itemprop="position" content="1" /></li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
    <a itemprop="iem" href="/photos"><span itemprop="name">photos</span></a>
    <meta itemprop="position" content="2" /></li>
    </nav>
    
    <article itemscope itemtype="https://schema.org/WebPage"><header itemprop="name">Картинки</header>${getLinks(n)}</article>
    </body></html>`;
}

module.exports = { photos }
function getLinks(n){
	let s = '';
	n.items.forEach(function(el, i){
		s+=`<p><a href="/photos/${el.lword}" itemprop="url">${el.word}</a></p>`;
	});
	return s;
}
