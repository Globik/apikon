const photos = function(n){
	return `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>Photos</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0"> 
    <link rel="icon" href="/favicon.ico"></head><body>
    <section>${getPhoteli(n)}</section>
    </body></html>`;
}

module.exports = { photos }

function getPhoteli(n){
	console.log(n.jObj);
	let s = ''+n.jObj+' ';
	let ob;
	try{
		ob = JSON.parse(n.jObj);
	}catch(e){
		console.log(e);
	}
	//response.results.grouping.group:[{url}]
	//n.jObj.response.results.grouping.group.forEach(function(el, i){
		//s+=`<div><div>${i+1})</div><img src="${el.url}" /></div>`
	//});
	return s;
}
