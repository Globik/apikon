function main(n){
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
		<link rel="manifest" href="/manifest.json">
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
  
  
		<link href="/css/main2.css" rel="stylesheet">
		<link href="/css/login.css" rel="stylesheet">
		<link href="/css/mediabox.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet">
<script src="/js/globalik.js"></script>
<!-- <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script> -->
<script src="/js/adapter-latest.js"></script>
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

    <script src="/pwabuilder-sw-register.js"></script>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but chatroulette doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    
    <!-- ${n.user? JSON.stringify(n.user):'no user'} -->
    <script>
   // note({ content: '<b>Помочь проекту: </b><br><br>
 //  <iame src="https://yoomoney.ru/quickpay/fundraise/button?billNumber=AWVMCQLpAcY.240125&" width="330" height="50" frameborder="0" allowtransparency="true" scrolling="no"></iframe>
   //', type: "info", time: 60 });
    </script>
    ${!n.user?`<script>
    const NICK = "anon";
     window.onload=function(){
		 
   const cat = localStorage.getItem("myCat");
   if(!cat && cat !=="Tom"){
    window.location.href="#regeln";
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
	window.location.href="#login";
	
const faka = document.querySelector('.overlay:target');
if(faka){
	faka.onclick=function(e){
		e.preventDefault();
	//alert(1);
	//window.location.href="#login";
	//return;
	}
}
}
in_rem_hash();
}
   
    
function confirmRules(){
	localStorage.setItem("myCat", "Tom");
	window.location.href="#login";
}
function isOpenModal(){
	 window.location.href="#regeln";
	 const faka = document.querySelector('.overlay:target');
	 if(faka){
	faka.onclick=function(e){
		e.preventDefault();
//	alert(1);
	//window.location.href="#regeln";
	
	}
}
}
    </script>`:`<script>
    in_rem_hash();
    const NICK = "${n.user?n.user.name:'anonym'}";</script>`}
    <script>
  //  var ICESERVERS =n.stun?n.stun:null
     var ICESERVERS ={
  "iceServers": [
    {
      "urls": "stun:stun.l.google.com:19302"
    },
    {
      "urls": "turn:relay1.expressturn.com:3478",
      "username": "efZIKNPZ0Y17GFG3WZ",
      "credential": "HIYNupkIAHFXSgW8"
    },
    {
      "urls": "stun:stun.relay.metered.ca:80"
    },
    {
      "urls": "turn:a.relay.metered.ca:80",
      "username": "33c88ed716afa1a802b5116a",
      "credential": "YlI1/qfkEWya3Q4p"
    },
    {
      "urls": "turn:a.relay.metered.ca:80?transport=tcp",
      "username": "33c88ed716afa1a802b5116a",
      "credential": "YlI1/qfkEWya3Q4p"
    },
    {
      "urls": "turn:a.relay.metered.ca:443",
      "username": "33c88ed716afa1a802b5116a",
      "credential": "YlI1/qfkEWya3Q4p"
    },
    {
      "urls": "turn:a.relay.metered.ca:443?transport=tcp",
      "username": "33c88ed716afa1a802b5116a",
      "credential": "YlI1/qfkEWya3Q4p"
    }
  ]
};
     </script>
     <article id="mediabox">
    <nav id="navpanel"><div class="nav"><b>Online: <span id="onlineCount">0</span></b></div>
    <div id="settings" class="ita" onclick="panelOpen(this);">
 <img class="setimg" src="/img/set2.svg">
</div>
<div id="settingspanel">
${n.user && n.user.brole=='admin'?'<div class="settingspanel" onclick="toAdminPanel(this);">В админку</div>':''}
<div class="settingspanel" data-current="" id="camToggle" onclick="toggleCam(this);">Переключить камеру</div>
<div class="settingspanel" onclick="doSharing(this);">Скриншэринг</div>
<div class="settingspanel"><b>Вебок:</b> <span id="camsCount">0</span> | <b>Коннектов:</b> <span id="connects">0</span></div>
<!-- <div class="settingspanel"  onclick="pushSubscribe(this);">Пуш уведомления</div> -->
<div class="settingspanel"><a href="https://t.me/chatrouletka">Наш Телеграм</a></div>
<div class="settingspanel"  id="donatis">Помочь проекту<br><iframe src="https://yoomoney.ru/quickpay/fundraise/button?billNumber=AWVMCQLpAcY.240125&" width="330" height="50" frameborder="0" allowtransparency="true" scrolling="no"></iframe></div>
${n.user?'<div class="settingspanel" onclick="logout(this);">Выйти</div>':''}
</div>
</nav>
    <section id="container">
    <div id="remotecontainer" onclick="closeClaim(this);">
    <section id="claimContainer" onclick="openClaim(this);"><div id="claimBox">!</div></section>
    <div id="claimMenu" data-vip=""><div data-claim="ignor" onclick="sendClaim(this);">В игнор!</div><div data-claim="claim" onclick="sendClaim(this);">Пожаловаться!</div></div>
    <section id="mobileloader"><div class="loader"></div></section>
    
    <video id="remote"  class="" autoplay></video>
     <div id="duka2">Жизнь как рулетка. Никогда не узнаешь, кого встретишь следуюшим...</div>
 <section id="mobileChat" class="hide">
		<div id="hidechat" onclick="hideChat(this);"><img class="chaticon" src="/img/chat.svg"/></div>
		<div id="printmsg"><img class="printing2" src="/img/print.gif"/></div>
	<div id="chat4"><div id="chatbox2"></div></div>

<div id="textarea2" class="hide"><textarea id="txtvalue2" placeholder="Your message" oninput="txtInput(this);" onchange="someChange();"></textarea>
<div class="send" data-send="two" onclick="sendi(this);"><img src="/img/send1.svg"/></div></div>
</section> 
    </div>
<div id="localcontainer"><video id="local"  class=""  autoplay muted></video></div>

<div id="controlsContainer"><button id="startbtn" class="start" data-start="no" onclick="start(this);">start</button><button id="nextbtn" class="next" onclick="next(this);" disabled>next</button>
 <div id="somespinner" class="text"><!-- https://cssloaders.github.io/ -->
 <div class="loader"></div>
      <span class="duka">Жизнь как рулетка. Никогда не узнаешь, кого встретишь следуюшим...</span>
       <!-- Life is like a non-stop roulette. You never know who you will meet next...-->
      </div>
       <div id="somehello" class="text">
        <span class="tip"><i class="fas fa-check"></i></span>
        Просто поздоровайтесь друг с другом :D
      </div>
<div id="foot"><a href="/about"> О проекте</a></div>
</div>
<div id="sectionChat">
	<div id="printmsg2"><img class="printing" src="/img/print.gif"/></div>
<div id="chatbox"></div>
<div id="textarea"><textarea id="txtvalue" placeholder="Your message" oninput="txtInput(this);" onchange="someChange();"></textarea>
<div class="send" data-send="one" onclick="sendi(this);" value="papa" ><img src="/img/send1.svg"/></div>
</div>
</div><div id="foot2"><a href="/about"> О проекте</a></div>
    </section>
    </article>
    <!--
    <section id="dynamicSection">
    <div id="dynamicNav"><div><b>Веб-камер:</b> <span id="camsCount">0</span></div><div><b>Коннектов:</b> <span id="connects">0</span></div></div>
    <hr>
    <div id="dynamicContainer"></div>
    </section>
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
    
    
    
    
    
 <!--   <footer><a href="/about"> О проекте</a></footer> -->
    
       </body>
</html>`;
}
module.exports=  {main:main};
