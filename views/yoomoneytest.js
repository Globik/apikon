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
    <hr>1)
    <form name="myyoomoney" action="/admin/saveYoomoney" method="post">
    <div>
    <label><b>client_id:</b></label><br>
    <input type="text" name="client_id" required placeholder="client_id" value="${n.yoomoney_client_id?n.yoomoney_client_id:''}">
    </div>
    <div>
    <label><b>client secret:</b></label><br>
    <textarea placeholder="client_secret" required name="client_secret" value="${n.yoomoney_secret?n.yoomoney_secret:''}">${n.yoomoney_secret?n.yoomoney_secret:''}</textarea>
    </div>
    <div>
    <input type="submit" value="save" />
    </div>
    </form>
    <hr>
    <hr>2) Авторизация
    <div>
    <button onclick="goAuth(this);">go to yoomoney</button>
    </div>
    <hr>
    <hr>3) Info
    <div>
    <button onclick="getInfo(this);">get info</button>
    </div>
    <hr>
    <script src="/js/yoomoneytest.js"></script>
    </body></html>
    `
}
module.exports = { yoomoneytest }
