const yoomoneytest = function(n){
	return ` <!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>yoomoney test</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0"> 
    <link href="/css/main22.css" rel="stylesheet">
    <link href="/css/yoomoneytest.css" rel="stylesheet">
    <script src="/js/globalik.js"></script>
    </head><body>
    <h1>Yoomoney</h1>
    <hr>
    <form name="myyoomoney" action="/adminyoomoney" method="post">
    <div>
    <label><b>client_id:</b></label><br>
    <input type="text" name="client_id" required placeholder="client_id">
    </div>
    <div>
    <label><b>client secret:</b></label><br>
    <textarea placeholder="client_secret" required name="client_secret"></textarea>
    </div>
    <div>
    <input type="submit" value="save" />
    </div>
    </form>
    <hr>
    <script src="/js/yoomoneytest.js"></script>
    </body></html>
    `
}
module.exports = { yoomoneytest }
