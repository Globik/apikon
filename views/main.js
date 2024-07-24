function main(n){
	let istestheart = (n.istestheart==1?true:false);
return `
 <!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>Чат-рулетка - видеочат для случайных знакомств в интернете.</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- <meta name="viewport" content="width=device-width,initial-scale=1.0"> -->
    <meta name="viewport" content="width=device-width,user-scalable=no" />
    <link rel="icon" href="favicon.ico">
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
		<link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
		<link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
		<link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
		<link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
		<link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
		<link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
		<link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
		<link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
		<link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png">
		<link rel="icon" type="image/png" sizes="144x144"  href="/android-icon-144x144.png">
		<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
		<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
		<!-- <link rel="manifest" href="/manifest.json"> -->
		<meta name="msapplication-TileColor" content="#ffffff">
		<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
		<meta name="theme-color" content="#ffffff">
		
<meta name="description" content="Чат-рулетка — самый популярный русскоязычный чат. Ежедневно чат посещает более 500 тысяч пользователей из России и стран СНГ." />
  <meta name="keywords" content="rouletka.ru, roulet.chat, chat.roulet, roulette, chat, Chatroulette, видеочат, чатрулетка, чатрулет, chatroulette русский, чатрулетт, анонимность, видео, чат, рулетка, чат рулет, чат рулетка, чат рулетт, chat roulette, chatroulette.com, знакомства, videochatru, videochat.ru, videochat.com" />
 
  <meta property="og:title" content="Чат-рулетка - анонимный видеочат (Русский аналог ChatRoulette)" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="//rouletka.ru/" />
  <meta property="og:image" content="//rouletka.ru/og_image.png" />
  <meta property="og:site_name" content="Чат-рулетка" />
  <meta property="og:description" content="Чат-рулетка для русскоязычных пользователей. Случайные знакомства в видеочате. Есть веб-камера? Найди пару в чат рулетке!" />
  
  <meta itemprop="name" content="Чат-рулетка - анонимный видеочат (Русский аналог ChatRoulette)" />
<meta itemprop="description" content="Чат-рулетка — самый популярный русскоязычный чат. Ежедневно чат посещает более 500 тысяч пользователей из России и стран СНГ." />
<meta name="description" content="Чат-рулетка — самый популярный русскоязычный чат. Ежедневно чат посещает более 500 тысяч пользователей из России и стран СНГ." />
<script type="application/ld+json"> { "@context": "https://schema.org", "@type": "Organization", "url": "https://rouletka.ru", "logo": "https://rouletka.ru/og_image.png" } </script>
  
		<link href="/css/main22.css" rel="stylesheet">
		<link href="/css/login.css" rel="stylesheet">
		<link href="/css/mediabox2.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet">
<script src="/js/globalik.js"></script>
<script src="/js/mediasoup-client.min.js"></script>
<!-- <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script> -->
<!-- <script src="/js/adapter-latest.js"></script> -->
 <!-- Google tag (gtag.js) -->
<!-- <script async src="https://www.googletagmanager.com/gtag/js?id=G-QG900MX52X"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-QG900MX52X');
</script> -->
<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(95229410, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/95229410" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
<!--
    <script src="/pwabuilder-sw-register.js"></script> -->
  </head>
  <body>
    <noscript>
      <strong>We're sorry but chatroulette doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <input type="hidden" id="isLogin" value="${n.user?true:false}"/>
    <input type="hidden" id="userId" value="${n.user?n.user.id:0}">
    <input type="hidden" id="userName" value="${n.user?n.user.name:'anon'}">
    <input type="hidden" id="isTestHeart" value="${istestheart}">
    <input type="hidden" id="publishedid" value="${n.imgData && n.imgData.img_data?n.imgData.publishedId:null}" >
    <!-- ${n.user? JSON.stringify(n.user):'no user'} -->
    <script>
   // note({ content: '<b>Помочь проекту: </b><br><br>
 //  <iame src="https://yoomoney.ru/quickpay/fundraise/button?billNumber=AWVMCQLpAcY.240125&" width="330" height="50" frameborder="0" allowtransparency="true" scrolling="no"></iframe>
   //', type: "info", time: 60 });
    </script>
    ${!n.user?`<script>
    const NICK = "anon";
    window.onload=function(){
		//get_socket(); 
   const cat = localStorage.getItem("myCat");
   if(!cat && cat !=="Tom"){
    location.href="#regeln";
    const faka = document.querySelector('.overlay:target');
if(faka){
	faka.onclick=function(e){
		e.preventDefault();
	//alert(1);
	//window.location.href="#lregeln";
	//return;
	}
}
}else{
	let islogin = localStorage.getItem("islogin");
	//if(!islogin && islogin !=="yes")
    location.href="#login";
	
const faka = document.querySelector('.overlay:target');
if(faka){
	faka.onclick=function(e){
		e.preventDefault();
	
	}
}
}
in_rem_hash();

}
   
    
function confirmRules(){
	localStorage.setItem("myCat", "Tom");
	window.location.href="#login";
	 const faka = document.querySelector('.overlay:target');
	 if(faka){
	faka.onclick=function(e){
		e.preventDefault();
	}
}
}
function isOpenModal(){
	 window.location.href="#regeln";
	 const faka = document.querySelector('.overlay:target');
	 if(faka){
	faka.onclick=function(e){
		e.preventDefault();
	}
}
}

    </script>`:`<script>
    in_rem_hash();
    const NICK = "${n.user?n.user.name:'anonym'}";
    window.onload = function(){
		get_socket();
		
    }
    </script>
    `}
    <script>
  //  var ICESERVERS =n.stun?n.stun:null
  
  
  
  var ICESERVERS = {
  //iceTransportPolicy:"relay",
	"iceServers":[
	{
      "urls": "stun:stun.l.google.com:19302"
    },
	{
		"urls":[
		"stun:rouletka.ru:3479",
		"stun:rouletka.ru:5348"
		]
		//stun:45.12.18.172:3479
		},
	{urls:[
	"turn:rouletka.ru:3479?transport=udp",
		"turn:rouletka.ru:3479?transport=tcp", 
		"turn:rouletka.ru:5348?transport=udp",
		"turn:rouletka.ru:5348?transport=tcp" //no stun
		]
		,username:"alik",credential:"1234"}]};

  
     </script>
     <article id="mediabox">
    <nav id="navpanel"><div class="nav"><b>Online: <span id="onlineCount">0</span></b>&nbsp;&nbsp;&nbsp;<b style="font-size:18px;">&#x1F441;</b>&nbsp;&nbsp;&nbsp;<span id="vV" style="color:orange;font-weight:bold;">${n.imgData && n.imgData.img_data?n.imgData.value:0}</span></div>
    <div id="settings" class="ita" onclick="panelOpen(this);">
 <img class="setimg" src="/img/set2.svg">
</div>
<div id="settingspanel">
${n.user && n.user.brole=='admin'?'<div class="settingspanel" onclick="toAdminPanel(this);">В админку</div>':''}
<div class="settingspanel" data-current="" id="camToggle" onclick="toggleCam(this);">Переключить камеру</div>
<!-- <div class="settingspanel" onclick="doSharing(this);">Скриншэринг</div> -->
<div class="settingspanel"><b>Вебок:</b> <span id="camsCount">0</span> | <b>Коннектов:</b> <span id="connects">0</span></div>
<!-- <div class="settingspanel"  onclick="pushSubscribe(this);">Пуш уведомления</div> -->
<div class="settingspanel"  onclick="purchaseTokens(this);">Купить сердечки &#x1f496;</div>
<div class="settingspanel">
<div class="some doh">Ваш доход&nbsp;&nbsp;<span id="dohod">${n.user? Number.parseFloat(n.user.theart*0.10).toFixed(2):'0.00'}</span>&nbsp;&nbsp;рублей</div>
<div class="du" onclick="getPayout(this);">Получить</div>
</div>
<div class="settingspanel"><a href="https://t.me/rouletka3">Наш Телеграм</a></div>
<div class="settingspanel" ><a href="#ozeniteHREF" onclick="ozenite(this);"><span class="ozenka">Оцените приложение</span></a></div>
 <!--
 <div class="settingspanel"  id="donatis">Помочь проекту<br>
 <iframe src="https://yoomoney.ru/quickpay/fundraise/button?billNumber=AWVMCQLpAcY.240125&" width="330" height="50" frameborder="0" allowtransparency="true" scrolling="no"></iframe></div> -->
${n.user?'<div class="settingspanel" onclick="logout(this);">Выйти</div>':'<div class="settingspanel"><a href="#login" onclick="panelOpen();">Войти</a></div>'}
<!-- <div class="settingspanel"><button onclick="mach();">mach</button></div> -->
</div>
</nav>
    <section id="container">
    <div id="remotecontainer" onclick="closeClaim(this);">
    
    ${n.imgData && n.imgData.img_data?'<style>div#playContainer svg{fill:rgba(234,223,244,0.6);}</style>':''}
    <div id="playContainer" data-state="${n.imgData && n.imgData.img_data?'busy':'niemand'}" onclick="beginTranslation(this);"><!-- <img  src="/img/play2.svg"/>-->
<svg version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
<metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
<g><path d="M500,10C229.4,10,10,229.4,10,500s219.4,490,490,490c270.6,0,490-219.4,490-490S770.6,10,500,10z M500,881.1c-210.5,0-381.1-170.6-381.1-381.1S289.5,118.9,500,118.9c210.5,0,381.1,170.6,381.1,381.1S710.5,881.1,500,881.1z"/><path d="M390.2,282.2l326.7,218.6L390.2,719.5V282.2z"/></g>
</svg>
<div id="kresti"><b id="kres">&#x274E;</b></div>
    <video id="kartina" ${n.imgData && n.imgData.img_data?` poster=${n.imgData.img_data}`:''}></video></div>
    <section id="claimContainer" onclick="openClaim(this);"><div id="claimBox">!</div></section>
    <div id="claimMenu" data-vip=""><div data-claim="ignor" onclick="sendClaim(this);">В игнор!</div><div data-claim="claim" onclick="sendClaim(this);">Пожаловаться!</div></div>
    <section id="mobileloader"><div class="loader"></div></section>
    
    <video id="remote"  class="" autoplay></video>
     <div id="duka2">Жизнь как рулетка. Никогда не узнаешь, кого встретишь следуюшим...</div>
     <!-- MOBILE! -->
 <section id="mobileChat" class="hide">
		<div id="hidechat" onclick="hideChat(this);"><img class="chaticon" src="/img/chat.svg"/></div>
		
		<div id="znakChat2">
	<div id="znakPrint2" class="typing hidden">
    <div class="typing__dot"></div>
    <div class="typing__dot"></div>
    <div class="typing__dot"></div>
  </div>
  </div>
	<div id="chat4"><div id="chatbox2">
	</div>
	<!-- <section id="giftsContainer2" class="hidden"><header><span>Подарки</span><a href="#purchaseHREF"><span class="purchaseSpan">Купить сердечек</span></a></header>
<div id="giftsDiv2">
<div class="flexgiftsitem">
<div class="heart" data-type="mobile" style="">&#x1f496</div>
<div class="bname">Сердечко</div>
<div class="heartcount">${n.user?istestheart?n.user.theart:n.user.heart:0}</div>
</div>
</div>

</section> -->
	</div>
<section id="sectionTextArea" class="hide">
<div id="textarea2" class="hide"><textarea id="txtvalue2" data-publish="none" data-send="two" placeholder="Сообщение" oninput="txtInput(this);" onchange="someChange();"></textarea>
<div id="giftbox">
<!-- <span>&#x1f381</span> -->
<div class="flexgiftsitem">
<div class="heart" data-type="mobile">&#x1f496</div>
<div class="heartcount">${n.user?istestheart?n.user.theart:n.user.heart:0}</div>

</div>
</div>
<div class="send" data-send="two" onclick="sendi(this);"><img src="/img/send1.svg"/></div>
</div></section>
</section> 
<!-- END MOBILE! -->
    </div>
<div id="localcontainer"><video id="local"  class=""  autoplay muted></video></div>

<div id="controlsContainer"><button id="startbtn" class="start" data-start="no" onclick="start(this);">старт</button><button id="nextbtn" class="next" onclick="next(this,true);" disabled>далее</button>
 <div id="somespinner" class="text"><!-- https://cssloaders.github.io/ -->
 <div class="loader"></div>
      <span class="duka">Жизнь как рулетка. Никогда не узнаешь, кого встретишь следуюшим...</span>
       <!-- Life is like a non-stop roulette. You never know who you will meet next...-->
      </div>
       <div id="somehello" class="text">
        <span class="tip"><i class="fas fa-check"></i></span>
        Просто поздоровайтесь друг с другом :D
      </div>
<div id="foot"><a href="/"> О проекте</a></div>
</div>
<!-- COMPUTER VERSION -->
<div id="sectionChat">
	<div id="znakChat">
	<div id="znakPrint" class="typing hidden">
    <div class="typing__dot"></div>
    <div class="typing__dot"></div>
    <div class="typing__dot"></div>
  </div>
  </div>
  
<div id="chatbox"></div>
<!--
<section id="giftsContainer" class="hidden"><header><span>Подарки</span><a href="#purchaseHREF"><span class="purchaseSpan">Купить сердечек</span></a></header>
<div id="giftsDiv">
<div class="flexgiftsitem">
<div class="heart" data-type="computer" style="">&#x1f496</div>
<div class="bname">Сердечко</div>
<div class="heartcount">${n.user?istestheart?n.user.theart:n.user.heart:0}</div>
</div>
</div>
</section> -->

<section id="MainSectionTextArea">

<div id="textarea"><textarea id="txtvalue" data-publish="none" data-send="one" placeholder="Сообщение" oninput="txtInput(this);" onchange="someChange();"></textarea>
<div id="giftbox2" data-state="closed">
<!-- <span>&#x1f381</span> -->
<div class="flexgiftsitem">
<div class="heart" data-type="computer">&#x1f496</div>
<div class="heartcount">${n.user?istestheart?n.user.theart:n.user.heart:0}</div>

</div>
</div>
<div class="send" data-send="one" onclick="sendi(this);" value="papa" ><img src="/img/send1.svg"/></div>
</div></section>
</div><div id="foot2"><a href="/"> О проекте</a></div>
    </section>
    </article>
    
 
   <!--
    <a href="#."  class="overlay" id="purchaseHREF"></a>
    <output id="purchaseoutput" class="popi">
    <section id="heartsContainer">
	
	<form id="purchaseForm" method="post" action="/api/getPayUrl" name="ordertodo">
	<div id="heartswrapper">
	<div class="heartbx"><label class="mechecked" for="t1">&#x1f496 &nbsp;&nbsp;<b>10 сердечек = 100 руб</b></label>
	<input id="t1" type="radio" name="count" class="ten" data-count="10" value="100.00" checked onchange="dodo(this);"></div>
	<div class="heartbx"><label for="t2">&#x1f496 &nbsp;&nbsp;<b>50 сердечек = 400 руб</b></label>
	<input id="t2" type="radio" name="count" data-count="50" value="400.00" onchange="dodo(this);"></div>
	<div class="heartbx"><label for="t3">&#x1f496 &nbsp;&nbsp;<b>100 сердечек = 700 руб</b></label><input id="t3" type="radio" name="count" data-count="100" value="700.00" onchange="dodo(this);"></div>
    <input type="hidden" name="nick" value="${n.user?n.user.name:"anon"}">
    <input type="hidden" name="userid" value="${n.user?n.user.id:'null'}">
	</div>
	<div>
	<input id="purchaseInput" type="submit" value="Купить">
	</div>
	</form>
	</section>
    </output>
    -->
    <!-- {n.user?n.user.heart:'fuck'} -->
    <input type="hidden" id="isEnter" value="${n.user?n.user.heart==0?'true':'false':'true'}" />
    <a href="#."  class="overlay" id="purchaseHREF"></a>
    <output id="purchaseoutput" class="popi">
    <section id="heartsContainer">
	
	<form id="purchaseForm" method="post" action="https://yoomoney.ru/quickpay/confirm" name="ordertodo">
<p class="intro">Купить 5 сердечек &#x1f496 = 50 рублей. Вы будете преренаправлены в yoomoney</p>
	<div id="heartswrapper">
	 <div><input type="hidden" id="receiver" placeholder="Получатель yoomoney" name="receiver" value="410016439442251" required/> </div>
	<input type="hidden" name="label" value="id=${n.user?n.user.id:'0'}&c=5"/>
    <input type="hidden" name="quickpay-form" value="button" />
    <input type="hidden" name="successURL" value="https://rouletka.ru/about" />
    <input type="hidden" name="formcomment" value="Покупка сердечек 5 штук" />
    <input type="hidden" name="targets" value="Купить 5 сердечек" />
    <div><input class="number"  type="hidden" id="sum" name="sum" value="50.00" required data-type="number"/></div>
   <input id="ym" class="input" type="hidden" checked name="paymentType" value="PC" /></div>
   <div><input id="bc"  class="input" type="hidden" name="paymentType" value="AC" /></div>
   <div><input type="submit" value="Купить"/></div>
	
	</div>
	</form>
	</section> 
	<!--4100118676103827 410016439442251  
	<form class="ymform"  method="POST" action="https://yoomoney.ru/quickpay/confirm">
    <div><label for="receiver"><b>Получатель:</b></label><br><input type="text" id="receiver" placeholder="олучатель yoomoney" name="receiver" value="4100118676103827" required/> </div>
    <input type="hidden" name="label" value="id=${n.user?n.user.id:'0'}&c=5"/>
    <input type="hidden" name="quickpay-form" value="button" />
    <input type="hidden" name="formcomment" value="Покупка сердечек 5 штук" />
    <input type="hidden" name="targets" value="Купить 5 сердечек" />
    <input type="hidden" name="successURL" value="https://rouletka.ru/about" />
    <h3>Платить будете:</h3>
   <div><label for="sum"><b>Cумма в рублях:</b>&nbsp;&nbsp;&nbsp;</label><input class="number"  type="text" id="sum" name="sum" value="2.00" required data-type="number"/></div>
   <div><label for="ym" ><b>ЮMoney:</b></label>&nbsp;&nbsp;&nbsp;<input id="ym" class="input" type="radio" checked name="paymentType" value="PC" /></div>
   <div><label for="bc" ><b>Банковской картой:</b></label>&nbsp;&nbsp;&nbsp;<input id="bc"  class="input" type="radio" name="paymentType" value="AC" /></div>
   <div><input type="submit" value="Купить"/></div>
    </form>
	
	-->
	
    </output>
    
    <a href="#."  class="overlay" id="vivest"></a>
    <output id="payoutoutput" class="popi">
    <form name="mypayoutform" action="/admin/setPayout" method="post">
    
    <input type="hidden" name="label" value="${n.user?n.user.id:'0'}"/>
    <div><input type="hidden" id="payoutamountid" name="payoutamount"  value="${n.user? Number(n.user.theart * 0,10).toFixed(2):0}"/></div>
    <div class="pfo"><label for="payoutaccountid">Счет в <a  id="mpa" href="https://yoomoney.ru">yoomoney</a>:</label>&nbsp;&nbsp;<input type="number" id="payoutaccountid" name="payoutaccount" required placeholder="410016439442251"  value=""/></div>
    <div class="pfo"><input id="payoutsub" type="submit" value="Получить" /></div>
    </form>
    </output>
    
    
    <!-- 410016439442251 -->
    
     <a href="#."  class="overlay" id="ozeniteHREF"></a>
    <output id="ozenite" class="popi">
    <h1>Пожалуйста, оцените наше приложение</h1>
    <p class="zwezda"><span>&#x2B50;</span><span>&#x2B50;</span><span>&#x2B50;</span><span>&#x2B50;</span><span>&#x2B50;</span></p>
    <p>
    Лучший способ поддержать - это рассказать другим
    </p>
    <p><small>Для оценки вы будете перенаправлены в Play Market</small></p>
    <p><a href="https://play.google.com/store/apps/details?id=ru.rouletka.pwa"><div id="ozeniteBtn"><div>Оценить</div></div></a></p>
    </output>
    
    <!-- 
    test_Yl7GFsIK2B4xGOQ_UazguZshpPDjosDeS1BN-DOqUZ4  shopId 383452
    -->
    <a href="#."  class="overlay" id="regeln"></a>
    <output id="regelnoutput" class="popi">
    <div class="modal-header">
          <h1>Правила видеочата</h1>
        </div>
        <div class="modal-body">
          <ol>
            <li id="1">
              <h4>Запрещено проявлять неуважительное отношение к собеседнику:</h4>
              <ul>
                <li>вести себя по-хамски и использовать ненормативную лексику;</li>
                <li>оскорблять по национальным, расовым и религиозным признакам;</li>
                <li>угрожать собеседнику.</li>
              </ul>
            </li>
            <li id="2">
              <h4>Запрещено вести себя вульгарно:</h4>
              <ul>
                <li><u>находиться в чате с голой грудью, не показывая своё лицо</u>;</li>
                <li>предлагать виртуальный секс;</li>
                <li>использовать слова, которые могут иметь неприличный сексуальный подтекст (вирт, пошалим, и
                  т.п.);
                </li>
                <li>находиться в чат рулетке без одежды или в нижнем белье;</li>
                <li>демонстрировать половые органы и другие интимные части тела;</li>
                <li>прикасаться к половым органам даже через одежду;</li>
                <li>направлять камеру ниже груди (старайтесь, чтобы ваше лицо было в кадре);</li>
                <li>совершать любые действия, которые могут расцениваться как непристойные.</li>
              </ul>
            </li>
            <li id="3">
              <h4>Запрещено показывать вместо себя посторонние изображения:</h4>
              <ul>
                <li>направлять камеру на экран монитора, планшета, телефона или телевизора;</li>
                <li>направлять камеру на фотографии;</li>
                <li>направлять камеру на любые текстовые сообщения;</li>
                <li>использовать эмуляторы веб-камеры.</li>
              </ul>
            </li>
            <li id="4">
              <h4>Запрещено спамить:</h4>
              <ul>
                <li>транслировать изображения или писать сообщения рекламного характера;</li>
                <li>отправлять в чате любые ссылки;</li>
                <li>осуществлять массовые рассылки сообщений;</li>
                <li>просить посетителей видеочата совершать действия в интернете: проголосовать, поставить лайки,
                  принять участие в опросе, зайти на сайт и т.п.
                </li>
              </ul>
            </li>
            <li id="5">
              <h4>Система жалоб</h4>
              <ul>
                <li>Любой посетитель видеочата может отправить жалобу на своего собеседника. К жалобе прикрепляется
                  изображение пользователя и его сообщение, на основании которых модератор принимает решение о
                  бане. Модераторы реагируют на жалобы круглосуточно, без выходных.
                </li>
                <li>Если на человека, нарушающего правила чата, часто жалуется большое количество пользователей, он
                  банится автоматически. Сложный механизм системы жалоб исключает случайные или несправедливые
                  баны.
                </li>
              </ul>
            </li>
          </ol>
          <p>Администрация видеочата не несёт ответственности за действия посетителей, но всеми силами старается бороться с нарушителями. Физически невозможно уследить за всеми нарушениями в чат рулетке, поэтому настоятельно просим вас жаловаться на нарушителей. Ваши жалобы помогают нам делать чат чище и лучше.</p>
          <p>Пользуясь чатом, вы принимаете и соглашаетесь выполнять установленные правила. Если вы не согласны с действующими правилами, вам следует прекратить пользоваться чатом.</p>
          <div class="center-button">
            <button class="register-button" onclick="confirmRules();">Принять</button>
          </div>
        </div>
      
    </output>
    <a href="#."  class="overlay" id="login"></a>
    <output id="loginoutput" class="popi">
        <div class="modal-header">
          Авторизация / Регистрация
          <span class="model-header-label" onclick="isOpenModal();">
            Правила чата
          </span>
        </div>
        <div class="modal-body">
          <div class="error-message" id="errormsg"></div>
          <form name="formlogin" id="myform">
            <label for="name" style="margin-top: 5px;">Имя</label>
            <input  name="username" type="text" placeholder="Введите Имя/Логин" id="name" required minlength="2" maxlength="20">

            <label for="name">Пароль</label>
            <input  name="userpassword" type="password" autocomplete="on" placeholder="Введите пароль" id="password" required minlength="2" maxlength="20">
			 <button  class="login-button" id="btnlogin">Войти</button>
            <button class="register-button" id="btnregister">Зарегистрироваться</button>
           
          </form>
        </div>
    </output>
    
    
    
    
    
    
    
    
    
    
    
   <script src="/js/login.js"></script>
    
    <script src="/js/webrtc.js"></script>
    <script src="/js/soupi.js"></script>
    
    
    
    
    
 <!--   <footer><a href="/about"> О проекте</a></footer> -->
    
       </body>
</html>`;
}
module.exports=  {main:main};
