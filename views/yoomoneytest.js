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
    <form name="myyoomoney" class="myyoomoney" action="/admin/saveYoomoney" method="post">
    <div>
    <label><b>client_id:</b></label><br>
    <textarea  id="clientId" name="client_id" required disabled placeholder="client_id" value="${n.yoomoney_client_id?n.yoomoney_client_id:''}">${n.yoomoney_client_id?n.yoomoney_client_id:''}</textarea>
    </div>
    <div>
    <label><b>client secret:</b></label><br>
    <textarea placeholder="client_secret" required disabled name="client_secret" value="${n.yoomoney_secret?n.yoomoney_secret:''}">${n.yoomoney_secret?n.yoomoney_secret:''}</textarea>
    </div>
    <div>
    <input class="sub" type="submit" disabled name="submit" value="save" />&nbsp;&nbsp;&nbsp;<input class="sub" name="reset" type="reset" disabled onclick="doWas(this);" value="Сбросить" />
    </div>
    
    </form>
    <button onclick="redact(this);">Редактировать</button>
    <hr>
    <hr>2) Авторизация
    <div>
    <button onclick="goAuth(this);">go to yoomoney</button>
    </div>
    <hr>
    <hr>3) Info
    <div>
    <button onclick="getInfo(this);">get info</button>
    <br><br><output id="out"></output>
    </div>
    <hr>
    <hr>4) History
    <div>
    <button onclick="getHistory(this);">get history</button>
    <br><br><output id="out2"></output>
    </div>
    <hr>5) Платный вход
    <form class="ymform"  method="POST" action="https://yoomoney.ru/quickpay/confirm">
    <div><label for="receiver"><b>Получатель:</b></label><br><input type="text" id="receiver" placeholder="олучатель yoomoney" name="receiver" value="4100118676103827" required/> </div>
    <input type="hidden" name="label" value="${n.user?n.user.id:'0'}"/>
    <input type="hidden" name="quickpay-form" value="button" />
    <input type="hidden" name="formcomment" value="Покупка сердечек 10 штук" />
    <input type="hidden" name="targets" value="Купить 10 сердечек" />
    <input type="hidden" name="successURL" value="https://rouletka.ru/about" />
    <h3>Платить будете:</h3>
   <div><label for="sum"><b>Cумма в рублях:</b>&nbsp;&nbsp;&nbsp;</label><input class="number"  type="text" id="sum" name="sum" value="2.00" required data-type="number"/></div>
   <div><label for="ym" ><b>ЮMoney:</b></label>&nbsp;&nbsp;&nbsp;<input id="ym" class="input" type="radio" checked name="paymentType" value="PC" /></div>
   <div><label for="bc" ><b>Банковской картой:</b></label>&nbsp;&nbsp;&nbsp;<input id="bc"  class="input" type="radio" name="paymentType" value="AC" /></div>
   <div><input type="submit" value="Купить"/></div>
    </form>
    <hr>
    
    <hr>
    <script src="/js/yoomoneytest.js"></script>
    </body></html>
    `
}
module.exports = { yoomoneytest }


























